"use client";
import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const body = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      token,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError("Could not send message. Please try again later.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 max-w-xl">
      <input name="name" placeholder="Your name" required className="btn bg-transparent" />
      <input name="email" placeholder="Your email" type="email" required className="btn bg-transparent" />
      <textarea name="message" placeholder="Your message" rows={5} required className="btn bg-transparent" />
      {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? (
        <div
          className="cf-turnstile"
          data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
          data-callback={(val: string) => setToken(val)}
        />
      ) : null}
      <div className="flex items-center gap-3">
        <button type="submit" className="btn btn-primary" disabled={status === "loading"}>
          {status === "loading" ? "Sending..." : "Send"}
        </button>
        {status === "sent" && <span className="muted">Message sent!</span>}
        {status === "error" && <span className="muted">{error}</span>}
      </div>
    </form>
  );
}

