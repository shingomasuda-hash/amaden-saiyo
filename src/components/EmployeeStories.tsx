import Image from "next/image";
import { ArrowUpRight } from "./Icons";
import s from "./EmployeeStories.module.css";

export default function EmployeeStories() {
  return (
    <section className={s.section}>
      <div className={s.headBlock}>
        <h2 className={s.headText}>社員ストーリー</h2>
      </div>

      <Image
        className={s.coil}
        src="/assets/decoration/coil-story.png"
        alt=""
        width={570}
        height={480}
      />

      {/* ---- Interview 01 ---- */}
      <article className={`${s.itv} ${s.itv1}`}>
        <div className={s.photo1}>
          <Image src="/assets/interview/interview-01.jpg" alt="" width={1078} height={528} sizes="(max-width:768px) 100vw, 539px" />
          <div className={s.photoSp1}>
            <Image src="/assets/sp/interview-01.jpg" alt="" width={545} height={232} sizes="100vw" />
          </div>
          <div className={s.meta}>
            <span className={s.metaName}>Interview 01</span>
            <span className={s.metaRole}>営業部（元技術部）31歳・入社2年目</span>
          </div>
        </div>

        <h3 className={`${s.bars} ${s.bars1}`}>
          <span className={s.bar}>「技術」と「営業」</span>
          <span className={s.bar}>両方を経験して見えたこと</span>
        </h3>

        <p className={s.text}>
          工業高校出身で、経験を活かせると思い応募。
          <br />
          社長とざっくばらんに話す中で「良い雰囲気の会社だ」と感じ入社を決めました。
          <br />
          　1年目は技術部でモータ整備の基本を学び、いまは営業部でお客様対応と工程管理を担当。
          <br />
          現場では技術部と一緒に作業することもあります。
          <br />
          　短期の整備案件では、打ち合わせから納品まで一通りを担当し、無事に終えたとき「任されている」と実感します。
          <br />
          資格手当があり、頑張りが給料につながるのでモチベーション高く取り組めています。
        </p>
      </article>

      {/* ---- Interview 02 ---- */}
      <article className={`${s.itv} ${s.itv2}`}>
        <div className={s.photo2}>
          <Image src="/assets/interview/interview-02.jpg" alt="" width={1026} height={572} sizes="(max-width:768px) 100vw, 513px" />
          <div className={s.photoSp2}>
            <Image src="/assets/sp/interview-02.jpg" alt="" width={542} height={270} sizes="100vw" />
          </div>
          <div className={s.meta}>
            <span className={s.metaName}>Interview 02</span>
            <span className={s.metaRole}>モーターメンテナンス技術者・43歳・入社15年</span>
          </div>
        </div>

        <h3 className={`${s.bars} ${s.bars2}`}>
          <span className={s.bar}>どうしたの？の一言で、</span>
          <span className={s.bar}>人が集まる、その「温かみ」</span>
        </h3>

        <p className={s.text}>
          入社前は「モータのメンテナンス」と聞いてもイメージが湧かず不安でしたが、実際はやりがいがあり、知っていく楽しさがありました。
          <br />
          いまは整備の実務に加え、技術員の指導やお客様との折衝も担当。
          <br />
          技術的な問題にぶつかっても、上司の一言から人が集まり、みんなで協議して解決していく風土があります。
          <br />
          お客様の「本当に助かりました、ありがとう！」という言葉が、何よりのモチベーション。これからは管理職として、人材育成に力を入れていきたいですね。
        </p>
      </article>

      <a className={s.moreBtn} href="#entry">
        <span>社員のストーリーをすべて見る</span>
        <span className={s.divider} aria-hidden="true" />
        <ArrowUpRight className={s.arrow} />
      </a>
    </section>
  );
}
