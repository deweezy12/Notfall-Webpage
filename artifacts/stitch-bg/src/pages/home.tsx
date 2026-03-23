import { StitchBackground } from "@/components/StitchBackground";
import { useEffect, useRef, useState } from "react";

/* ─── Scroll-reveal hook ─────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("revealed"); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function RevealBlock({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal-block ${className}`}>{children}</div>;
}

function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-14">
      <span className="text-xs text-white/20 tracking-widest font-mono">{n}</span>
      <span className="flex-1 h-px bg-white/10" />
      <span className="text-xs text-white/20 tracking-widest uppercase font-mono">{label}</span>
    </div>
  );
}

/* ─── Section dot navigator ──────────────────────────────── */
const SECTIONS = [
  { id: "hello",      label: "Hello" },
  { id: "intro",      label: "Intro" },
  { id: "research",   label: "Research" },
  { id: "references", label: "References" },
  { id: "experience", label: "Experience" },
  { id: "contact",    label: "Contact" },
];

function SideDots({ active, pastHero }: { active: string; pastHero: boolean }) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div
      className="fixed left-7 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4 transition-opacity duration-500 hidden md:flex"
      style={{ opacity: pastHero ? 1 : 0, pointerEvents: pastHero ? "auto" : "none" }}
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            title={s.label}
            className="group relative flex items-center justify-center"
            style={{ width: 20, height: 20 }}
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width:  isActive ? 8 : 5,
                height: isActive ? 8 : 5,
                background: isActive ? "#fff" : "rgba(255,255,255,0.25)",
                boxShadow: isActive ? "0 0 0 2px rgba(255,255,255,0.15)" : "none",
              }}
            />
            {/* Tooltip */}
            <span
              className="absolute left-6 whitespace-nowrap text-xs font-mono tracking-widest uppercase pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {s.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────────── */
