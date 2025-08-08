"use client";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] backdrop-blur bg-[color-mix(in_srgb,var(--background),transparent_10%)]">
      <div className="container h-16 flex items-center justify-between gap-3">
        <a className="font-bold" href="#">⟡ Gopi Banoth</a>
        <nav className="flex flex-wrap items-center gap-3 justify-end">
          <a href="#about" className="muted">About</a>
          <a href="#experience" className="muted">Experience</a>
          <a href="#projects" className="muted">Projects</a>
          <a href="#skills" className="muted">Skills</a>
          <a href="#education" className="muted">Education</a>
          <a href="#contact" className="muted">Contact</a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

