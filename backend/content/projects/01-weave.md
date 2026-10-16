---
name: "WEAVE"
summary: "配信・イベント向けの、WebAssembly で拡張を隔離するリアルタイムイベント基盤。"
period: "2026.03 - 2026.06"
tech_stack:
  - Zig
  - WebAssembly
  - TypeScript
  - Svelte
github: "https://github.com/koh-tom/WEAVE"
demo: ""
cover_image: ""
draft: false
---

## 概要

チャットやシーン切替などのイベントをすべて中央の EventBus に通し、サードパーティの拡張は WebAssembly のサンドボックスで Capability-based Security のもと安全に実行する「ストリーミング OS」。
