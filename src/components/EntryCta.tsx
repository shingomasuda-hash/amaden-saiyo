import { ArrowUpRight, MailIcon } from "./Icons";
import s from "./EntryCta.module.css";

export default function EntryCta() {
  return (
    <section className={s.section}>
      <span className={s.bgText} aria-hidden="true">ENTRY</span>

      <p className={s.heading}>
        <span className={s.quote} aria-hidden="true">“</span>
        お気軽にご応募ください
        <span className={s.quote} aria-hidden="true">”</span>
      </p>

      <div className={s.buttons}>
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
      </div>
    </section>
  );
}
