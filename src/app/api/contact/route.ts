// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { headers } from "next/headers";

/** Escape basico per inserire testo utente in HTML */
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
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(n);
}

/** Costruisce un URL assoluto al dominio corrente per asset (logo, ecc.) */
async function absoluteUrl(path: string) {
  const h = headers();
  const proto = (await h).get("x-forwarded-proto") || "https";
  const host = (await h).get("x-forwarded-host") || (await h).get("host") || "localhost:3000";
  if (path.startsWith("http")) return path;
  if (!path.startsWith("/")) path = `/${path}`;
  return `${proto}://${host}${path}`;
}

export async function POST(req: Request) {
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const MAIL_TO = process.env.MAIL_TO;
  const FROM_EMAIL = process.env.FROM_EMAIL; // solo email (verificata su SendGrid)
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

    // Dati sanificati
    const name = escapeHtml(data.name);
    const email = escapeHtml(data.email);
    const phone = escapeHtml(data.phone);
    const type = escapeHtml(data.type ?? "-");
    const amount = formatAUD(data.amount);

    // Metadati utili
    const h = headers();
    const userAgent = escapeHtml((await h).get("user-agent") ?? "");
    const refererHeader = (await h).get("referer") ?? "";
    const referer = escapeHtml(data.page || refererHeader);
    const submittedAt = new Date().toLocaleString("en-AU", { timeZone: "Australia/Brisbane" });

    // Brand
    const BRAND_PRIMARY = "#0073C2";
    const BRAND_DARK = "#0B0B0C";
    const LOGO_URL = "https://togetherfinance.com.au/images/logoS.png";
    const SITE_URL = absoluteUrl("/");

    // HTML email (tabelle + inline CSS per compatibilità massima)
    const html = `<!doctype html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <title>New enquiry · Together Finance</title>
  </head>
  <body style="margin:0; padding:0; background:#f4f6f8;">
    <center style="width:100%; background:#f4f6f8;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:700px; margin:0 auto;">
        <tr>
          <td style="padding:24px 16px;">
            <!-- Header -->
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:${BRAND_DARK}; border-radius:16px 16px 0 0;">
              <tr>
                <td style="padding:20px 24px; text-align:left;">
                  <a href="${SITE_URL}" target="_blank" rel="noopener" style="text-decoration:none;">
                    <img src="${LOGO_URL}" width="120" height="auto" alt="Together Finance" style="display:block; border:0; outline:none; text-decoration:none;"/>
                  </a>
                </td>
                <td style="padding:20px 24px; text-align:right;">
                  <span style="display:inline-block; background:${BRAND_PRIMARY}; color:#fff; font-family:Arial,Helvetica,sans-serif; font-size:12px; padding:6px 10px; border-radius:999px;">Website Lead</span>
                </td>
              </tr>
            </table>

            <!-- Card -->
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff; border:1px solid #e6e8eb; border-top:none; border-radius:0 0 16px 16px;">
              <tr>
                <td style="padding:24px;">
                  <h1 style="margin:0 0 6px 0; font-family:Arial,Helvetica,sans-serif; font-size:20px; line-height:1.3; color:#111;">📩 New enquiry</h1>
                  <p style="margin:0 0 16px 0; font-family:Arial,Helvetica,sans-serif; font-size:13px; color:#6b7280;">
                    Submitted: ${submittedAt}
                  </p>

                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-family:Arial,Helvetica,sans-serif; font-size:14px; color:#111;">
                    <tr><td style="padding:8px 0; width:180px; color:#6b7280;">Name</td><td style="padding:8px 0;"><strong>${name}</strong></td></tr>
                    <tr><td style="padding:8px 0; color:#6b7280;">Phone</td><td style="padding:8px 0;"><a href="tel:${phone.replace(/[^+0-9]/g,'')}" style="color:${BRAND_PRIMARY}; text-decoration:none;">${phone}</a></td></tr>
                    <tr><td style="padding:8px 0; color:#6b7280;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:${BRAND_PRIMARY}; text-decoration:none;">${email}</a></td></tr>
                    <tr><td style="padding:8px 0; color:#6b7280;">Finance type</td><td style="padding:8px 0;">${type}</td></tr>
                    <tr><td style="padding:8px 0; color:#6b7280;">Requested amount</td><td style="padding:8px 0;">${amount}</td></tr>
                  </table>

                  <hr style="border:0; border-top:1px solid #eef0f2; margin:18px 0;" />

                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-family:Arial,Helvetica,sans-serif; font-size:12px; color:#6b7280;">
                    <tr><td style="padding:4px 0;">User Agent</td><td style="padding:4px 0;">${userAgent || "-"}</td></tr>
                  </table>

                  <!-- CTA -->
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:18px;">
                    <tr>
                      <td>
                        <a href="mailto:${email}" style="background:${BRAND_PRIMARY}; color:#fff; font-family:Arial,Helvetica,sans-serif; font-size:14px; text-decoration:none; padding:12px 16px; border-radius:10px; display:inline-block;">Reply to customer</a>
                      </td>
                      <td width="10"></td>
                      <td>
                        <a href="tel:${phone.replace(/[^+0-9]/g,'')}" style="background:#111; color:#fff; font-family:Arial,Helvetica,sans-serif; font-size:14px; text-decoration:none; padding:12px 16px; border-radius:10px; display:inline-block;">Call</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Footer -->
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td style="padding:12px 4px; text-align:center; font-family:Arial,Helvetica,sans-serif; font-size:12px; color:#6b7280;">
                  This message was sent from the contact form on togetherfinance.com.au<br/>
                  © ${new Date().getFullYear()} Together Finance Pty Ltd.
                </td>
              </tr>
            </table>

          </td>
        </tr>
      </table>
    </center>
  </body>
</html>`.trim();

    const text = [
      "New enquiry",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Finance type: ${type}`,
      `Requested amount: ${amount}`,
      `Page: ${referer || "-"}`,
      `User Agent: ${userAgent || "-"}`,
      `Submitted: ${submittedAt}`,
      "",
      "— Sent from togetherfinance.com.au",
    ].join("\n");

    // Invio (HTML + plain text)
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
        reply_to: { email, name },
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
