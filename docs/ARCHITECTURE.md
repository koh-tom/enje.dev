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
- コンテンツの原本は `backend/content/` の Markdown。`bin/rails content:sync` で DB に冪等反映する。書き方は `docs/CONTENT.md`。

## ディレクトリ構成（目標）

```
enje.dev/
├── .github/workflows/      # CI（FE / BE を paths でジョブ分割）
├── docs/                   # 本ドキュメント群
├── frontend/
│   ├── e2e/                # Playwright スモーク
│   ├── scripts/            # mock-api.ts（CI / E2E 用）, check-design.sh
│   └── src/
│       ├── app/            # ルーティングとページのみ。データ取得は lib へ委譲
│       │   └── api/revalidate/  # Rails からの ISR 再検証を受ける
│       ├── components/
│       │   ├── ui/         # 汎用部品（Button, Tag, Rule, Frame, Field, Icon…）
│       │   ├── layout/     # Header, Footer, ThemeToggle
│       │   └── <feature>/  # home, blog, portfolio, about, gallery, contact
│       ├── content/        # オーナーが編集する中身（profile.ts, gallery.ts）
│       ├── lib/
│       │   ├── api/        # Rails クライアント。zod でレスポンス検証
│       │   ├── actions/    # Server Action（お問い合わせ）
│       │   ├── og/         # OG 画像の描画と同梱フォント
│       │   ├── env.ts      # 環境変数の検証
│       │   ├── seo.ts      # metadata / JSON-LD の生成
│       │   └── site.ts     # ナビと SNS リンク
│       ├── types/          # API 契約から導出した zod スキーマと型
│       └── styles/         # globals.css（トークン、prose、highlight）
└── backend/
    ├── app/
    │   ├── controllers/api/v1/   # 公開 API と admin/
    │   ├── models/               # Post, Tag, Project, Contact（フォームオブジェクト）
    │   ├── resources/            # Alba シリアライザ
    │   ├── services/             # MarkdownRenderer, ReadingTime, ContentFile, ContentSync, Revalidator
    │   └── mailers/
    ├── content/posts/            # 記事 Markdown（原本）
    ├── content/projects/         # プロジェクト Markdown（原本）
    └── lib/tasks/content.rake    # content:new / lint / sync
```

## API 契約（v1）

ベースパス `/api/v1`。全レスポンスは `application/json`。

| Method | Path | 認証 | 説明 |
| --- | --- | --- | --- |
| GET | `/posts` | 不要 | 公開済み記事一覧。`?tag=slug&page=1&per=20` |
| GET | `/posts/:slug` | 不要 | 記事詳細 |
| GET | `/tags` | 不要 | 公開記事を持つタグ一覧（記事数付き） |
| GET | `/projects` | 不要 | プロジェクト一覧（`position` 順） |
| GET | `/projects/:slug` | 不要 | プロジェクト詳細 |
| POST | `/contacts` | 不要（1 時間 5 回 / IP） | お問い合わせ送信。202 を返す |
| POST | `/admin/revalidate` | Bearer | FE の ISR キャッシュを破棄。`{ "tags": ["posts"] }` |
| POST | `/admin/sync` | Bearer | `content/` を DB に反映してキャッシュを破棄 |
| GET | `/up` | 不要 | ヘルスチェック |

- 作成・更新・削除の管理系エンドポイントは持たない。コンテンツは Markdown → `content:sync` で反映する。
- ID ではなく `slug` で参照する。URL は `/blog/rrt-star` のようになる。
- 一覧は `{ data: [...], meta: { page, per, total, total_pages } }`、詳細は `{ data: {...} }` で包む。
- エラーは `{ error: { code, message, details? } }`。`not_found` `invalid` `unauthorized` `rate_limited`。
- 公開 API は `Cache-Control: public, max-age=60, s-maxage=60, stale-while-revalidate=600`。詳細は ETag も返す。
- 開発環境（`RAILS_ENV=development`）では下書きも返る。
- レート制限は Rack::Attack。本番の呼び出し元は Next.js のサーバーなので、FE は全リクエストに `X-Frontend-Secret`、お問い合わせには利用者の IP を `X-Client-IP` で付ける。秘密が一致したときだけ BE は `X-Client-IP` で数え、読み取りの制限（120 回/分）からも外す。

