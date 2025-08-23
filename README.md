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

| Application | URL | Port |
| --- | --- | --- |
| **Frontend** (Next.js) | http://localhost:3000 | `3001` |
| **Backend** (Rails API) | http://localhost:3001 | `3000` |

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
