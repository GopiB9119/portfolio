"use client";
import { useEffect, useRef, useState } from "react";

type ChatTurn = { role: "user" | "model"; text: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [mode, setMode] = useState<"chat" | "email">("chat");
  const [fromEmail, setFromEmail] = useState("");
  const [purpose, setPurpose] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<{ cancel: boolean }>({ cancel: false });
  const [userName, setUserName] = useState<string | null>(null);
  // Icon sizing variables for custom SVG chat button icon
  const size = 56;
  const [eyeHeight, setEyeHeight] = useState(6);
  const lastActivityRef = useRef<number>(Date.now());
  const autoclearMs = Number(process.env.NEXT_PUBLIC_CHAT_AUTOCLEAR_MS ?? "60000");

  function markActivity() {
    const now = Date.now();
    lastActivityRef.current = now;
    try { localStorage.setItem("chat_last", String(now)); } catch {}
  }

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [turns, open]);

  // Simple blinking animation for the SVG eyes
  useEffect(() => {
    const blinkOnce = () => {
      setEyeHeight(1);
      const up = setTimeout(() => setEyeHeight(6), 160);
      return up;
    };
    // blink shortly after mount, then periodically
    const first = setTimeout(() => blinkOnce(), 900);
    const interval = setInterval(() => {
      const up = blinkOnce();
      // ensure timeout cleared if interval clears immediately
      // handled by clearing all on cleanup
    }, 3600);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, []);

  // Persist and restore conversation
  useEffect(() => {
    try {
      const saved = localStorage.getItem("chat_turns");
      if (saved) setTurns(JSON.parse(saved));
      const savedOpen = localStorage.getItem("chat_open");
      if (savedOpen) setOpen(savedOpen === "1");
      const savedMode = localStorage.getItem("chat_mode");
      if (savedMode === "chat" || savedMode === "email") setMode(savedMode);
      const savedName = localStorage.getItem("chat_user_name");
      if (savedName) setUserName(savedName);
      const savedLast = localStorage.getItem("chat_last");
      if (savedLast) lastActivityRef.current = Number(savedLast) || Date.now();
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    try { localStorage.setItem("chat_turns", JSON.stringify(turns)); } catch {}
  }, [turns]);
  useEffect(() => {
    try { localStorage.setItem("chat_open", open ? "1" : "0"); } catch {}
  }, [open]);
  useEffect(() => {
    try { localStorage.setItem("chat_mode", mode); } catch {}
  }, [mode]);
  useEffect(() => {
    try {
      if (userName) localStorage.setItem("chat_user_name", userName);
    } catch {}
  }, [userName]);

  function extractName(text: string): string | null {
    const patterns = [
      /\bmy name is\s+([a-zA-Z][\w'-]+(?:\s+[a-zA-Z][\w'-]+)?)\b/i,
      /\bi am\s+([a-zA-Z][\w'-]+(?:\s+[a-zA-Z][\w'-]+)?)\b/i,
      /\bi'm\s+([a-zA-Z][\w'-]+(?:\s+[a-zA-Z][\w'-]+)?)\b/i,
    ];
    for (const re of patterns) {
      const m = text.match(re);
      if (m && m[1]) {
        const raw = m[1].trim();
        const titled = raw
          .split(/\s+/)
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join(" ");
        return titled;
      }
    }
    return null;
  }

  async function typeOut(text: string) {
    setTurns((prev) => [...prev, { role: "model", text: "" }]);
    await new Promise<void>((resolve) => {
      const speedMs = 28; // slower typing
      let i = 0;
      typingRef.current.cancel = false;
      const step = () => {
        if (typingRef.current.cancel) return resolve();
        i += 1;
        setTurns((prev) => {
          const next = [...prev];
          const last = next.length - 1;
          if (last >= 0 && next[last].role === "model") {
            next[last] = { role: "model", text: text.slice(0, i) };
          }
          return next;
        });
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
        if (i < text.length) setTimeout(step, speedMs); else { markActivity(); resolve(); }
      };
      step();
    });
  }

  async function send() {
    if (!input.trim() || busy) return;
    const message = input.trim();
    const maybeName = extractName(message);
    if (maybeName) setUserName(maybeName);
    setInput("");
    setTurns((t) => [...t, { role: "user", text: message }]);
    markActivity();
    setBusy(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, userName, history: turns.map((t) => ({ role: t.role, parts: [{ text: t.text }] })) }),
      });
      const data = await res.json();
      if (!res.ok || !data.reply) throw new Error("AI unavailable");
      await typeOut(data.reply as string);
    } catch (e) {
      setTurns((t) => [...t, { role: "model", text: "Sorry, the assistant is unavailable right now." }]);
      markActivity();
    } finally {
      setBusy(false);
    }
  }

  // Auto-clear conversation after inactivity
  useEffect(() => {
    const check = () => {
      const idle = Date.now() - lastActivityRef.current;
      if (idle >= autoclearMs && turns.length > 0) {
        setTurns([]);
        try { localStorage.removeItem("chat_turns"); } catch {}
        lastActivityRef.current = Date.now();
        try { localStorage.setItem("chat_last", String(lastActivityRef.current)); } catch {}
      }
    };
    const interval = setInterval(check, Math.min(autoclearMs / 2, 5000));
    return () => clearInterval(interval);
  }, [autoclearMs, turns.length]);

  return (
    <>
      <button
        className="group fixed bottom-5 right-5"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat"
        title="Chat"
      >
        <span className="relative inline-block p-[3px] rounded-full bg-gradient-to-br from-[#7c5cff] to-[#2de2e6] shadow-lg">
          <span className="absolute -inset-1 rounded-full blur-md opacity-50 group-hover:opacity-70 bg-gradient-to-br from-[#7c5cff] to-[#2de2e6] -z-10"></span>
          <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[var(--panel)] border border-[var(--border)] text-2xl transition-transform duration-200 group-hover:scale-105">
          <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
          <circle cx="28" cy="28" r="28" fill="#000" />
          <path
            d="M16 36V24.5C16 21.4624 18.4624 19 21.5 19H34.5C37.5376 19 40 21.4624 40 24.5V36"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"  
          />

          {/* Animated Human-like Green Eyes (blink once) */}
          <rect
            x="21"
            y={31 + (6 - eyeHeight)}
            width="4"
            height={eyeHeight}
            rx="1.5"
            fill="#86BC25"
            stroke="#fff"
            strokeWidth="0.5"
          />
          <rect
            x="31"
            y={31 + (6 - eyeHeight)}
            width="4"
            height={eyeHeight}
            rx="1.5"
            fill="#86BC25"
            stroke="#fff"
            strokeWidth="0.5"
          />
        </svg>
          </span>
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#2de2e6]"></span>
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#2de2e6] animate-ping opacity-60"></span>
        </span>
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 w-[min(92vw,360px)] bg-[var(--panel)] border border-[var(--border)] rounded-2xl shadow p-3 grid gap-2">
          <div className="font-semibold flex items-center justify-between">
            <span>AI Assistant</span>
            <button
              className="btn"
              onClick={() => {
                setTurns([]);
                try { localStorage.removeItem("chat_turns"); } catch {}
              }}
            >
              Clear
            </button>
          </div>
          <div className="flex gap-2 text-sm">
            <button className={`btn ${mode === "chat" ? "btn-primary" : ""}`} onClick={() => setMode("chat")}>
              Chat
            </button>
            <button className={`btn ${mode === "email" ? "btn-primary" : ""}`} onClick={() => setMode("email")}>
              Email Gopi
            </button>
          </div>
          {mode === "chat" ? (
            <>
              <div ref={listRef} className="max-h-72 overflow-y-auto grid gap-2">
                {turns.length === 0 && (
              <div className="muted text-sm">Ask about my projects, skills, and experience. 🙂</div>
                )}
                {turns.map((t, idx) => (
                  <div key={idx} className={`text-sm ${t.role === "user" ? "text-right" : "text-left"}`}>
                    <div className={`inline-block px-2 py-1 rounded-lg ${t.role === "user" ? "bg-[var(--primary)] text-white" : "bg-[var(--card)]"}`}>
                      {t.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  className="btn bg-transparent flex-1"
                  placeholder="Type a message"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  disabled={busy}
                />
                <button className="btn" onClick={send} disabled={busy}>Send</button>
              </div>
            </>
          ) : (
            <>
              <div className="grid gap-2">
                <input className="btn bg-transparent" placeholder="Your email" value={fromEmail} onChange={(e) => setFromEmail(e.target.value)} />
                <textarea className="btn bg-transparent" rows={4} placeholder="Purpose / message for Gopi" value={purpose} onChange={(e) => setPurpose(e.target.value)} />
                <button
                  className="btn btn-primary"
                  disabled={busy || !fromEmail || !purpose}
                  onClick={async () => {
                    if (!fromEmail || !purpose) return;
                    setBusy(true);
                    try {
                      const transcript = turns.slice(-6).map((t) => `${t.role}: ${t.text}`);
                      const res = await fetch("/api/ai-email", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ fromEmail, purpose, transcript }),
                      });
                      const data = await res.json();
                      if (!res.ok || !data.ok) throw new Error("Failed");
                      setPurpose("");
                      setFromEmail("");
                      alert("Sent! Gopi will receive your message.");
                    } catch (e) {
                      alert("Could not send. Please try again later.");
                    } finally {
                      setBusy(false);
                    }
                  }}
                >
                  Send Email
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

