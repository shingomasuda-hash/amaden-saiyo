"use client";

import { useState } from "react";
import s from "./Faq.module.css";

const QA = [
  {
    q: "モーターの知識がなくても応募できますか？",
    a: "はい。多くの社員が知識ゼロから始めています。入社後、技術者に同行しながら実機で学べます。",
  },
  {
    q: "製造業での営業経験は必要ですか？",
    a: "必須ではありません。法人営業のヒアリング力・提案力・関係構築力があれば、業界はこれから覚えていけます。",
  },
  {
    q: "営業も工場作業を行いますか？",
    a: "現場や実機の確認で技術者と動くことはありますが、整備・修理そのものは技術者が担当します。",
  },
  {
    q: "営業ノルマはありますか？",
    a: "ノルマはありません。数字だけを追うより、お客様の課題解決と関係づくりを大切にする営業です。",
  },
  {
    q: "担当エリア・出張は？",
    a: "お客様は関西を中心とした製造業です。現場訪問はありますが、転勤はありません。",
  },
  {
    q: "車で通勤できますか？",
    a: "はい。車・バイク・自転車での通勤が可能で、駐車場もあります。阪神武庫川駅からは武庫川工業団地の専用バス（約10分）も利用できます。",
  },
  {
    q: "会社見学だけでも可能ですか？",
    a: "もちろんです。「見学だけ」「話を聞くだけ」から、現場を見て判断していただけます。",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number[]>([]);

  const toggle = (i: number) =>
    setOpen((prev) => (prev.includes(i) ? prev.filter((v) => v !== i) : [...prev, i]));

  return (
    <section className={s.section}>
      <div className={s.inner}>
        <h2 className={s.heading}>
          <span className={s.headText}>
            よくある<span className={s.red}>質問</span>
          </span>
          <span className={s.line} aria-hidden="true" />
        </h2>

        <ul className={s.list}>
          {QA.map((item, i) => {
            const isOpen = open.includes(i);
            return (
              <li key={item.q} className={s.item}>
                <button
                  type="button"
                  className={s.question}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-button-${i}`}
                  onClick={() => toggle(i)}
                >
                  <span className={s.mark}>Q</span>
                  <span className={s.qText}>{item.q}</span>
                  <span className={`${s.tri} ${s.triDown}`} aria-hidden="true" />
                </button>

                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${i}`}
                  className={`${s.panel} ${isOpen ? s.panelOpen : ""}`}
                >
                  <div className={s.panelInner}>
                    <div className={s.panelRow}>
                      <span className={s.aMark}>A</span>
                      <p className={s.aText}>{item.a}</p>
                      <button
                        type="button"
                        className={`${s.tri} ${s.triUp}`}
                        aria-label="閉じる"
                        onClick={() => toggle(i)}
                      />
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
