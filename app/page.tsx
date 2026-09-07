"use client";

import { useRef, useEffect, useState } from "react";
import FadeIn from "./components/FadeIn";
import MiniGamesModal from "./components/MiniGamesModal";
import WelcomeGate from "./components/WelcomeGate";

const songs = [
  { no: "01", title: "序·光", duration: "4:12" },
  { no: "02", title: "午夜的邊界", duration: "3:58" },
  { no: "03", title: "空白", duration: "5:03" },
  { no: "04", title: "光年之外", duration: "4:27" },
  { no: "05", title: "碎片", duration: "3:44" },
  { no: "06", title: "無聲勝有聲", duration: "6:15" },
  { no: "07", title: "霧中行路", duration: "4:50" },
  { no: "08", title: "尾聲·影", duration: "5:30" },
];

const shows = [
  {
    date: "OCT 03",
    year: "2026",
    city: "台北",
    venue: "台北小巨蛋",
    status: "on-sale",
  },
  {
    date: "OCT 04",
    year: "2026",
    city: "台北",
    venue: "台北小巨蛋",
    status: "on-sale",
  },
  {
    date: "OCT 10",
    year: "2026",
    city: "台中",
    venue: "台中洲際棒球場",
    status: "soon",
  },
  {
    date: "OCT 17",
    year: "2026",
    city: "高雄",
    venue: "高雄巨蛋",
    status: "soon",
  },
  {
    date: "OCT 24",
    year: "2026",
    city: "新竹",
    venue: "新竹市立體育場",
    status: "soon",
  },
  {
    date: "OCT 31",
    year: "2026",
    city: "新竹",
    venue: "新竹市立體育場",
    status: "soon",
  },
];

