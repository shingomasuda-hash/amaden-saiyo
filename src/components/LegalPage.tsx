import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import s from "./LegalPage.module.css";

export type Block =
  | { heading: string; body: string }
  | { heading: string; body?: string; list: string[] };

type Props = {
  title: string;
  lead: string;
  blocks: Block[];
  /** 制定日・改定日など、本文のあとに出す補足 */
  meta: string[];
};

/**
 * プライバシーポリシー / 個人情報保護方針で共通の体裁。
 * LP 本体のステージ（zoom）とは別に、素直な可変幅で組む。
 */
export default function LegalPage({ title, lead, blocks, meta }: Props) {
  return (
    <>
      <Header />
      <main className={s.main}>
        <h1 className={s.title}>{title}</h1>
        <div className={s.titleBar} aria-hidden="true" />

        <p className={s.lead}>{lead}</p>

        {blocks.map((b) => (
          <section key={b.heading} className={s.section}>
            <h2 className={s.heading}>{b.heading}</h2>
            {b.body && <p className={s.body}>{b.body}</p>}
            {"list" in b && (
              <ul className={s.list}>
                {b.list.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <p className={s.meta}>
          {meta.map((m) => (
            <span key={m}>
              {m}
              <br />
            </span>
          ))}
        </p>

        <Link className={s.back} href="/">
          採用トップへ戻る
        </Link>
      </main>
      <Footer />
    </>
  );
}
