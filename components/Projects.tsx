"use client";

import { useRef, useState, useEffect, useCallback, CSSProperties } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

type Project = (typeof projects)[number];

function ProjectCard({ project, isActive, onClick }: { project: Project; isActive: boolean; onClick: () => void }) {
  const [thumbError, setThumbError] = useState(false);

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: "#EDE7D9",
        border: "1px solid rgba(28,61,53,0.12)",
        borderRadius: 4,
        overflow: "hidden",
        cursor: "pointer",
        transition: "box-shadow 0.3s ease, transform 0.2s ease",
        height: "100%",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(28,61,53,0.12)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 380 }}>

        {/* Left — slide thumbnail */}
        <div style={{ backgroundColor: "#1C3D35", padding: 28, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "#3EBFA0", marginBottom: 16 }}>
              SLIDE PREVIEW
            </div>
            {!thumbError ? (
              <img
                src={project.slideThumb}
                alt={`${project.title} slide`}
                onError={() => setThumbError(true)}
                style={{ width: "100%", borderRadius: 2, display: "block", border: "1px solid rgba(62,191,160,0.2)" }}
              />
            ) : (
              /* Fallback if image doesn't load */
              <div style={{ backgroundColor: "rgba(62,191,160,0.08)", border: "1px solid rgba(62,191,160,0.2)", borderRadius: 3, padding: "24px 20px" }}>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 700, color: "#F5F0E8", lineHeight: 1.3, marginBottom: 12 }}>
                  {project.title}
                </div>
                <div style={{ fontSize: 11, color: "rgba(245,240,232,0.45)" }}>{project.category}</div>
              </div>
            )}
          </div>
          <div style={{ fontSize: 11, color: "rgba(245,240,232,0.35)", fontStyle: "italic", marginTop: 16 }}>
            Click to view full presentation →
          </div>
        </div>

        {/* Right — content */}
        <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 16, backgroundColor: project.bgColor }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", color: project.accentColor, marginBottom: 10 }}>
              {project.category}
            </div>
            <h3 style={{ fontFamily: "Georgia, serif", fontSize: 19, fontWeight: 700, color: "#1C3D35", margin: "0 0 8px", lineHeight: 1.25, fontStyle: "italic" }}>
              {project.question}
            </h3>
            <p style={{ fontSize: 13, color: "#4A5568", margin: 0, lineHeight: 1.7 }}>
              {project.description}
            </p>
          </div>

          {/* Stat */}
          <div style={{ borderLeft: `3px solid ${project.accentColor}`, paddingLeft: 14 }}>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700, color: "#1C3D35", lineHeight: 1 }}>
              {project.stat}
            </div>
            <div style={{ fontSize: 12, color: "#718096", marginTop: 4 }}>
              {project.statLabel}
            </div>
          </div>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {project.tags.map(t => (
              <span key={t} style={{ fontSize: 11, color: project.accentColor, border: `1px solid ${project.accentColor}30`, padding: "3px 10px", borderRadius: 3 }}>
                {t}
              </span>
            ))}
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: 20, marginTop: "auto", paddingTop: 12, borderTop: "1px solid rgba(28,61,53,0.08)" }}>
            <button
              onClick={(e) => { e.stopPropagation(); onClick(); }}
              style={{ fontSize: 13, fontWeight: 600, color: "#1C3D35", background: "none", border: "none", padding: 0, cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3 }}
            >
              View slides
            </button>
            
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{ fontSize: 13, color: "#718096", textDecoration: "underline", textUnderlineOffset: 3 }}
            >
              GitHub
            </a>
            {project.streamlit && (
              
                href={project.streamlit}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{ fontSize: 13, color: "#718096", textDecoration: "underline", textUnderlineOffset: 3 }}
              >
                Live demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

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
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 200, backgroundColor: "rgba(28,61,53,0.75)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: "#F5F0E8", borderRadius: 6, maxWidth: 860, width: "100%", maxHeight: "90vh", overflowY: "auto", position: "relative" }}
      >
        <div style={{ padding: "24px 28px 16px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid rgba(28,61,53,0.1)" }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", color: project.accentColor, marginBottom: 6 }}>{project.category}</div>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700, color: "#1C3D35", margin: 0, fontStyle: "italic" }}>{project.question}</h2>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#718096", padding: "4px 8px", flexShrink: 0 }}>✕</button>
        </div>

        <iframe
          src={project.slidesEmbed}
          style={{ width: "100%", height: 480, border: "none", display: "block" }}
          allowFullScreen
          title={project.title}
        />

        <div style={{ padding: "16px 28px 24px", display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 13, fontWeight: 600, backgroundColor: project.accentColor, color: "#fff", padding: "10px 20px", borderRadius: 5, textDecoration: "none" }}>
            View on GitHub ↗
          </a>
          {project.streamlit && (
            <a href={project.streamlit} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 13, fontWeight: 600, backgroundColor: "transparent", color: "#1C3D35", padding: "10px 20px", borderRadius: 5, border: "2px solid #1C3D35", textDecoration: "none" }}>
              Live demo ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const listRef     = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [activeIndex, setActiveIndex]   = useState(0);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [mounted, setMounted]           = useState(false);

  useEffect(() => setMounted(true), []);

  const startTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setActiveIndex(i => (i + 1) % projects.length), 5000);
  }, []);
  const stopTimer = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  }, []);

  useEffect(() => { startTimer(); return stopTimer; }, [startTimer, stopTimer]);
  const goTo = useCallback((i: number) => { setActiveIndex(i); startTimer(); }, [startTimer]);

  useGSAP(() => {
    if (headerRef.current) {
      gsap.fromTo(Array.from(headerRef.current.children), { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 80%", once: true } });
    }
    if (listRef.current) {
      gsap.fromTo(listRef.current, { y: 48, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: listRef.current, start: "top 80%", once: true } });
    }
  }, { scope: sectionRef });

  return (
    <section id="work" ref={sectionRef} style={{ backgroundColor: "#EDE7D9", padding: "120px 0", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px" }}>

        <div ref={headerRef} style={{ marginBottom: 56 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#2E9B82", display: "block", marginBottom: 16 }}>Work</span>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(36px,4vw,52px)", fontWeight: 700, color: "#1C3D35", margin: "0 0 12px", lineHeight: 1.1 }}>
            Selected Projects
          </h2>
          <p style={{ fontSize: 14, color: "#718096", margin: 0 }}>Click any card to view the full presentation.</p>
        </div>

        {/* Single active card */}
        <div ref={listRef} onMouseEnter={stopTimer} onMouseLeave={startTimer}>
          <ProjectCard
            project={projects[activeIndex]}
            isActive={true}
            onClick={() => setModalProject(projects[activeIndex])}
          />

          {/* Dot navigation */}
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 32, alignItems: "center" }}>
            {projects.map((p, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  background: "none", border: "none", cursor: "pointer", padding: "4px 0",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                }}
              >
                <div style={{ width: i === activeIndex ? 32 : 8, height: 4, borderRadius: 2, backgroundColor: i === activeIndex ? "#1C3D35" : "rgba(28,61,53,0.2)", transition: "width 0.3s ease, background-color 0.3s ease" }} />
                {i === activeIndex && (
                  <span style={{ fontSize: 11, color: "#1C3D35", fontWeight: 600, letterSpacing: "0.06em" }}>{p.category}</span>
                )}
              </button>
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