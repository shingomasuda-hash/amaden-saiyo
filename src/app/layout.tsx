import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
  variable: "--font-noto-sans-jp",
});

const SITE_NAME = "株式会社Amaden（尼崎電機製作所）";
const TITLE = "営業職（中途）採用｜株式会社Amaden";
const DESCRIPTION =
  "産業用モーターの整備・修理で、お客様の生産現場を支える営業職。営業ノルマなし、賞与年2回（50年以上継続）、残業月20時間未満。モーターの知識は不要です。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

/**
 * 完成デザインは 1080px 幅で作られているため、レイアウトは常に 1080px で組み、
 * 画面幅に合わせて全体を等倍で拡大／縮小する（zoom）。
 * これにより、どの画面幅でも完成デザインと同じ比率・同じ構図で表示される。
 * スクロールバーを除いた実寸が必要なので clientWidth を使う。
 */
const STAGE_SCALE = `(function(){
  var d = document.documentElement;
  function set(){
    var w = d.clientWidth;
    d.style.setProperty('--stage-scale', w > 768 ? String(Math.min(w / 1080, 1.8)) : '1');
  }
  set();
  addEventListener('resize', set, { passive: true });
})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: STAGE_SCALE }} />
        <div className="stage">{children}</div>
      </body>
    </html>
  );
}
