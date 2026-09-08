import Image from "next/image";
import s from "./JobIntro.module.css";

const POINTS = [
  { label: "賞与", main: "年2回", sub: "50年以上継続", subPos: "right" },
  { label: "残業", main: "月20時間", sub: "未満", subPos: "right" },
  { label: "営業", main: "ノルマなし", sub: "", subPos: "right" },
] as const;

export default function JobIntro() {
  return (
    <section className={s.section}>
      <h2 className={s.heading}>
        産業用モーターの整備・修理で、
        <br />
        <span className={s.red}>お客様の生産現場を支える</span>
        <br className={s.spBr} />
        仕事です
      </h2>

      <div className={s.body}>
        <div className={s.photo}>
          <Image
            src="/assets/job/job-photo.jpg"
            alt="工場で打ち合わせをする社員"
            width={1492}
            height={993}
            sizes="(max-width: 768px) 100vw, 746px"
          />
        </div>
        <div className={s.photoSp}>
          <Image src="/assets/sp/job.jpg" alt="" width={563} height={266} sizes="100vw" />
        </div>

        <ul className={s.points}>
          {POINTS.map((p) => (
            <li key={p.label} className={s.point}>
              <span className={s.pointLabel}>{p.label}</span>
              <span className={s.pointMain}>{p.main}</span>
              {p.sub && <span className={s.pointSub}>{p.sub}</span>}
            </li>
          ))}
        </ul>

        <Image
          className={s.coil}
          src="/assets/decoration/coil-job.png"
          alt=""
          width={520}
          height={284}
        />
      </div>
    </section>
  );
}
