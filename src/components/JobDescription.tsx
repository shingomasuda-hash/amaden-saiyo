import s from "./JobDescription.module.css";

const ROWS: { label: string; body: React.ReactNode }[] = [
  { label: "職種名", body: "営業（技術提案・案件管理型／中途）※商材を問わず営業経験者を優遇" },
  { label: "雇用形態", body: "正社員（雇用期間の定めなし・長期）" },
  {
    label: "仕事内容",
    body: "モーター・コイルのメンテナンスサービスを、設備保全のご担当者へ提案。相談対応・状況整理・技術者連携・見積・工程管理・納品・フォローまで担当。",
  },
  {
    label: "応募条件\n（必須）",
    body: "営業経験（商材不問）／36歳以下（長期キャリア形成のため）／普通自動車免許／簡単なExcel・Word。業界未経験・第二新卒・ブランクOK、女性歓迎。",
  },
  {
    label: "給与・想定年収",
    body: (
      <>
        月給28万円〜＋諸手当＋時間外手当
        <br />
        想定年収：380万〜500万円（固定給＋インセンティブ＋達成報奨金）
        <br />
        ※経験・能力・実績を考慮し優遇。賞与年2回（会社実績・個人成績による）、昇給年1回。
      </>
    ),
  },
  { label: "営業ノルマ", body: "なし。数字を追うより、お客様の課題解決と関係づくりを重視します。" },
  { label: "試用期間", body: "あり（最長6ヶ月）" },
  {
    label: "勤務時間・残業",
    body: "8:30〜17:30（休憩105分）／残業 月20時間未満（会社全体で月10〜20時間程度）",
  },
  { label: "勤務地", body: "兵庫県尼崎市平左衛門町18-26（転勤なし）" },
  {
    label: "選考フロー",
    body: (
      <>
        応募 → 書類選考 → 面接（2回まで）→ 採用決定（面接から2週間以内を予定）
        <br />
        会社見学・カジュアル面談から始めることも可能です。
      </>
    ),
  },
];

export default function JobDescription() {
  return (
    <section className={s.section}>
      <div className={s.card}>
        <h2 className={s.heading}>
          募集要項・<span className={s.red}>営業職（中途）</span>
        </h2>
        <p className={s.lead}>
          正式な求人票の内容に基づく募集条件です。営業ノルマはありません。
          <br />
          ※上記は求人票に基づく待遇です。手当の詳細などは面談時にご案内します。
        </p>

        <dl className={s.table}>
          {ROWS.map((r) => (
            <div key={r.label} className={s.row}>
              <dt className={s.label}>
                {r.label.split("\n").map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </dt>
              <dd className={s.value}>{r.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
