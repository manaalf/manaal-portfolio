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

const PROJECT_ACCENTS = [
  { top: "#2A7A5E", bg: "#F0FAF6", tagBg: "rgba(42,122,94,0.08)", tagColor: "#2A7A5E" },
  { top: "#5B3A8C", bg: "#F7F4FD", tagBg: "rgba(91,58,140,0.08)", tagColor: "#5B3A8C" },
  { top: "#C0392B", bg: "#FDF5F5", tagBg: "rgba(192,57,43,0.08)", tagColor: "#C0392B" },
  { top: "#1A5276", bg: "#F4F8FC", tagBg: "rgba(26,82,118,0.08)", tagColor: "#1A5276" },
];

function CardTop({ project, accent }: { project: Project; accent: typeof PROJECT_ACCENTS[0] }) {
  return (
    <>
      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: accent.top }}>
        {project.category}
      </span>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "var(--forest)", margin: "10px 0 6px", lineHeight: 1.2 }}>
        {project.title}
      </h3>
      <p style={{ fontSize: 14, color: "var(--slate)", margin: 0, lineHeight: 1.6 }}>
        {project.hook}
      </p>
    </>
  );
}

function CardMetric({ project, accent }: { project: Project; accent: typeof PROJECT_ACCENTS[0] }) {
  return (
    <div style={{ backgroundColor: accent.tagBg, borderLeft: `3px solid ${accent.top}`, padding: "12px 16px", margin: "16px 0", borderRadius: "0 4px 4px 0" }}>
      <span style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, color: accent.top, display: "block", lineHeight: 1 }}>
        {project.metric}
      </span>
      <span style={{ fontSize: 12, color: "var(--slate)", marginTop: 4, display: "block" }}>
        {project.metricLabel}
      </span>
    </div>
  );
}

function CardTags({ project, accent }: { project: Project; accent: typeof PROJECT_ACCENTS[0] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16 }}>
      {project.tags.map(t => (
        <span key={t} style={{ fontSize: 11, fontWeight: 500, padding: "4px 10px", borderRadius: 3, backgroundColor: accent.tagBg, color: accent.tagColor, letterSpacing: "0.04em" }}>
          {t}
        </span>
      ))}
    </div>
  );
}

