import Image from "next/image";
import s from "./SalesRole.module.css";

const ROLES = [
  { no: "01", title: "顧客の状況を聞く", body: "不具合・現場状況をヒアリング。納期・予算・優先度を整理", img: "/assets/role/role-01.jpg", sp: "/assets/sp/role-01.jpg" },
  { no: "02", title: "顧客と技術者をつなぐ", body: "技術者と修理方針を検討 。提案・見積もりを届ける", img: "", sp: "" },
  { no: "03", title: "納期・工程・案件を動かす", body: "工程調整と進捗共有。納品・フォローで関係を深める", img: "/assets/role/role-03.jpg", sp: "/assets/sp/role-03.jpg" },
];

export default function SalesRole() {
  return (
    <section className={s.section}>
      <h2 className={s.heading}>
        製品を売る
        <br className={s.spBr} />
        営業ではありません。
        <br />
        役割は、<span className={s.red}>大きく3つ</span>です。
      </h2>

      <ul className={s.list}>
        {ROLES.map((r) => (
          <li key={r.no} className={s.item}>
            <span className={s.no}>{r.no}</span>
            <div className={s.visual}>
              {r.img ? (
                <>
                  <Image className={s.pc} src={r.img} alt="" width={640} height={426} sizes="(max-width:768px) 100vw, 320px" />
                  <Image className={s.sp} src={r.sp} alt="" width={502} height={336} sizes="100vw" />
                </>
              ) : (
                <>
                  <Image className={s.pc} src="/assets/role/role-02-diagram.png" alt="顧客・営業・技術者の関係図" width={634} height={450} sizes="(max-width:768px) 100vw, 317px" />
                  <Image className={s.sp} src="/assets/sp/role-02-diagram.png" alt="" width={502} height={432} sizes="100vw" />
                </>
              )}
            </div>
            <h3 className={s.title}>{r.title}</h3>
            <p className={s.body}>{r.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
