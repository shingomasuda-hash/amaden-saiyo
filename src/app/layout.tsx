import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Roboto } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
  variable: "--font-noto-sans-jp",
});

/**
 * 完成デザインでは「01」「02」のような単独の欧文数字だけ、
 * 和文フォントではなく欧文フォント（「1」に下の横棒が無い形）が
 * 使われている。日本語混じりの「1年目」などは和文フォントのまま。
 * 完成画像の字形と実測比較（IoU）した結果、Roboto Black が最も一致した。
 */
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
  variable: "--font-roboto",
});

const SITE_NAME = "株式会社Amaden";
const TITLE = "営業職（中途）採用｜株式会社Amaden";
const DESCRIPTION =
  "産業用モーターの整備・修理で、お客様の生産現場を支える営業職。営業ノルマなし、賞与年2回（50年以上継続）、残業月30時間未満。モーターの知識は不要です。";

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
 *
 * 拡大率の決め方（PC）
 * - 1080px 未満：収まるように縮小する（= w / 1080）
 * - 1080px 以上：画面幅の FILL（80%）を占める大きさにし、1.0〜MAX(1.3) に収める
 *   画面いっぱいまで引き伸ばさず、左右に余白を残す。
 */
const STAGE_SCALE = `(function(){
  var d = document.documentElement;
  var BASE = 1080, FILL = 0.8, MAX = 1.3;
  function set(){
    var w = d.clientWidth, s;
    if (w <= 768) s = 1;
    else if (w < BASE) s = w / BASE;
    else s = Math.min(Math.max(w * FILL / BASE, 1), MAX);
    d.style.setProperty('--stage-scale', String(s));
  }
  set();
  addEventListener('resize', set, { passive: true });
})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${roboto.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: STAGE_SCALE }} />
        <div className="stage">{children}</div>
      </body>
    </html>
  );
}
