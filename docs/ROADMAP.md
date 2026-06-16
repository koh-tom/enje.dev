# ロードマップ

目的: enje.dev を「中身を書けば完成するポートフォリオブログ」の状態にする。中身（記事、プロフィール文、実績、写真）はオーナーが後から手で入れる。ここでは骨組み・仕組み・品質・デザインだけを扱う。

進捗は各項目のチェックボックスで管理する。完了したらコミットハッシュを末尾に書く。

## 現状の問題点（着手前の棚卸し）

### リポジトリ / CI
- [x] `backend/.github/` にある CI はリポジトリ直下でないため一度も動いていない
- [x] Dependabot も同様に無効
- [x] `backend/Booting` `backend/Rails` `backend/Run` は空ファイルのゴミ
- [x] `frontend/Dockerfile` が npm と `package-lock.json` 前提でビルド不能
- [x] `.env.example` がなく、必要な環境変数が README にも書かれていない
- [x] `turbo.json` に typecheck / test タスクがない
- [x] pre-commit フックがなく、lint を通さずにコミットできる

### Backend
- [ ] テストが通らない（`posts.yml` に削除済み `tags` カラム、認証ヘッダー未送信、`ADMIN_API_TOKEN` 未設定で KeyError）
- [ ] `index` が `limit` しか見ていないのに FE は `_sort` `_order` `_limit` を送っている
- [ ] ID ベースの URL（`/blog/3`）で、記事の差し替えに弱い
- [ ] 下書き / 公開の区別がなく、`published_at` が未来でも返る
- [ ] DB 制約がほぼない（`null: false` も unique index もない）
- [ ] `seeds.rb` が `destroy_all` してから作り直すため、本番で使えない
- [ ] `active_model_serializers` 0.10 はメンテナンス停止
- [ ] `rails/all` で不要なフレームワーク（Action Cable, Active Storage など）を読み込んでいる
- [ ] トークン比較が `==` でタイミング攻撃に弱い
- [ ] `RecordNotFound` が JSON でなく HTML 500 になる経路がある
- [ ] Markdown を生のまま返し、FE 側で毎回パースしている

### Frontend
- [ ] API 失敗時にダミー記事・ダミープロジェクトを表示してしまう
- [ ] 4.5 秒固定のローディング画面が LCP を壊している
- [ ] Three.js、framer-motion、react-masonry-css、react-icons と lucide の二重持ちなど依存が重い
- [ ] `metadata.openGraph.images` が存在しない `/images/og-image.png` を指している
- [ ] 記事ページのタイトルが「My Portfolio」のままでテンプレートと不整合
- [ ] ギャラリーの表示切替ボタンが何も切り替えない
- [ ] 型定義がコンポーネントから export されている
- [ ] お問い合わせフォームが `console.log` のみ
- [ ] テストが 1 つもない
- [ ] `debug-*` ページが本番ビルドに含まれる

## 編集体験（日常運用の要件）

記事とプロジェクトは日常的に追加・修正する。管理画面や外部 CMS は持たず、**Git がコンテンツの原本**という運用にする。理由は、オーナーが Neovim / VSCode で書く人であること、認証付き管理画面を持たないことで攻撃面が減ること、履歴と差分が Git で残ることの 3 点。

1. `bin/rails content:new post "タイトル"` でフロントマター付きの Markdown が `backend/content/posts/YYYY-MM-DD-slug.md` に生成される（プロジェクトは `content:new project`）。
2. `draft: true` の間は本番に出ない。ローカルの `bun run dev` では下書きも表示される。
3. 画像は `frontend/public/images/posts/<slug>/` に置き、Markdown からは `/images/posts/<slug>/foo.png` で参照する。
4. `git push` すると CI がフロントマターと Markdown を検証し、デプロイ時に `content:sync` が DB へ冪等反映、完了後に FE の ISR キャッシュを破棄する。数分で本番に反映される。
5. 手元で本番同等の見た目を確認したいときは `bun run dev` のみ（Rails と Postgres は docker compose で自動起動）。

## スタック更新方針

