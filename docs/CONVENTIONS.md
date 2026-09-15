# コーディング規約

## 共通

- 言語: コメントとドキュメントは日本語。識別子は英語。
- 1 ファイル 1 責務。200 行を超えたら分割を検討する。
- 「とりあえず動く」フォールバックを書かない。失敗は失敗として扱い、UI で空状態やエラーを出す。
- 秘密情報はコミットしない。`.env.example` にキー名だけ書く。
- 依存は増やす前に「標準機能で足りないか」を確認する。

## Frontend

### 構成

- `app/` にはルーティング、`page.tsx`、`layout.tsx`、`generateMetadata` だけを置く。データ取得は `lib/api/` の関数を呼ぶ。
- サーバーコンポーネントを既定とし、`"use client"` は状態やイベントが必要な末端だけに付ける。
- 型は `types/` に置き、コンポーネントから `export interface` しない。
- `lib/api/` の各関数は `fetch` → `zod.parse` → 型付きで返す。検証に失敗したら例外を投げ、呼び出し側で `notFound()` や空状態に振り分ける。

### スタイル

- Tailwind v4 を使う。色は `styles/globals.css` のトークン（`paper` `ink` `ink-soft` `rule` `mark`）経由でのみ指定する。既定パレットは `@theme` で無効化してあるので `text-gray-400` は効かない。
- 禁止クラス: `rounded-*`、`shadow-*`、`bg-gradient-*`、`blur-*`、`backdrop-blur-*`、`text-[#xxxxxx]`。`bun run check:design` で grep して CI で落とす。
- 記事本文のスタイルは `.prose-hand`、コードは rouge のクラスに対する `.highlight` 指定。どちらも `globals.css` にある。

### コンポーネント

- Props は `type XxxProps = {...}` で先頭に定義する。
- `key` に配列 index を使わない。
- 画像は `next/image`。`width` / `height` または `fill` + `sizes` を必ず指定する。
- アニメーションは CSS transition のみ。アニメーションライブラリは入れない。`prefers-reduced-motion` は `globals.css` で一括して止める。
- アイコンは `components/ui/Icon.tsx` に線画 SVG を追加する。アイコンライブラリは入れない。
- オーナーが編集する中身は `src/content/`（`profile.ts` `gallery.ts`）に置く。コンポーネントに文章を直書きしない。

### メタデータと SEO

- 各ページの `metadata` は `lib/seo.ts` の `buildMetadata()` を通す。タイトルは `%s | enje.dev` テンプレートに従う。
- JSON-LD は `lib/seo.ts` の `jsonLd()` で `</script>` をエスケープしてから埋め込む。
- OG 画像は `opengraph-image.tsx` の動的生成に統一し、`metadata.openGraph.images` を手書きしない。

### テスト

- 単体: Vitest。`lib/` を優先して書く（`bun run test`）。
- E2E: Playwright。`scripts/mock-api.ts` を API の代わりに立て、ビルドした Next.js に対してスモークを流す（`bun run test:e2e`、初回は `bunx playwright install chromium`）。
- API の契約を変えたら `scripts/fixtures/api.ts` も更新する。

## Backend

### 構成

- コントローラは `Api::V1::` 名前空間。`ApplicationController` に `rescue_from` で 404 / 422 を JSON 化する。
- ビジネスロジックはモデルか `app/services/` に置く。コントローラは 10 行以内を目安にする。
- シリアライザは Alba。`as_json` の手書きはしない。
- 認証は `ActiveSupport::SecurityUtils.secure_compare` を使う。環境変数未設定時は起動時に `config/initializers/required_env.rb` で落とす。
- `config/initializers/*.rb` から `app/` 配下のクラス（モデル、メイラーなど）を参照しない。Zeitwerk のオートロードが確実に効く保証がなく、条件分岐の奥で一度も実行されないパス（例: `if Rails.env.production?`）は開発・テストでは通らずに検証をすり抜ける。判定には `ENV` を直接見るか、`Rails.application.config.to_prepare` に包む。

### モデル

- バリデーションと DB 制約を両方書く。`presence: true` には `null: false`、`uniqueness` には unique index。
- `slug` は `title` から自動生成し、変更不可にする（URL の安定性）。
- 公開状態は `published_at` の有無で判定し、`scope :published` を通してのみ取得する。

### Markdown

- 変換は `kramdown` + `rouge`（シンタックスハイライト）。出力は `Rails::HTML5::SafeListSanitizer` を通す。
- `content:sync` は `slug` をキーに upsert し、削除された Markdown は `unpublish` する（物理削除しない）。

### テスト

- Minitest。フィクスチャは実際のスキーマと一致させる。
- 各エンドポイントに request テスト、各モデルにバリデーションテスト。
- `bin/rails test` と `bin/rubocop` と `bin/brakeman` が CI で必須。

## Database

- マイグレーションは `strong_migrations` の指摘に従う。本番で `add_index` は `algorithm: :concurrently`。
- カラム追加は `null: false` + `default` か、後追いでバックフィルしてから制約を付ける。
- 外部キーは必ず `foreign_key: true`。中間テーブルは複合 unique index。
- `schema.rb` はコミットする。本番で `dump_schema_after_migration` は false のまま。
- 不要になった機能のテーブル（cable / cache / queue のうち使わないもの）は作らない。

## Git

- ブランチは `main` のみ。機能ごとに小さく直接コミットする。
- コミットメッセージは `CLAUDE.md` の規約に従う。
- 日付を遡って付ける場合は `docs/ROADMAP.md` の割当表を更新してから行う。
