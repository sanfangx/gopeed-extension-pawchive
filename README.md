# Pawchive 帖子下载组件 (Gopeed Extension)

[![License](https://img.shields.io/github/license/sanfangx/gopeed-extension-pawchive?color=blue)](LICENSE)

本组件是专为 [Gopeed](https://gopeed.com/) 设计的 **内置组件扩展**，用于解析并高速下载 **[Pawchive](https://pawchive.pw/)**（Fanbox/Patreon/Fantia等）上的任意创作者帖子内容。

## 特性
- **全平台支持**：支持 Pixiv Fanbox, Patreon, Fantia, Ci-en, Subscribestar, Boosty, Gumroad, Afdian 等
- **域名兼容**：`pawchive.pw`、`pawchive.st`、`*.pawchive.pw`
- **两种下载模式**：
  1. **ZIP 压缩包模式（默认）**：自动提取帖子内所有封面主图、附件图片/视频、正文内嵌图，在内存中直接打包组装为标准 `.zip` 压缩包交付 Gopeed 保存。
  2. **多文件并发模式**：解构为原始独立文件列表，调起 Gopeed 多线程高速分片下载引擎，支持断点续传（适合包含超大容量高清视频的帖子）。
- **说明文档归档**：自动将帖子的标题、发布时间、来源作者与正文说明保存为 `info.txt` 归档。

## 安装方式

### 方式一：URL 一键安装（推荐）
1. 打开 Gopeed 客户端，进入左侧 **“扩展”** 页面。
2. 点击右上角 **“安装”**（加号）按钮。
3. 粘贴本仓库链接并确认：
   ```text
   github.com/sanfangx/gopeed-extension-pawchive
   ```

### 方式二：本地开发者模式载入
1. 将本仓库克隆或下载到本地。
2. 在 Gopeed 扩展页面，**连续快速点击右上角“安装”图标 5 次**，激活开发者模式。
3. 点击右上角新增的 **“载入本地目录”** 按钮，选择本目录即可。

## 使用方法
在 Gopeed 主界面点击“创建任务”，直接粘贴任意 Pawchive 帖子链接，例如：
```text
https://pawchive.pw/fanbox/user/23898386/post/12547592
```
Gopeed 将自动匹配扩展，解析并下载所有文件或打包为 ZIP 压缩包！

## 配置项
在 Gopeed 扩展管理中点击本扩展的“齿轮设置”图标：
- **下载模式**：选择 `打包为单个 ZIP 压缩包` 或 `按文件夹批量独立下载`
- **包含帖子说明文档 (info.txt)**：是否将标题、作者、发布时间与正文说明一同打包保存
- **下载封面原图 (Cover)**：是否包含帖子主图/封面图
- **文件服务器域名**：默认 `file.pawchive.pw`

## 许可证
[MIT License](LICENSE)