export default function Home() {
  const [scrollY, setScrollY]       = useState(0);
  const [active, setActive]         = useState("hello");
  const [pastHero, setPastHero]     = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      setScrollY(sy);

      const heroH = heroRef.current?.offsetHeight ?? window.innerHeight;
      setPastHero(sy > heroH * 0.6);

      // Determine active section
      const current = SECTIONS.slice().reverse().find((s) => {
        const el = document.getElementById(s.id);
        if (!el) return false;
        return el.getBoundingClientRect().top <= window.innerHeight * 0.4;
      });
      if (current) setActive(current.id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const heroH       = typeof window !== "undefined" ? window.innerHeight : 800;
  // Parallax: background moves at 40% of scroll speed (slower = deeper feel)
  const parallaxY   = scrollY * 0.45;
  // Fade: start at 15% scroll through hero, fully black by 80%
  const start       = heroH * 0.15;
  const end         = heroH * 0.80;
  const fadeOpacity = Math.min(1, Math.max(0, (scrollY - start) / (end - start)));

  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }
        body { background: #0a0a0a; }

        .reveal-block {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1);
        }
        .reveal-block.revealed { opacity: 1; transform: translateY(0); }

        .pill-tag {
          display: inline-block;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 999px;
          padding: 4px 14px;
          font-size: 11px;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.45);
          text-transform: uppercase;
          font-family: monospace;
        }

        .card-hover { transition: background 0.25s, border-color 0.25s; }
        .card-hover:hover {
          background: rgba(255,255,255,0.04) !important;
          border-color: rgba(255,255,255,0.14) !important;
        }

        section + section { border-top: 1px solid rgba(255,255,255,0.06); }
      `}</style>

      {/* ── Side dots ──────────────────────────────────── */}
      <SideDots active={active} pastHero={pastHero} />

      {/* ── HELLO ──────────────────────────────────────── */}
      <section
        ref={heroRef}
        id="hello"
        className="relative w-full overflow-hidden"
        style={{ height: "100svh" }}
      >
        {/* Parallax background — moves slower than scroll */}
        <div
          className="absolute inset-x-0 pointer-events-none"
          style={{
            top: `-${parallaxY * 0.3}px`,
            bottom: `-${parallaxY * 0.3}px`,
            willChange: "transform",
          }}
        >
          <StitchBackground />
        </div>

        {/* Fade-to-black overlay driven by scroll */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: "#0a0a0a", opacity: fadeOpacity }}
        />

        {/* Name — single horizontal line */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4"
          style={{ transform: `translateY(${-parallaxY * 0.15}px)` }}
        >
          <h1
            className="font-bold text-white leading-none tracking-tight whitespace-nowrap"
            style={{
              fontSize: "clamp(2.4rem, 7.5vw, 8.5rem)",
              textShadow: "0 4px 80px rgba(0,0,0,0.35)",
              opacity: 1 - fadeOpacity * 1.4,
            }}
          >
            Oliver Jan Jarosik
          </h1>
          <p
            className="mt-5 font-mono uppercase tracking-widest text-white/65"
            style={{
              fontSize: "clamp(0.6rem, 1.3vw, 0.9rem)",
              letterSpacing: "0.24em",
              opacity: 1 - fadeOpacity * 1.6,
            }}
          >
            Computer Vision &amp; AI Engineer
          </p>
        </div>

        {/* Scroll arrow */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce"
          style={{ opacity: Math.max(0, 0.5 - fadeOpacity * 2) }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* ── INTRO ──────────────────────────────────────── */}
      <section id="intro" className="py-32 px-8 md:px-24 max-w-6xl mx-auto w-full">
        <RevealBlock>
          <SectionLabel n="01" label="Intro" />
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Building machines that see, understand and act.
            </h2>
            <div className="space-y-5 text-white/55 text-base leading-relaxed">
              <p>
                I'm Oliver, a Computer Vision and AI Engineer passionate about pushing the boundaries of what machines can perceive. I design and build systems that interpret visual data — from real-time object detection to scene understanding and generative models.
              </p>
              <p>
                My work sits at the intersection of deep learning, robotics and applied research. I care about building things that are not only technically rigorous but genuinely useful in the real world.
              </p>
              <p>Currently open to new collaborations, research partnerships and challenging engineering roles.</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Computer Vision", "Deep Learning", "PyTorch", "Transformers", "3D Vision", "Robotics"].map((t) => (
                  <span key={t} className="pill-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ── RESEARCH ───────────────────────────────────── */}
      <section id="research" className="py-32 px-8 md:px-24 max-w-6xl mx-auto w-full">
        <RevealBlock>
          <SectionLabel n="02" label="Research" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-14">Selected Work</h2>
        </RevealBlock>
        <div className="space-y-4">
          {[
            {
              year: "2024",
              title: "Self-Supervised Depth Estimation in Unstructured Environments",
              venue: "CVPR 2024",
              tags: ["Monocular Depth", "Self-Supervised", "Robotics"],
              desc: "Novel self-supervised framework for metric depth estimation that generalises across diverse outdoor scenes without ground-truth supervision.",
            },
            {
              year: "2023",
              title: "Efficient Vision Transformers for Real-Time Object Detection",
              venue: "ICCV 2023",
              tags: ["ViT", "Object Detection", "Efficiency"],
              desc: "Lightweight attention mechanism enabling vision transformers to run at 60fps on edge hardware while maintaining state-of-the-art accuracy.",
            },
            {
              year: "2023",
              title: "Semantic Scene Graph Generation from Egocentric Video",
              venue: "ECCV 2023",
              tags: ["Scene Understanding", "Graph Neural Networks"],
              desc: "Temporal scene graph generation model that captures dynamic relationships between objects in first-person video streams.",
            },
          ].map((p, i) => (
            <RevealBlock key={i}>
              <div className="card-hover border border-white/8 rounded-2xl p-7 cursor-pointer group" style={{ background: "rgba(255,255,255,0.02)" }}>
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                  <span className="text-white/20 font-mono text-xs shrink-0 mt-1">{p.year}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-white text-lg font-semibold leading-snug">{p.title}</h3>
                      <span className="text-white/20 text-lg shrink-0 group-hover:text-white/60 transition-colors">↗</span>
                    </div>
                    <p className="text-white/30 text-xs font-mono tracking-wider mt-1 mb-3">{p.venue}</p>
                    <p className="text-white/45 text-sm leading-relaxed mb-4">{p.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t) => <span key={t} className="pill-tag">{t}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ── REFERENCES ─────────────────────────────────── */}
      <section id="references" className="py-32 px-8 md:px-24 max-w-6xl mx-auto w-full">
        <RevealBlock>
          <SectionLabel n="03" label="References" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-14">What people say</h2>
        </RevealBlock>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { quote: "Oliver has an exceptional ability to translate complex research into working systems. His contributions to our vision pipeline were transformative.", name: "Prof. Dr. Maria Schmidt", role: "Head of Robotics Lab, TU Munich" },
            { quote: "One of the strongest AI engineers I've worked with. Oliver combines deep theoretical knowledge with pragmatic engineering — a rare combination.", name: "Dr. James Harrington", role: "Research Lead, Waymo" },
            { quote: "Oliver's work on our perception stack reduced latency by 40% while improving detection accuracy. He works fast, communicates clearly, and delivers.", name: "Lena Fischer", role: "VP Engineering, Agile Robots" },
            { quote: "His research instinct and engineering discipline made him stand out immediately. Oliver sees problems that others miss and solves them elegantly.", name: "Prof. Alex Chen", role: "Computer Vision Group, ETH Zürich" },
          ].map((r, i) => (
            <RevealBlock key={i}>
              <div className="card-hover border border-white/8 rounded-2xl p-7 h-full" style={{ background: "rgba(255,255,255,0.02)" }}>
                <p className="text-white/60 text-base leading-relaxed mb-6 italic">"{r.quote}"</p>
                <p className="text-white text-sm font-semibold">{r.name}</p>
                <p className="text-white/30 text-xs font-mono mt-0.5">{r.role}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ── EXPERIENCE ─────────────────────────────────── */}
      <section id="experience" className="py-32 px-8 md:px-24 max-w-6xl mx-auto w-full">
        <RevealBlock>
          <SectionLabel n="04" label="Experience" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-14">Career</h2>
        </RevealBlock>
        <div className="space-y-5">
          {[
            { period: "2023 – Now",  role: "Senior AI Engineer",  org: "Agile Robots AG",  location: "Munich, Germany",      desc: "Leading computer vision for next-gen humanoid robot perception. Designing real-time 3D object detection and manipulation pipelines." },
            { period: "2022 – 2023", role: "Research Engineer",   org: "Waymo",             location: "San Francisco, USA",   desc: "Developed self-supervised learning approaches for LiDAR-camera fusion, improving long-range object detection in adverse weather." },
            { period: "2020 – 2022", role: "PhD Researcher",      org: "ETH Zürich",        location: "Zürich, Switzerland",  desc: "Investigated efficient neural architectures for real-time semantic understanding. Published at CVPR, ICCV and ECCV." },
            { period: "2019 – 2020", role: "ML Engineer Intern",  org: "DeepMind",          location: "London, UK",           desc: "Worked on visual representation learning and data-efficient transfer learning for downstream robotics tasks." },
          ].map((e, i) => (
            <RevealBlock key={i}>
              <div className="card-hover border border-white/8 rounded-2xl p-6 flex flex-col md:flex-row md:items-start gap-6" style={{ background: "rgba(255,255,255,0.02)" }}>
                <span className="text-white/25 text-xs font-mono shrink-0 md:w-28 md:pt-0.5">{e.period}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <h3 className="text-white font-semibold text-base">{e.role}</h3>
                    <span className="text-white/20 text-xs font-mono shrink-0">{e.location}</span>
                  </div>
                  <p className="text-white/35 text-xs font-mono tracking-wider mb-3">{e.org}</p>
                  <p className="text-white/50 text-sm leading-relaxed">{e.desc}</p>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────────────── */}
      <section id="contact" className="py-32 px-8 md:px-24 max-w-6xl mx-auto w-full">
        <RevealBlock>
          <SectionLabel n="05" label="Contact" />
          <h2 className="font-bold text-white leading-tight mb-8" style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>
            Let's build<br />something great.
          </h2>
          <p className="text-white/45 text-lg max-w-lg leading-relaxed mb-10">
            Open to research collaborations, engineering roles and interesting conversations. Reach out any time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <a href="mailto:oliver@jarosik.io" className="inline-flex items-center gap-2 bg-white text-black text-sm font-semibold px-6 py-3 rounded-full hover:bg-white/90 transition-colors">
              oliver@jarosik.io ↗
            </a>
            <div className="flex items-center gap-5">
              {[{ label: "GitHub", href: "#" }, { label: "LinkedIn", href: "#" }, { label: "Google Scholar", href: "#" }].map((l) => (
                <a key={l.label} href={l.href} className="text-white/35 text-sm hover:text-white/80 transition-colors font-mono tracking-wide">{l.label}</a>
              ))}
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ── FOOTER ─────────────────────────────────────── */}
      <footer className="border-t border-white/6 px-8 md:px-24 py-8 max-w-6xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-white/20 text-xs font-mono">
          <span>© 2024 Oliver Jan Jarosik</span>
          <span>Computer Vision &amp; AI Engineer</span>
        </div>
      </footer>
    </>
  );
}
