import { ArrowUpRight, MailIcon } from "./Icons";
import s from "./StickyCta.module.css";

/**
 * 画面下部に出しっぱなしにする応募導線。
 * 完成デザインには無い追加要素だが、色・文言・アイコンはヘッダーの
 * CTA に揃えている。ステージの zoom の影響を受けないよう、
 * レイアウト上は .stage の外に置く。
 */
export default function StickyCta() {
  return (
    <div className={s.bar}>
      <div className={s.inner}>
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
    </div>
  );
}
