import Image from "next/image";
import s from "./Company.module.css";

export default function Company() {
  return (
    <section className={s.section}>
      <Image
        className={s.pc}
        src="/assets/company/company-photo.jpg"
        alt="株式会社Amaden 尼崎電機製作所の外観"
        width={2160}
        height={1040}
        sizes="100vw"
      />
      <Image
        className={s.sp}
        src="/assets/sp/company.jpg"
        alt=""
        width={562}
        height={855}
        sizes="100vw"
      />

      <div className={s.overlay}>
        <h2 className={s.heading}>
          <span className={s.band}>創業約80年</span>
          <span className={s.rest}>地元に根付いた会社です</span>
        </h2>
        <p className={s.body}>
          株式会社Amaden（尼崎電機製作所）は、モーターと電磁コイル専門せ製作所。
          <br />
          廃番品や特殊仕様にも向き合い、工場・設備の安定稼働を支えています。
        </p>
      </div>
    </section>
  );
}
