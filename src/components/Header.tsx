import Image from "next/image";
import { ArrowUpRight, MailIcon } from "./Icons";
import s from "./Header.module.css";

export default function Header() {
  return (
    <header className={s.header}>
      <a className={s.logo} href="#top" aria-label="株式会社Amaden">
        <Image
          src="/assets/logo/amaden-logo.png"
          alt="Amaden"
          width={316}
          height={84}
          priority
          className={s.logoMark}
        />
        <span className={s.logoName}>株式会社Amaden</span>
      </a>

      <nav className={s.ctas}>
        <a className={s.visit} href="#entry">
          <span className={s.visitText}>
            <span className={s.visitMain}>まずは会社見学する</span>
            <span className={s.visitSub}>見学だけ／話を聞くだけでも大丈夫です</span>
          </span>
          <span className={s.divider} aria-hidden="true" />
          <ArrowUpRight className={s.arrow} />
        </a>

        <a className={s.apply} href="#entry">
          <MailIcon className={s.mail} />
          <span className={s.applyMain}>応募する</span>
          <span className={s.divider} aria-hidden="true" />
          <ArrowUpRight className={s.arrow} />
        </a>
      </nav>
    </header>
  );
}
