# enje.dev

ポートフォリオ兼技術ブログ。Next.js のフロントエンドと Rails API のバックエンドを Bun + Turborepo のモノレポで管理している。

設計方針・規約・作業計画は [`docs/`](docs/) にまとめている。

| ドキュメント | 内容 |
| --- | --- |
| [docs/ROADMAP.md](docs/ROADMAP.md) | 作業計画と進捗 |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | 構成と API 契約 |
| [docs/DESIGN.md](docs/DESIGN.md) | デザインシステム |
| [docs/CONVENTIONS.md](docs/CONVENTIONS.md) | コーディング規約 |
| [docs/CONTENT.md](docs/CONTENT.md) | 記事・プロジェクトの書き方 |

## 技術スタック

| 領域 | 採用 |
| --- | --- |
| Frontend | Next.js 16 (App Router) / React 19 / TypeScript / Tailwind CSS v4 / Biome / Vitest / Playwright |
| Backend | Ruby 3.4 / Rails 8.1 (API モード) / PostgreSQL / Alba / kramdown + rouge |
| ツール | Bun / Turborepo / husky + commitlint / GitHub Actions |
| ホスティング | Vercel (frontend) / Render (backend, PostgreSQL) |

## セットアップ

前提: Bun 1.3 以上、Ruby（`backend/.ruby-version` 参照）、Docker。

```bash
bun install                      # JS 依存関係
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
bun run db:up                    # PostgreSQL を docker compose で起動（localhost:5433）
cd backend && bundle install && bin/rails db:prepare && cd ..
```

## 開発

```bash
bun run dev        # frontend (3001) と backend (3000) を同時起動
bun run check      # frontend の lint
bun run typecheck  # frontend の型検査
bun run test       # 各ワークスペースのテスト
bun run db:down    # PostgreSQL を停止
```

Frontend 単体:

```bash
cd frontend
bun run test:e2e      # Playwright（初回は bunx playwright install chromium）
bun run check:design  # 禁止クラスの検出（docs/DESIGN.md）
bun run mock:api      # Rails なしで動かすモック API
```

プロフィール文や写真ギャラリーの中身は `frontend/src/content/` を編集する。

Backend 単体:

```bash
cd backend
bin/rails test
bin/rubocop
bin/brakeman
bin/rails content:lint   # Markdown の検証
bin/rails content:sync   # Markdown を DB に反映
```

記事を書くときは [docs/CONTENT.md](docs/CONTENT.md) を参照。

## ディレクトリ

```
.
├── .github/workflows/   # CI（frontend / backend を変更パスでジョブ分割）
├── docs/                # 設計・規約・ロードマップ
├── frontend/            # Next.js
│   └── src/{app,components,content,lib,styles,types}
├── backend/             # Rails API
│   ├── app/
│   ├── config/
│   ├── db/
│   └── content/         # 記事・プロジェクトの Markdown（原本）
├── docker-compose.yml   # 開発用 PostgreSQL
├── turbo.json
└── package.json
```

## コミット

メッセージは `type: 短い一文` の 1 行。type は `feat` `fix` `refactor` `docs` `chore` `test` `ci` `style` `perf`。commit-msg フックで commitlint が検査し、pre-commit フックで biome と rubocop がステージ済みファイルを検査する。
