<div align="center">

# Gopeed Extension: Pawchive Downloader

**A Gopeed in-app extension to fast download all media and attachments from Pawchive posts.**

[English](README_en.md) | [简体中文](README.md)

[![Gopeed Version](https://img.shields.io/badge/Gopeed-%3E%3D1.5.0-79C476?logo=gopeed)](https://gopeed.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

</div>

---

## 📖 Introduction

An in-app extension for the [Gopeed](https://gopeed.com/) download manager, customized for [Pawchive](https://pawchive.pw/) (and its mirror `pawchive.st`).

Simply paste any Pawchive post URL, and it automatically resolves all original covers, images, videos, and attachments. All files are downloaded concurrently using Gopeed's native multi-connection engine directly into an organized post folder.

---

## ✨ Features

- ⚡ **Native Multi-Threaded Acceleration**: Harnesses Gopeed's core multi-connection concurrent download and chunked resume capabilities.
- 📁 **Dedicated Post Folder**: Automatically creates folders formatted as `[Service] [AuthorUID] PostID - Title`.
- 🔢 **Sequential File Prefixes**: Covers are prefixed with `000_`, while attachments and gallery images follow `001_`, `002_`, etc.
- 🚫 **Clean & Bloat-Free**: No redundant `info.txt` files—only raw original images, videos, and attachments.
- 🌐 **Mirror Support**: Supports both `pawchive.pw` and `pawchive.st`.

---

## 📥 Installation

### Method 1: URL Installation (Recommended)

1. Open Gopeed and navigate to the **Extensions** page.
2. Click the **+** (Install) button in the upper right.
3. Paste the repository URL and confirm:
   ```text
   github.com/sanfangx/gopeed-extension-pawchive
   ```

### Method 2: Load Local Directory

1. Download or clone this repository locally.
2. In Gopeed's Extensions page, **click the "+" (Install) icon 5 times consecutively** to enable Developer Mode.
3. Click the new **"Load Local Directory"** button and select this directory.

---

## 🚀 Usage

Create a new download task in Gopeed and paste any Pawchive post link:

```text
https://pawchive.pw/fanbox/user/23898386/post/12547592
```

Gopeed will parse all post media and organize them into the destination folder.

---

## ⚙️ Settings

Click the gear icon next to the extension in Gopeed to configure:

| Setting | Type | Default | Description |
| :--- | :---: | :---: | :--- |
| **Download Cover Image** | Switch | Enabled | Whether to download the main cover/file (`000_...`). |
| **File Domain** | Text | `file.pawchive.pw` | CDN domain used to fetch images and attachments. |

---

## 📄 License

[MIT License](LICENSE)
