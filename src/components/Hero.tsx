import Image from "next/image";
import s from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={s.hero} id="top">
      <div className={s.orange} aria-hidden="true" />

      <div className={s.photo}>
        <Image
          src="/assets/fv/fv-photo.jpg"
          alt="工場でモーターの前に立つ営業担当者"
          width={2100}
          height={904}
          priority
          sizes="100vw"
        />
      </div>

      <div className={s.photoSp}>
        <Image
          src="/assets/sp/fv.jpg"
          alt=""
          width={533}
          height={860}
          priority
          sizes="100vw"
        />
      </div>

      <h1 className={s.copy}>
        <span className={s.lead}>
          <span className={s.leadBand} aria-hidden="true" />
          <span className={s.leadText}>工場を止めない提案で</span>
        </span>
        <span className={s.big}>
          <span className={s.qOpen} aria-hidden="true">“</span>
          <span className={s.xl1}>技術</span>
          <span className={s.mid1}>と</span>
          <span className={s.xl2}>顧客</span>
          <span className={s.qClose} aria-hidden="true">”</span>
          <span className={s.mid2}>を</span>
          <span className={s.lg}>つなぐ営業を</span>
        </span>
      </h1>

      <Image
        className={s.coil}
        src="/assets/decoration/coil-fv.png"
        alt=""
        width={540}
        height={370}
        priority
      />
    </section>
  );
}
