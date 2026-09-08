import Image from "next/image";
import s from "./WantedSection.module.css";

const WANTS = [
  "お客様の話を丁寧に聞き、課題を整理できる方",
  "技術者と協力して、案件を前に進められる方",
  "ものづくり・機械・設備に関心がある方",
  "顧客と長く付き合う関係づくりが得意な方",
];

export default function WantedSection() {
  return (
    <section className={s.section}>
      <Image
        className={s.coilSp}
        src="/assets/sp/coil-top.png"
        alt=""
        width={239}
        height={160}
      />
      <h2 className={s.lead}>
        あなたの<span className={s.red}>営業経験</span>が、
        <br className={s.spBr} />
        そのまま強みに
      </h2>
      <p className={s.subLead}>技術と依頼はある。届ける営業が足りない</p>
      <p className={s.body}>
        モーター整備の技術も、お客様からの相談もあります。けれど営業は、社長ともう一名だけ。
        <br />
        単なる増員ではなく、Amadenの次の成長をつくる営業を迎えます。
      </p>

      <div className={s.wantHead}>
        <span className={s.wantBadge}>求む!</span>
        <span className={s.wantTitle}>こんな方と働きたい</span>
      </div>

      <div className={s.stage}>
        <span className={`${s.quote} ${s.quoteOpen}`} aria-hidden="true">“</span>
        <span className={`${s.quote} ${s.quoteClose}`} aria-hidden="true">”</span>

        <div className={s.orange} aria-hidden="true" />
        <div className={s.orangeSpA} aria-hidden="true" />
        <div className={s.orangeSpB} aria-hidden="true" />

        <div className={`${s.photo} ${s.photoLeft}`}>
          <Image src="/assets/want/want-left.jpg" alt="" width={482} height={702} sizes="241px" />
        </div>
        <div className={`${s.photo} ${s.photoRight}`}>
          <Image src="/assets/want/want-right.jpg" alt="" width={482} height={702} sizes="241px" />
        </div>

        <div className={`${s.photoSp} ${s.photoSpLeft}`}>
          <Image src="/assets/sp/want-left.jpg" alt="" width={245} height={317} sizes="162px" />
        </div>
        <div className={`${s.photoSp} ${s.photoSpRight}`}>
          <Image src="/assets/sp/want-right.jpg" alt="" width={206} height={277} sizes="136px" />
        </div>

        <ul className={s.bars}>
          {WANTS.map((w) => (
            <li key={w} className={s.bar}>
              {w}
            </li>
          ))}
        </ul>
      </div>

      <p className={s.outro}>
        関係構築・ヒアリング・調整力・納期管理・提案・見積もり・折衝、今までの営業経験が、そのまま強みに。
        <br />
        モーターの知識は不要です。入社後、技術者と一緒に現場で学べます。
      </p>
    </section>
  );
}
