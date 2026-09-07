"use client";

import { useState } from "react";

const links = [
  ["關於", "#about"],
  ["歌單", "#setlist"],
  ["場次", "#schedule"],
  ["購票", "#tickets"],
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className="fixed top-0 w-full z-50"
        style={{
          background: "rgba(250,247,243,0.92)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-14 flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            style={{
              fontFamily: "var(--font-playfair)",
              color: "var(--ink)",
              fontSize: "1.05rem",
              letterSpacing: "0.18em",
              fontStyle: "italic",
            }}
          >
            Lumière
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:block">
            <ul className="flex gap-10" style={{ color: "var(--ink-mid)", fontSize: "0.72rem", letterSpacing: "0.22em" }}>
              {links.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="uppercase transition-colors duration-300"
                    style={{ color: "var(--ink-mid)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-mid)")}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop CTA */}
          <a
            href="#tickets"
            className="hidden md:inline-block text-xs uppercase tracking-widest py-2 px-5 transition-all duration-300"
            style={{ border: "1px solid var(--rose)", color: "var(--rose)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--rose)";
              (e.currentTarget as HTMLElement).style.color = "var(--paper)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "var(--rose)";
            }}
          >
            購票
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "關閉選單" : "開啟選單"}
          >
            <span
              className="block h-px w-6 transition-all duration-300 origin-center"
              style={{
                background: "var(--ink)",
                transform: open ? "translateY(4px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block h-px transition-all duration-300"
              style={{
                background: "var(--ink)",
                width: open ? "0" : "1.5rem",
                opacity: open ? 0 : 1,
              }}
            />
            <span
              className="block h-px w-6 transition-all duration-300 origin-center"
              style={{
                background: "var(--ink)",
                transform: open ? "translateY(-4px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className="fixed inset-0 z-40 md:hidden flex flex-col pt-14 transition-all duration-300"
        style={{
          background: "var(--paper)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <nav className="flex flex-col px-5 py-8 gap-1">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="uppercase py-4 tracking-widest"
              style={{
                fontSize: "0.8rem",
                color: "var(--ink-mid)",
                borderBottom: "1px solid var(--border)",
                letterSpacing: "0.3em",
              }}
            >
              {label}
            </a>
          ))}
          <a
            href="#tickets"
            onClick={() => setOpen(false)}
            className="mt-6 py-3.5 text-center uppercase tracking-widest text-xs transition-colors"
            style={{ background: "var(--rose)", color: "var(--paper)" }}
          >
            立即購票
          </a>
        </nav>
      </div>
    </>
  );
}
