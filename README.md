<div align="center">

# Gopeed Extension: Pawchive Downloader

**用于高速下载 Pawchive 帖子全部媒体与附件的 Gopeed 扩展组件**

[English](README_en.md) | [简体中文](README.md)

[![Gopeed Version](https://img.shields.io/badge/Gopeed-%3E%3D1.5.0-79C476?logo=gopeed)](https://gopeed.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

</div>

---

## 📖 简介

本扩展为 [Gopeed](https://gopeed.com/) 下载器的内置组件，专为 [Pawchive](https://pawchive.pw/)（包含其镜像站 `pawchive.st`）设计。

输入任意 Pawchive 帖子链接，自动解析出帖子内的全部封面原图、插图、视频与附件，直接利用 Gopeed 的原生多线程分片并发下载引擎批量保存至以帖子命名的独立文件夹中。

---

## ✨ 特性

- ⚡ **原生多线程并发加速**：充分发挥 Gopeed 核心下载引擎的多连接并发能力与断点续传特性，告别单线程与内存瓶颈。
- 📁 **自动建立专属画集文件夹**：自动以 `[平台] [作者UID] 帖子ID - 标题` 命名任务文件夹，下载即分类。
- 🔢 **智能序列编号**：封面统一编号为 `000_...`，正文插图与附件依次编号（`001_...`、`002_...`），保持画集阅读顺序。
- 🚫 **纯净无冗余**：不生成多余的 `info.txt`，只保存纯净的原画、视频与原版附件。
- 🌐 **域名自适应**：同时支持 `pawchive.pw` 与 `pawchive.st`。

---

## 📥 安装方法

### 方式一：URL 一键安装（推荐）

1. 打开 Gopeed 客户端，进入左侧 **“扩展”** 页面。
2. 点击右上角 **“+”**（安装）按钮。
3. 粘贴本仓库链接并确认：
   ```text
   github.com/sanfangx/gopeed-extension-pawchive
   ```

### 方式二：本地目录载入

1. 下载或克隆本仓库到本地。
2. 在 Gopeed 扩展页面，**连续快速点击右上角“+”（安装）图标 5 次**激活开发者模式。
3. 点击新增的 **“载入本地目录”** 按钮，选择本项目所在目录即可。

---

## 🚀 使用方法

在 Gopeed 中新建任务，直接粘贴具体的 Pawchive 帖子链接：

```text
https://pawchive.pw/fanbox/user/23898386/post/12547592
```

Gopeed 会自动解析该帖子下的全部媒体，并在下载目录中生成对应的画集文件夹。

---

## ⚙️ 设置项

在 Gopeed 扩展列表中点击本组件右侧的 **齿轮图标** 可进行个性化配置：

| 设置项 | 类型 | 默认值 | 说明 |
| :--- | :---: | :---: | :--- |
| **下载封面原图 (Cover)** | 开关 | 开启 | 是否下载第一张主图/封面（通常编号为 `000_`）。 |
| **文件服务器域名** | 文本 | `file.pawchive.pw` | 用于拉取图片与附件的 CDN 域名。 |

---

## 📄 许可证

[MIT License](LICENSE)
