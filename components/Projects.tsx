"use client";

import { useRef, useState, useEffect, useCallback, CSSProperties } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "../data/projects";
import SpotlightCard from "./SpotlightCard";

gsap.registerPlugin(ScrollTrigger);

type Project = (typeof projects)[number];

interface CardProps {
  project: Project;
  isActive: boolean;
  onClick: () => void;
  style?: CSSProperties;
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.481C19.137 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function StreamlitIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

// ── Per-project accent colors (light palette) ─────────────────────────────────
const PROJECT_ACCENTS = [
  { top: "#E8352A", bg: "#FDF5F5", label: "rgba(232,53,42,0.1)", tagBg: "rgba(232,53,42,0.08)", tagColor: "#C42B20" },
  { top: "#1D428A", bg: "#F5F7FD", label: "rgba(29,66,138,0.1)", tagBg: "rgba(29,66,138,0.08)", tagColor: "#1D428A" },
  { top: "#6D28D9", bg: "#F8F5FF", label: "rgba(109,40,217,0.1)", tagBg: "rgba(109,40,217,0.08)", tagColor: "#6D28D9" },
];

function CardTop({ project, accent, topRight }: { project: Project; accent: typeof PROJECT_ACCENTS[0]; topRight?: React.ReactNode }) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: accent.top }}>
          {project.category}
        </span>
        {topRight ?? <span style={{ fontSize: 14, color: "var(--slate-light)" }}>↗</span>}
      </div>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "var(--forest)", margin: "12px 0 6px", lineHeight: 1.2 }}>
        {project.title}
      </h3>
      <p style={{ fontSize: 14, color: "var(--slate)", margin: 0, lineHeight: 1.6 }}>
        {project.hook}
      </p>
    </>
  );
}

function CardBottom({ project, accent }: { project: Project; accent: typeof PROJECT_ACCENTS[0] }) {
  const iconStyle: CSSProperties = { color: "var(--slate-light)", transition: "color 0.2s ease", display: "flex" };
  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16 }}>
        {project.tags.map(t => (
          <span key={t} style={{ fontSize: 11, fontWeight: 500, padding: "4px 10px", borderRadius: 3, backgroundColor: accent.tagBg, color: accent.tagColor, letterSpacing: "0.04em" }}>{t}</span>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 14, marginTop: 14 }}>
        <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={iconStyle}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = accent.top)}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--slate-light)")}>
          <GitHubIcon />
        </a>
        {project.streamlit && (
          <a href={project.streamlit} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={iconStyle}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = accent.top)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--slate-light)")}>
            <StreamlitIcon />
          </a>
        )}
      </div>
    </>
  );
}

function FindingBox({ text, accent }: { text: string; accent: typeof PROJECT_ACCENTS[0] }) {
  return (
    <div style={{ backgroundColor: accent.label, borderLeft: `3px solid ${accent.top}`, borderRadius: "0 4px 4px 0", padding: "10px 14px", marginTop: 14 }}>
      <p style={{ fontSize: 13, color: "var(--slate)", margin: 0, lineHeight: 1.5, fontStyle: "italic" }}>{text}</p>
    </div>
  );
}

// ── YELP CARD ────────────────────────────────────────────────────────────────
const YELP_BARS = [
  { label: "Review Count",    pct: 95 },
  { label: "Operating Hours", pct: 72 },
  { label: "Delivery",        pct: 58 },
  { label: "Location",        pct: 45 },
  { label: "Parking / WiFi",  pct: 20 },
];