### Post（一覧）

```json
{
  "slug": "rrt-star",
  "title": "RRT* アルゴリズムを理解する",
  "excerpt": "先頭 160 文字",
  "reading_time": 5,
  "cover_image": "/images/posts/rrt-star/cover.png",
  "status": "published",
  "published_at": "2025-10-06T00:00:00+09:00",
  "updated_at": "2025-10-07T12:00:00+09:00",
  "tags": [{ "slug": "algorithm", "name": "Algorithm" }]
}
```

### Post（詳細）

一覧の項目に加えて次を返す。

```json
{
  "body_html": "<h2 id=\"概要\">概要</h2><p>…</p>",
  "toc": [{ "id": "概要", "level": 2, "text": "概要" }],
  "previous_post": { "slug": "older", "title": "古い記事" },
  "next_post": null
}
```

- `body_html` は Rails 側で kramdown（GFM）+ rouge で HTML 化し、サニタイズ済み。FE は `react-markdown` を持たない。
- コードブロックは `<div class="language-ruby highlighter-rouge"><pre class="highlight"><code>` で包まれ、トークンは `class` 付き `<span>`。

### Tag

```json
{ "slug": "ruby", "name": "Ruby", "posts_count": 3 }
```

### Project

```json
{
  "slug": "enje-dev",
  "name": "enje.dev",
  "summary": "一行説明",
  "period": "2025.08 -",
  "tech_stack": ["Next.js", "Rails"],
  "links": { "github": "https://…", "demo": "https://…" },
  "cover_image": "/images/projects/enje-dev/cover.png",
  "position": 1,
  "status": "published",
  "updated_at": "…"
}
```

詳細では `body_html` が加わる。

### Contact（リクエスト）

```json
{ "contact": { "name": "…", "email": "…", "subject": "…", "message": "…", "website": "" } }
```

`website` は honeypot。値が入っていれば 422。

## キャッシュ戦略

- FE の fetch は `next: { tags: ["posts"] }` のようにタグ付けし、`revalidate` は 1 時間。
- Rails の `admin/sync` 完了時に `Revalidator` が FE の `/api/revalidate` を `x-revalidate-secret` 付きで呼ぶ。デプロイ時の `content:sync` は entrypoint から実行され、FE 側は次回アクセスの ISR で追いつく。
- Rails 側は `stale?` で ETag を返し、`Cache-Control: public, max-age=60, s-maxage=60, stale-while-revalidate=600` を付ける。

## 環境変数

| 名前 | 場所 | 用途 |
| --- | --- | --- |
| `API_URL` | FE | Rails のベース URL（`https://api.enje.dev/api/v1`） |
| `NEXT_PUBLIC_SITE_URL` | FE | 正規 URL（`https://enje.dev`） |
| `REVALIDATE_SECRET` | FE / BE | FE と BE の共有秘密。ISR 再検証と、FE から BE への `X-Frontend-Secret` に使う |
| `DATABASE_URL` | BE | PostgreSQL |
| `ADMIN_API_TOKEN` | BE | 管理系エンドポイント |
| `CONTACT_TO` | BE | お問い合わせ送信先。`RESEND_API_KEY` と揃うまで `/contacts` は 503 |
| `MAIL_FROM` | BE | 送信元（既定 `enje.dev <noreply@enje.dev>`） |
| `RESEND_API_KEY` | BE | メール送信。未設定でも起動はする |
| `SECRET_KEY_BASE` | BE | 本番のみ必須 |
| `CORS_ORIGINS` | BE | 追加許可オリジン（開発用） |

`.env.example` を FE / BE 双方に置き、起動時に zod / `ENV.fetch` で必須を検証する。

## デプロイ

- FE: Vercel。`output: "standalone"` は Docker 用に残すが Vercel では不要。セキュリティヘッダー（CSP など）は `next.config.ts`。
- BE: Render の Docker デプロイ。`bin/docker-entrypoint` で `db:prepare` と `content:sync` を実行。Solid Queue は `SOLID_QUEUE_IN_PUMA=1` で Puma 内に同居。
- DB: Render PostgreSQL 1 つ。Solid Queue / Solid Cache のテーブルも同じ DB に置く。日次バックアップを有効化。
