export default function Footer() {
  return (
    <footer style={{ background: "var(--cream)", borderTop: "1px solid var(--border)" }}>
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-12 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
        <div>
          <p
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.3rem",
              fontStyle: "italic",
              color: "var(--ink)",
              letterSpacing: "0.08em",
              marginBottom: "0.25rem",
            }}
          >
            Lumière
          </p>
          <p style={{ fontSize: "0.68rem", color: "var(--ink-faint)", letterSpacing: "0.15em" }}>
            2026 CONCERT TOUR
          </p>
        </div>

        <ul className="flex flex-wrap gap-5 md:gap-6" style={{ fontSize: "0.72rem", letterSpacing: "0.2em", color: "var(--ink-mid)" }}>
          {[["關於", "#about"], ["歌單", "#setlist"], ["場次", "#schedule"], ["購票", "#tickets"]].map(([label, href]) => (
            <li key={label}>
              <a href={href} className="uppercase hover:opacity-60 transition-opacity">{label}</a>
            </li>
          ))}
        </ul>

        <p style={{ fontSize: "0.65rem", color: "var(--ink-faint)", letterSpacing: "0.1em" }}>
          © 2026 Lumière Live.<br className="md:hidden" /> All rights reserved.
        </p>
      </div>
    </footer>
  );
}
