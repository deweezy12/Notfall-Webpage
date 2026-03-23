import { useState, useEffect } from "react";

const sections = ["Hello", "Intro", "Research", "References", "Experience", "Contact"];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Hello");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);

      const current = sections.find((s) => {
        const el = document.getElementById(s.toLowerCase());
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom > 120;
      });
      if (current) setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(10,10,10,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => scrollTo("hello")}
          className="text-sm font-semibold tracking-widest text-white/70 hover:text-white uppercase transition-colors"
        >
          OJJ
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {sections.map((s) => (
            <li key={s}>
              <button
                onClick={() => scrollTo(s)}
                className={`text-xs tracking-widest uppercase transition-colors font-medium ${
                  active === s ? "text-white" : "text-white/40 hover:text-white/80"
                }`}
              >
                {s}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 border-t border-white/10 px-6 py-6 flex flex-col gap-5">
          {sections.map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className="text-left text-sm tracking-widest uppercase text-white/60 hover:text-white transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