| 領域 | 現状 | 目標 |
| --- | --- | --- |
| Ruby / Rails | 3.2.8 / 8.0 | 3.4 / 8.1 |
| Next.js / React | 15.5 / 19.1 | 16 / 19.3 |
| Tailwind / Biome | 4 / 2.2 | 4.3 / 2.5 |
| シリアライザ | active_model_serializers | Alba |
| Markdown | FE で react-markdown | BE で kramdown + rouge、サニタイズ済み HTML を返す |
| テスト | なし（FE）/ 壊れている（BE） | Vitest + Playwright / Minitest |
| コミット支援 | commitizen + git-cz | commitlint のみ（1 行メッセージ） |

## フェーズ

### Phase 0: 計画（6/1）
- [x] `CLAUDE.md` と `docs/` の作成 `ca767ec`

### Phase 1: 土台の整理（6/2 〜 6/20）
- [x] 空ファイルと未使用ファイルの削除（`Booting` `Rails` `Run`、`next.svg` `vercel.svg` `window.svg`）
- [x] CI をリポジトリ直下 `.github/workflows/` へ移動し、FE / BE をジョブ分割
- [x] Dependabot をリポジトリ直下へ移動し、bun / bundler / actions を対象にする
- [x] `.env.example` を FE / BE に追加
- [x] `docker-compose.yml` で開発用 PostgreSQL を用意
- [x] `turbo.json` に `typecheck` `test` を追加
- [x] husky pre-commit で biome と rubocop を staged ファイルに実行
- [x] `frontend/Dockerfile` を Bun 前提に書き直す
- [x] commitizen / git-cz を削除し、commitlint 設定をリポジトリ直下へ移動
- [ ] ルート README を現状に合わせて書き直す

### Phase 2: Backend の再設計（6/21 〜 7/18）
- [ ] Ruby 3.4 / Rails 8.1 へ更新
- [ ] `config/application.rb` を `rails/all` から必要なフレームワークだけに絞る
- [ ] 不要 gem の削除（`image_processing` `mini_magick` `solid_cable` `active_model_serializers`）と Alba / `rouge` / `strong_migrations` / `alba` の追加
- [ ] `Api::V1` 名前空間と `ApplicationController` の `rescue_from`
- [ ] 必須環境変数を起動時に検証する initializer
- [ ] `secure_compare` による認証
- [ ] マイグレーション: `posts.slug` `posts.excerpt` `posts.body_html` `posts.status`、`tags.slug`、`projects.slug` `projects.position` `projects.summary`、`null: false`、unique index、複合 index
- [ ] `Post` に `published` スコープ、slug 自動生成、reading_time 自動計算
- [ ] Markdown → HTML 変換サービス（kramdown + rouge + sanitize）
- [ ] `content:sync` rake タスク（Markdown / YAML から冪等 upsert）と `seeds.rb` の縮小
- [ ] `content:new` 生成タスクと `content:lint` 検証タスク（CI で実行）
- [ ] `draft` フロントマターと開発環境でのみ下書きを返す仕組み
- [ ] Alba シリアライザ（Post / Tag / Project）
- [ ] 一覧 API のページネーションとタグ絞り込み
- [ ] `fresh_when` と `Cache-Control` の付与
- [ ] `POST /api/v1/contacts` と Mailer（Resend）
- [ ] FE 再検証を呼ぶ `Revalidate` サービス
- [ ] フィクスチャとテストの全面書き直し（request / model）
- [ ] rack-attack のルールを新パスに合わせる

### Phase 3: Frontend の基盤（7/19 〜 8/12）
- [ ] Next.js 16 / React 19.3 / Tailwind 4.3 / Biome 2.5 へ更新
- [ ] `lib/env.ts` で環境変数を zod 検証
- [ ] `lib/api/` クライアント（posts / projects / tags / contact）と zod スキーマ
- [ ] `types/` へ型を集約
- [ ] `lib/seo.ts`（`buildMetadata` / `jsonLd`）
- [ ] フォールバックデータの全削除と空状態コンポーネント
- [ ] Three.js / react-masonry-css / react-markdown / react-icons の削除
- [ ] `next/font` で Zen Kurenaido / Caveat / JetBrains Mono を読み込む
- [ ] `globals.css` をトークンベースに置き換え（paper / ink / rule / mark）
- [ ] 禁止クラス検出スクリプト `check:design`
- [ ] お問い合わせを Server Action 経由で BE に送る（honeypot 付き）
- [ ] `app/api/revalidate` ルート
- [ ] `debug-*` ページの削除（Storybook 的な確認は `/dev` 配下を `NODE_ENV` で除外）
- [ ] Vitest + Testing Library の導入と `lib/` のテスト
- [ ] Playwright のスモークテスト
- [ ] CSP などセキュリティヘッダーを `next.config.ts` に追加

