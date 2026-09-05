// Gopeed Pawchive Post Resolver & Downloader Extension
// Supports: Fanbox, Patreon, Fantia, Ci-en, Subscribestar, Boosty, Gumroad, etc. on pawchive.pw / pawchive.st

// Pure JS zero-dependency ZIP archive generator (PKZIP 2.0 Store mode, UTF-8 filename support)
class MiniZip {
  constructor() {
    this.entries = [];
  }

  static crcTable = (() => {
    let c;
    const table = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      c = n;
      for (let k = 0; k < 8; k++) {
        c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      }
      table[n] = c;
    }
    return table;
  })();

  static calcCRC32(uint8Array) {
    let crc = 0xFFFFFFFF;
    const table = MiniZip.crcTable;
    for (let i = 0; i < uint8Array.length; i++) {
      crc = table[(crc ^ uint8Array[i]) & 0xFF] ^ (crc >>> 8);
    }
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }

  addFile(filename, uint8Data, date = new Date()) {
    const encoder = new TextEncoder();
    const nameBytes = encoder.encode(filename);
    const crc = MiniZip.calcCRC32(uint8Data);
    const size = uint8Data.byteLength;

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = Math.floor(date.getSeconds() / 2);
    const dosTime = (hours << 11) | (minutes << 5) | seconds;

    const year = Math.max(0, date.getFullYear() - 1980);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dosDate = (year << 9) | (month << 5) | day;

    this.entries.push({
      nameBytes,
      data: uint8Data,
      crc,
      size,
      dosTime,
      dosDate
    });
  }

  generate() {
    let totalSize = 0;
    for (const entry of this.entries) {
      totalSize += 30 + entry.nameBytes.length + entry.size;
      totalSize += 46 + entry.nameBytes.length;
    }
    totalSize += 22;

    const buffer = new Uint8Array(totalSize);
    const view = new DataView(buffer.buffer);
    let offset = 0;

    const localOffsets = [];
    for (const entry of this.entries) {
      localOffsets.push(offset);
      view.setUint32(offset, 0x04034b50, true);
      view.setUint16(offset + 4, 20, true);
      view.setUint16(offset + 6, 0x0800, true); // UTF-8 filename flag
      view.setUint16(offset + 8, 0, true); // Store mode (no compression for media)
      view.setUint16(offset + 10, entry.dosTime, true);
      view.setUint16(offset + 12, entry.dosDate, true);
      view.setUint32(offset + 14, entry.crc, true);
      view.setUint32(offset + 18, entry.size, true);
      view.setUint32(offset + 22, entry.size, true);
      view.setUint16(offset + 26, entry.nameBytes.length, true);
      view.setUint16(offset + 28, 0, true);
      offset += 30;

      buffer.set(entry.nameBytes, offset);
      offset += entry.nameBytes.length;

      buffer.set(entry.data, offset);
      offset += entry.size;
    }

    const centralDirStart = offset;
    for (let i = 0; i < this.entries.length; i++) {
      const entry = this.entries[i];
      const localOffset = localOffsets[i];

      view.setUint32(offset, 0x02014b50, true);
      view.setUint16(offset + 4, 20, true);
      view.setUint16(offset + 6, 20, true);
      view.setUint16(offset + 8, 0x0800, true);
      view.setUint16(offset + 10, 0, true);
      view.setUint16(offset + 12, entry.dosTime, true);
      view.setUint16(offset + 14, entry.dosDate, true);
      view.setUint32(offset + 16, entry.crc, true);
      view.setUint32(offset + 20, entry.size, true);
      view.setUint32(offset + 24, entry.size, true);
      view.setUint16(offset + 28, entry.nameBytes.length, true);
      view.setUint16(offset + 30, 0, true);
      view.setUint16(offset + 32, 0, true);
      view.setUint16(offset + 34, 0, true);
      view.setUint16(offset + 36, 0, true);
      view.setUint32(offset + 38, 0, true);
      view.setUint32(offset + 42, localOffset, true);
      offset += 46;

      buffer.set(entry.nameBytes, offset);
      offset += entry.nameBytes.length;
    }

    const centralDirSize = offset - centralDirStart;

    view.setUint32(offset, 0x06054b50, true);
    view.setUint16(offset + 4, 0, true);
    view.setUint16(offset + 6, 0, true);
    view.setUint16(offset + 8, this.entries.length, true);
    view.setUint16(offset + 10, this.entries.length, true);
    view.setUint32(offset + 12, centralDirSize, true);
    view.setUint32(offset + 16, centralDirStart, true);
    view.setUint16(offset + 20, 0, true);

    return buffer;
  }
}

