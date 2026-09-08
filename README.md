# 株式会社Amaden 営業職（中途）採用LP

Google Drive の完成デザイン（`design/`）を HTML/CSS/JS で再構築した採用ランディングページです。
新規デザインは行っておらず、完成画像をピクセル単位で再現することだけを目的にしています。

## 技術構成

- Next.js 15（App Router）/ React 19 / TypeScript
- CSS Modules（UIライブラリなし）
- フォント：Noto Sans JP（`next/font/google`、400/500/700/900）

## セットアップ

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm run start
```

## ディレクトリ

```
design/                 参照デザイン（正解）と座標系のメモ
public/assets/          完成デザインから切り出した画像素材
  logo/ fv/ job/ want/ interview/ role/ charm/ company/ decoration/
  sp/                   SP専用のトリミング違いの素材
src/app/                layout（SEO/フォント）・page・globals.css
src/components/         セクション単位のコンポーネント
tools/                  デザインと実装を突き合わせるための検証スクリプト
```

## 検証スクリプト（`tools/`）

`npm run start` でサーバーを起動した状態で実行します。
Chromium は環境にプリインストールされたものを直接指定しています。

| スクリプト | 用途 |
| --- | --- |
| `node tools/shot.cjs <出力先>` | PC(1080px/DPR2) と SP(375px/DPR1.4987) のフルページスクリーンショット |
| `node tools/measure.cjs` | PC の各要素の実測値とデザイン実測値の差分表 |
| `node tools/measure-sp.cjs` | SP の同上 |
| `python3 tools/compare.py <作業ディレクトリ>` | デザインと実装を左右に並べた比較画像を生成 |
| `node tools/smoke.cjs` | FAQ開閉・CTAリンク・フォーム3ステップの動作確認 |
| `node tools/overflow.cjs` | 横方向にはみ出す要素の検出 |

## 再現精度（最終）

| | 実装 | デザイン | 差 |
| --- | --- | --- | --- |
| PC 全体高さ | 25186px（@2x） | 25171px | +15px（0.06%） |
| SP 全体高さ | 20732px | 20707px ※Q1閉時に換算 | +25px（0.12%） |

主要ランドマーク（ヘッダー、FV、各セクション見出し、カード、フォーム、フッター等）の
位置ずれは PC で最大 10px 未満、SP で最大 25px 未満です。

## 応募フォームの送信処理

`src/components/EntryForm.tsx` の `submitEntry()` が送信処理の差し替えポイントです。
現状は送信先が未確定のため、環境変数 `NEXT_PUBLIC_ENTRY_ENDPOINT` が設定されている場合のみ
その URL へ JSON を POST し、未設定の場合は送信を行わずに完了画面へ遷移します。
（メールアドレスや外部サービスは一切設定していません）
