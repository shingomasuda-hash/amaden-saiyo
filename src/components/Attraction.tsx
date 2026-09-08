import Image from "next/image";
import s from "./Attraction.module.css";

const CARDS = [
  { no: "01", title: "必要とされ続ける仕事", body: "既存のお客様対応を少しずつ担当。見積もり作成も補助します。" },
  { no: "02", title: "技術者と一緒に提案", body: "一人で抱えず、社内に相談しながら進められる。" },
  { no: "03", title: "案件全体に関われる", body: "相談から納品・フォローまで一気通貫の手応え。" },
  { no: "04", title: "会社づくりに関われる", body: "営業体制を作る段階から参加できる。" },
];

export default function Attraction() {
  return (
    <section className={s.section}>
      <div className={s.box}>
        <h2 className={s.heading}>
          <span className={s.lead}>働く</span>
          <span className={s.q} aria-hidden="true">“</span>
          魅力
          <span className={s.q} aria-hidden="true">”</span>
        </h2>

        <ul className={s.cards}>
          {CARDS.map((c, i) => (
            <li key={c.no} className={s.card}>
              <Image
                className={s.pc}
                src={`/assets/charm/charm-0${i + 1}.jpg`}
                alt=""
                width={826}
                height={566}
                sizes="(max-width:768px) 100vw, 413px"
              />
              <Image
                className={s.sp}
                src={`/assets/sp/charm-0${i + 1}.jpg`}
                alt=""
                width={502}
                height={314}
                sizes="100vw"
              />
              <span className={s.no}>{c.no}</span>
              <div className={s.caption}>
                <h3 className={s.title}>{c.title}</h3>
                <p className={s.body}>{c.body}</p>
              </div>
            </li>
          ))}
        </ul>

        <p className={s.note}>
          ※上記の年次はあくまで想定モデルです。
          <br />
          OJT・研修・資格取得支援の体制はありますが、昇給/昇格の具体的な目安・評価制度は確定後に反映します。
        </p>
      </div>
    </section>
  );
}
