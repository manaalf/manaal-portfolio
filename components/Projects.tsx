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

// ── Shared card prop interface ─────────────────────────────────────────────────
interface CardProps {
  project: Project;
  isActive: boolean;   // true only when card occupies the center carousel slot
  onClick: () => void;
  style?: CSSProperties;
}

// ── SVG icons ─────────────────────────────────────────────────────────────────

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.481C19.137 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function StreamlitIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

// ── Shared card top (category label, title, hook) ─────────────────────────────

function CardTop({
  project,
  topRight,
}: {
  project: Project;
  topRight?: React.ReactNode;
}) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#00D4AA" }}>
          {project.category}
        </span>
        {topRight ?? <span style={{ fontSize: 14, color: "#94A3B8" }}>↗</span>}
      </div>
      <h3 style={{ fontSize: 20, fontWeight: 600, color: "#FFFFFF", margin: "12px 0 6px", lineHeight: 1.3 }}>
        {project.title}
      </h3>
      <p style={{ fontSize: 14, color: "#94A3B8", margin: 0, lineHeight: 1.6 }}>
        {project.hook}
      </p>
    </>
  );
}

// ── Shared card bottom (tags + icon links) ────────────────────────────────────

function CardBottom({ project }: { project: Project }) {
  const iconStyle: CSSProperties = {
    color: "#94A3B8",
    transition: "color 0.2s ease",
    display: "flex",
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 14, marginTop: 14 }}>
        <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} aria-label="GitHub" style={iconStyle}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#00D4AA")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#94A3B8")}>
          <GitHubIcon />
        </a>
        {project.streamlit && (
          <a href={project.streamlit} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} aria-label="Streamlit" style={iconStyle}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#00D4AA")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#94A3B8")}>
            <StreamlitIcon />
          </a>
        )}
      </div>
    </>
  );
}

// ── Finding box (shared structure, colored per card) ─────────────────────────

