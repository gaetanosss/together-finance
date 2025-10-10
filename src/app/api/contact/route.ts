// src/app/api/contact/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const MAIL_TO = process.env.MAIL_TO;
  const FROM_EMAIL = process.env.FROM_EMAIL;

  if (!SENDGRID_API_KEY || !MAIL_TO || !FROM_EMAIL) {
    return NextResponse.json({ ok: false, error: "Missing env vars" }, { status: 500 });
  }

  try {
    const data = await req.json();

    // Controllo base
    if (!data?.name || !data?.email || !data?.phone) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    // Corpo del messaggio
    const html = `
      <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.5;">
        <h2>📩 Nuovo contatto dal sito Together Finance</h2>
        <p><strong>Nome:</strong> ${data.name}</p>
        <p><strong>Telefono:</strong> ${data.phone}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Tipo:</strong> ${data.type ?? "-"}</p>
        <p><strong>Importo richiesto:</strong> ${data.amount ?? "-"}</p>
        <hr />
        <p style="font-size: 12px; color: #777;">
          Questo messaggio è stato inviato dal form sul sito togetherfinance.com.au
        </p>
      </div>
    `;

    // Invia la mail
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: MAIL_TO }],
            subject: "Nuovo contatto dal sito Together Finance",
          },
        ],
        from: { email: FROM_EMAIL, name: "Together Finance" },
        reply_to: { email: data.email }, // così puoi rispondere direttamente al cliente
        content: [{ type: "text/html", value: html }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("SENDGRID ERROR:", errText);
      return NextResponse.json({ ok: false, error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("MAIL ERROR:", err);
    return NextResponse.json({ ok: false, error: "Unexpected error" }, { status: 500 });
  }
}
