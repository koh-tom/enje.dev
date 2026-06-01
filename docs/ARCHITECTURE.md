# アーキテクチャ

## 全体像

```
[ブラウザ] ── HTTPS ──> [Next.js (Vercel)] ── HTTPS ──> [Rails API (Render)] ──> [PostgreSQL]
                              │                               ▲
                              └── revalidateTag ◀── Webhook ──┘
```

- Next.js はサーバーコンポーネントから Rails API を呼び、ISR でキャッシュする。
- ブラウザから Rails を直接叩かない。CORS は開発用途に限定する。
- Rails は記事・プロジェクト・タグ・お問い合わせを扱う JSON API に徹する。
- コンテンツの原本は `backend/content/` の Markdown。`rake content:sync` で DB に冪等反映する。

## ディレクトリ構成（目標）

```
enje.dev/
├── .github/workflows/      # CI（FE / BE を paths でジョブ分割）
├── docs/                   # 本ドキュメント群
├── frontend/
│   └── src/
│       ├── app/            # ルーティングとページのみ。データ取得は lib へ委譲
│       ├── components/
│       │   ├── ui/         # 汎用部品（Button, Tag, Rule, Frame…）
│       │   └── <feature>/  # 機能単位（blog, portfolio, gallery, contact）
│       ├── lib/
│       │   ├── api/        # Rails クライアント。zod でレスポンス検証
│       │   ├── env.ts      # 環境変数の検証
│       │   ├── markdown.ts # Markdown → HTML（サーバー側）
│       │   └── seo.ts      # metadata / JSON-LD の生成
│       ├── types/          # API 契約から導出した型
│       └── styles/         # globals.css とトークン
└── backend/
    ├── app/
    │   ├── controllers/api/v1/
    │   ├── models/
    │   ├── serializers/    # Alba
    │   ├── services/       # ContentSync, ReadingTime, Revalidate
    │   └── mailers/
    ├── content/posts/      # 記事 Markdown（原本）
    ├── content/projects/   # プロジェクト YAML（原本）
    └── lib/tasks/content.rake
```

## API 契約（v1）

ベースパス `/api/v1`。全レスポンスは `application/json`。

| Method | Path | 認証 | 説明 |
| --- | --- | --- | --- |
| GET | `/posts` | 不要 | 公開済み記事一覧。`?tag=slug&page=1&per=20` |
| GET | `/posts/:slug` | 不要 | 記事詳細 |
| GET | `/tags` | 不要 | タグ一覧（記事数付き） |
| GET | `/projects` | 不要 | プロジェクト一覧 |
| GET | `/projects/:slug` | 不要 | プロジェクト詳細 |
| POST | `/contacts` | 不要（レート制限） | お問い合わせ送信 |
| POST | `/admin/revalidate` | Bearer | FE の ISR キャッシュを破棄 |
| GET | `/up` | 不要 | ヘルスチェック |

- 作成・更新・削除の管理系エンドポイントは持たない。コンテンツは Markdown → `content:sync` で反映する。
- ID ではなく `slug` で参照する。URL は `/blog/rrt-star` のようになる。
- 一覧は `{ data: [...], meta: { page, per, total } }`、詳細は `{ data: {...} }` で包む。
- エラーは `{ error: { code, message } }`。404 は `not_found`、422 は `invalid`、429 は `rate_limited`。

### Post

```json
{
  "slug": "rrt-star",
  "title": "RRT* アルゴリズムを理解する",
  "excerpt": "先頭 160 文字",
  "body_html": "<p>…</p>",
  "published_at": "2025-10-06",
  "updated_at": "2025-10-07T12:00:00Z",
  "reading_time": 5,
  "cover_image": "/images/posts/rrt-star.png",
  "tags": [{ "slug": "algorithm", "name": "Algorithm" }]
}
```

- `body_html` は Rails 側で Markdown を HTML に変換し、サニタイズ済みで返す。FE は `react-markdown` を持たない。
- `reading_time` は保存時に本文から自動計算する。

### Project

```json
{
  "slug": "enje-dev",
  "name": "enje.dev",
  "summary": "一行説明",
  "body_html": "<p>…</p>",
  "period": "2025.08 -",
  "tech_stack": ["Next.js", "Rails"],
  "links": { "github": "https://…", "demo": "https://…" },
  "cover_image": "/images/projects/enje-dev.png",
  "position": 1
}
```

## キャッシュ戦略

- FE の fetch は `next: { tags: ["posts"] }` のようにタグ付けし、`revalidate` は 1 時間。
- Rails の `content:sync` 完了時に `POST /api/v1/admin/revalidate` 相当の処理として、FE の `/api/revalidate` を `REVALIDATE_SECRET` 付きで呼ぶ。
- Rails 側も `fresh_when` で ETag を返し、`Cache-Control: public, s-maxage=60, stale-while-revalidate=600` を付ける。

## 環境変数

| 名前 | 場所 | 用途 |
| --- | --- | --- |
| `API_URL` | FE | Rails のベース URL（`https://api.enje.dev/api/v1`） |
| `NEXT_PUBLIC_SITE_URL` | FE | 正規 URL（`https://enje.dev`） |
| `REVALIDATE_SECRET` | FE / BE | ISR 再検証の共有秘密 |
| `DATABASE_URL` | BE | PostgreSQL |
| `ADMIN_API_TOKEN` | BE | 管理系エンドポイント |
| `CONTACT_TO` | BE | お問い合わせ送信先 |
| `RESEND_API_KEY` | BE | メール送信 |
| `CORS_ORIGINS` | BE | 追加許可オリジン（開発用） |

`.env.example` を FE / BE 双方に置き、起動時に zod / `ENV.fetch` で必須を検証する。

## デプロイ

- FE: Vercel。`output: "standalone"` は Docker 用に残すが Vercel では不要。
- BE: Render の Docker デプロイ。`bin/docker-entrypoint` で `db:prepare` と `content:sync` を実行。
- DB: Render PostgreSQL。日次バックアップを有効化。
