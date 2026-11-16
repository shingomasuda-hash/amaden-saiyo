import Image from "next/image";
import s from "./Matching.module.css";

const FIT = [
  "お客様の話を丁寧に聞き、技術者と進められる",
  "ものづくりに興味があり、納期を管理できる",
];

const UNFIT = [
  "個人プレーで進めたい、技術を学びたくない",
  "現場との調整を避け、数字だけを追いたい",
];

export default function Matching() {
  return (
    <section className={s.section}>
      <Image className={s.ring} src="/assets/decoration/mismatch-ring.png" alt="" width={520} height={530} />
      <Image className={s.logo} src="/assets/decoration/mismatch-logo.png" alt="" width={1330} height={290} />

      <div className={s.inner}>
        <h2 className={s.heading}>
          ミスマッチを防ぐため、
          <br className={s.spBr} />
          <span className={s.red}>正直にお伝え</span>します。
        </h2>

        <div className={s.cols}>
          <div className={s.col}>
            <h3 className={s.colTitle}>向いている人</h3>
            <ul className={s.items}>
              {FIT.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div className={s.col}>
            <h3 className={s.colTitle}>向いていない可能性がある人</h3>
            <ul className={`${s.items} ${s.itemsSmall}`}>
              {UNFIT.map((t, i) => (
                <li key={`${t}-${i}`}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
