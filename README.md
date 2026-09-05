<div align="center">

# Gopeed Extension: Pawchive Downloader

**用于高速下载与自动打包 Pawchive 创作者帖子的 Gopeed 组件扩展**

[English](README_en.md) | [简体中文](README.md)

[![Gopeed Version](https://img.shields.io/badge/Gopeed-%3E%3D1.6.0-79C476?logo=gopeed)](https://gopeed.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/sanfangx/gopeed-extension-pawchive?style=flat&color=yellow)](https://github.com/sanfangx/gopeed-extension-pawchive)

</div>

---

## 📖 简介

本扩展为 [Gopeed](https://gopeed.com/) 下载器的原生组件扩展，专为 [Pawchive](https://pawchive.pw/) 平台设计。只需输入任意帖子链接，即可自动解析其全部内容（包括封面原图、多图画集、视频、工程源文件等全部附件），并支持**直接在内存中打包为单个 ZIP 压缩包**交付 Gopeed，或**多线程并发批量下载**。

---

## ✨ 核心特性

- 📦 **自动 ZIP 打包**：内置零依赖的纯 JS PKZIP 2.0 打包器，支持 UTF-8 文件名编码，解压绝无乱码，一键获取整理好的单压缩包。
- ⚡ **原生并发加速**：可随时切换为多文件并发模式，利用 Gopeed 强大的分片下载引擎，支持断点续传与大文件高速拉取。
- 🌐 **全平台站点兼容**：完美支持 Pawchive 归档的 Pixiv Fanbox、Patreon、Fantia、Ci-en、Subscribestar、Boosty、Gumroad、Afdian 等。
- 📝 **正文信息归档**：自动清洗并生成 `info.txt`，完整留存帖子标题、发布时间、创作者及图文说明。
- 🛡️ **深层内嵌嗅探**：除独立附件外，智能提取正文 HTML 中内嵌的所有图片与多媒体直链。

---

## 📥 安装指南

### 方法一：URL 一键安装（推荐）

1. 打开 **Gopeed**，进入左侧 **“扩展”** 页面。
2. 点击右上角 **“+”**（安装）按钮。
3. 在弹出的输入框中填入本仓库地址并确认：
   ```text
   github.com/sanfangx/gopeed-extension-pawchive
   ```
4. Gopeed 将自动拉取并完成热安装，开箱即用。

### 方法二：本地开发者模式载入

1. 克隆或下载本仓库至本地文件夹。
2. 在 Gopeed 扩展页面，**连续快速点击右上角“+”（安装）图标 5 次**激活开发者模式。
3. 点击新增的 **“载入本地目录”** 按钮，选择本工程目录即可。

---

## 🚀 使用方法

在 Gopeed 中新建下载任务，直接粘贴具体的帖子 URL 即可：

```text
https://pawchive.pw/fanbox/user/23898386/post/12547592
```

### 支持的链接格式示例

| 平台类型 | 示例链接格式 |
| :--- | :--- |
| **Pixiv Fanbox** | `https://pawchive.pw/fanbox/user/{uid}/post/{pid}` |
| **Patreon** | `https://pawchive.pw/patreon/user/{uid}/post/{pid}` |
| **Fantia** | `https://pawchive.pw/fantia/user/{uid}/post/{pid}` |
| **Ci-en** | `https://pawchive.pw/ci-en/user/{uid}/post/{pid}` |
| **通用镜像站** | `https://pawchive.st/{service}/user/{uid}/post/{pid}` |

---

## ⚙️ 配置说明

在 Gopeed 扩展管理页面点击本组件右侧的 **设置**（齿轮图标），可根据实际需求调整：

| 配置项 | 类型 | 默认值 | 作用说明 |
| :--- | :---: | :---: | :--- |
| **下载模式** (`packageMode`) | `选项` | `zip` | **`zip`**：自动打包为单文件压缩包；<br>**`multi`**：拆解为独立文件多线程并发下载（适合超大视频）。 |
| **包含帖子说明文档** (`includeInfo`) | `布尔` | `true` | 是否生成并打包 `info.txt` 正文描述文件。 |
| **下载封面原图** (`includeCover`) | `布尔` | `true` | 是否下载主文件/封面图（`000_cover.jpeg`）。 |
| **文件服务器域名** (`fileDomain`) | `文本` | `file.pawchive.pw` | 媒体资源拉取服务器，若镜像站发生变更可自定义。 |

---

## 💡 常见问题 (FAQ)

<details>
<summary><b>Q: 什么时候应该使用「多文件并发模式」？</b></summary>

当帖子内包含单个体积非常大（例如数百 MB 或 GB 级别的 4K 视频、无损动画）的文件时，若使用 ZIP 模式，需将全部数据暂存于内存中再落盘，耗费较多运行内存。此时建议在设置中切换为 **`按文件夹批量独立下载`**，直接利用 Gopeed 的分块多协程断点续传。
</details>

<details>
<summary><b>Q: 为什么某些帖子解析失败？</b></summary>

1. 请检查输入的链接是否为具体的帖子详情页（需包含 `/post/{id}`），而非作者主页列表。
2. 检查网络与目标站点连通性，必要时可在 Gopeed 中配置网络代理。
</details>

---

## 📄 许可证

本项目基于 [MIT License](LICENSE) 协议开源。
