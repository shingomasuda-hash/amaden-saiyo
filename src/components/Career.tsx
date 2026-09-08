import SectionHeading from "./SectionHeading";
import s from "./Career.module.css";

const STEPS = [
  { year: "入社~3ヶ月", yearHead: "入社~", yearNum: "3", yearTail: "ヶ月", title: "会社・事業・\nお客様を知る", body: "工場やモーターの基礎に触れ、まずは全体像を理解します。" },
  { year: "1年目", yearHead: "", yearNum: "1", yearTail: "年目", title: "先輩に同行し、\n窓口を任される", body: "相談から納品・フォローまで、案件全体を管理します。" },
  { year: "2~3年目", yearHead: "", yearNum: "2~3", yearTail: "年目", title: "担当顧客を持ち、\n一件を任される", body: "相談から納品・フォローまで、案件全体を管理します。" },
  { year: "3~5年目", yearHead: "", yearNum: "3~5", yearTail: "年目", title: "難しい案件\n新規提案に挑む", spTitle: "難しい案件、新規提案に挑む", body: "組み化や体制づくりに関与し、チームを牽引する存在に。" },
  { year: "5年目~", yearHead: "", yearNum: "5", yearTail: "年目~", title: "営業を\nつくる側へ", body: "組み化や体制づくりに関与し、チームを牽引する存在に。" },
];

const TINTS = ["#f6e9e0", "#f6d1b6", "#f7b78b", "#f99f61", "#fb7b22"];
const XS = [56.5, 252.5, 447, 641, 835.5, 1023.5];
const YS = [404.7, 355.05, 305.8, 256.7, 207.5, 159.85];
const BOTTOM = 461.5;

export default function Career() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <SectionHeading black="描ける" red="キャリア" />
        <p className={s.lead}>
          いきなり全部は任せません。
          <br />
          年次に応じて、任される範囲が広がっていきます。
        </p>
      </div>

      {/* ---------- PC: 右肩上がりのキャリア図 ---------- */}
      <div className={s.chart}>
        <svg
          className={s.ramp}
          viewBox="0 0 1080 461.5"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {TINTS.map((c, i) => (
            <polygon
              key={c}
              fill={c}
              points={`${XS[i]},${YS[i]} ${XS[i + 1]},${YS[i + 1]} ${XS[i + 1]},${BOTTOM} ${XS[i]},${BOTTOM}`}
            />
          ))}
          <polygon
            fill="#ffffff"
            points="56,413.5 1004,413.5 1023.5,433.25 1004,453 56,453"
          />
        </svg>

        <ul className={s.steps}>
          {STEPS.map((st, i) => (
            <li key={st.year} className={s.step} style={{ ["--i" as string]: i }}>
              <span className={s.stepBar} aria-hidden="true" />
              <h3 className={s.stepTitle}>
                {st.title.split("\n").map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </h3>
              <p className={s.stepBody}>{st.body}</p>
            </li>
          ))}
        </ul>

        <ul className={s.years}>
          {STEPS.map((st, i) => (
            <li key={st.year} className={s.year} style={{ ["--i" as string]: i }}>
              {st.yearHead && <span className={s.yearSm}>{st.yearHead}</span>}
              <span className={s.yearNum}>{st.yearNum}</span>
              <span className={s.yearSm}>{st.yearTail}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ---------- SP: 縦型のキャリア図 ---------- */}
      <ol className={s.spList}>
        {STEPS.map((st) => (
          <li key={st.year} className={s.spItem}>
            <p className={s.spYear}>
              {st.yearHead && <span className={s.yearSm}>{st.yearHead}</span>}
              <span className={s.yearNum}>{st.yearNum}</span>
              <span className={s.yearSm}>{st.yearTail}</span>
            </p>
            <div className={s.spBody}>
              <h3 className={s.spTitle}>{("spTitle" in st ? (st as { spTitle: string }).spTitle : st.title.replace("\n", ""))}</h3>
              <p className={s.spText}>{st.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
