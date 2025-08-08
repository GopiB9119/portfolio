"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const active = theme === "system" ? systemTheme : theme;
  const isLight = active === "light";
  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      className="btn"
    >
      {isLight ? "🌙" : "☀️"}
    </button>
  );
}