function FindingBox({ text, accentColor }: { text: string; accentColor: string }) {
  return (
    <div style={{ backgroundColor: "rgba(0,0,0,0.4)", borderLeft: `3px solid ${accentColor}`, borderRadius: "0 8px 8px 0", padding: "10px 14px", marginTop: 14 }}>
      <p style={{ fontSize: 12, color: "#94A3B8", margin: 0, lineHeight: 1.5, fontStyle: "italic" }}>{text}</p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// YELP CARD
// ═════════════════════════════════════════════════════════════════════════════

const YELP_BARS = [
  { label: "Review Count",   pct: 95 },
  { label: "Operating Hours", pct: 72 },
  { label: "Delivery",       pct: 58 },
  { label: "Location",       pct: 45 },
  { label: "Parking / WiFi", pct: 20 },
];

function YelpCard({ project, isActive, onClick, style }: CardProps) {
  return (
    <SpotlightCard
      onClick={onClick}
      borderColor="rgba(255,59,48,0.4)"
      borderHoverColor="rgba(255,59,48,0.75)"
      style={{ backgroundColor: "#1A0A0A", display: "flex", flexDirection: "column", ...style }}
    >
      {/* Top accent bar */}
      <div style={{ height: 3, backgroundColor: "#FF3B30", flexShrink: 0 }} />

      <div style={{ padding: 24, display: "flex", flexDirection: "column", flex: 1, minHeight: 460 }}>
        <CardTop project={project} />

        {/* Animated feature-importance bar chart */}
        <div style={{ marginTop: 20, backgroundColor: "#1A2A4A", borderRadius: 10, padding: "14px 16px" }}>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#FF3B30", margin: "0 0 12px" }}>
            What actually predicts ratings
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {YELP_BARS.map(({ label, pct }, i) => (
              <div key={label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: 11, color: "#94A3B8" }}>{label}</span>
                  <span style={{ fontSize: 11, color: "#FF3B30", fontWeight: 600 }}>{pct}%</span>
                </div>
                <div style={{ height: 6, backgroundColor: "rgba(255,59,48,0.12)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{
                    height: "100%",
                    width: isActive ? `${pct}%` : "0%",
                    backgroundColor: "#FF3B30",
                    borderRadius: 3,
                    transition: `width 0.7s ease-out ${i * 0.1}s`,
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <FindingBox text="Review count beat parking, WiFi, and location — combined." accentColor="#FF3B30" />

        <div style={{ flex: 1 }} />
        <CardBottom project={project} />
      </div>
    </SpotlightCard>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// NBA CARD
// ═════════════════════════════════════════════════════════════════════════════

const NBA_STATS = [
  { target: 22,  label: "Players"       },
  { target: 30,  label: "Teams"         },
  { target: 5,   label: "League Leaders" },
  { target: 509, label: "Rule Chunks"   },
];

function NBACard({ project, isActive, onClick, style }: CardProps) {
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  // Count up from 0 → target when isActive, reset when not
  useEffect(() => {
    if (!isActive) {
      setCounts([0, 0, 0, 0]);
      return;
    }
    let rafId: number;
    const start = performance.now();
    const duration = 1300;
    const targets = NBA_STATS.map((s) => s.target);

    function tick(now: number) {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setCounts(targets.map((v) => Math.round(v * eased)));
      if (t < 1) rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isActive]);

  return (
    <SpotlightCard
      onClick={onClick}
      borderColor="rgba(29,66,138,0.6)"
      borderHoverColor="rgba(29,66,138,0.95)"
      style={{ backgroundColor: "#0A0A1A", display: "flex", flexDirection: "column", ...style }}
    >
      {/* Basketball court center-circle background — 8% white opacity */}
      <svg
        viewBox="0 0 400 500"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}
        aria-hidden
      >
        {/* Midcourt line */}
        <line x1="0" y1="250" x2="400" y2="250" stroke="white" strokeWidth="1.5" opacity="0.08" />
        {/* Center circle */}
        <circle cx="200" cy="250" r="70" stroke="white" strokeWidth="1.5" fill="none" opacity="0.08" />
        {/* Center dot */}
        <circle cx="200" cy="250" r="5" stroke="white" strokeWidth="1.5" fill="none" opacity="0.08" />
        {/* Left paint / free-throw lane (very faint) */}
        <rect x="0" y="170" width="80" height="160" stroke="white" strokeWidth="1" fill="none" opacity="0.04" />
        <rect x="320" y="170" width="80" height="160" stroke="white" strokeWidth="1" fill="none" opacity="0.04" />
      </svg>

      <div style={{ position: "relative", zIndex: 1, padding: 24, display: "flex", flexDirection: "column", flex: 1, minHeight: 460 }}>
        <CardTop project={project} />

        {/* Animated knowledge-base stat blocks */}
        <div style={{ marginTop: 20, backgroundColor: "#1A2A4A", borderRadius: 10, padding: "14px 16px" }}>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#4A7FC8", margin: "0 0 12px" }}>
            Knowledge base built from scratch
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {NBA_STATS.map(({ label }, i) => (
              <div key={label} style={{ backgroundColor: "#1D428A", borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontSize: 26, fontWeight: 700, color: "#FFFFFF", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
                  {counts[i]}
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <FindingBox text="If it's not in the knowledge base, it won't answer." accentColor="#1D428A" />

        <div style={{ flex: 1 }} />
        <CardBottom project={project} />
      </div>
    </SpotlightCard>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// POLICYPAL CARD
// ═════════════════════════════════════════════════════════════════════════════

const FLOW_STEPS = ["PDF Upload", "RAG Retrieval", "Grounded Answer"];

// Pal mascot: teal face, large blue eyes with white highlights, purple bow tie
function PalMascot() {
  return (
    <svg width="60" height="68" viewBox="0 0 60 68" aria-label="PolicyPal mascot">
      {/* Face */}
      <circle cx="30" cy="28" r="26" fill="#00D4AA" />
      {/* Left eye */}
      <circle cx="18" cy="23" r="9" fill="#1D428A" />
      <circle cx="15" cy="19" r="3.5" fill="white" opacity="0.9" />
      {/* Right eye */}
      <circle cx="42" cy="23" r="9" fill="#1D428A" />
      <circle cx="39" cy="19" r="3.5" fill="white" opacity="0.9" />
      {/* Bow tie — left wing, right wing, center knot */}
      <polygon points="22,56 30,51 30,61" fill="#8B5CF6" />
      <polygon points="38,56 30,51 30,61" fill="#7C3AED" />
      <ellipse cx="30" cy="56" rx="3.5" ry="4" fill="#6D28D9" />
    </svg>
  );
}

function PolicyPalCard({ project, isActive, onClick, style }: CardProps) {
  return (
    <SpotlightCard
      onClick={onClick}
      borderColor="rgba(139,92,246,0.5)"
      borderHoverColor="rgba(139,92,246,0.85)"
      style={{
        background: "linear-gradient(135deg, #0D1F2D 0%, #1A1040 100%)",
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      {/* Mascot — top-right corner, absolutely positioned */}
      <div style={{ position: "absolute", top: 14, right: 14, zIndex: 3 }}>
        <PalMascot />
      </div>

      <div style={{ padding: 24, paddingRight: 90, display: "flex", flexDirection: "column", flex: 1, minHeight: 460 }}>
        <CardTop project={project} topRight={<span />} />

        {/* Animated three-step flow */}
        <div style={{ marginTop: 20, backgroundColor: "#1A2A4A", borderRadius: 10, padding: "14px 16px" }}>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A78BFA", margin: "0 0 16px" }}>
            How it works
          </p>
          <div style={{ display: "flex", alignItems: "center" }}>
            {FLOW_STEPS.map((step, i) => (
              <div key={step} style={{ display: "flex", alignItems: "center", flex: i < FLOW_STEPS.length - 1 ? "0 0 auto" : undefined }}>
                {/* Step pill */}
                <div style={{
                  border: "1px solid #8B5CF6",
                  borderRadius: 9999,
                  padding: "6px 12px",
                  fontSize: 11,
                  color: "#FFFFFF",
                  whiteSpace: "nowrap",
                  backgroundColor: "rgba(139,92,246,0.12)",
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0)" : "translateY(6px)",
                  transition: `opacity 0.4s ease ${i * 0.45}s, transform 0.4s ease ${i * 0.45}s`,
                }}>
                  {step}
                </div>

                {/* Connector — appears between steps */}
                {i < FLOW_STEPS.length - 1 && (
                  <div style={{
                    width: isActive ? 28 : 0,
                    overflow: "hidden",
                    transition: `width 0.35s ease ${i * 0.45 + 0.38}s`,
                    flexShrink: 0,
                  }}>
                    {/* Fixed-width inner div so the border renders correctly */}
                    <div style={{ width: 28, borderTop: "2px dashed rgba(139,92,246,0.7)", marginTop: 1 }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <FindingBox text="A wrong answer is worse than no answer." accentColor="#8B5CF6" />

        {/* Restore right padding for bottom content */}
        <div style={{ paddingRight: 0 }}>
          <div style={{ flex: 1 }} />
          <CardBottom project={project} />
        </div>
      </div>
    </SpotlightCard>
  );
}

// ── Card index → component lookup ─────────────────────────────────────────────
const CARD_COMPONENTS = [YelpCard, NBACard, PolicyPalCard] as const;

// ═════════════════════════════════════════════════════════════════════════════
// MODAL (unchanged)
// ═════════════════════════════════════════════════════════════════════════════

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
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
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, backgroundColor: "rgba(6,10,22,0.85)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: "#111D35", border: "1px solid #1E3A5F", borderRadius: 20, padding: "40px 40px 36px", maxWidth: 680, width: "100%", maxHeight: "85vh", overflowY: "auto", position: "relative" }}>
        <button onClick={onClose} aria-label="Close" style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", color: "#94A3B8", fontSize: 22, cursor: "pointer", lineHeight: 1, padding: 4 }}>✕</button>

        <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#00D4AA" }}>{project.category}</span>
        <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 700, color: "#FFFFFF", margin: "10px 0 6px" }}>{project.title}</h2>
        <p style={{ fontSize: 15, color: "#94A3B8", margin: "0 0 28px", fontStyle: "italic" }}>{project.hook}</p>

        <div style={{ borderTop: "1px solid #1E3A5F", marginBottom: 28 }} />

        {(["challenge", "approach", "impact"] as const).map((key) => (
          <div key={key} style={{ marginBottom: 24 }}>
            <span style={{ display: "block", fontSize: 11, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#00D4AA", marginBottom: 10 }}>{key}</span>
            <p style={{ fontSize: 15, color: "#94A3B8", margin: 0, lineHeight: 1.75 }}>{project[key]}</p>
          </div>
        ))}

        <div style={{ borderTop: "1px solid #1E3A5F", margin: "28px 0 24px" }} />

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 500, backgroundColor: "#00D4AA", color: "#0A0F1E", padding: "10px 20px", borderRadius: 8, textDecoration: "none", border: "1px solid #00D4AA", transition: "opacity 0.2s ease" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.85")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}>
            <GitHubIcon /> GitHub
          </a>
          {project.streamlit && (
            <a href={project.streamlit} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 500, backgroundColor: "transparent", color: "#FFFFFF", padding: "10px 20px", borderRadius: 8, textDecoration: "none", border: "1px solid #FFFFFF", transition: "opacity 0.2s ease" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.75")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}>
              <StreamlitIcon /> Streamlit
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═════════════════════════════════════════════════════════════════════════════

export default function Projects() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [activeIndex,  setActiveIndex]  = useState(0);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [mounted,      setMounted]      = useState(false);

  useEffect(() => setMounted(true), []);

  // ── Auto-advance ─────────────────────────────────────────────────────────
  const startTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % projects.length);
    }, 4000);
  }, []);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => { startTimer(); return stopTimer; }, [startTimer, stopTimer]);

  const goTo = useCallback((i: number) => { setActiveIndex(i); startTimer(); }, [startTimer]);
  const goPrev = () => goTo((activeIndex - 1 + projects.length) % projects.length);
  const goNext = () => goTo((activeIndex + 1) % projects.length);

  const prevIdx = (activeIndex - 1 + projects.length) % projects.length;
  const nextIdx = (activeIndex + 1) % projects.length;

  // ── Card renderer — picks the right component by project index ────────────
  const renderCard = (idx: number, isCardActive: boolean, handleClick: () => void, extraStyle?: CSSProperties) => {
    const Comp = CARD_COMPONENTS[idx];
    return <Comp project={projects[idx]} isActive={isCardActive} onClick={handleClick} style={extraStyle} />;
  };

  // ── GSAP ScrollTrigger ────────────────────────────────────────────────────
  useGSAP(() => {
    if (headerRef.current) {
      gsap.fromTo(
        Array.from(headerRef.current.children),
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: headerRef.current, start: "top 80%", once: true } }
      );
    }
    if (carouselRef.current) {
      gsap.fromTo(
        carouselRef.current,
        { y: 48, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: carouselRef.current, start: "top 80%", once: true } }
      );
    }
  }, { scope: sectionRef });

  return (
    <section id="work" ref={sectionRef} style={{ backgroundColor: "#0D1526", padding: "120px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div ref={headerRef} style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 64 }}>
          <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#00D4AA" }}>WORK</span>
          <h2 style={{ fontSize: "clamp(36px,4vw,56px)", fontWeight: 700, color: "#FFFFFF", margin: 0, lineHeight: 1.15 }}>Selected Projects</h2>
        </div>

        {/* Carousel */}
        <div ref={carouselRef} onMouseEnter={stopTimer} onMouseLeave={startTimer}>
          <div style={{ display: "flex", gap: 20, alignItems: "stretch" }}>

            {/* Prev — hidden on mobile */}
            <div className="hidden lg:block" style={{ flex: "0 0 26%", opacity: 0.5, transition: "opacity 0.4s ease", cursor: "pointer" }}>
              {renderCard(prevIdx, false, goPrev, { width: "100%", height: "100%" })}
            </div>

            {/* Active */}
            <div style={{ flex: "1 1 auto" }}>
              {renderCard(activeIndex, true, () => setModalProject(projects[activeIndex]), { height: "100%" })}
            </div>

            {/* Next — hidden on mobile */}
            <div className="hidden lg:block" style={{ flex: "0 0 26%", opacity: 0.5, transition: "opacity 0.4s ease", cursor: "pointer" }}>
              {renderCard(nextIdx, false, goNext, { width: "100%", height: "100%" })}
            </div>
          </div>

          {/* Arrows */}
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 36 }}>
            {[{ label: "Previous project", icon: "←", fn: goPrev }, { label: "Next project", icon: "→", fn: goNext }].map(({ label, icon, fn }) => (
              <button key={icon} onClick={fn} aria-label={label}
                style={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: "#111D35", border: "1px solid #1E3A5F", color: "#94A3B8", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s ease, color 0.2s ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#00D4AA"; (e.currentTarget as HTMLButtonElement).style.color = "#00D4AA"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#1E3A5F"; (e.currentTarget as HTMLButtonElement).style.color = "#94A3B8"; }}>
                {icon}
              </button>
            ))}
          </div>

          {/* Dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 20 }}>
            {projects.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} aria-label={`Go to project ${i + 1}`}
                style={{ width: i === activeIndex ? 24 : 8, height: 8, borderRadius: 4, backgroundColor: i === activeIndex ? "#00D4AA" : "#1E3A5F", border: "none", cursor: "pointer", padding: 0, transition: "width 0.3s ease, background-color 0.3s ease" }} />
            ))}
          </div>
        </div>
      </div>

      {/* Modal portal */}
      {mounted && modalProject && createPortal(
        <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />,
        document.body
      )}
    </section>
  );
}
