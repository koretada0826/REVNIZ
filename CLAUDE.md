# Sponsor Connect - CLAUDE.md

## Project Overview
レブナイズスポンサー企業同士をつなぐ会員制ビジネスマッチングプラットフォーム。
スポンサー企業間の接点を設計・促進・可視化するビジネスインフラ。

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3
- **Animation**: Lottie (`@lottiefiles/dotlottie-react`)
- **Font**: Space Grotesk (角ばったフォント / Google Fonts)
- **Icons**: Lucide React
- **UI**: Custom component library (Card UI中心)

## Design Principles
- 信頼感・上質感のあるビジネス向けデザイン
- AIらしいデザインは禁止（グラデーション多用、ネオンカラー、未来的すぎるUIは避ける）
- カードUI中心、一覧性重視
- テキストの可読性を高める
- 行動ボタンを明確にする
- SNSっぽすぎるデザインを避ける

## Color Palette
- Primary: #1A1A2E (深紺 - 信頼感)
- Secondary: #C4A35A (ゴールド - 上質感)
- Accent: #2D5016 (深緑 - 鹿児島の自然)
- Background: #FAFAF8 (温かみのあるホワイト)
- Surface: #FFFFFF
- Text: #1A1A1A
- Muted: #6B7280

## Font
- Headings: Space Grotesk (700, 600)
- Body: Space Grotesk (400, 500)
- 日本語フォールバック: "Noto Sans JP", sans-serif

## Directory Structure
```
src/
  app/                    # Next.js App Router pages
    (auth)/               # 認証関連ページ
      login/
    (dashboard)/          # ログイン後のページ
      page.tsx            # ダッシュボード
      companies/          # 企業一覧・詳細
      matching/           # マッチングおすすめ
      board/              # 相談掲示板
      meeting/            # 面談依頼
      events/             # イベント
      profile/            # 自社プロフィール編集
      news/               # お知らせ
      cases/              # 成功事例
    layout.tsx
    globals.css
  components/
    ui/                   # 共通UIコンポーネント
    layout/               # Header, Sidebar, Footer
    lottie/               # Lottieアニメーション
  lib/                    # ユーティリティ
  types/                  # TypeScript型定義
  data/                   # モックデータ
public/
  lottie/                 # Lottieファイル
  images/
```

## Pages (MVP)
1. ログインページ (`/login`)
2. ダッシュボード (`/`)
3. スポンサー企業一覧 (`/companies`)
4. 企業詳細 (`/companies/[id]`)
5. マッチングおすすめ (`/matching`)
6. 相談掲示板 (`/board`)
7. 面談依頼 (`/meeting`)
8. イベント一覧 (`/events`)
9. プロフィール編集 (`/profile`)
10. お知らせ (`/news`)
11. 成功事例 (`/cases`)

## Commands
- `npm run dev` - 開発サーバー起動
- `npm run build` - ビルド
- `npm run lint` - Lint実行

## Important Notes
- PC最優先、モバイル対応
- 会員制サイト（招待制）
- 運営が火をつける設計が必須
- 放置感のないアクティブなUI