function sanitizeFilename(name) {
  return (name || "untitled")
    .replace(/[\/:*?"<>|\r\n\t]/g, "_")
    .trim()
    .slice(0, 120);
}

function stripHtml(html) {
  if (!html) return "";
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .trim();
}

gopeed.events.onResolve(async function (ctx) {
  const rawUrl = ctx.req.url;
  const regex = /pawchive\.(?:pw|st)\/([^/]+)\/user\/([^/]+)\/post\/([^/?#]+)/i;
  const match = rawUrl.match(regex);
  if (!match) {
    throw new MessageError("URL 格式不匹配，请输入形如 https://pawchive.pw/{service}/user/{uid}/post/{pid} 的帖子链接");
  }

  const [_, service, userId, postId] = match;
  gopeed.logger.info(`[Pawchive] 解析帖子: service=${service}, user=${userId}, post=${postId}`);

  const apiUrl = `https://pawchive.pw/api/v1/${service}/user/${userId}/post/${postId}`;
  const fileDomain = (gopeed.settings && gopeed.settings.fileDomain) || "file.pawchive.pw";
  const packageMode = (gopeed.settings && gopeed.settings.packageMode) || "zip";
  const includeInfo = (gopeed.settings && gopeed.settings.includeInfo !== undefined) ? Boolean(gopeed.settings.includeInfo) : true;
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
      originalName: fname,
      path: post.file.path,
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
        originalName: fname,
        path: att.path,
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
          originalName: fname,
          path: fullPath,
          url: buildFileUrl(fullPath, fname)
        });
        inlineIdx++;
      }
    }
  }

  if (fileList.length === 0) {
    throw new MessageError("未在帖子中找到任何图片、视频或附件文件");
  }

  gopeed.logger.info(`[Pawchive] 成功解析出 ${fileList.length} 个文件，下载模式: ${packageMode}`);

  // Post description text
  const textContent = [
    `Title: ${post.title}`,
    `Service: ${post.service}`,
    `User: ${post.user}`,
    `Post ID: ${post.id}`,
    `Published: ${post.published || "N/A"}`,
    `URL: ${rawUrl}`,
    `Files Count: ${fileList.length}`,
    "",
    "--- Content ---",
    stripHtml(post.content),
    ""
  ].join("\n");

  // Mode 1: ZIP Archive Packaging
  if (packageMode === "zip") {
    try {
      const zip = new MiniZip();

      if (includeInfo) {
        zip.addFile("info.txt", new TextEncoder().encode(textContent));
      }

      for (let i = 0; i < fileList.length; i++) {
        const item = fileList[i];
        gopeed.logger.info(`[Pawchive] 正在拉取文件并打包 [${i + 1}/${fileList.length}]: ${item.name}`);
        const fResp = await fetch(item.url, {
          headers: {
            "Referer": rawUrl,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
          }
        });
        if (!fResp.ok) {
          gopeed.logger.warn(`[Pawchive] 文件下载失败 (${fResp.status}): ${item.url}`);
          continue;
        }
        const ab = await fResp.arrayBuffer();
        zip.addFile(item.name, new Uint8Array(ab));
      }

      const zipBytes = zip.generate();
      gopeed.logger.info(`[Pawchive] ZIP 压缩包构建完成，体积: ${(zipBytes.byteLength / 1024 / 1024).toFixed(2)} MB`);

      const zipBlob = new Blob([zipBytes], { type: "application/zip" });
      let blobUrl = "";
      if (gopeed.runtime && gopeed.runtime.blob) {
        blobUrl = await gopeed.runtime.blob.createObjectURL(zipBlob);
      } else {
        blobUrl = URL.createObjectURL(zipBlob);
      }

      const zipFilename = `${taskBaseName}.zip`;
      ctx.res = {
        name: zipFilename,
        files: [
          {
            name: zipFilename,
            size: zipBytes.byteLength,
            req: {
              url: blobUrl
            }
          }
        ]
      };
      return;
    } catch (e) {
      gopeed.logger.error(`[Pawchive] ZIP 内存打包失败: ${e.message}，自动降级为多文件并发下载`);
      // Fallback to multi-file mode
    }
  }

  // Mode 2: Multi-file concurrent download
  const downloadFiles = fileList.map((item) => ({
    name: item.name,
    req: {
      url: item.url,
      extra: {
        header: {
          "Referer": rawUrl,
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
      }
    }
  }));

  if (includeInfo) {
    const textBlob = new Blob([textContent], { type: "text/plain" });
    let textBlobUrl = "";
    if (gopeed.runtime && gopeed.runtime.blob) {
      textBlobUrl = await gopeed.runtime.blob.createObjectURL(textBlob);
    } else {
      textBlobUrl = URL.createObjectURL(textBlob);
    }
    downloadFiles.unshift({
      name: "info.txt",
      size: new TextEncoder().encode(textContent).byteLength,
      req: {
        url: textBlobUrl
      }
    });
  }

  ctx.res = {
    name: taskBaseName,
    files: downloadFiles
  };
});
