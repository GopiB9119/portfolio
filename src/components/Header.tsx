"use client";
import ThemeToggle from "@/components/ThemeToggle";
import { useEffect, useState, useRef } from "react";

const fullMessage = "Hi there! Welcome to my portfolio!";
//I’m excited to share my projects and skills with you. Feel free to explore and get in touch!
const dontTouchMessage = "Don't touch me!";

export default function Header() {
  const size = 56;
  const [eyeHeight, setEyeHeight] = useState(6);
  const [showBubble, setShowBubble] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [logoAnimClass, setLogoAnimClass] = useState("");

  const indexRef = useRef(0);
  const typingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hiTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dontTouchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const blinkOnce = (firstBlink = false) => {
      setEyeHeight(1);
      const up = setTimeout(() => setEyeHeight(6), 160);

      if (firstBlink) {
        setTimeout(() => {
          setShowBubble(true);
          setTypedText("");
          indexRef.current = 0;

          typingIntervalRef.current = setInterval(() => {
            if (indexRef.current < fullMessage.length) {
              let charToAdd = fullMessage.charAt(indexRef.current);
              if (indexRef.current === 0) {
                charToAdd = charToAdd.toUpperCase();
              }
              setTypedText((prev) => prev + charToAdd);
              indexRef.current += 1;
            } else {
              if (typingIntervalRef.current) {
                clearInterval(typingIntervalRef.current);
                typingIntervalRef.current = null;
              }
              hiTimeoutRef.current = setTimeout(() => setShowBubble(false), 2000);
            }
          }, 80);
        }, 200);
      }

      return up;
    };

    const first = setTimeout(() => blinkOnce(true), 900);
    const interval = setInterval(() => blinkOnce(), 3600);

    return () => {
      clearTimeout(first);
      clearInterval(interval);
      if (hiTimeoutRef.current) {
        clearTimeout(hiTimeoutRef.current);
        hiTimeoutRef.current = null;
      }
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
      if (dontTouchTimeoutRef.current) {
        clearTimeout(dontTouchTimeoutRef.current);
        dontTouchTimeoutRef.current = null;
      }
    };
  }, []);

  const handleLogoClick = () => {
    if (hiTimeoutRef.current) {
      clearTimeout(hiTimeoutRef.current);
      hiTimeoutRef.current = null;
    }
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }

    setTypedText(dontTouchMessage);
    setShowBubble(true);
    setIsClicked(true);
    setLogoAnimClass("clicked");

    dontTouchTimeoutRef.current = setTimeout(() => {
      setIsClicked(false);
      setShowBubble(false);
      setTypedText("");
      indexRef.current = 0;

      typingIntervalRef.current = setInterval(() => {
        if (indexRef.current < fullMessage.length) {
          let charToAdd = fullMessage.charAt(indexRef.current);
          if (indexRef.current === 0) {
            charToAdd = charToAdd.toUpperCase();
          }
          setTypedText((prev) => prev + charToAdd);
          indexRef.current += 1;
        } else {
          if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
            typingIntervalRef.current = null;
          }
          hiTimeoutRef.current = setTimeout(() => setShowBubble(false), 2000);
        }
      }, 80);

      setLogoAnimClass("");
    }, 2000);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] backdrop-blur bg-[var(--panel)]">
      <div className="container h-16 flex items-center justify-between gap-3">
        <div className="relative flex items-center">
          <span
            onClick={handleLogoClick}
            className={`relative flex items-center justify-center w-14 h-14 rounded-full bg-[var(--panel)] border border-[var(--border)] logo-wrapper cursor-pointer ${logoAnimClass}`}
            title="Click me!"
          >
            <svg width={size} height={size} viewBox="0 0 56 56" fill="none" className="logo-svg" >
              <defs>
                {/* Black radial gradient for depth */}
                <radialGradient id="bgGradient" cx="0.5" cy="0.5" r="0.8">
                  <stop offset="20%" stopColor="#000000" />
                  <stop offset="100%" stopColor="#1a1a1a" />
                </radialGradient>

                {/* Green gradient for eyes */}
                <radialGradient id="eyeGradient" cx="0.5" cy="0.5" r="0.7">
                  <stop offset="0%" stopColor="#a8d13f" />
                  <stop offset="100%" stopColor="#548500" />
                </radialGradient>

                {/* White highlight gradient */}
                <radialGradient id="whiteHighlight" cx="0.5" cy="0.5" r="0.6">
                  <stop offset="30%" stopColor="white" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Base circle with gradient */}
              <circle cx="28" cy="28" r="28" fill="url(#bgGradient)" />

              {/* Main white shape (like a smile/face) */}
              <path
                d="M16 36V24.5C16 21.4624 18.4624 19 21.5 19H34.5C37.5376 19 40 21.4624 40 24.5V36"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Eyes with gradient fill and subtle white highlight */}
              <rect
                x="21"
                y={31 + (6 - eyeHeight)}
                width="4"
                height={eyeHeight}
                rx="1.5"
                fill="url(#eyeGradient)"
                stroke="white"
                strokeWidth="0.7"
              />
              <rect
                x="31"
                y={31 + (6 - eyeHeight)}
                width="4"
                height={eyeHeight}
                rx="1.5"
                fill="url(#eyeGradient)"
                stroke="white"
                strokeWidth="0.7"
              />

              {/* White highlight overlays on eyes */}
              <ellipse
                cx="23"
                cy={31 + (6 - eyeHeight) + 1.5}
                rx="1.2"
                ry="1"
                fill="url(#whiteHighlight)"
                pointerEvents="none"
              />
              <ellipse
                cx="33"
                cy={31 + (6 - eyeHeight) + 1.5}
                rx="1.2"
                ry="1"
                fill="url(#whiteHighlight)"
                pointerEvents="none"
              />
            </svg>
          </span>

          {showBubble && (
            <span className="absolute left-14 top-5 bg-[var(--panel)] border border-[var(--border)] rounded-xl px-3 py-2 text-sm animate-from-logo shadow-md max-w-xs whitespace-nowrap overflow-hidden select-none">
              <span>{typedText}</span>
              <span className="absolute -left-2 top-2 w-0 h-0 border-t-4 border-t-transparent border-r-4 border-r-[var(--panel)] border-b-4 border-b-transparent"></span>
            </span>
          )}
        </div>

        <nav className="flex flex-wrap items-center gap-1 justify-end" role="navigation" aria-label="Main navigation">
          <a
            href="#about"
            className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--card)] transition-all duration-300 relative group focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--background)] interactive-element"
            aria-label="Navigate to About section"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 icon-about icon-hover" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              About
            </span>
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[var(--primary)] transition-all duration-200 group-hover:w-full group-hover:left-0" aria-hidden="true"></span>
          </a>
          <a
            href="#experience"
            className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--card)] transition-all duration-200 relative group focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
            aria-label="Navigate to Experience section"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 icon-experience icon-hover" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2zm4-1a1 1 0 00-1 1v1h2V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Experience
            </span>
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[var(--primary)] transition-all duration-200 group-hover:w-full group-hover:left-0" aria-hidden="true"></span>
          </a>
          <a
            href="#projects"
            className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--card)] transition-all duration-200 relative group focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
            aria-label="Navigate to Projects section"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 icon-projects icon-hover" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Projects
            </span>
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[var(--primary)] transition-all duration-200 group-hover:w-full group-hover:left-0" aria-hidden="true"></span>
          </a>
          <a
            href="#skills"
            className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--card)] transition-all duration-200 relative group focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
            aria-label="Navigate to Skills section"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 icon-skills icon-hover" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Skills
            </span>
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[var(--primary)] transition-all duration-200 group-hover:w-full group-hover:left-0" aria-hidden="true"></span>
          </a>
          <a
            href="/timeline"
            className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--card)] transition-all duration-200 relative group focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
            aria-label="Navigate to Timeline"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 icon-timeline icon-hover" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Timeline
            </span>
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[var(--primary)] transition-all duration-200 group-hover:w-full group-hover:left-0" aria-hidden="true"></span>
          </a>
          <a
            href="/achievements"
            className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--card)] transition-all duration-200 relative group focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
            aria-label="Navigate to Achievements"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 icon-achievements icon-hover" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Achievements
            </span>
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[var(--primary)] transition-all duration-200 group-hover:w-full group-hover:left-0" aria-hidden="true"></span>
          </a>
          <a
            href="/testimonials"
            className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--card)] transition-all duration-200 relative group focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
            aria-label="Navigate to Testimonials"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 icon-testimonials icon-hover" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              Reviews
            </span>
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[var(--primary)] transition-all duration-200 group-hover:w-full group-hover:left-0" aria-hidden="true"></span>
          </a>
          <a
            href="#education"
            className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--card)] transition-all duration-200 relative group focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
            aria-label="Navigate to Education section"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 icon-education icon-hover" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              Education
            </span>
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[var(--primary)] transition-all duration-200 group-hover:w-full group-hover:left-0" aria-hidden="true"></span>
          </a>
          <a
            href="/blog"
            className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--card)] transition-all duration-200 relative group focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
            aria-label="Navigate to Blog"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 icon-blog icon-hover" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V9a1 1 0 00-1-1h-1v4a2 2 0 01-2 2H4.5a1.5 1.5 0 010-3H11V7z" />
              </svg>
              Blog
            </span>
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[var(--primary)] transition-all duration-200 group-hover:w-full group-hover:left-0" aria-hidden="true"></span>
          </a>
          <a
            href="/code"
            className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--card)] transition-all duration-200 relative group focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
            aria-label="Navigate to Code Snippets"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 icon-code icon-hover" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Code
            </span>
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[var(--primary)] transition-all duration-200 group-hover:w-full group-hover:left-0" aria-hidden="true"></span>
          </a>
          <a
            href="/contact"
            className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--card)] transition-all duration-200 relative group focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
            aria-label="Navigate to Contact page"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 icon-contact icon-hover" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Contact
            </span>
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[var(--primary)] transition-all duration-200 group-hover:w-full group-hover:left-0" aria-hidden="true"></span>
          </a>
          <div className="ml-2 pl-2 border-l border-[var(--border)]">
            <ThemeToggle />
          </div>
        </nav>
      </div>

      <style jsx>{`
        @keyframes fromLogo {
          0% {
            opacity: 0;
            transform: scale(0.3) translate(-10px, 10px);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1) translate(-4px, 2px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translate(0, 0);
          }
        }
        .animate-from-logo {
          animation: fromLogo 0.45s ease-out;
        }

        @keyframes eyePulse {
          0%, 100% {
            filter: drop-shadow(0 0 6px #a8d13f);
          }
          50% {
            filter: drop-shadow(0 0 12px #d4f251);
          }
        }
        .eye {
          animation: eyePulse 3s infinite ease-in-out;
        }

        @keyframes floatUpDown {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes breatheScale {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes shakeX {
          0%, 100% {
            transform: translateX(0);
          }
          20%, 60% {
            transform: translateX(-4px);
          }
          40%, 80% {
            transform: translateX(4px);
          }
        }

        @keyframes rotateLogo {
          0% {
            transform: rotate(-5deg);
          }
          100% {
            transform: rotate(5deg);
          }
        }

        @keyframes bounceIn {
          0% {
            transform: scale(0.7);
            opacity: 0;
          }
          60% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes wiggle {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(10deg);
          }
          50% {
            transform: rotate(-10deg);
          }
          75% {
            transform: rotate(10deg);
          }
        }

        .logo-wrapper {
          animation: bounceIn 0.6s ease forwards,
            floatUpDown 4s ease-in-out infinite,
            breatheScale 6s ease-in-out infinite;
          display: inline-flex;
          cursor: pointer;
          transition: filter 0.3s ease;
          will-change: transform;
        }

        .logo-wrapper:hover {
          animation: rotateLogo 1.5s ease-in-out infinite,
            shakeX 0.5s ease-in-out infinite,
            floatUpDown 4s ease-in-out infinite,
            breatheScale 6s ease-in-out infinite !important;
          filter: drop-shadow(0 0 18px #86bc25);
        }

        .logo-wrapper.clicked {
          animation: bounceIn 0.6s ease forwards, wiggle 0.5s ease-in-out 3;
          filter: drop-shadow(0 0 15px #d92d2d);
        }
      `}</style>
    </header>
  );
}
