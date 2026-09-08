import Image from "next/image";
import s from "./Matching.module.css";

const FIT = [
  "お客様の話を、丁寧に聞ける",
  "技術者を尊重し、一緒に進められる",
  "わからないことを、素直に質問できる",
  "納期や進捗を、きちんと管理できる",
  "ものづくりに興味がある",
];

const UNFIT = [
  "個人プレーだけで進めたい",
  "技術を学ぶことに抵抗がある",
  "顧客や現場との調整を避けたい",
  "技術を学ぶことに抵抗がある",
  "売上の数字だけを追いたい",
  "決められた商品だけを売りたい",
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