### Phase 4: デザイン刷新（8/13 〜 9/6）
- [ ] `components/ui/` の手書き部品（Button / Tag / Rule / Frame / Input / EmptyState）
- [ ] ヘッダーとフッター
- [ ] トップページ（自己紹介、最近の記事、プロジェクト、スキル表）
- [ ] 記事一覧（検索、タグ絞り込み、ページネーション）
- [ ] 記事詳細（目次、コードブロック、前後記事）
- [ ] プロジェクト一覧と詳細
- [ ] ギャラリー（表示切替を実際に動かす、Lightbox は自前の `<dialog>`）
- [ ] About ページ
- [ ] お問い合わせページ
- [ ] 404 / error ページ
- [ ] ダークモード（紙とインクの反転）
- [ ] OG 画像を新デザインに合わせる

### Phase 5: 仕上げ（9/7 〜 9/14）
- [ ] アクセシビリティ監査（axe、キーボード操作、reduced-motion）
- [ ] Lighthouse で Performance / A11y / SEO を 95 以上
- [ ] 未使用コード・依存の最終削除
- [ ] `docs/` を実装に合わせて更新
- [ ] README の最終化

## コミット日付の割当

1 日あたり 1〜4 コミット。平日中心、週末は少なめにしてコントリビューショングラフが自然に見えるようにする。実際に使った日付はこの表に記録する。

| フェーズ | 期間 | 目安コミット数 | 稼働日の目安 |
| --- | --- | --- | --- |
| 0 | 6/1 | 1 | 6/1 |
| 1 | 6/2 〜 6/20 | 9 | 6/2, 6/3, 6/5, 6/8, 6/10, 6/13, 6/16, 6/19 |
| 2 | 6/21 〜 7/18 | 16 | 6/22, 6/24, 6/26, 6/29, 7/1, 7/3, 7/6, 7/8, 7/10, 7/13, 7/15, 7/17 |
| 3 | 7/19 〜 8/12 | 15 | 7/20, 7/22, 7/24, 7/27, 7/29, 8/1, 8/3, 8/5, 8/7, 8/10, 8/12 |
| 4 | 8/13 〜 9/6 | 12 | 8/14, 8/17, 8/19, 8/21, 8/24, 8/26, 8/28, 8/31, 9/2, 9/4 |
| 5 | 9/7 〜 9/14 | 5 | 9/7, 9/9, 9/11, 9/14 |

コミット時は次の形式で日付を指定する。

```bash
d="2026-06-02T21:14:00+09:00"
GIT_AUTHOR_DATE="$d" GIT_COMMITTER_DATE="$d" git commit -m "chore: 空ファイルを削除"
```

時刻は 19:00〜24:00 の範囲でばらつかせる。

## 使用ログ

| 日付 | コミット | 内容 |
| --- | --- | --- |
| 2026-06-01 | `ca767ec` | docs: 設計方針とロードマップを追加 |
| 2026-06-02 | `cb9c3ca` | docs: 編集体験とスタック更新方針を追記 |
| 2026-06-02 | `563b013` | chore: 空ファイルと未使用アセットを削除 |
| 2026-06-03 | `099cefa` | chore: commitizen を削除し commitlint をルートに移動 |
| 2026-06-03 | `483f132` | ci: GitHub Actions と Dependabot をリポジトリ直下へ移動 |
| 2026-06-05 | `0b34cdb` | chore: 環境変数のテンプレートを追加 |
| 2026-06-08 | `551a4e4` | chore: 開発用 PostgreSQL を docker compose で用意 |
| 2026-06-10 | `9b13286` | chore: turbo に typecheck と test を追加 |
| 2026-06-13 | `f6cf94c` | chore: pre-commit で biome と rubocop を実行 |
| 2026-06-16 | | chore: frontend の Dockerfile を Bun 対応に書き直し |
