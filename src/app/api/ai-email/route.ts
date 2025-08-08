import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const { fromEmail, purpose, transcript } = await request.json();
    if (!fromEmail || !purpose) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL) {
      return NextResponse.json({ error: "Email not configured" }, { status: 500 });
    }

    // Basic IP-based rate limiting (per-process memory, not distributed)
    const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0] || "unknown";
    const now = Date.now();
    const key = `ai-email:${ip}`;
    // @ts-expect-error attach map to global for simple rate limit
    globalThis.__rate = globalThis.__rate || new Map<string, number[]>();
    // @ts-expect-error read from global map
    const hits: number[] = globalThis.__rate.get(key) || [];
    const windowMs = 60_000; // 1 minute
    const max = 3; // 3 requests/min
    const recent = hits.filter((t) => now - t < windowMs);
    if (recent.length >= max) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    }
    recent.push(now);
    // @ts-expect-error write to global map
    globalThis.__rate.set(key, recent);

    const resend = new Resend(process.env.RESEND_API_KEY);
    const subject = `AI chat email from visitor (${fromEmail})`;
    const text = `From: ${fromEmail}\n\nPurpose / Message:\n${purpose}\n\n---\nTranscript (last turns):\n${Array.isArray(transcript) ? transcript.join("\n") : "(none)"}`;
    const { error } = await resend.emails.send({
      from: `Portfolio <onboarding@resend.dev>`,
      to: [process.env.CONTACT_TO_EMAIL],
      subject,
      replyTo: fromEmail,
      text,
    });
    if (error) {
      return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

