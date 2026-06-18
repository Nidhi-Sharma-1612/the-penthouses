import { Resend } from "resend";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Name, email, subject, and message are required." },
        { status: 400 }
      );
    }

    try {
      await prisma.contactEnquiry.create({ data: { name, email, phone, subject, message } });
    } catch (dbErr) {
      // Don't fail the request over this — the email send below is still the
      // primary delivery path, this is just a searchable backup log.
      console.error("Failed to persist contact enquiry:", dbErr);
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "The contact form isn't configured yet. Please email us directly." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const to = process.env.CONTACT_TO_EMAIL ?? "reservations@penthousesgrandplaza.com";
    const from = process.env.CONTACT_FROM_EMAIL ?? "The Penthouses at Grand Plaza <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New inquiry: ${subject} — ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        `Subject: ${subject}`,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Unable to send your message. Please try again or email us directly." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
