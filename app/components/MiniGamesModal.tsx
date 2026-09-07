"use client";

import { useState, useEffect, useRef, useCallback, MouseEvent } from "react";

/* ─── 今日運氣資料 ─── */
const fortunes = [
  { level: "大吉", accent: "#C4A49A", poem: "音符如流星墜落，光芒盡數為你映照。今日諸事大吉，勇往直前，無所畏懼。", advice: "宜：出行・購票・結交新友" },
  { level: "吉",   accent: "#8FA49C", poem: "旋律如晨光流轉，輕柔而確實。今日順遂，一切如你所願，靜待佳音。",         advice: "宜：享樂・追求・開口說愛" },
  { level: "中吉", accent: "#8EA3B2", poem: "如演奏前的靜謐，積蓄著巨大的能量。時機將至，準備好迎接屬於你的高潮。",   advice: "宜：準備・學習・等待時機" },
  { level: "小吉", accent: "#A89490", poem: "慢板之中自有細膩的韻律，小有收穫已是恩典。持續前行，音樂不辜負用心的人。", advice: "宜：積累・耐心・享受當下" },
  { level: "末吉", accent: "#B0A890", poem: "音調雖低沉，終將在空中迴響。保持耐心，黎明前的靜默是最美的序曲。",       advice: "宜：休息・反思・充實自己" },
  { level: "凶",   accent: "#9A9088", poem: "不諧之音考驗你的心志。靜下心來，重新調整步伐，終能奏出最動人的樂章。",   advice: "宜：謹慎・沉澱・放慢腳步" },
];

type FortuneStage = "idle" | "shaking" | "revealed";