function ProjectCard({ project, isActive, onClick, style }: CardProps) {
  const idx = projects.indexOf(project);
  const accent = PROJECT_ACCENTS[idx] ?? PROJECT_ACCENTS[0];

  return (
    <SpotlightCard onClick={onClick} borderColor={`${accent.top}25`} borderHoverColor={`${accent.top}60`}
      style={{ backgroundColor: accent.bg, display: "flex", flexDirection: "column", ...style }}>
      <div style={{ height: 3, backgroundColor: accent.top, flexShrink: 0 }} />
      <div style={{ padding: 28, display: "flex", flexDirection: "column", flex: 1, minHeight: 380 }}>
        <CardTop project={project} accent={accent} />
        <CardMetric project={project} accent={accent} />
        <div style={{ flex: 1 }} />
        <CardTags project={project} accent={accent} />
        {/* View on GitHub */}
        <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
          <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
            style={{ fontSize: 12, fontWeight: 600, color: accent.top, border: `1px solid ${accent.top}40`, padding: "6px 12px", borderRadius: 4, transition: "all 0.2s ease", letterSpacing: "0.04em" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = accent.tagBg; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent"; }}>
            View on GitHub ↗
          </a>
          {project.streamlit && (
            <a href={project.streamlit} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
              style={{ fontSize: 12, fontWeight: 600, color: accent.top, border: `1px solid ${accent.top}40`, padding: "6px 12px", borderRadius: 4, transition: "all 0.2s ease", letterSpacing: "0.04em" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = accent.tagBg; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent"; }}>
              Live Demo ↗
            </a>
          )}
          <button onClick={onClick}
            style={{ fontSize: 12, fontWeight: 600, color: "var(--cream)", backgroundColor: accent.top, border: "none", padding: "6px 14px", borderRadius: 4, cursor: "pointer", letterSpacing: "0.04em" }}>
            View Slides →
          </button>
        </div>
      </div>
    </SpotlightCard>
  );
}

// ── MODAL with Google Slides embed ────────────────────────────────────────────
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const idx = projects.indexOf(project);
  const accent = PROJECT_ACCENTS[idx] ?? PROJECT_ACCENTS[0];

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
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, backgroundColor: "rgba(28,61,53,0.75)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: "var(--cream)", borderRadius: 8, maxWidth: 860, width: "100%", maxHeight: "90vh", overflowY: "auto", position: "relative", border: `1px solid ${accent.top}20` }}>

        {/* Header */}
        <div style={{ padding: "28px 32px 20px", borderBottom: `1px solid ${accent.top}20`, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: accent.top }}>{project.category}</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, color: "var(--forest)", margin: "8px 0 4px" }}>{project.title}</h2>
            <p style={{ fontSize: 14, color: "var(--slate)", margin: 0, fontStyle: "italic" }}>{project.hook}</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--slate-light)", fontSize: 22, cursor: "pointer", padding: "4px 8px", flexShrink: 0, marginLeft: 16 }}>✕</button>
        </div>

        {/* Google Slides embed */}
        <div style={{ padding: "0", backgroundColor: "#000" }}>
          <iframe
            src={project.slidesEmbed}
            style={{ width: "100%", height: 480, border: "none", display: "block" }}
            allowFullScreen
            title={`${project.title} presentation`}
          />
        </div>

        {/* Links */}
        <div style={{ padding: "20px 32px 28px", display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, backgroundColor: accent.top, color: "#fff", padding: "10px 20px", borderRadius: 6, transition: "opacity 0.2s ease" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.85")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}>
            View on GitHub ↗
          </a>
          {project.streamlit && (
            <a href={project.streamlit} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, backgroundColor: "transparent", color: "var(--forest)", padding: "10px 20px", borderRadius: 6, border: "2px solid var(--forest)", transition: "opacity 0.2s ease" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.75")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}>
              Live Demo ↗
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
    intervalRef.current = setInterval(() => setActiveIndex(i => (i + 1) % projects.length), 4500);
  }, []);
  const stopTimer = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  }, []);

  useEffect(() => { startTimer(); return stopTimer; }, [startTimer, stopTimer]);

  const goTo   = useCallback((i: number) => { setActiveIndex(i); startTimer(); }, [startTimer]);
  const goPrev = () => goTo((activeIndex - 1 + projects.length) % projects.length);
  const goNext = () => goTo((activeIndex + 1) % projects.length);
  const prevIdx = (activeIndex - 1 + projects.length) % projects.length;
  const nextIdx = (activeIndex + 1) % projects.length;

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
    <section id="work" ref={sectionRef} style={{ backgroundColor: "var(--cream-dark)", padding: "120px 0", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>

        <div ref={headerRef} style={{ marginBottom: 64 }}>
          <span className="section-label" style={{ color: "var(--teal-muted)", display: "block", marginBottom: 16 }}>Work</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,4vw,52px)", fontWeight: 700, color: "var(--forest)", margin: 0, lineHeight: 1.1 }}>
            Selected Projects
          </h2>
          <p style={{ fontSize: 15, color: "var(--slate)", margin: "12px 0 0" }}>Click any card to view the full presentation.</p>
        </div>

        <div ref={carouselRef} onMouseEnter={stopTimer} onMouseLeave={startTimer}>
          <div style={{ display: "flex", gap: 20, alignItems: "stretch" }}>
            <div className="hidden lg:block" style={{ flex: "0 0 25%", opacity: 0.4, transition: "opacity 0.4s ease", cursor: "pointer" }}>
              <ProjectCard project={projects[prevIdx]} isActive={false} onClick={goPrev} style={{ width: "100%", height: "100%" }} />
            </div>
            <div style={{ flex: "1 1 auto" }}>
              <ProjectCard project={projects[activeIndex]} isActive={true} onClick={() => setModalProject(projects[activeIndex])} style={{ height: "100%" }} />
            </div>
            <div className="hidden lg:block" style={{ flex: "0 0 25%", opacity: 0.4, transition: "opacity 0.4s ease", cursor: "pointer" }}>
              <ProjectCard project={projects[nextIdx]} isActive={false} onClick={goNext} style={{ width: "100%", height: "100%" }} />
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
