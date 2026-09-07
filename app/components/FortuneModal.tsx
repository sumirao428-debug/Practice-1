"use client";

import { useState, useEffect } from "react";

const fortunes = [
  {
    level: "大吉",
    accent: "#C4A49A",
    poem: "音符如流星墜落，光芒盡數為你映照。今日諸事大吉，勇往直前，無所畏懼。",
    advice: "宜：出行・購票・結交新友",
  },
  {
    level: "吉",
    accent: "#8FA49C",
    poem: "旋律如晨光流轉，輕柔而確實。今日順遂，一切如你所願，靜待佳音。",
    advice: "宜：享樂・追求・開口說愛",
  },
  {
    level: "中吉",
    accent: "#8EA3B2",
    poem: "如演奏前的靜謐，積蓄著巨大的能量。時機將至，準備好迎接屬於你的高潮。",
    advice: "宜：準備・學習・等待時機",
  },
  {
    level: "小吉",
    accent: "#A89490",
    poem: "慢板之中自有細膩的韻律，小有收穫已是恩典。持續前行，音樂從不辜負用心的人。",
    advice: "宜：積累・耐心・享受當下",
  },
  {
    level: "末吉",
    accent: "#B0A890",
    poem: "音調雖低沉，終將在空中迴響。保持耐心，黎明前的靜默，是最美的序曲。",
    advice: "宜：休息・反思・充實自己",
  },
  {
    level: "凶",
    accent: "#9A9088",
    poem: "不諧之音考驗你的心志。靜下心來，重新調整步伐，終能奏出最動人的樂章。",
    advice: "宜：謹慎・沉澱・放慢腳步",
  },
];

type Stage = "idle" | "shaking" | "revealed";

interface Props {
  onClose: () => void;
}

export default function FortuneModal({ onClose }: Props) {
  const [stage, setStage] = useState<Stage>("idle");
  const [fortune, setFortune] = useState<(typeof fortunes)[0] | null>(null);

  // 鎖定背景滾動
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // 按下 ESC 關閉
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const draw = () => {
    if (stage === "shaking") return;
    setStage("shaking");
    setFortune(null);
    setTimeout(() => {
      const picked = fortunes[Math.floor(Math.random() * fortunes.length)];
      setFortune(picked);
      setStage("revealed");
    }, 1050);
  };

  const reset = () => {
    setStage("idle");
    setFortune(null);
  };

  return (
    /* 遮罩 */
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      style={{ background: "rgba(28,22,16,0.75)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* 卡片 */}
      <div
        className="relative w-full max-w-sm"
        style={{
          background: "var(--paper)",
          border: "1px solid var(--border)",
        }}
      >
        {/* 關閉按鈕 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center transition-opacity hover:opacity-50"
          aria-label="關閉"
          style={{ color: "var(--ink-faint)" }}
        >
          ✕
        </button>

        <div className="px-8 pt-10 pb-10 text-center">
          {/* 標題 */}
          <p
            className="uppercase mb-1"
            style={{ fontSize: "0.6rem", letterSpacing: "0.4em", color: "var(--ink-faint)" }}
          >
            Lumière Fortune
          </p>
          <p
            className="mb-8"
            style={{ fontFamily: "var(--font-playfair)", fontSize: "1.4rem", fontStyle: "italic", color: "var(--ink)" }}
          >
            今日運氣
          </p>

          {/* ── 籤筒 ── */}
          {stage !== "revealed" && (
            <div className="flex flex-col items-center gap-6 mb-8">
              {/* 籤筒圖示 */}
              <button
                onClick={draw}
                className={`flex flex-col items-center gap-1 cursor-pointer select-none ${stage === "shaking" ? "fortune-shaking" : ""}`}
                disabled={stage === "shaking"}
                aria-label="抽籤"
              >
                {/* 容器本體 */}
                <div
                  className="relative flex items-end justify-center gap-[3px] px-5 pt-3 pb-0"
                  style={{
                    width: "72px",
                    height: "88px",
                    border: "2px solid var(--ink)",
                    borderBottom: "none",
                    borderRadius: "4px 4px 0 0",
                  }}
                >
                  {/* 籤枝 */}
                  {[52, 62, 58, 65, 55].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        width: "4px",
                        height: `${h}px`,
                        background: i % 2 === 0 ? "var(--ink)" : "var(--rose)",
                        borderRadius: "2px 2px 0 0",
                        flexShrink: 0,
                      }}
                    />
                  ))}
                </div>
                {/* 底座 */}
                <div
                  style={{
                    width: "84px",
                    height: "10px",
                    background: "var(--ink)",
                    borderRadius: "0 0 3px 3px",
                  }}
                />
              </button>

              <p style={{ fontSize: "0.78rem", color: "var(--ink-mid)", letterSpacing: "0.15em" }}>
                {stage === "idle" ? "點擊籤筒搖出今日好運" : "搖動中…"}
              </p>
            </div>
          )}

          {/* ── 結果 ── */}
          {stage === "revealed" && fortune && (
            <div className="fortune-reveal mb-8">
              {/* 運氣等級 */}
              <div
                className="inline-flex items-center justify-center mb-5"
                style={{
                  width: "80px",
                  height: "80px",
                  border: `2px solid ${fortune.accent}`,
                  borderRadius: "50%",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1.5rem",
                    fontStyle: "italic",
                    color: fortune.accent,
                    letterSpacing: "0.05em",
                  }}
                >
                  {fortune.level}
                </span>
              </div>

              {/* 詩句 */}
              <p
                className="mb-5 leading-relaxed px-2"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "0.9rem",
                  fontStyle: "italic",
                  color: "var(--ink-mid)",
                  lineHeight: "1.9",
                }}
              >
                {fortune.poem}
              </p>

              {/* 建議 */}
              <div
                className="py-3 px-4 inline-block"
                style={{ background: "var(--cream)", fontSize: "0.72rem", color: "var(--ink-faint)", letterSpacing: "0.1em" }}
              >
                {fortune.advice}
              </div>
            </div>
          )}

          {/* 按鈕列 */}
          <div className="flex gap-3 justify-center">
            {stage === "revealed" && (
              <button
                onClick={reset}
                className="uppercase tracking-widest text-xs py-2.5 px-6 transition-all duration-300"
                style={{ border: "1px solid var(--border)", color: "var(--ink-mid)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--ink)"; (e.currentTarget as HTMLElement).style.color = "var(--ink)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--ink-mid)"; }}
              >
                再抽一次
              </button>
            )}
            <button
              onClick={onClose}
              className="uppercase tracking-widest text-xs py-2.5 px-6 transition-all duration-300"
              style={{ background: "var(--ink)", color: "var(--paper)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--rose)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--ink)"; }}
            >
              關閉
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