function FortuneTab() {
  const [stage, setStage] = useState<FortuneStage>("idle");
  const [fortune, setFortune] = useState<(typeof fortunes)[0] | null>(null);

  const draw = () => {
    if (stage === "shaking") return;
    setStage("shaking");
    setFortune(null);
    setTimeout(() => {
      setFortune(fortunes[Math.floor(Math.random() * fortunes.length)]);
      setStage("revealed");
    }, 1050);
  };

  return (
    <div className="px-6 pt-6 pb-8 text-center">
      {stage !== "revealed" && (
        <div className="flex flex-col items-center gap-5 mb-6">
          <button
            onClick={draw}
            disabled={stage === "shaking"}
            className={`flex flex-col items-center gap-1 cursor-pointer select-none ${stage === "shaking" ? "fortune-shaking" : ""}`}
          >
            <div className="relative flex items-end justify-center gap-[3px] px-4 pt-3 pb-0"
              style={{ width: "64px", height: "80px", border: "2px solid var(--ink)", borderBottom: "none", borderRadius: "4px 4px 0 0" }}>
              {[48, 58, 52, 62, 50].map((h, i) => (
                <div key={i} style={{ width: "4px", height: `${h}px`, background: i % 2 === 0 ? "var(--ink)" : "var(--rose)", borderRadius: "2px 2px 0 0", flexShrink: 0 }} />
              ))}
            </div>
            <div style={{ width: "76px", height: "9px", background: "var(--ink)", borderRadius: "0 0 3px 3px" }} />
          </button>
          <p style={{ fontSize: "0.75rem", color: "var(--ink-mid)", letterSpacing: "0.15em" }}>
            {stage === "idle" ? "點擊籤筒搖出今日好運" : "搖動中…"}
          </p>
        </div>
      )}

      {stage === "revealed" && fortune && (
        <div className="fortune-reveal mb-6">
          <div className="inline-flex items-center justify-center mb-4"
            style={{ width: "72px", height: "72px", border: `2px solid ${fortune.accent}`, borderRadius: "50%" }}>
            <span style={{ fontFamily: "var(--font-playfair)", fontSize: "1.35rem", fontStyle: "italic", color: fortune.accent }}>
              {fortune.level}
            </span>
          </div>
          <p className="mb-4 px-2 leading-relaxed"
            style={{ fontFamily: "var(--font-playfair)", fontSize: "0.88rem", fontStyle: "italic", color: "var(--ink-mid)", lineHeight: "1.9" }}>
            {fortune.poem}
          </p>
          <div className="inline-block py-2 px-4 mb-4"
            style={{ background: "var(--cream)", fontSize: "0.7rem", color: "var(--ink-faint)", letterSpacing: "0.1em" }}>
            {fortune.advice}
          </div>
          <br />
          <button onClick={() => { setStage("idle"); setFortune(null); }}
            className="uppercase tracking-widest text-xs py-2 px-5 transition-all duration-200"
            style={{ border: "1px solid var(--border)", color: "var(--ink-mid)" }}>
            再抽一次
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── 彈跳音符資料 ─── */
const SYMBOLS = ["♩", "♪", "♫", "♬"];
const COLORS  = ["#C4A49A", "#8FA49C", "#8EA3B2", "#D4B4A8", "#A8C0B4"];
const NOTE_COUNT = 7;
const GAME_SECS  = 30;

interface NoteData {
  id: number;
  symbol: string;
  color: string;
  size: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  pts: number;
}

let _id = 0;
function mkNote(): NoteData {
  const size = 1.6 + Math.random() * 1.6;
  return {
    id: _id++,
    symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
    color:  COLORS [Math.floor(Math.random() * COLORS.length)],
    size,
    x:  8 + Math.random() * 82,
    y:  8 + Math.random() * 72,
    vx: (0.35 + Math.random() * 0.45) * (Math.random() > 0.5 ? 1 : -1),
    vy: (0.35 + Math.random() * 0.45) * (Math.random() > 0.5 ? 1 : -1),
    pts: Math.max(5, Math.round((3.2 / size) * 20)),
  };
}

type BounceStage = "ready" | "playing" | "finished";

function BounceTab() {
  const [bStage, setBStage] = useState<BounceStage>("ready");
  const [noteIds, setNoteIds] = useState<number[]>([]);
  const [score, setScore]     = useState(0);
  const [timeLeft, setTime]   = useState(GAME_SECS);
  const [hi, setHi]           = useState(0);
  const [popups, setPopups]   = useState<{ id: number; x: number; y: number; pts: number }[]>([]);

  const dataRef   = useRef<Map<number, NoteData>>(new Map());
  const rafRef    = useRef<number>(0);
  const timerRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const scoreRef  = useRef(0);

  // 讀取最高分
  useEffect(() => {
    const saved = localStorage.getItem("lumiere-bounce");
    if (saved) setHi(+saved);
  }, []);

  const stopAll = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => () => stopAll(), [stopAll]);

  // RAF loop：直接操作 DOM，不經 React re-render
  const loop = useCallback(() => {
    dataRef.current.forEach((note, id) => {
      note.x += note.vx;
      note.y += note.vy;
      if (note.x < 2 || note.x > 93) { note.vx *= -1; note.x = Math.max(2, Math.min(93, note.x)); }
      if (note.y < 2 || note.y > 82) { note.vy *= -1; note.y = Math.max(2, Math.min(82, note.y)); }
      const el = document.getElementById(`bn-${id}`);
      if (el) { el.style.left = `${note.x}%`; el.style.top = `${note.y}%`; }
    });
    rafRef.current = requestAnimationFrame(loop);
  }, []);

  const startGame = useCallback(() => {
    stopAll();
    dataRef.current.clear();
    const notes = Array.from({ length: NOTE_COUNT }, mkNote);
    notes.forEach(n => dataRef.current.set(n.id, n));
    setNoteIds(notes.map(n => n.id));
    scoreRef.current = 0;
    setScore(0);
    setTime(GAME_SECS);
    setBStage("playing");

    rafRef.current = requestAnimationFrame(loop);

    timerRef.current = setInterval(() => {
      setTime(t => {
        if (t <= 1) {
          stopAll();
          setBStage("finished");
          const final = scoreRef.current;
          setHi(prev => {
            if (final > prev) {
              localStorage.setItem("lumiere-bounce", String(final));
              return final;
            }
            return prev;
          });
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, [loop, stopAll]);

  const clickNote = useCallback((id: number, e: MouseEvent<HTMLButtonElement>) => {
    const note = dataRef.current.get(id);
    if (!note) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const pid = Date.now() + Math.random();
    setPopups(p => [...p, { id: pid, x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, pts: note.pts }]);
    setTimeout(() => setPopups(p => p.filter(x => x.id !== pid)), 650);

    scoreRef.current += note.pts;
    setScore(scoreRef.current);

    // 重生音符
    const fresh = mkNote();
    dataRef.current.delete(id);
    dataRef.current.set(fresh.id, fresh);
    setNoteIds(prev => prev.map(n => n === id ? fresh.id : n));
  }, []);

  return (
    <div className="flex flex-col" style={{ height: "340px" }}>
      {/* 狀態列 */}
      {bStage === "playing" && (
        <div className="flex items-center justify-between px-5 py-2" style={{ borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.72rem", color: "var(--rose)" }}>
            {String(timeLeft).padStart(2, "0")} s
          </span>
          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.72rem", color: "var(--ink-mid)" }}>
            {score} pts
          </span>
        </div>
      )}

      {/* Ready */}
      {bStage === "ready" && (
        <div className="flex flex-col items-center justify-center flex-1 gap-4 px-6 text-center">
          <div style={{ fontSize: "2rem", opacity: 0.35, letterSpacing: "0.4em" }}>♩ ♪ ♫ ♬</div>
          <p style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", fontSize: "1.1rem", color: "var(--ink)" }}>點擊跳動的音符得分</p>
          <p style={{ fontSize: "0.72rem", color: "var(--ink-faint)", letterSpacing: "0.1em" }}>30 秒內盡可能點擊音符</p>
          <button onClick={startGame} className="mt-2 uppercase tracking-widest text-xs py-3 px-8 transition-all duration-200"
            style={{ background: "var(--ink)", color: "var(--paper)" }}>
            開始遊戲
          </button>
          {hi > 0 && <p style={{ fontSize: "0.65rem", color: "var(--ink-faint)", letterSpacing: "0.15em" }}>最高分：{hi}</p>}
        </div>
      )}

      {/* Playing */}
      {bStage === "playing" && (
        <div className="relative flex-1 overflow-hidden" style={{ background: "var(--cream)" }}>
          {noteIds.map(id => {
            const n = dataRef.current.get(id);
            if (!n) return null;
            return (
              <button
                key={id}
                id={`bn-${id}`}
                onClick={(e) => clickNote(id, e)}
                className="absolute select-none transition-transform active:scale-75"
                style={{
                  left: `${n.x}%`, top: `${n.y}%`,
                  fontSize: `${n.size}rem`,
                  color: n.color,
                  background: "none", border: "none",
                  cursor: "pointer",
                  transform: "translate(-50%,-50%)",
                  lineHeight: 1,
                  textShadow: `0 0 16px ${n.color}50`,
                  userSelect: "none",
                }}
              >
                {n.symbol}
              </button>
            );
          })}
        </div>
      )}

      {/* Finished */}
      {bStage === "finished" && (
        <div className="flex flex-col items-center justify-center flex-1 gap-3 text-center px-6">
          <p className="uppercase" style={{ fontSize: "0.6rem", letterSpacing: "0.4em", color: "var(--ink-faint)" }}>Game Over</p>
          <p style={{ fontFamily: "var(--font-playfair)", fontSize: "3rem", color: "var(--rose)", lineHeight: 1 }}>{score}</p>
          {score >= hi && score > 0 && (
            <p className="uppercase" style={{ fontSize: "0.65rem", color: "var(--rose)", letterSpacing: "0.2em" }}>新紀錄 ✦</p>
          )}
          <p style={{ fontSize: "0.7rem", color: "var(--ink-faint)", letterSpacing: "0.1em" }}>最高分：{hi}</p>
          <button onClick={startGame} className="mt-2 uppercase tracking-widest text-xs py-2.5 px-7 transition-all duration-200"
            style={{ background: "var(--ink)", color: "var(--paper)" }}>
            再玩一次
          </button>
        </div>
      )}

      {/* 得分飄字（fixed 定位，相對視窗） */}
      {popups.map(p => (
        <div key={p.id} className="fixed pointer-events-none z-[200]"
          style={{
            left: p.x, top: p.y,
            transform: "translate(-50%,-50%)",
            fontFamily: "var(--font-playfair)",
            fontSize: "1rem", fontStyle: "italic",
            color: "var(--rose)",
            animation: "fortune-reveal 0.65s ease forwards",
          }}>
          +{p.pts}
        </div>
      ))}
    </div>
  );
}

/* ─── 主 Modal ─── */
type Tab = "fortune" | "bounce";

interface Props { onClose: () => void; }

export default function MiniGamesModal({ onClose }: Props) {
  const [tab, setTab] = useState<Tab>("bounce");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      style={{ background: "rgba(28,22,16,0.78)", backdropFilter: "blur(7px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>

      <div className="relative w-full max-w-sm overflow-hidden"
        style={{ background: "var(--paper)", border: "1px solid var(--border)" }}>

        {/* 關閉 */}
        <button onClick={onClose} className="absolute top-3 right-4 transition-opacity hover:opacity-40 z-10"
          style={{ color: "var(--ink-faint)", fontSize: "0.85rem" }}>✕</button>

        {/* 分頁標籤 */}
        <div className="flex" style={{ borderBottom: "1px solid var(--border)" }}>
          {([["bounce", "彈跳音符"], ["fortune", "今日運氣"]] as [Tab, string][]).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              className="flex-1 py-3.5 uppercase tracking-widest text-xs transition-colors duration-200"
              style={{
                color: tab === key ? "var(--ink)" : "var(--ink-faint)",
                borderBottom: tab === key ? "2px solid var(--rose)" : "2px solid transparent",
                marginBottom: "-1px",
                background: "none",
              }}>
              {label}
            </button>
          ))}
        </div>

        {/* 分頁內容 */}
        {tab === "fortune" ? <FortuneTab /> : <BounceTab />}
      </div>
    </div>
  );
}
