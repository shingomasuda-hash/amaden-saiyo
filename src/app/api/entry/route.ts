import { NextResponse } from "next/server";

/**
 * 応募フォームの送信先。
 *
 * ブラウザからは同一オリジンのこのルートにだけ POST し、実際の記録・通知は
 * Google Apps Script の Web アプリ（= スプレッドシート + Gmail + Drive）に
 * 中継する。Web アプリの URL を環境変数に置くことで、
 * 送信先を差し替えられる構造を保っている。
 *
 * 必要な環境変数（Vercel のプロジェクト設定で登録する）
 *   ENTRY_WEBHOOK_URL   : Apps Script Web アプリのデプロイ URL
 *   ENTRY_WEBHOOK_TOKEN : Apps Script 側と共有する合言葉（任意だが推奨）
 *
 * セットアップ手順は docs/entry-form-setup.md を参照。
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PURPOSES = ["まずは会社見学を希望", "応募を希望"];

type Payload = {
  purpose: string;
  name: string;
  email: string;
  birthday: string;
  tel: string;
  note: string;
  agree: boolean;
};

const MAX_LEN = 2000;

function clean(v: unknown): string {
  return typeof v === "string" ? v.trim().slice(0, MAX_LEN) : "";
}

function validate(v: Payload): string | null {
  if (!PURPOSES.includes(v.purpose)) return "ご希望が選択されていません。";
  if (!v.name) return "お名前が未入力です。";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) return "メールアドレスの形式が正しくありません。";
  if (!v.birthday) return "生年月日が未入力です。";
  if (!/^[0-9+\-() ]{10,}$/.test(v.tel)) return "電話番号の形式が正しくありません。";
  if (!v.agree) return "プライバシーポリシーへの同意が必要です。";
  return null;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "リクエストが不正です。" }, { status: 400 });
  }

  const values: Payload = {
    purpose: clean(body.purpose),
    name: clean(body.name),
    email: clean(body.email),
    birthday: clean(body.birthday),
    tel: clean(body.tel),
    note: clean(body.note),
    agree: body.agree === true,
  };

  const invalid = validate(values);
  if (invalid) {
    return NextResponse.json({ ok: false, message: invalid }, { status: 400 });
  }

  const endpoint = process.env.ENTRY_WEBHOOK_URL;
  if (!endpoint) {
    console.error("ENTRY_WEBHOOK_URL が未設定のため応募を記録できませんでした。");
    return NextResponse.json(
      { ok: false, message: "送信先が未設定です。お手数ですがお電話にてお問い合わせください。" },
      { status: 503 },
    );
  }

  const record = {
    ...values,
    token: process.env.ENTRY_WEBHOOK_TOKEN ?? "",
    submittedAt: new Date().toISOString(),
    userAgent: req.headers.get("user-agent") ?? "",
    referer: req.headers.get("referer") ?? "",
  };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
      // Apps Script はデプロイ URL からリダイレクトするため追従させる
      redirect: "follow",
      signal: AbortSignal.timeout(20000),
    });

    const text = await res.text();
    if (!res.ok) {
      // 記録に失敗した内容はログに残し、あとから手作業で拾えるようにする
      console.error("応募の転送に失敗しました", res.status, text, JSON.stringify(values));
      return NextResponse.json(
        { ok: false, message: "送信に失敗しました。時間をおいて再度お試しください。" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("応募の転送で例外が発生しました", err, JSON.stringify(values));
    return NextResponse.json(
      { ok: false, message: "送信に失敗しました。時間をおいて再度お試しください。" },
      { status: 502 },
    );
  }
}
