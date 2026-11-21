"use client";

import { useState, type FormEvent } from "react";
import s from "./EntryForm.module.css";

type Fields = {
  purpose: string;
  name: string;
  email: string;
  birthday: string;
  tel: string;
  note: string;
  agree: boolean;
};

const EMPTY: Fields = { purpose: "", name: "", email: "", birthday: "", tel: "", note: "", agree: false };

/** ご希望（会社見学 / 応募）。ヘッダーと下部バーの2つの導線に対応する。 */
const PURPOSES = ["まずは会社見学を希望", "応募を希望"] as const;

const FIELDS = [
  { key: "name", label: "お名前", placeholder: "例）山田太郎", type: "text", auto: "name" },
  { key: "email", label: "メールアドレス", placeholder: "例）taro@sample.co.jp", type: "email", auto: "email" },
  { key: "birthday", label: "生年月日", placeholder: "例）1995年6月1日", type: "text", auto: "bday" },
  { key: "tel", label: "電話番号", placeholder: "例）09000000000", type: "tel", auto: "tel" },
] as const;

const STEPS = ["入力", "確認", "送信"];

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function validate(v: Fields) {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (!v.purpose) e.purpose = "ご希望を選択してください。";
  if (!v.name.trim()) e.name = "お名前を入力してください。";
  if (!v.email.trim()) e.email = "メールアドレスを入力してください。";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim()))
    e.email = "メールアドレスの形式が正しくありません。";
  if (!v.birthday.trim()) e.birthday = "生年月日を入力してください。";
  if (!v.tel.trim()) e.tel = "電話番号を入力してください。";
  else if (!/^[0-9+\-() ]{10,}$/.test(v.tel.trim()))
    e.tel = "電話番号の形式が正しくありません。";
  if (!v.agree) e.agree = "プライバシーポリシーへの同意が必要です。";
  return e;
}

/**
 * 送信は同一オリジンの /api/entry に投げるだけ。
 * スプレッドシートへの記録・担当者へのメール・バックアップは、
 * サーバー側（src/app/api/entry/route.ts）が環境変数で指定された
 * Google Apps Script の Web アプリに中継して行う。
 * 送信先を変えたいときは環境変数 ENTRY_WEBHOOK_URL を差し替える。
 */
async function submitEntry(values: Fields): Promise<void> {
  const res = await fetch("/api/entry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  if (!res.ok) {
    let message = "送信に失敗しました";
    try {
      const data = (await res.json()) as { message?: string };
      if (data.message) message = data.message;
    } catch {
      /* レスポンスが JSON でない場合は既定のメッセージを使う */
    }
    throw new Error(message);
  }
}

