"use client";
import { useEffect, useRef, useState } from "react";

type ChatTurn = { role: "user" | "model"; text: string };

export default function ChatWidget() {
  const [mounted, setMounted] = useState(false);
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
  const lastActivityRef = useRef<number>(0); // Initialize with 0 to avoid hydration mismatch
  const autoclearMs = Number(process.env.NEXT_PUBLIC_CHAT_AUTOCLEAR_MS ?? "60000");

  // Fix hydration mismatch and initialize activity tracking
  useEffect(() => {
    setMounted(true);
    // Initialize activity tracking only on client
    lastActivityRef.current = Date.now();
    try { 
      const savedLast = localStorage.getItem("chat_last");
      if (savedLast) lastActivityRef.current = Number(savedLast) || Date.now();
    } catch { }
  }, []);

  function markActivity() {
    const now = Date.now();
    lastActivityRef.current = now;
    try { localStorage.setItem("chat_last", String(now)); } catch { }
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
    if (!mounted) return;
    try {
      const saved = localStorage.getItem("chat_turns");
      if (saved) setTurns(JSON.parse(saved));
      const savedOpen = localStorage.getItem("chat_open");
      if (savedOpen) setOpen(savedOpen === "1");
      const savedMode = localStorage.getItem("chat_mode");
      if (savedMode === "chat" || savedMode === "email") setMode(savedMode);
      const savedName = localStorage.getItem("chat_user_name");
      if (savedName) setUserName(savedName);
      // Activity tracking already initialized in mount effect
    } catch { }
  }, [mounted]);
  useEffect(() => {
    if (!mounted) return;
    try { localStorage.setItem("chat_turns", JSON.stringify(turns)); } catch { }
  }, [turns, mounted]);
  useEffect(() => {
    if (!mounted) return;
    try { localStorage.setItem("chat_open", open ? "1" : "0"); } catch { }
  }, [open, mounted]);
  useEffect(() => {
    if (!mounted) return;
    try { localStorage.setItem("chat_mode", mode); } catch { }
  }, [mode, mounted]);
  useEffect(() => {
    if (!mounted) return;
    try {
      if (userName) localStorage.setItem("chat_user_name", userName);
    } catch { }
  }, [userName, mounted]);

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
        try { localStorage.removeItem("chat_turns"); } catch { }
        lastActivityRef.current = Date.now();
        try { localStorage.setItem("chat_last", String(lastActivityRef.current)); } catch { }
      }
    };
    const interval = setInterval(check, Math.min(autoclearMs / 2, 5000));
    return () => clearInterval(interval);
  }, [autoclearMs, turns.length]);

  if (!mounted) return null;

  return (
    <>
      <button
        className="group fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat"
        title="Chat with Saru - AI Assistant"
      >
        <div className="relative">
          <div className="absolute -inset-1 md:-inset-2 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] opacity-20 group-hover:opacity-40 blur-lg transition-opacity duration-300"></div>
          <div className="relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
            <div className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full bg-[var(--panel)] border-2 border-white/20">
              <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 56 56" fill="none" className="md:w-11 md:h-11">
                <defs>
                  <radialGradient id="chatBgGradient" cx="0.5" cy="0.5" r="0.8">
                    <stop offset="20%" stopColor="#000000" />
                    <stop offset="100%" stopColor="#1a1a1a" />
                  </radialGradient>
                  <radialGradient id="chatEyeGradient" cx="0.5" cy="0.5" r="0.7">
                    <stop offset="0%" stopColor="#a8d13f" />
                    <stop offset="100%" stopColor="#548500" />
                  </radialGradient>
                  <radialGradient id="chatWhiteHighlight" cx="0.5" cy="0.5" r="0.6">
                    <stop offset="30%" stopColor="white" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="28" cy="28" r="28" fill="url(#chatBgGradient)" />
                <path
                  d="M16 36V24.5C16 21.4624 18.4624 19 21.5 19H34.5C37.5376 19 40 21.4624 40 24.5V36"
                  stroke="#fff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="21"
                  y={31 + (6 - eyeHeight)}
                  width="4"
                  height={eyeHeight}
                  rx="1.5"
                  fill="url(#chatEyeGradient)"
                  stroke="white"
                  strokeWidth="0.7"
                />
                <rect
                  x="31"
                  y={31 + (6 - eyeHeight)}
                  width="4"
                  height={eyeHeight}
                  rx="1.5"
                  fill="url(#chatEyeGradient)"
                  stroke="white"
                  strokeWidth="0.7"
                />
                <ellipse
                  cx="23"
                  cy={31 + (6 - eyeHeight) + 1.5}
                  rx="1.2"
                  ry="1"
                  fill="url(#chatWhiteHighlight)"
                  pointerEvents="none"
                />
                <ellipse
                  cx="33"
                  cy={31 + (6 - eyeHeight) + 1.5}
                  rx="1.2"
                  ry="1"
                  fill="url(#chatWhiteHighlight)"
                  pointerEvents="none"
                />
              </svg>
            </div>
          </div>
          {!open && (
            <div className="absolute -top-0.5 -right-0.5 md:-top-1 md:-right-1 w-3 h-3 md:w-4 md:h-4 rounded-full bg-[var(--accent)] border-2 border-[var(--panel)] animate-pulse"></div>
          )}
        </div>
      </button>

      {open && (
        <div className="chat-widget-dialog fixed bottom-16 right-2 left-2 md:bottom-24 md:right-6 md:left-auto w-full md:w-[min(92vw,380px)] max-w-md md:max-w-none bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl backdrop-blur-sm z-40">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--foreground)]">Saru - AI Assistant</h3>
                <p className="text-xs text-[var(--muted)]">Ask me anything about Gopi</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--panel)] transition-colors"
                onClick={() => {
                  setTurns([]);
                  try { localStorage.removeItem("chat_turns"); } catch { }
                }}
                title="Clear conversation"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 012 0v4a1 1 0 11-2 0V7zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V7a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--panel)] transition-colors"
                onClick={() => setOpen(false)}
                title="Close chat"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mode Tabs */}
          <div className="flex p-2 bg-[var(--panel)] rounded-t-none">
            <button
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${mode === "chat"
                ? "bg-[var(--card)] text-[var(--primary)] shadow-sm"
                : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card)]"
                }`}
              onClick={() => setMode("chat")}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                Chat
              </div>
            </button>
            <button
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${mode === "email"
                ? "bg-[var(--card)] text-[var(--primary)] shadow-sm"
                : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card)]"
                }`}
              onClick={() => setMode("email")}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Email Gopi
              </div>
            </button>
          </div>
          {mode === "chat" ? (
            <div className="flex flex-col h-72 md:h-80">
              {/* Chat Messages */}
              <div ref={listRef} className="chat-messages flex-1 overflow-y-auto p-4 space-y-3">
                {turns.length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-[var(--primary)]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-sm text-[var(--muted)] mb-4">👋 Hi! I'm Saru, Gopi's AI assistant</p>
                    <p className="text-xs text-[var(--muted)] mb-4">Ask me anything about Gopi&apos;s portfolio!</p>
                    
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-[var(--foreground)] mb-2">Try asking:</p>
                      <div className="space-y-1">
                        {[
                          "What projects has Gopi worked on?",
                          "What are his technical skills?",
                          "Tell me about his experience",
                          "What do clients say about him?"
                        ].map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => setInput(suggestion)}
                            className="w-full text-xs text-left px-3 py-2 rounded-lg bg-[var(--panel)] hover:bg-[var(--muted)]/10 border border-[var(--border)] transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {turns.map((t, idx) => (
                  <div key={idx} className={`flex ${t.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] ${t.role === "user" ? "order-2" : "order-1"}`}>
                      <div className={`px-4 py-2 rounded-2xl text-sm leading-relaxed ${t.role === "user"
                        ? "bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white rounded-br-md"
                        : "bg-[var(--panel)] text-[var(--foreground)] border border-[var(--border)] rounded-bl-md"
                        }`}>
                        {t.text}
                      </div>
                      <div className={`text-xs text-[var(--muted)] mt-1 ${t.role === "user" ? "text-right" : "text-left"}`}>
                        {t.role === "user" ? "You" : "Saru"}
                      </div>
                    </div>
                  </div>
                ))}
                {busy && (
                  <div className="flex justify-start">
                    <div className="bg-[var(--panel)] border border-[var(--border)] rounded-2xl rounded-bl-md px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-[var(--muted)] rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-[var(--muted)] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-[var(--muted)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t border-[var(--border)] p-4">
                <div className="flex gap-3">
                  <input
                    className="flex-1 px-4 py-2 bg-[var(--panel)] border border-[var(--border)] rounded-xl text-sm placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send()}
                    disabled={busy}
                  />
                  <button
                    className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${input.trim() && !busy
                      ? "bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white hover:shadow-lg hover:scale-105"
                      : "bg-[var(--panel)] text-[var(--muted)] cursor-not-allowed"
                      }`}
                    onClick={send}
                    disabled={busy || !input.trim()}
                  >
                    {busy ? (
                      <svg className="w-4 h-4 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3 md:p-4 space-y-3">
              <div className="text-center py-2">
                <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mx-auto mb-2">
                  <svg className="w-5 h-5 text-[var(--accent)]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[var(--foreground)] text-sm">Email Gopi</h3>
                <p className="text-xs text-[var(--muted)]">Send a direct message</p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-[var(--foreground)] mb-1">Your Email</label>
                  <input
                    className="w-full px-3 py-2 bg-[var(--panel)] border border-[var(--border)] rounded-lg text-sm placeholder-[var(--muted)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                    type="email"
                    value={fromEmail}
                    onChange={(e) => setFromEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--foreground)] mb-1">Message</label>
                  <textarea
                    className="w-full px-3 py-2 bg-[var(--panel)] border border-[var(--border)] rounded-lg text-sm placeholder-[var(--muted)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent transition-all resize-none"
                    rows={3}
                    placeholder="Hi Gopi, I'd like to discuss..."
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                  />
                </div>

                <button
                  className={`w-full py-2.5 rounded-lg font-medium text-sm transition-all ${!busy && fromEmail && purpose
                    ? "bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white hover:shadow-md hover:scale-[1.02]"
                    : "bg-[var(--panel)] text-[var(--muted)] cursor-not-allowed"
                    }`}
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
                      alert("✅ Message sent! Gopi will get back to you soon.");
                    } catch (e) {
                      console.error('Error sending email:', e);
                      alert("❌ Could not send message. Please try again later.");
                    } finally {
                      setBusy(false);
                    }
                  }}
                >
                  {busy ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                      </svg>
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                      Send Message
                    </div>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

