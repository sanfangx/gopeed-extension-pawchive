<div align="center">

# Gopeed Extension: Pawchive Downloader

**用于高速下载并自动打包 Pawchive 帖子的 Gopeed 组件**

[English](README_en.md) | [简体中文](README.md)

[![Gopeed Version](https://img.shields.io/badge/Gopeed-%3E%3D1.6.0-79C476?logo=gopeed)](https://gopeed.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

</div>

---

## 📖 简介

本扩展为 [Gopeed](https://gopeed.com/) 下载器的内置组件，专为 [Pawchive](https://pawchive.pw/) 设计。

输入任意 Pawchive 帖子链接，自动提取帖子内的全部封面、图片、视频与附件，**在内存中直接打包为单个 ZIP 压缩包**下载到本地，也可以按需切换为原速多文件并发下载。

---

## ✨ 特性

- 📦 **自动打包 ZIP（默认）**：内置纯 JS ZIP 引擎，自动把帖子内的所有图片、视频与附件整合为一个 `.zip`，解压不乱码。
- ⚡ **多文件并发模式**：可在设置中随时切换为多文件模式，调用 Gopeed 原生多线程分片并发下载。
- 📝 **自动保存说明**：自动将帖子的标题、发布时间与正文文字保存为 `info.txt` 一并打包。
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
3. 点击新增的 **“载入本地目录”** 按钮，选择本目录即可。

---

## 🚀 使用方法

在 Gopeed 中新建任务，直接粘贴具体的 Pawchive 帖子链接：

```text
https://pawchive.pw/fanbox/user/23898386/post/12547592
```

---

## ⚙️ 设置项

在 Gopeed 扩展列表中点击本组件右侧的 **齿轮图标**：

| 设置项 | 选项/类型 | 默认值 | 说明 |
| :--- | :---: | :---: | :--- |
| **下载模式** | `zip` / `multi` | `zip` | **`zip`**：自动打包为单压缩包；<br>**`multi`**：拆分为多个独立文件并发下载。 |
| **包含说明文档 (info.txt)** | 开关 | 开启 | 是否保存帖子正文说明文字。 |
| **下载封面图** | 开关 | 开启 | 是否下载第一张主图/封面。 |

---

## 📄 许可证

[MIT License](LICENSE)
