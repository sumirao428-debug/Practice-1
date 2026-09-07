"use client";

import { useState, useRef, useEffect } from "react";

interface Props {
  onSubmit: (name: string) => void;
}

export default function WelcomeGate({ onSubmit }: Props) {
  const [name, setName] = useState("");
  const [leaving, setLeaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 稍微延遲 focus，避免 SSR hydration 問題
    const t = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setLeaving(true);
    setTimeout(() => onSubmit(trimmed), 700);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center px-6"
      style={{
        background: "#1C1610",
        opacity: leaving ? 0 : 1,
        transition: "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: leaving ? "none" : "auto",
      }}
    >
      {/* 背景裝飾光暈 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 60% at 50% 40%, rgba(196,164,154,0.15) 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 80% 70%, rgba(143,164,156,0.08) 0%, transparent 55%)",
        }}
      />

      <div className="relative text-center w-full max-w-sm">
        {/* 品牌標 */}
        <p
          className="uppercase mb-8"
          style={{ fontSize: "0.6rem", letterSpacing: "0.5em", color: "rgba(242,236,228,0.3)" }}
        >
          Lumière 2026
        </p>

        {/* 標題 */}
        <h1
          className="mb-4 leading-tight"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2rem, 8vw, 3rem)",
            color: "var(--paper)",
            fontStyle: "italic",
            letterSpacing: "0.02em",
          }}
        >
          歡迎來到<br />光的世界
        </h1>

        <p
          className="mb-12"
          style={{ fontSize: "0.82rem", color: "rgba(242,236,228,0.38)", letterSpacing: "0.08em", lineHeight: "1.8" }}
        >
          在正式進入之前<br />請告訴我們你的名字
        </p>

        {/* 輸入框 */}
        <div className="mb-8 px-4">
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="你的名字"
            maxLength={20}
            className="w-full bg-transparent text-center outline-none pb-3"
            style={{
              borderBottom: "1px solid rgba(242,236,228,0.25)",
              color: "var(--paper)",
              fontSize: "1.1rem",
              fontFamily: "var(--font-playfair)",
              fontStyle: "italic",
              letterSpacing: "0.12em",
              caretColor: "var(--rose)",
            }}
          />
        </div>

        {/* 提交按鈕 */}
        <button
          onClick={handleSubmit}
          disabled={!name.trim()}
          className="uppercase tracking-widest text-xs py-3.5 px-10 transition-all duration-300"
          style={{
            background: name.trim() ? "var(--rose)" : "transparent",
            color: name.trim() ? "var(--paper)" : "rgba(242,236,228,0.25)",
            border: `1px solid ${name.trim() ? "var(--rose)" : "rgba(242,236,228,0.15)"}`,
            cursor: name.trim() ? "pointer" : "default",
          }}
        >
          進入演唱會
        </button>

        {/* 略過 */}
        <p className="mt-6">
          <button
            onClick={() => { setLeaving(true); setTimeout(() => onSubmit(""), 700); }}
            style={{ fontSize: "0.68rem", color: "rgba(242,236,228,0.2)", letterSpacing: "0.15em" }}
            className="uppercase hover:opacity-60 transition-opacity"
          >
            略過
          </button>
        </p>
      </div>
    </div>
  );
}
