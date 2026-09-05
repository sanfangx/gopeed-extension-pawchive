<div align="center">

# Gopeed Extension: Pawchive Downloader

**A Gopeed in-app extension to parse and download Pawchive posts into ZIP archives.**

[English](README_en.md) | [简体中文](README.md)

[![Gopeed Version](https://img.shields.io/badge/Gopeed-%3E%3D1.6.0-79C476?logo=gopeed)](https://gopeed.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

</div>

---

## 📖 Introduction

An in-app extension for [Gopeed](https://gopeed.com/) designed for [Pawchive](https://pawchive.pw/).

Paste any Pawchive post URL, and it automatically extracts all images, videos, and attachments, **packaging them directly into a single ZIP archive** for download, with an option for concurrent multi-file downloads.

---

## ✨ Features

- 📦 **Automated ZIP Packaging (Default)**: Automatically packs all post media and attachments into a clean `.zip` file.
- ⚡ **Multi-File Concurrency**: Easily switch to multi-file mode in settings to utilize Gopeed's multi-threaded acceleration.
- 📝 **Text Archival**: Extracts title, publish date, and post description into `info.txt`.
- 🌐 **Domain Support**: Works with both `pawchive.pw` and `pawchive.st`.

---

## 📥 Installation

### Method 1: URL Installation (Recommended)

1. Open Gopeed and go to the **Extensions** tab.
2. Click the **+** (Install) button in the top right.
3. Paste this repository URL:
   ```text
   github.com/sanfangx/gopeed-extension-pawchive
   ```

### Method 2: Load Local Directory

1. Download or clone this repository locally.
2. In Gopeed's Extensions page, **click the "+" (Install) button 5 times consecutively** to enable Developer Mode.
3. Click **"Load Local Directory"** and select this directory.

---

## 🚀 Usage

Create a new download task in Gopeed and paste any Pawchive post link:

```text
https://pawchive.pw/fanbox/user/23898386/post/12547592
```

---

## ⚙️ Settings

Click the gear icon next to this extension in Gopeed:

| Setting | Type | Default | Description |
| :--- | :---: | :---: | :--- |
| **Download Mode** | `zip` / `multi` | `zip` | **`zip`**: Pack into single `.zip` file.<br>**`multi`**: Download files concurrently. |
| **Include Info File** | Boolean | `true` | Save description text into `info.txt`. |
| **Include Cover** | Boolean | `true` | Download main cover image. |

---

## 📄 License

[MIT License](LICENSE)
