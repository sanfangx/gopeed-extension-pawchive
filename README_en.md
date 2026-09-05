<div align="center">

# Gopeed Extension: Pawchive Downloader

**A Gopeed extension to parse, download, and automatically package Pawchive creator posts into ZIP archives.**

[English](README_en.md) | [简体中文](README.md)

[![Gopeed Version](https://img.shields.io/badge/Gopeed-%3E%3D1.6.0-79C476?logo=gopeed)](https://gopeed.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/sanfangx/gopeed-extension-pawchive?style=flat&color=yellow)](https://github.com/sanfangx/gopeed-extension-pawchive)

</div>

---

## 📖 Introduction

This extension is an in-app component designed for [Gopeed](https://gopeed.com/). Simply provide any post link from [Pawchive](https://pawchive.pw/), and it will extract all artwork, videos, attachments, and description text, packaging them directly into a single `.zip` file or enabling concurrent multi-thread download.

---

## ✨ Features

- 📦 **Automated ZIP Packaging**: Built-in zero-dependency PKZIP 2.0 engine with full UTF-8 encoding support to prevent messy filenames.
- ⚡ **Native Concurrency**: Switch to multi-file mode anytime to leverage Gopeed's multi-connection acceleration and resume capability.
- 🌐 **Wide Platform Support**: Covers Pixiv Fanbox, Patreon, Fantia, Ci-en, Subscribestar, Boosty, Gumroad, Afdian on Pawchive.
- 📝 **Metadata Archival**: Automatically extracts post title, author, publish date, and content into an `info.txt` file.
- 🛡️ **Inline Media Sniffing**: Inspects content HTML to extract embedded images and streams.

---

## 📥 Installation

### Method 1: URL Installation (Recommended)

1. Open **Gopeed**, go to the **Extensions** tab.
2. Click the **+** (Install) button in the top right corner.
3. Enter the repository URL:
   ```text
   github.com/sanfangx/gopeed-extension-pawchive
   ```
4. Click confirm to install instantly.

### Method 2: Local Developer Mode

1. Clone or download this repository locally.
2. In Gopeed's Extensions page, **click the "+" (Install) button 5 times consecutively** to unlock Developer Mode.
3. Click the newly appeared **"Load Local Directory"** button and select this folder.

---

## 🚀 Usage

Paste any Pawchive post URL in Gopeed's "Create Task" dialog:

```text
https://pawchive.pw/fanbox/user/23898386/post/12547592
```

---

## ⚙️ Configuration

Click the gear icon next to this extension in Gopeed to configure:

| Option | Type | Default | Description |
| :--- | :---: | :---: | :--- |
| **Download Mode** (`packageMode`) | `Select` | `zip` | `zip`: Pack all files into a single `.zip` archive.<br>`multi`: Download files concurrently into a dedicated directory. |
| **Include Info File** (`includeInfo`) | `Boolean` | `true` | Save post content and metadata into `info.txt`. |
| **Include Cover** (`includeCover`) | `Boolean` | `true` | Download main cover image (`000_cover.jpeg`). |
| **File Domain** (`fileDomain`) | `String` | `file.pawchive.pw` | CDN domain for media files. |

---

## 📄 License

Licensed under the [MIT License](LICENSE).