export default function EntryForm() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  const set = (k: keyof Fields, v: string | boolean) =>
    setValues((p) => ({ ...p, [k]: v }));

  const onConfirm = (e: FormEvent) => {
    e.preventDefault();
    const err = validate(values);
    setErrors(err);
    if (Object.keys(err).length === 0) {
      setStep(1);
      window.scrollTo({ top: document.getElementById("entry")?.offsetTop ?? 0, behavior: "smooth" });
    }
  };

  const onSubmit = async () => {
    setSending(true);
    setSendError("");
    try {
      await submitEntry(values);
      // GTM で応募完了をコンバージョンとして計測できるようにする
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "entry_form_submit" });
      setStep(2);
    } catch (err) {
      setSendError(
        err instanceof Error && err.message
          ? err.message
          : "送信に失敗しました。時間をおいて再度お試しください。",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section className={s.section} id="entry">
      <div className={s.box}>
        <h2 className={s.heading}>
          応募<span className={s.red}>フォーム</span>
        </h2>

        <ol className={s.steps}>
          {STEPS.map((label, i) => (
            <li key={label} className={s.step}>
              <span className={`${s.stepNo} ${i === step ? s.stepNoActive : ""}`}>
                {`0${i + 1}`}
              </span>
              <span className={`${s.stepLabel} ${i === step ? s.stepLabelActive : ""}`}>
                {label}
              </span>
            </li>
          ))}
        </ol>

        {step === 0 && (
          <form className={s.form} onSubmit={onConfirm} noValidate>
            <div className={s.row}>
              <div className={s.labelWrap}>
                <span className={s.label}>ご希望</span>
                <span className={s.req}>必須</span>
              </div>
              <div className={s.control}>
                <div className={s.choices} role="radiogroup" aria-label="ご希望">
                  {PURPOSES.map((p) => (
                    <label key={p} className={s.choice}>
                      <input
                        type="radio"
                        name="purpose"
                        value={p}
                        checked={values.purpose === p}
                        onChange={() => set("purpose", p)}
                      />
                      <span className={s.choiceMark} aria-hidden="true" />
                      <span className={s.choiceText}>{p}</span>
                    </label>
                  ))}
                </div>
                {errors.purpose && <p className={s.error}>{errors.purpose}</p>}
              </div>
            </div>

            {FIELDS.map((f) => (
              <div key={f.key} className={s.row}>
                <div className={s.labelWrap}>
                  <span className={s.label}>{f.label}</span>
                  <span className={s.req}>必須</span>
                </div>
                <div className={s.control}>
                  <input
                    className={s.input}
                    type={f.type}
                    autoComplete={f.auto}
                    placeholder={f.placeholder}
                    value={values[f.key] as string}
                    onChange={(e) => set(f.key, e.target.value)}
                    aria-invalid={Boolean(errors[f.key])}
                  />
                  {errors[f.key] && <p className={s.error}>{errors[f.key]}</p>}
                </div>
              </div>
            ))}

            <div className={`${s.row} ${s.noteRow}`}>
              <div className={s.labelWrap}>
                <span className={s.label}>備考</span>
                <span className={`${s.req} ${s.opt}`}>任意</span>
              </div>
              <div className={s.control}>
                <textarea
                  className={s.textarea}
                  rows={5}
                  placeholder="ご質問やご希望の連絡時間帯などがあればご記入ください"
                  value={values.note}
                  onChange={(e) => set("note", e.target.value)}
                  aria-invalid={Boolean(errors.note)}
                />
                {errors.note && <p className={s.error}>{errors.note}</p>}
              </div>
            </div>

            <label className={s.agree}>
              <input
                type="checkbox"
                checked={values.agree}
                onChange={(e) => set("agree", e.target.checked)}
              />
              <span className={s.agreeBox} aria-hidden="true" />
              <span className={s.agreeText}>
                <a
                  className={s.policyLink}
                  href="/privacy"
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={(e) => e.stopPropagation()}
                >
                  プライバシーポリシー
                </a>
                に同意する
              </span>
            </label>
            {errors.agree && <p className={`${s.error} ${s.errorCenter}`}>{errors.agree}</p>}

            <button className={s.submit} type="submit">
              確認画面へ
            </button>
          </form>
        )}

        {step === 1 && (
          <div className={s.form}>
            <dl className={s.confirm}>
              {[
                ["ご希望", values.purpose],
                ["お名前", values.name],
                ["メールアドレス", values.email],
                ["生年月日", values.birthday],
                ["電話番号", values.tel],
                ["備考", values.note.trim() || "（未入力）"],
              ].map(([k, v]) => (
                <div key={k} className={s.confirmRow}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            {sendError && <p className={`${s.error} ${s.errorCenter}`}>{sendError}</p>}
            <div className={s.confirmBtns}>
              <button className={s.back} type="button" onClick={() => setStep(0)}>
                入力へ戻る
              </button>
              <button className={s.submit} type="button" onClick={onSubmit} disabled={sending}>
                {sending ? "送信中…" : "この内容で送信する"}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={s.done}>
            <p className={s.doneTitle}>ご応募ありがとうございました。</p>
            <p className={s.doneText}>
              内容を確認のうえ、担当者よりご連絡いたします。
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
