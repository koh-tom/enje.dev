# コンテンツの書き方

記事とプロジェクトは `backend/content/` の Markdown が原本。Git に push すれば数分で本番に反映される。

## 記事を書く

```bash
cd backend
bin/rails 'content:new[post,my-first-fpga,FPGA で L チカするまで]'
# => created content/posts/2026-09-15-my-first-fpga.md
```

生成されたファイルを開いてフロントマターと本文を書く。

```markdown
---
title: "FPGA で L チカするまで"
published_at: 2026-09-15
draft: true
tags:
  - FPGA
  - Verilog
excerpt: "開発環境の準備から最初の合成まで。"
cover_image: "/images/posts/my-first-fpga/cover.png"
---

## はじめに

本文。GitHub Flavored Markdown が使える。

```verilog
module blink(input clk, output reg led);
endmodule
```
```

| キー | 必須 | 説明 |
| --- | --- | --- |
| `title` | 必須 | 記事タイトル |
| `published_at` | 任意 | 公開日。省略時はファイル名の日付。未来の日付なら予約投稿になる |
| `draft` | 任意 | `true` の間は本番に出ない。ローカル開発では表示される |
| `tags` | 必須 | 文字列の配列。空配列でもよい。大文字小文字は同一視される |
| `excerpt` | 任意 | 一覧に出る要約。省略時は本文の先頭 160 文字 |
| `cover_image` | 任意 | 一覧と OG 画像に使う画像のパス |

- ファイル名は `YYYY-MM-DD-slug.md`。`slug` が URL（`/blog/my-first-fpga`）になる。**一度公開した slug は変えない**。
- 見出しは `##` から始める（`#` はタイトル用に予約）。`##` と `###` が目次になる。
- 画像は `frontend/public/images/posts/<slug>/` に置き、`/images/posts/<slug>/foo.png` で参照する。
- 読了時間は本文から自動計算される（日本語 500 字/分、英語 200 語/分）。

## プロジェクトを書く

```bash
bin/rails 'content:new[project,my-tool,便利ツール]'
# => created content/projects/02-my-tool.md
```

```markdown
---
name: "便利ツール"
summary: "一行で何をするものか"
period: "2026.04 - 2026.06"
tech_stack:
  - Rust
  - SQLite
github: "https://github.com/koh-tom/my-tool"
demo: ""
cover_image: "/images/projects/my-tool/cover.png"
draft: false
---

## 概要

本文。
```

- ファイル名は `NN-slug.md`。`NN` が一覧の表示順（小さいほど上）。
- `github` `demo` は空文字でよい。空ならリンクを出さない。

## 確認する

```bash
bin/rails content:lint   # フロントマターの検証（CI と同じ）
bin/rails content:sync   # ローカル DB に反映
bun run dev              # http://localhost:3001 で確認（下書きも見える）
```

## 公開する

1. `draft: true` を消す（または `false` にする）。
2. `git add` して `feat: 〇〇の記事を追加` のようにコミットし、push する。
3. CI が `content:lint` を通し、Render のデプロイで `content:sync` が走り、Next.js のキャッシュが破棄される。

すぐに反映したいときは管理 API を直接叩く。

```bash
curl -X POST https://api.enje.dev/api/v1/admin/sync -H "Authorization: Bearer $ADMIN_API_TOKEN"
```

## 取り下げる

- 一時的に隠す: `draft: true` にして push。
- 完全に消す: ファイルを削除して push。DB 上は下書きに戻るだけで物理削除はしない。
