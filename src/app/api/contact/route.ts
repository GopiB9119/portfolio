import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const { name, email, message, token } = await request.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL) {
      return NextResponse.json({ error: "Email not configured" }, { status: 500 });
    }

    // Basic IP-based rate limiting (per-process memory, not distributed)
    const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0] || "unknown";
    const now = Date.now();
    const key = `contact:${ip}`;
    // @ts-expect-error attach simple map on globalThis
    globalThis.__rate = globalThis.__rate || new Map<string, number[]>();
    // @ts-expect-error read from global map
    const hits: number[] = globalThis.__rate.get(key) || [];
    const windowMs = 60_000; // 1 minute
    const max = 5; // 5 requests/min
    const recent = hits.filter((t) => now - t < windowMs);
    if (recent.length >= max) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    }
    recent.push(now);
    // @ts-expect-error write to global map
    globalThis.__rate.set(key, recent);

    // Verify Turnstile if configured
    if (process.env.TURNSTILE_SECRET_KEY) {
      if (!token) {
        return NextResponse.json({ error: "Captcha required" }, { status: 400 });
      }
      const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: `secret=${encodeURIComponent(process.env.TURNSTILE_SECRET_KEY)}&response=${encodeURIComponent(token)}`,
      }).then((r) => r.json() as Promise<{ success: boolean }>);
      if (!verify.success) {
        return NextResponse.json({ error: "Captcha failed" }, { status: 400 });
      }
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: `Portfolio <onboarding@resend.dev>`,
      to: [process.env.CONTACT_TO_EMAIL],
      subject: `Portfolio contact from ${name}`,
      replyTo: email,
      text: message,
    });

    if (error) {
      return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

