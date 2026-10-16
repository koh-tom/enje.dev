---
name: "minOS"
summary: "QEMU の RISC-V 32-bit 上で動く小さな OS。"
period: "2025.07 - 2026.01"
tech_stack:
  - C
  - RISC-V
  - QEMU
github: "https://github.com/koh-tom/minOS"
demo: ""
cover_image: ""
draft: false
---

## 概要

RISC-V 32-bit（QEMU `virt`）向けの自作 OS。Sv32 ページング、タイマー割り込みによるプリエンプティブなマルチタスク、システムコール、VirtIO（GPU / Blk / Input）ドライバ、tar ファイルシステムと対話シェルを持つ。