export default function Home() {
  const [gameOpen, setGameOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [showGate, setShowGate] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("lumiere-name");
    if (saved) {
      setUserName(saved);
    } else {
      setShowGate(true);
    }
  }, []);

  const handleNameSubmit = (name: string) => {
    if (name) {
      setUserName(name);
      localStorage.setItem("lumiere-name", name);
    }
    setShowGate(false);
  };

  // Hero 文字：滾動時向上淡出
  const heroTextRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const el = heroTextRef.current;
      if (el) {
        const y = window.scrollY;
        el.style.transform = `translateY(${y * 0.14}px)`;
        el.style.opacity = String(Math.max(0, 1 - y / 550));
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: "var(--paper)", color: "var(--ink)" }}>
      {/* ── Hero ── */}
      <section
        className="relative min-h-screen flex flex-col justify-end overflow-hidden"
        style={{
          background: "#1C1610",
        }}
      >
        {/* 裝飾漸層光暈 */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 70% 30%, rgba(196,164,154,0.18) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(143,164,156,0.1) 0%, transparent 60%)",
          }}
        />
        {/* 底部漸層（讓文字更易讀） */}
        <div
          className="absolute bottom-0 left-0 right-0 h-2/3 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(28,22,16,0.85) 60%, #1C1610 100%)",
          }}
        />

        {/* Hero 文字（滾動淡出） */}
        <div
          ref={heroTextRef}
          className="relative max-w-6xl mx-auto w-full px-5 md:px-8 pb-14 md:pb-20 pt-32 md:pt-40"
          style={{ willChange: "transform, opacity" }}
        >
          {/* 個人化歡迎訊息 */}
          {userName && (
            <p
              className="mb-3"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "0.9rem",
                fontStyle: "italic",
                letterSpacing: "0.12em",
                color: "var(--rose)",
                opacity: 0.9,
              }}
            >
              歡迎，{userName}
            </p>
          )}

          <p
            className="uppercase mb-5 md:mb-8"
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.4em",
              color: "rgba(242,236,228,0.4)",
            }}
          >
            2026 全台巡迴演唱會
          </p>
          <h1
            className="leading-none mb-8 md:mb-10"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(3.8rem, 13vw, 11rem)",
              color: "var(--paper)",
              letterSpacing: "-0.01em",
            }}
          >
            Lumi
            <span style={{ fontStyle: "italic", color: "var(--rose)" }}>è</span>
            re
          </h1>
          <div className="flex flex-col gap-7 md:flex-row md:items-end md:gap-20">
            <p
              className="max-w-xs leading-relaxed"
              style={{
                color: "rgba(242,236,228,0.55)",
                fontSize: "0.9rem",
                lineHeight: "1.9",
              }}
            >
              在光與影的交界，聲音成為詩。
              <br />
              一場以情感為語言的音樂旅程，
              <br />
              等待你共同見證。
            </p>
            <a
              href="#tickets"
              className="self-start uppercase tracking-widest text-xs py-3.5 px-8 transition-all duration-300"
              style={{ background: "var(--rose)", color: "var(--paper)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "var(--paper)";
                (e.currentTarget as HTMLElement).style.color = "var(--ink)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "var(--rose)";
                (e.currentTarget as HTMLElement).style.color = "var(--paper)";
              }}
            >
              立即購票
            </a>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section
        id="about"
        className="py-16 md:py-28 px-5 md:px-8"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-24 items-start">
            {/* 左：大引言 */}
            <FadeIn>
              <p
                className="uppercase mb-4"
                style={{
                  fontSize: "0.63rem",
                  letterSpacing: "0.4em",
                  color: "var(--ink-faint)",
                }}
              >
                About
              </p>
              <p
                className="leading-tight"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(2rem, 5vw, 2.8rem)",
                  fontStyle: "italic",
                  color: "var(--ink)",
                  lineHeight: "1.25",
                }}
              >
                「光影
                <br />
                之間的
                <br />
                餘韻」
              </p>
            </FadeIn>

            {/* 右：文字 + 數據 */}
            <div>
              <FadeIn delay={100}>
                <div
                  className="space-y-5"
                  style={{
                    color: "var(--ink-mid)",
                    lineHeight: "2",
                    fontSize: "0.92rem",
                  }}
                >
                  <p>
                    Lumière 2026
                    是年度最受期待的音樂盛事。歷經三年沉澱，藝人帶著全新專輯《光影》重返舞台，以沉浸式舞台設計與視覺藝術，打造一場突破感官的現場體驗。
                  </p>
                  <p>
                    演出涵蓋全新創作及歷年代表作，搭配大型 LED
                    矩陣、煙霧特效與現場管絃樂團，每一場都是獨一無二的演出。
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={200}>
                <div
                  className="flex gap-10 mt-10 pt-8"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  {[
                    ["6", "場次"],
                    ["60,000+", "觀眾"],
                    ["5", "城市"],
                  ].map(([num, label]) => (
                    <div key={label}>
                      <p
                        style={{
                          fontFamily: "var(--font-playfair)",
                          fontSize: "2rem",
                          color: "var(--ink)",
                        }}
                      >
                        {num}
                      </p>
                      <p
                        style={{
                          fontSize: "0.65rem",
                          letterSpacing: "0.18em",
                          color: "var(--ink-faint)",
                        }}
                      >
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── Setlist ── */}
      <section
        id="setlist"
        className="py-16 md:py-28 px-5 md:px-8"
        style={{
          background: "var(--cream)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex items-baseline justify-between mb-8 md:mb-12">
              <p
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
                  fontStyle: "italic",
                  color: "var(--ink)",
                }}
              >
                精選歌單
              </p>
              <span
                className="uppercase"
                style={{
                  fontSize: "0.62rem",
                  letterSpacing: "0.4em",
                  color: "var(--ink-faint)",
                }}
              >
                Setlist
              </span>
            </div>
          </FadeIn>
          <div>
            {songs.map((song, i) => (
              <FadeIn key={song.no} delay={i * 55} y={16}>
                <div
                  className="flex items-center justify-between py-4 md:py-5"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    <span
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: "0.65rem",
                        color: "var(--ink-faint)",
                        width: "1.4rem",
                        flexShrink: 0,
                      }}
                    >
                      {song.no}
                    </span>
                    <span
                      style={{
                        fontSize: "0.95rem",
                        color: "var(--ink)",
                        fontFamily:
                          i % 3 === 1 ? "var(--font-playfair)" : "inherit",
                        fontStyle: i % 3 === 1 ? "italic" : "normal",
                      }}
                    >
                      {song.title}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.72rem",
                      color: "var(--ink-faint)",
                      flexShrink: 0,
                    }}
                  >
                    {song.duration}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Schedule ── */}
      <section
        id="schedule"
        className="py-16 md:py-28 px-5 md:px-8"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p
              className="uppercase mb-1"
              style={{
                fontSize: "0.63rem",
                letterSpacing: "0.4em",
                color: "var(--ink-faint)",
              }}
            >
              Schedule
            </p>
            <p
              className="mb-10 md:mb-14"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
                fontStyle: "italic",
                color: "var(--ink)",
              }}
            >
              演出場次
            </p>
          </FadeIn>
          <div>
            {shows.map((show, i) => (
              <FadeIn key={show.date + show.city} delay={i * 60} y={20}>
                <div
                  className="py-5 md:py-6"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 md:gap-8 flex-1 min-w-0">
                      <div className="shrink-0">
                        <p
                          style={{
                            fontFamily: "var(--font-geist-mono)",
                            fontSize: "0.68rem",
                            color: "var(--ink-faint)",
                            letterSpacing: "0.1em",
                          }}
                        >
                          {show.date}
                        </p>
                        <p
                          style={{
                            fontFamily: "var(--font-geist-mono)",
                            fontSize: "0.6rem",
                            color: "var(--ink-faint)",
                            opacity: 0.5,
                          }}
                        >
                          {show.year}
                        </p>
                      </div>
                      <div className="min-w-0">
                        <p
                          style={{
                            fontFamily: "var(--font-playfair)",
                            fontSize: "clamp(1.2rem, 4vw, 1.6rem)",
                            color: "var(--ink)",
                            fontStyle: "italic",
                          }}
                        >
                          {show.city}
                        </p>
                        <p
                          className="truncate"
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--ink-mid)",
                            marginTop: "0.1rem",
                          }}
                        >
                          {show.venue}
                        </p>
                      </div>
                    </div>
                    <span
                      className="shrink-0 self-center text-xs uppercase tracking-widest py-1.5 px-3 md:px-4"
                      style={
                        show.status === "on-sale"
                          ? {
                              border: "1px solid var(--rose)",
                              color: "var(--rose)",
                            }
                          : {
                              border: "1px solid var(--border)",
                              color: "var(--ink-faint)",
                            }
                      }
                    >
                      {show.status === "on-sale" ? "販售中" : "即將"}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mini-Games ── */}
      <section
        className="py-16 md:py-20 px-5 md:px-8 text-center"
        style={{
          background: "var(--cream)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <FadeIn>
          <p
            className="uppercase mb-3"
            style={{
              fontSize: "0.62rem",
              letterSpacing: "0.4em",
              color: "var(--ink-faint)",
            }}
          >
            Lumière × Mini-Games
          </p>
          <p
            className="mb-2"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.1rem",
              fontStyle: "italic",
              color: "var(--ink-mid)",
            }}
          >
            演唱會前，來場小遊戲熱身
          </p>
          <p
            className="mb-7"
            style={{
              fontSize: "0.72rem",
              color: "var(--ink-faint)",
              letterSpacing: "0.08em",
            }}
          >
            抽今日運氣 · 彈跳音符
          </p>
          <button
            onClick={() => setGameOpen(true)}
            className="uppercase tracking-widest text-xs py-3.5 px-9 transition-all duration-300"
            style={{ border: "1px solid var(--ink)", color: "var(--ink)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--ink)";
              (e.currentTarget as HTMLElement).style.color = "var(--paper)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "var(--ink)";
            }}
          >
            開啟小遊戲
          </button>
        </FadeIn>
      </section>

      {/* Mini-Games Modal */}
      {gameOpen && <MiniGamesModal onClose={() => setGameOpen(false)} />}

      {/* Welcome Gate */}
      {showGate && <WelcomeGate onSubmit={handleNameSubmit} />}

      {/* ── Tickets CTA ── */}
      <section
        id="tickets"
        className="relative overflow-hidden"
        style={{ background: "#1C1610" }}
      >
        {/* 裝飾漸層 */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 80% 50%, rgba(196,164,154,0.14) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 10% 20%, rgba(143,164,156,0.08) 0%, transparent 55%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-5 md:px-8 py-24 md:py-36">
          <FadeIn>
            <p
              className="uppercase mb-4"
              style={{
                fontSize: "0.63rem",
                letterSpacing: "0.4em",
                color: "rgba(242,236,228,0.35)",
              }}
            >
              Tickets
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <h2
              className="mb-5 leading-tight"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(2.2rem, 6vw, 5rem)",
                color: "var(--paper)",
                fontStyle: "italic",
              }}
            >
              共赴一場
              <br />
              光的盛宴
            </h2>
          </FadeIn>
          <FadeIn delay={200}>
            <p
              className="mb-10 max-w-sm leading-relaxed"
              style={{
                color: "rgba(242,236,228,0.5)",
                fontSize: "0.88rem",
                lineHeight: "1.9",
              }}
            >
              名額有限，售完為止。
              <br />
              現在購票享早鳥優惠，不留遺憾。
            </p>
            <a
              href="#"
              className="inline-block uppercase text-xs tracking-widest py-4 px-8 md:px-10 transition-all duration-300"
              style={{ background: "var(--rose)", color: "var(--paper)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "var(--paper)";
                (e.currentTarget as HTMLElement).style.color = "var(--ink)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "var(--rose)";
                (e.currentTarget as HTMLElement).style.color = "var(--paper)";
              }}
            >
              前往購票平台
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
