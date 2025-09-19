// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const MAIL_TO = process.env.MAIL_TO;
const FROM_EMAIL = process.env.FROM_EMAIL || "Together Finance <onboarding@resend.dev>";

if (!RESEND_API_KEY) {
  console.error("Missing RESEND_API_KEY env var");
}
if (!MAIL_TO) {
  console.error("Missing MAIL_TO env var");
}

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

export async function POST(req: Request) {
  if (!resend) {
    return NextResponse.json({ ok: false, error: "Mail service not configured" }, { status: 500 });
  }

  try {
    const data = await req.json();

    // Basic server-side validation
    if (!data?.name || !data?.phone || !data?.email) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    const subject = "Nuovo contatto dal sito TogetherFinance";
    const text = `
Nome: ${data.name}
Telefono: ${data.phone}
Email: ${data.email}
Tipo: ${data.type ?? ""}
Importo: ${data.amount ?? ""}
    `.trim();

    const html = `
      <div style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color: #111;">
        <h2 style="color:#0073C2">Nuovo contatto - Together Finance</h2>
        <p><strong>Nome:</strong> ${escapeHtml(String(data.name))}</p>
        <p><strong>Telefono:</strong> ${escapeHtml(String(data.phone))}</p>
        <p><strong>Email:</strong> ${escapeHtml(String(data.email))}</p>
        <p><strong>Tipo:</strong> ${escapeHtml(String(data.type ?? ""))}</p>
        <p><strong>Importo:</strong> ${escapeHtml(String(data.amount ?? ""))}</p>
        <hr/>
        <p style="font-size:12px;color:#666">Questo messaggio è stato inviato dal form sul sito togetherfinance.com.au</p>
      </div>
    `;

    const MAIL_TO = process.env.MAIL_TO ?? "";

    if (!MAIL_TO) {
  throw new Error("MAIL_TO environment variable is not set");
}

await resend.emails.send({
  from: FROM_EMAIL,
  to: MAIL_TO,
  replyTo: data.email,
  subject,
  text,
  html,
});



    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("MAIL ERROR", err);
    return NextResponse.json({ ok: false, error: "Mail send failed" }, { status: 500 });
  }
}

// small helper to avoid XSS when injecting into HTML
function escapeHtml(unsafe: string) {
  return unsafe
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
