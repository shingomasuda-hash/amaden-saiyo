import Image from "next/image";
import { ExternalIcon } from "./Icons";
import s from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.bar} aria-hidden="true" />

      <div className={s.inner}>
        <div className={s.logoBlock}>
          <Image
            src="/assets/logo/amaden-logo.png"
            alt="Amaden"
            width={316}
            height={84}
            className={s.logoMark}
          />
          <span className={s.logoName}>株式会社Amaden</span>
        </div>

        <address className={s.address}>
          <span className={s.company}>
            株式会社Amaden<span className={s.paren}>（尼崎電機製作所）</span>
          </span>
          <span className={s.line}>
            <span className={s.zip}>〒660-0087</span>
            <span className={s.addr}>兵庫県尼崎市平左衛門町18-26</span>
          </span>
          <span className={s.line}>
            <span className={s.tel}>TEL 06-6481-4455</span>
            <span className={s.slash}>／</span>
            <span className={s.fax}>FAX 06-6481-4456</span>
          </span>
        </address>

        <ul className={s.links}>
          <li>
            <a className={s.link} href="https://www.amaden.co.jp/" target="_blank" rel="noreferrer noopener">
              企業サイトへ
              <ExternalIcon className={s.extIcon} />
            </a>
          </li>
          <li>
            <a className={s.link} href="#entry">プライバシーポリシー</a>
          </li>
          <li>
            <a className={s.link} href="#entry">個人情報保護方針</a>
          </li>
        </ul>
      </div>

      <div className={s.bottomLine} aria-hidden="true" />
    </footer>
  );
}
