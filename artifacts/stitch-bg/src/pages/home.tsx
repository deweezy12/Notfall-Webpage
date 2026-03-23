import { StitchBackground } from "@/components/StitchBackground";
import { Nav } from "@/components/Nav";
import { useEffect, useRef } from "react";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
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

function RevealBlock({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal-block ${className}`}>
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }

        body { background: #0a0a0a; }

        .reveal-block {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .reveal-block.revealed {
          opacity: 1;
          transform: translateY(0);
        }

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

        .card-hover {
          transition: background 0.25s, border-color 0.25s;
        }
        .card-hover:hover {
          background: rgba(255,255,255,0.04);
          border-color: rgba(255,255,255,0.14);
        }

        .link-arrow::after {
          content: " →";
        }

        section + section {
          border-top: 1px solid rgba(255,255,255,0.06);
        }
      `}</style>

      <Nav />

      {/* ── HELLO ────────────────────────────────────── */}
      <section id="hello" className="relative w-full h-screen overflow-hidden flex flex-col">
        <StitchBackground />
        <div className="absolute inset-0 flex flex-col items-start justify-end z-10 pb-20 px-8 md:px-20">
          <div>
            <p className="text-white/60 text-sm tracking-widest uppercase mb-4 font-mono">
              Computer Vision &amp; AI Engineer
            </p>
            <h1
              className="font-bold text-white leading-none tracking-tight"
              style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)", textShadow: "0 0 80px rgba(0,0,0,0.6)" }}
            >
              Oliver<br />Jan<br />Jarosik
            </h1>
          </div>
          <div className="mt-12 animate-bounce">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/40">
              <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── INTRO ────────────────────────────────────── */}
      <section id="intro" className="py-32 px-8 md:px-20 max-w-6xl mx-auto w-full">
        <RevealBlock>
          <SectionLabel n="01" label="Intro" />
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-8">
                Building machines that see, understand and act.
              </h2>
            </div>
            <div className="space-y-6 text-white/55 text-base leading-relaxed">
              <p>
                I'm Oliver, a Computer Vision and AI Engineer passionate about pushing the boundaries of what machines can perceive. I design and build systems that interpret visual data — from real-time object detection to scene understanding and generative models.
              </p>
              <p>
                My work sits at the intersection of deep learning, robotics and applied research. I care about building things that are not only technically rigorous but genuinely useful in the real world.
              </p>
              <p>
                Currently open to new collaborations, research partnerships and challenging engineering roles.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Computer Vision", "Deep Learning", "PyTorch", "Transformers", "3D Vision", "Robotics"].map((t) => (
                  <span key={t} className="pill-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ── RESEARCH ─────────────────────────────────── */}
      <section id="research" className="py-32 px-8 md:px-20 max-w-6xl mx-auto w-full">
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
            <RevealBlock key={i} className={`delay-${i}`}>
              <div
                className="card-hover border border-white/8 rounded-2xl p-7 cursor-pointer group"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                  <span className="text-white/20 font-mono text-xs shrink-0 mt-1">{p.year}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-white text-lg font-semibold leading-snug group-hover:text-white/90 transition-colors">
                        {p.title}
                      </h3>
                      <span className="text-white/20 text-lg shrink-0 group-hover:text-white/60 transition-colors">↗</span>
                    </div>
                    <p className="text-white/30 text-xs font-mono tracking-wider mt-1 mb-3">{p.venue}</p>
                    <p className="text-white/45 text-sm leading-relaxed mb-4">{p.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span key={t} className="pill-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ── REFERENCES ───────────────────────────────── */}
      <section id="references" className="py-32 px-8 md:px-20 max-w-6xl mx-auto w-full">
        <RevealBlock>
          <SectionLabel n="03" label="References" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-14">What people say</h2>
        </RevealBlock>

        <div className="grid md:grid-cols-2 gap-5">
          {[
            {
              quote: "Oliver has an exceptional ability to translate complex research into working systems. His contributions to our vision pipeline were transformative.",
              name: "Prof. Dr. Maria Schmidt",
              role: "Head of Robotics Lab, TU Munich",
            },
            {
              quote: "One of the strongest AI engineers I've worked with. Oliver combines deep theoretical knowledge with pragmatic engineering — a rare combination.",
              name: "Dr. James Harrington",
              role: "Research Lead, Waymo",
            },
            {
              quote: "Oliver's work on our perception stack reduced latency by 40% while improving detection accuracy. He works fast, communicates clearly, and delivers.",
              name: "Lena Fischer",
              role: "VP Engineering, Agile Robots",
            },
            {
              quote: "His research instinct and engineering discipline made him stand out immediately. Oliver sees problems that others miss and solves them elegantly.",
              name: "Prof. Alex Chen",
              role: "Computer Vision Group, ETH Zürich",
            },
          ].map((r, i) => (
            <RevealBlock key={i}>
              <div
                className="card-hover border border-white/8 rounded-2xl p-7 h-full"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <p className="text-white/60 text-base leading-relaxed mb-6 italic">"{r.quote}"</p>
                <div>
                  <p className="text-white text-sm font-semibold">{r.name}</p>
                  <p className="text-white/30 text-xs font-mono mt-0.5">{r.role}</p>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ── EXPERIENCE ───────────────────────────────── */}
      <section id="experience" className="py-32 px-8 md:px-20 max-w-6xl mx-auto w-full">
        <RevealBlock>
          <SectionLabel n="04" label="Experience" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-14">Career</h2>
        </RevealBlock>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/8 hidden md:block" style={{ left: "120px" }} />
          <div className="space-y-10">
            {[
              {
                period: "2023 – Now",
                role: "Senior AI Engineer",
                org: "Agile Robots AG",
                location: "Munich, Germany",
                desc: "Leading computer vision for next-gen humanoid robot perception. Designing real-time 3D object detection and manipulation pipelines.",
              },
              {
                period: "2022 – 2023",
                role: "Research Engineer",
                org: "Waymo",
                location: "San Francisco, USA",
                desc: "Developed self-supervised learning approaches for LiDAR-camera fusion, improving long-range object detection in adverse weather.",
              },
              {
                period: "2020 – 2022",
                role: "PhD Researcher",
                org: "ETH Zürich",
                location: "Zürich, Switzerland",
                desc: "Investigated efficient neural architectures for real-time semantic understanding. Published at CVPR, ICCV and ECCV.",
              },
              {
                period: "2019 – 2020",
                role: "ML Engineer Intern",
                org: "DeepMind",
                location: "London, UK",
                desc: "Worked on visual representation learning and data-efficient transfer learning for downstream robotics tasks.",
              },
            ].map((e, i) => (
              <RevealBlock key={i}>
                <div className="flex flex-col md:flex-row gap-5 md:gap-0">
                  <div
                    className="md:text-right shrink-0 pr-10"
                    style={{ width: "120px", paddingRight: "40px" }}
                  >
                    <span className="text-white/25 text-xs font-mono">{e.period}</span>
                  </div>
                  <div
                    className="hidden md:flex items-start justify-center"
                    style={{ width: "1px", position: "relative", marginRight: "40px" }}
                  >
                    <div
                      className="w-2 h-2 rounded-full bg-white/40 border border-white/20 mt-1.5"
                      style={{ position: "relative", left: "-4px" }}
                    />
                  </div>
                  <div
                    className="card-hover border border-white/8 rounded-2xl p-6 flex-1"
                    style={{ background: "rgba(255,255,255,0.02)", marginLeft: "0px" }}
                  >
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <h3 className="text-white font-semibold text-base">{e.role}</h3>
                      <span className="text-white/20 text-xs font-mono shrink-0 mt-0.5">{e.location}</span>
                    </div>
                    <p className="text-white/35 text-xs font-mono tracking-wider mb-3">{e.org}</p>
                    <p className="text-white/50 text-sm leading-relaxed">{e.desc}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────── */}
      <section id="contact" className="py-32 px-8 md:px-20 max-w-6xl mx-auto w-full">
        <RevealBlock>
          <SectionLabel n="05" label="Contact" />
          <div className="flex flex-col items-start gap-10">
            <h2
              className="font-bold text-white leading-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
            >
              Let's build<br />something great.
            </h2>
            <p className="text-white/45 text-lg max-w-lg leading-relaxed">
              Open to research collaborations, engineering roles and interesting conversations. Reach out any time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:oliver@jarosik.io"
                className="inline-flex items-center gap-2 bg-white text-black text-sm font-semibold px-6 py-3 rounded-full hover:bg-white/90 transition-colors"
              >
                oliver@jarosik.io ↗
              </a>
              <div className="flex items-center gap-4">
                {[
                  { label: "GitHub", href: "#" },
                  { label: "LinkedIn", href: "#" },
                  { label: "Google Scholar", href: "#" },
                ].map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="text-white/35 text-sm hover:text-white/80 transition-colors font-mono tracking-wide"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ── FOOTER ───────────────────────────────────── */}
      <footer className="border-t border-white/6 px-8 md:px-20 py-8 max-w-6xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-white/20 text-xs font-mono">
          <span>© 2024 Oliver Jan Jarosik</span>
          <span>Computer Vision & AI Engineer</span>
        </div>
      </footer>
    </>
  );
}
