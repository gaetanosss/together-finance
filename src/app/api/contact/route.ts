// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data?.name || !data?.phone || !data?.email) {
      return NextResponse.json(
        { ok: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    const subject = "Nuovo contatto dal sito TogetherFinance";
    const text = `
Nome: ${data.name}
Telefono: ${data.phone}
Email: ${data.email}
Tipo: ${data.type}
Importo: ${data.amount}
    `.trim();

    await resend.emails.send({
      from: "Together Finance <bella@togetherfinance.com.au>",
      to: process.env.MAIL_TO || "bella@togetherfinance.com.au",
      replyTo: data.email,
      subject,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("MAIL ERROR", err);
    return NextResponse.json(
      { ok: false, error: "Mail send failed" },
      { status: 500 }
    );
  }
}
