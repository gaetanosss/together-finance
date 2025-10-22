// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { headers } from "next/headers";

/** Escape basico per inserire testo utente in HTML in sicurezza */
function escapeHtml(str: unknown): string {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatAUD(value: unknown): string {
  const n = Number(value);
  if (!isFinite(n)) return "-";
  return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(n);
}

export async function POST(req: Request) {
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const MAIL_TO = process.env.MAIL_TO;
  const FROM_EMAIL = process.env.FROM_EMAIL; // deve essere SOLO l'email, es: info@togetherfinance.com.au
  const FROM_NAME = process.env.FROM_NAME ?? "Together Finance";

  if (!SENDGRID_API_KEY || !MAIL_TO || !FROM_EMAIL) {
    return NextResponse.json({ ok: false, error: "Missing env vars" }, { status: 500 });
  }

  try {
    const data = await req.json();

    // Validazione minima
    if (!data?.name || !data?.email || !data?.phone) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    // Sanitize/escape per sicurezza nel markup
    const name = escapeHtml(data.name);
    const email = escapeHtml(data.email);
    const phone = escapeHtml(data.phone);
    const type = escapeHtml(data.type ?? "-");
    const amount = formatAUD(data.amount);

    // Metadati utili
    const h = await headers();
    const userAgent = escapeHtml(h.get("user-agent") ?? "");
    const referer = escapeHtml(h.get("referer") ?? "");
    const submittedAt = new Date().toLocaleString("en-AU", { timeZone: "Australia/Brisbane" });

    // HTML email (inline CSS, mobile friendly)
    const html = `
<!doctype html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <title>New Lead · Together Finance</title>
    <style>
      /* Client-safe inline-ish styles kept minimal */
      .wrap { max-width: 640px; margin: 0 auto; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; color: #111; }
      .card { background: #ffffff; border: 1px solid #eee; border-radius: 14px; padding: 20px; }
      .brand { color: #0073C2; font-weight: 800; }
      .row { margin: 8px 0; }
      .label { display: inline-block; min-width: 160px; color: #555; }
      .footer { color: #777; font-size: 12px; margin-top: 16px; }
      .muted { color: #666; }
      .pill { display:inline-block; background:#F1F5F9; padding:2px 8px; border-radius:999px; font-size:12px; }
      @media (max-width:600px){ .wrap{ padding: 16px; } .label{min-width:120px;} }
    </style>
  </head>
  <body style="background:#f6f8fb; margin:0; padding:0;">
    <div class="wrap">
      <div style="text-align:center; margin-bottom:14px;">
        <div class="brand" style="font-size:18px; letter-spacing:0.2px;">TOGETHER <span class="muted" style="font-weight:600">FINANCE</span></div>
      </div>

      <div class="card">
        <h2 style="margin:0 0 6px 0;">📩 New website enquiry</h2>
        <div class="muted" style="margin-bottom:12px;">Submitted: ${submittedAt} <span class="pill">Website</span></div>

        <div class="row"><span class="label"><strong>Name</strong></span> ${name}</div>
        <div class="row"><span class="label"><strong>Phone</strong></span> ${phone}</div>
        <div class="row"><span class="label"><strong>Email</strong></span> <a href="mailto:${email}">${email}</a></div>
        <div class="row"><span class="label"><strong>Finance type</strong></span> ${type}</div>
        <div class="row"><span class="label"><strong>Requested amount</strong></span> ${amount}</div>

        <hr style="border:none; border-top:1px solid #eee; margin:16px 0;" />

        <div class="row"><span class="label">Referrer</span> ${referer || "-"}</div>
        <div class="row"><span class="label">User Agent</span> <span class="muted">${userAgent || "-"}</span></div>

        <div style="margin-top:18px;">
          <a href="mailto:${email}" style="background:#0073C2; color:#fff; text-decoration:none; padding:10px 14px; border-radius:10px; display:inline-block;">Reply to customer</a>
          <a href="tel:${phone.replace(/[^+0-9]/g,'')}" style="margin-left:10px; background:#111; color:#fff; text-decoration:none; padding:10px 14px; border-radius:10px; display:inline-block;">Call</a>
        </div>
      </div>

      <div class="footer">
        This message was sent from the contact form on togetherfinance.com.au<br/>
        © ${new Date().getFullYear()} Together Finance Pty Ltd.
      </div>
    </div>
  </body>
</html>`.trim();

    const text = [
      "New website enquiry",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Finance type: ${type}`,
      `Requested amount: ${amount}`,
      `Referrer: ${referer || "-"}`,
      `User Agent: ${userAgent || "-"}`,
      `Submitted: ${submittedAt}`,
      "",
      "— Sent from togetherfinance.com.au"
    ].join("\n");

    // Invia la mail (HTML + plain text)
    const sgRes = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: MAIL_TO }],
            subject: "New enquiry · Together Finance",
          },
        ],
        from: { email: FROM_EMAIL, name: FROM_NAME },
        reply_to: { email: email, name: name },
        content: [
          { type: "text/plain", value: text },
          { type: "text/html", value: html },
        ],
      }),
    });

    if (!sgRes.ok) {
      const errText = await sgRes.text();
      console.error("SENDGRID ERROR:", errText);
      return NextResponse.json({ ok: false, error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("MAIL ERROR:", err);
    return NextResponse.json({ ok: false, error: "Unexpected error" }, { status: 500 });
  }
}
