# enje.dev

## 技術スタック

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Libraries**:
  - [Framer Motion](https://www.framer.com/motion/) (Animations)
  - [Three.js](https://threejs.org/) / React Three Fiber (3D Graphics)
  - [Radix UI](https://www.radix-ui.com/) (Headless Components)

### Backend
- **Framework**: [Ruby on Rails 8](https://rubyonrails.org/) (API Mode)
- **Database**: PostgreSQL
- **Language**: Ruby 3.2+

### Tool
- **Monorepo Manager**: [Turborepo](https://turbo.build/)
- **Package Manager**: [Bun](https://bun.sh/)


## 環境構築

### 前提条件
- **Bun**
- **Ruby**
- **PostgreSQL**

### インストール & セットアップ

1. **依存パッケージのインストール**
   ```bash
   bun install
   ```

2. **データベースのセットアップ**
   ```bash
   cd backend
   bin/rails db:create db:migrate db:seed
   cd ..
   ```


## 開発サーバー起動

```bash
bun run dev
```

| Application             | URL                   | Port   |
| ----------------------- | --------------------- | ------ |
| **Frontend** (Next.js)  | http://localhost:3001 | `3001` |
| **Backend** (Rails API) | http://localhost:3000 | `3000` |

## 開発コマンド

### 基本コマンド（ルートから実行）

| コマンド        | 説明                                       |
| --------------- | ------------------------------------------ |
| `bun run dev`   | 開発サーバー起動 (frontend + backend 同時) |
| `bun run build` | 本番用ビルド                               |
| `bun run lint`  | リント実行 (frontend + backend)            |
| `bun run cz`    | Commitizen でコミット作成                  |

### Frontend (Biome)

```bash
cd frontend

# リント
bun run lint              # コードチェック

# フォーマット
bun run format            # 自動フォーマット

# 安全な自動修正（未使用import削除など）
bunx biome check --write

# 安全でない修正も含めて自動修正
bunx biome check --write --unsafe
```

### Backend (RuboCop)

```bash
cd backend

# リント
bundle exec rubocop       # コードチェック

# 自動修正
bundle exec rubocop -a    # 安全な自動修正
bundle exec rubocop -A    # 全ての自動修正（aggressive）
```


## ディレクトリ構造

```
enje.dev/
├── frontend/             # Next.js アプリケーション
│   ├── src/
│   │   ├── app/        # App Router ページ
│   │   ├── components/ # React コンポーネント
│   │   └── lib/        # ユーティリティ関数
│   └── ...
├── backend/              # Ruby on Rails API アプリケーション
│   ├── app/
│   ├── config/
│   ├── db/
│   └── content/         # ブログ記事のMarkdownファイル
├── package.json          # ルートパッケージ設定 (Turborepo Workspaces)
└── turbo.json            # Turborepo パイプライン設定
```

## 主な機能

- **インタラクティブUI**: Magnetic Buttons, Three.js
- **ブログシステム**: Markdownベースの記事管理、RailsによるAPI提供
- **ポートフォリオ**: プロジェクト紹介機能・技術記事投稿
- **ギャラリー**: 写真ギャラリー機能
- **ダークモード**: Next-themesによるテーマ切り替え
