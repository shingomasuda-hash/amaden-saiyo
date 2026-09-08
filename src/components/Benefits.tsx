import Image from "next/image";
import SectionHeading from "./SectionHeading";
import s from "./Benefits.module.css";

const CARDS = [
  {
    title: "有給休暇",
    wide: true,
    main: (
      <>
        入社6ヵ月後、<strong>10日付与</strong>
      </>
    ),
    sub: ["最大20日まで付与／1時間単位取得可能／月1~2日取得実績あり"],
  },
  {
    title: "年間休日105日",
    wide: false,
    main: null,
    sub: ["日曜・祝日+土曜（月2回）", "GW・夏季・年末年始休暇"],
  },
  {
    title: "昇給・賞与",
    wide: true,
    main: (
      <>
        <span className="line">
          昇給／<strong>年1回</strong>
        </span>
        <span className="line">
          賞与／<strong>年2回</strong>
          <small>（会社実績・個人成績による／50年以上の継続支給実績）</small>
        </span>
      </>
    ),
    sub: [],
  },
  {
    title: "各種手当",
    wide: false,
    main: null,
    sub: [
      "精勤手当／月額5,000円",
      "生活支援手当／月額5,000円",
      "家族手当／子ども1人につき月額5,000円",
    ],
  },
];

export default function Benefits() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <SectionHeading black="福利" red="厚生" />

        <p className={s.lead}>
          「有給を使いづらい空気」はありません。
          <br />
          少人数だからこそ、誰かが休む時は周りが支える文化があります。
          <br />
          完全週休2日制ではありませんが、業務都合出勤時は
          <span className={s.red}>必ず振替休日</span>を取得。
          <br />
          設備を止められない仕事だからこそ、
          <span className={s.red}>“休む時はきちんと休む”</span>を徹底しています。
        </p>

        <ul className={s.cards}>
          {CARDS.map((c) => (
            <li key={c.title} className={s.card}>
              <span className={`${s.tab} ${c.wide ? s.tabWide : s.tabNarrow}`}>{c.title}</span>
              <div className={s.cardBody}>
                {c.main && <p className={s.cardMain}>{c.main}</p>}
                {c.sub.map((t) => (
                  <p key={t} className={s.cardSub}>
                    {t}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Image
        className={s.coil}
        src="/assets/decoration/coil-benefits.png"
        alt=""
        width={530}
        height={608}
      />
    </section>
  );
}