function YelpCard({ project, isActive, onClick, style }: CardProps) {
  const accent = PROJECT_ACCENTS[0];
  return (
    <SpotlightCard onClick={onClick} borderColor={`${accent.top}30`} borderHoverColor={`${accent.top}70`}
      style={{ backgroundColor: accent.bg, display: "flex", flexDirection: "column", ...style }}>
      <div style={{ height: 3, backgroundColor: accent.top, flexShrink: 0 }} />
      <div style={{ padding: 28, display: "flex", flexDirection: "column", flex: 1, minHeight: 460 }}>
        <CardTop project={project} accent={accent} />
        <div style={{ marginTop: 20, backgroundColor: "var(--cream-dark)", borderRadius: 6, padding: "16px 18px" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: accent.top, margin: "0 0 14px" }}>
            What actually predicts ratings
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {YELP_BARS.map(({ label, pct }, i) => (
              <div key={label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: "var(--slate)" }}>{label}</span>
                  <span style={{ fontSize: 12, color: accent.top, fontWeight: 600 }}>{pct}%</span>
                </div>
                <div style={{ height: 5, backgroundColor: `${accent.top}18`, borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: isActive ? `${pct}%` : "0%", backgroundColor: accent.top, borderRadius: 3, transition: `width 0.7s ease-out ${i * 0.1}s` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <FindingBox text="Review count beat parking, WiFi, and location — combined." accent={accent} />
        <div style={{ flex: 1 }} />
        <CardBottom project={project} accent={accent} />
      </div>
    </SpotlightCard>
  );
}

// ── NBA CARD ─────────────────────────────────────────────────────────────────
const NBA_STATS = [
  { target: 22,  label: "Players"        },
  { target: 30,  label: "Teams"          },
  { target: 5,   label: "League Leaders" },
  { target: 509, label: "Rule Chunks"    },
];

function NBACard({ project, isActive, onClick, style }: CardProps) {
  const accent = PROJECT_ACCENTS[1];
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  useEffect(() => {
    if (!isActive) { setCounts([0, 0, 0, 0]); return; }
    let rafId: number;
    const start = performance.now(), duration = 1300;
    const targets = NBA_STATS.map(s => s.target);
    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCounts(targets.map(v => Math.round(v * eased)));
      if (t < 1) rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isActive]);

  return (
    <SpotlightCard onClick={onClick} borderColor={`${accent.top}30`} borderHoverColor={`${accent.top}70`}
      style={{ backgroundColor: accent.bg, display: "flex", flexDirection: "column", ...style }}>
      <div style={{ height: 3, backgroundColor: accent.top, flexShrink: 0 }} />
      <div style={{ padding: 28, display: "flex", flexDirection: "column", flex: 1, minHeight: 460 }}>
        <CardTop project={project} accent={accent} />
        <div style={{ marginTop: 20, backgroundColor: "var(--cream-dark)", borderRadius: 6, padding: "16px 18px" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: accent.top, margin: "0 0 14px" }}>
            Knowledge base built from scratch
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {NBA_STATS.map(({ label }, i) => (
              <div key={label} style={{ backgroundColor: accent.top, borderRadius: 6, padding: "14px 16px" }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: "#fff", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{counts[i]}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
        <FindingBox text="If it's not in the knowledge base, it won't answer." accent={accent} />
        <div style={{ flex: 1 }} />
        <CardBottom project={project} accent={accent} />
      </div>
    </SpotlightCard>
  );
}

// ── POLICYPAL CARD ───────────────────────────────────────────────────────────
const FLOW_STEPS = ["PDF Upload", "RAG Retrieval", "Grounded Answer"];

function PolicyPalCard({ project, isActive, onClick, style }: CardProps) {
  const accent = PROJECT_ACCENTS[2];
  return (
    <SpotlightCard onClick={onClick} borderColor={`${accent.top}30`} borderHoverColor={`${accent.top}70`}
      style={{ backgroundColor: accent.bg, display: "flex", flexDirection: "column", ...style }}>
      <div style={{ height: 3, backgroundColor: accent.top, flexShrink: 0 }} />
      <div style={{ padding: 28, display: "flex", flexDirection: "column", flex: 1, minHeight: 460 }}>
        <CardTop project={project} accent={accent} topRight={<span />} />
        <div style={{ marginTop: 20, backgroundColor: "var(--cream-dark)", borderRadius: 6, padding: "16px 18px" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: accent.top, margin: "0 0 16px" }}>
            How it works
          </p>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            {FLOW_STEPS.map((step, i) => (
              <div key={step} style={{ display: "flex", alignItems: "center" }}>
                <div style={{ border: `1px solid ${accent.top}`, borderRadius: 999, padding: "6px 14px", fontSize: 12, color: accent.top, backgroundColor: `${accent.top}10`, opacity: isActive ? 1 : 0, transform: isActive ? "translateY(0)" : "translateY(6px)", transition: `opacity 0.4s ease ${i * 0.45}s, transform 0.4s ease ${i * 0.45}s`, fontWeight: 500 }}>
                  {step}
                </div>
                {i < FLOW_STEPS.length - 1 && (
                  <div style={{ width: isActive ? 24 : 0, overflow: "hidden", transition: `width 0.35s ease ${i * 0.45 + 0.38}s`, flexShrink: 0 }}>
                    <div style={{ width: 24, borderTop: `2px dashed ${accent.top}70`, marginTop: 1 }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <FindingBox text="A wrong answer is worse than no answer." accent={accent} />
        <div style={{ flex: 1 }} />
        <CardBottom project={project} accent={accent} />
      </div>
    </SpotlightCard>
  );
}

const CARD_COMPONENTS = [YelpCard, NBACard, PolicyPalCard] as const;

// ── MODAL ─────────────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const accent = PROJECT_ACCENTS[projects.indexOf(project)] ?? PROJECT_ACCENTS[0];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, backgroundColor: "rgba(28,61,53,0.7)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: "var(--cream)", border: `1px solid ${accent.top}30`, borderRadius: 8, padding: "40px 40px 36px", maxWidth: 680, width: "100%", maxHeight: "85vh", overflowY: "auto", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", color: "var(--slate-light)", fontSize: 22, cursor: "pointer", lineHeight: 1, padding: 4 }}>✕</button>
        <div style={{ height: 3, backgroundColor: accent.top, borderRadius: 2, marginBottom: 28 }} />
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: accent.top }}>{project.category}</span>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px,3vw,30px)", fontWeight: 700, color: "var(--forest)", margin: "10px 0 6px" }}>{project.title}</h2>
        <p style={{ fontSize: 15, color: "var(--slate)", margin: "0 0 28px", fontStyle: "italic" }}>{project.hook}</p>
        <div style={{ borderTop: "1px solid var(--cream-dark)", marginBottom: 28 }} />
        {(["challenge", "approach", "impact"] as const).map((key) => (
          <div key={key} style={{ marginBottom: 24 }}>
            <span style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: accent.top, marginBottom: 10 }}>{key}</span>
            <p style={{ fontSize: 15, color: "var(--slate)", margin: 0, lineHeight: 1.8 }}>{project[key]}</p>
          </div>
        ))}
        <div style={{ borderTop: "1px solid var(--cream-dark)", margin: "28px 0 24px" }} />
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, backgroundColor: accent.top, color: "#fff", padding: "10px 20px", borderRadius: 6, transition: "opacity 0.2s ease" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.85")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}>
            <GitHubIcon /> GitHub
          </a>
          {project.streamlit && (
            <a href={project.streamlit} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, backgroundColor: "transparent", color: "var(--forest)", padding: "10px 20px", borderRadius: 6, border: "2px solid var(--forest)", transition: "opacity 0.2s ease" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.75")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}>
              <StreamlitIcon /> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ── MAIN ─────────────────────────────────────────────────────────────────────
export default function Projects() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [activeIndex, setActiveIndex]   = useState(0);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [mounted, setMounted]           = useState(false);

  useEffect(() => setMounted(true), []);

  const startTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setActiveIndex(i => (i + 1) % projects.length), 4000);
  }, []);
  const stopTimer = useCallback(() => { if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; } }, []);

  useEffect(() => { startTimer(); return stopTimer; }, [startTimer, stopTimer]);

  const goTo   = useCallback((i: number) => { setActiveIndex(i); startTimer(); }, [startTimer]);
  const goPrev = () => goTo((activeIndex - 1 + projects.length) % projects.length);
  const goNext = () => goTo((activeIndex + 1) % projects.length);
  const prevIdx = (activeIndex - 1 + projects.length) % projects.length;
  const nextIdx = (activeIndex + 1) % projects.length;

  const renderCard = (idx: number, isCardActive: boolean, handleClick: () => void, extraStyle?: CSSProperties) => {
    const Comp = CARD_COMPONENTS[idx];
    return <Comp project={projects[idx]} isActive={isCardActive} onClick={handleClick} style={extraStyle} />;
  };

  useGSAP(() => {
    if (headerRef.current) {
      gsap.fromTo(Array.from(headerRef.current.children), { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: headerRef.current, start: "top 80%", once: true } });
    }
    if (carouselRef.current) {
      gsap.fromTo(carouselRef.current, { y: 48, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: carouselRef.current, start: "top 80%", once: true } });
    }
  }, { scope: sectionRef });

  return (
    <section id="work" ref={sectionRef} style={{ backgroundColor: "var(--cream-dark)", padding: "120px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>

        <div ref={headerRef} style={{ marginBottom: 64 }}>
          <span className="section-label" style={{ color: "var(--teal-muted)", display: "block", marginBottom: 16 }}>Work</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,4vw,52px)", fontWeight: 700, color: "var(--forest)", margin: 0, lineHeight: 1.1 }}>
            Selected Projects
          </h2>
        </div>

        <div ref={carouselRef} onMouseEnter={stopTimer} onMouseLeave={startTimer}>
          <div style={{ display: "flex", gap: 20, alignItems: "stretch" }}>
            <div className="hidden lg:block" style={{ flex: "0 0 26%", opacity: 0.45, transition: "opacity 0.4s ease", cursor: "pointer" }}>
              {renderCard(prevIdx, false, goPrev, { width: "100%", height: "100%" })}
            </div>
            <div style={{ flex: "1 1 auto" }}>
              {renderCard(activeIndex, true, () => setModalProject(projects[activeIndex]), { height: "100%" })}
            </div>
            <div className="hidden lg:block" style={{ flex: "0 0 26%", opacity: 0.45, transition: "opacity 0.4s ease", cursor: "pointer" }}>
              {renderCard(nextIdx, false, goNext, { width: "100%", height: "100%" })}
            </div>
          </div>

          {/* Arrows */}
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 36 }}>
            {[{ label: "Previous", icon: "←", fn: goPrev }, { label: "Next", icon: "→", fn: goNext }].map(({ label, icon, fn }) => (
              <button key={icon} onClick={fn} aria-label={label}
                style={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: "var(--cream)", border: "1.5px solid rgba(28,61,53,0.2)", color: "var(--slate)", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease" }}
                onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = "var(--forest)"; b.style.color = "var(--forest)"; }}
                onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = "rgba(28,61,53,0.2)"; b.style.color = "var(--slate)"; }}>
                {icon}
              </button>
            ))}
          </div>

          {/* Dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 20 }}>
            {projects.map((_, i) => (
              <button key={i} onClick={() => goTo(i)}
                style={{ width: i === activeIndex ? 24 : 8, height: 8, borderRadius: 4, backgroundColor: i === activeIndex ? "var(--forest)" : "rgba(28,61,53,0.2)", border: "none", cursor: "pointer", padding: 0, transition: "width 0.3s ease, background-color 0.3s ease" }} />
            ))}
          </div>
        </div>
      </div>

      {mounted && modalProject && createPortal(
        <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />,
        document.body
      )}
    </section>
  );
}
