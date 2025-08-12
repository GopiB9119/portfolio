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
  
  const handleThemeToggle = () => {
    // Add smooth transition class to document
    document.documentElement.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    
    setTheme(isLight ? "dark" : "light");
    
    // Remove transition after animation completes
    setTimeout(() => {
      document.documentElement.style.transition = '';
    }, 300);
  };

  return (
    <button
      aria-label="Toggle theme"
      onClick={handleThemeToggle}
      className="relative p-2 rounded-lg bg-[var(--panel)] border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--card)] transition-all duration-300 group interactive-element hover-glow"
      title={`Switch to ${isLight ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Sun Icon */}
        <svg 
          className={`absolute w-5 h-5 text-[var(--primary)] transition-all duration-300 ${
            isLight ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
          }`}
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
        
        {/* Moon Icon */}
        <svg 
          className={`absolute w-5 h-5 text-[var(--primary)] transition-all duration-300 ${
            isLight ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
          }`}
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-lg bg-[var(--primary)] opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
    </button>
  );
}

