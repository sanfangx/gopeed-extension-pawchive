// Gopeed Pawchive Post Resolver & Downloader Extension
// Supports: Fanbox, Patreon, Fantia, Ci-en, Subscribestar, Boosty, Gumroad, etc. on pawchive.pw / pawchive.st

function sanitizeFilename(name) {
  return (name || "untitled")
    .replace(/[\/:*?"<>|\r\n\t]/g, "_")
    .trim()
    .slice(0, 120);
}

gopeed.events.onResolve(async function (ctx) {
  const rawUrl = ctx.req.url;
  const regex = /pawchive\.(?:pw|st)\/([^/]+)\/user\/([^/]+)\/post\/([^/?#]+)/i;
  const match = rawUrl.match(regex);
  if (!match) {
    throw new MessageError("URL 格式不匹配，请输入形如 https://pawchive.pw/{service}/user/{uid}/post/{pid} 的帖子链接");
  }

  const [_, service, userId, postId] = match;
  gopeed.logger.info(`[Pawchive] 开始解析帖子: service=${service}, user=${userId}, post=${postId}`);

  const apiUrl = `https://pawchive.pw/api/v1/${service}/user/${userId}/post/${postId}`;
  const fileDomain = (gopeed.settings && gopeed.settings.fileDomain) || "file.pawchive.pw";
  const includeCover = (gopeed.settings && gopeed.settings.includeCover !== undefined) ? Boolean(gopeed.settings.includeCover) : true;

  const resp = await fetch(apiUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Accept": "application/json",
      "Referer": rawUrl
    }
  });

  if (!resp.ok) {
    throw new MessageError(`请求 Pawchive API 失败 (HTTP ${resp.status}): ${apiUrl}`);
  }

  const post = await resp.json();
  const rawTitle = post.title || `post_${postId}`;
  const cleanTitle = sanitizeFilename(rawTitle);
  const taskBaseName = `[${service}] [${userId}] ${postId} - ${cleanTitle}`;

  const buildFileUrl = (path, name) => {
    const url = `https://${fileDomain}/data${path}`;
    return name ? `${url}?f=${encodeURIComponent(name)}` : url;
  };

  const fileList = [];
  const seenPaths = new Set();

  // 1. Cover / main file
  if (includeCover && post.file && post.file.path) {
    seenPaths.add(post.file.path);
    const fname = sanitizeFilename(post.file.name || "cover.jpeg");
    fileList.push({
      name: `000_${fname}`,
      url: buildFileUrl(post.file.path, post.file.name)
    });
  }

  // 2. Attachments
  if (Array.isArray(post.attachments)) {
    const padLen = Math.max(3, post.attachments.length.toString().length);
    post.attachments.forEach((att, idx) => {
      if (!att || !att.path || seenPaths.has(att.path)) return;
      seenPaths.add(att.path);
      const prefix = String(idx + 1).padStart(padLen, "0");
      const fname = sanitizeFilename(att.name || `attachment_${idx + 1}`);
      fileList.push({
        name: `${prefix}_${fname}`,
        url: buildFileUrl(att.path, att.name)
      });
    });
  }

  // 3. Inline images in content
  if (post.content) {
    const contentRegex = /(?:href|src)=["']((?:https:\/\/file\.pawchive\.pw)?\/data\/([^"']+))["']/gi;
    let m;
    let inlineIdx = 1;
    while ((m = contentRegex.exec(post.content)) !== null) {
      const fullPath = "/" + m[2].replace(/^\/+/, "");
      if (!seenPaths.has(fullPath)) {
        seenPaths.add(fullPath);
        const inferredExt = fullPath.split(".").pop() || "jpg";
        const fname = `inline_${inlineIdx}.${inferredExt}`;
        fileList.push({
          name: `inline_${inlineIdx}_${fname}`,
          url: buildFileUrl(fullPath, fname)
        });
        inlineIdx++;
      }
    }
  }

  if (fileList.length === 0) {
    throw new MessageError("未在帖子中找到任何图片、视频或附件文件");
  }

  gopeed.logger.info(`[Pawchive] 成功解析出 ${fileList.length} 个文件，交由 Gopeed 并发加速下载`);

  ctx.res = {
    name: taskBaseName,
    files: fileList.map((item) => ({
      name: item.name,
      req: {
        url: item.url,
        extra: {
          header: {
            "Referer": "https://pawchive.pw/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
          }
        }
      }
    }))
  };
});
