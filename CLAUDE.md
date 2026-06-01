# CLAUDE.md

enje.dev のポートフォリオブログ。Bun + Turborepo のモノレポで、`frontend`（Next.js App Router）と `backend`（Rails API）を持つ。

詳細な方針は `docs/` を正とする。

- `docs/ROADMAP.md` 作業計画と進捗
- `docs/ARCHITECTURE.md` 目標アーキテクチャと API 契約
- `docs/DESIGN.md` デザインシステム（手書き風・Tottenham カラー）
- `docs/CONVENTIONS.md` FE / BE / DB のコーディング規約

## 作業ルール

- 中身（記事本文、プロフィール文、実績など）はオーナーが手動で書く。AI は骨組み・仕組み・品質を担当する。
- 変更は小さく分け、1 コミット 1 目的。
- 動作確認は `bun run check` と `bun run test`（各ワークスペース）を通してから。
- 既存のダミーデータやフォールバックを「それっぽく埋める」ことはしない。空状態は空状態として設計する。

## コミットルール

- メッセージは `type: 短い一文` の 1 行のみ。本文・フッター・絵文字・スコープは付けない。
  - 例: `feat: 記事一覧にタグ絞り込みを追加`
  - type は `feat` `fix` `refactor` `docs` `chore` `test` `ci` `style` `perf` のいずれか
- `Co-Authored-By` などのトレーラーは付けない。
- 日付は `docs/ROADMAP.md` の割当に従い、`GIT_AUTHOR_DATE` と `GIT_COMMITTER_DATE` を同じ値で指定する。
- 1 日に 1〜4 コミット、連続しすぎず途切れすぎず散らす。

## デザインルール（要約）

- グラデーション、box-shadow、角丸、ぼかし、パララックス、3D は使わない。
- 色は Tottenham の navy `#132257` と white `#FFFFFF` を軸にする。詳細は `docs/DESIGN.md`。
- 罫線は 1〜2px の実線。手書きの紙とペンのような質感を目指す。
- アニメーションは意味のあるものだけ。`prefers-reduced-motion` を必ず尊重する。

## コマンド

```bash
bun install                 # 依存関係
bun run dev                 # FE(3001) + BE(3000)
bun run check               # FE lint（biome）
bun run format              # FE format
cd backend && bin/rails test && bin/rubocop
```
