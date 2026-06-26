"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import React from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

type Project = (typeof projects)[number];

function ProjectCard({ project, isActive, onClick }: { project: Project; isActive: boolean; onClick: () => void }) {
  return (
    <div onClick={onClick} style={{ backgroundColor: project.bgColor, border: "1px solid rgba(28,61,53,0.1)", borderRadius: 6, overflow: "hidden", cursor: "pointer", transition: "box-shadow 0.3s ease", height: "100%", display: "flex", flexDirection: "column" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(28,61,53,0.12)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}>
      <div style={{ position: "relative", width: "100%", paddingTop: "56%", backgroundColor: "#1C3D35", flexShrink: 0, overflow: "hidden" }}>
        <iframe
          src={project.slidesEmbed}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none", pointerEvents: isActive ? "auto" : "none" }}
          title={project.title}
        />
        {!isActive && (
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(28,61,53,0.3)" }} />
        )}
      </div>
      <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", color: project.accentColor }}>{project.category}</div>
        <h3 style={{ fontFamily: "Georgia, serif", fontSize: isActive ? 18 : 15, fontWeight: 700, color: "#1C3D35", margin: 0, lineHeight: 1.3, fontStyle: "italic" }}>{project.question}</h3>
        {isActive && (
          <>
            <p style={{ fontSize: 13, color: "#4A5568", margin: 0, lineHeight: 1.7 }}>{project.description}</p>
            <div style={{ borderLeft: "3px solid " + project.accentColor, paddingLeft: 12 }}>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 700, color: "#1C3D35", lineHeight: 1 }}>{project.stat}</div>
              <div style={{ fontSize: 12, color: "#718096", marginTop: 3 }}>{project.statLabel}</div>
            </div>
            <div style={{ display: "flex", gap: 16, paddingTop: 8, borderTop: "1px solid rgba(28,61,53,0.08)", marginTop: "auto" }}>
              <button onClick={(e: React.MouseEvent) => { e.stopPropagation(); onClick(); }} style={{ fontSize: 12, fontWeight: 600, color: "#1C3D35", background: "none", border: "none", padding: 0, cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3 }}>View full slides</button>
              <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e: React.MouseEvent) => e.stopPropagation()} style={{ fontSize: 12, color: "#718096", textDecoration: "underline", textUnderlineOffset: 3 }}>GitHub</a>
              {project.streamlit && (
                <a href={project.streamlit} target="_blank" rel="noopener noreferrer" onClick={(e: React.MouseEvent) => e.stopPropagation()} style={{ fontSize: 12, color: "#718096", textDecoration: "underline", textUnderlineOffset: 3 }}>Live demo</a>
              )}
            </div>
          </>
        )}
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
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, backgroundColor: "rgba(28,61,53,0.75)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
      <div onClick={(e: React.MouseEvent) => e.stopPropagation()} style={{ backgroundColor: "#F5F0E8", borderRadius: 6, maxWidth: 860, width: "100%", maxHeight: "90vh", overflowY: "auto", position: "relative" }}>
        <div style={{ padding: "24px 28px 16px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid rgba(28,61,53,0.1)" }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", color: project.accentColor, marginBottom: 6 }}>{project.category}</div>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700, color: "#1C3D35", margin: 0, fontStyle: "italic" }}>{project.question}</h2>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#718096", padding: "4px 8px", flexShrink: 0 }}>x</button>
        </div>
        <iframe src={project.slidesEmbed} style={{ width: "100%", height: 480, border: "none", display: "block" }} allowFullScreen title={project.title} />
        <div style={{ padding: "16px 28px 24px", display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 600, backgroundColor: project.accentColor, color: "#fff", padding: "10px 20px", borderRadius: 5, textDecoration: "none" }}>View on GitHub</a>
          {project.streamlit && (
            <a href={project.streamlit} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 600, backgroundColor: "transparent", color: "#1C3D35", padding: "10px 20px", borderRadius: 5, border: "2px solid #1C3D35", textDecoration: "none" }}>Live demo</a>
          )}
        </div>
      </div>
    </div>
  );
}

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
    intervalRef.current = setInterval(() => setActiveIndex(i => (i + 1) % projects.length), 5000);
  }, []);
  const stopTimer = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  }, []);
  useEffect(() => { startTimer(); return stopTimer; }, [startTimer, stopTimer]);
  const goTo = useCallback((i: number) => { setActiveIndex(i); startTimer(); }, [startTimer]);
  const prevIdx = (activeIndex - 1 + projects.length) % projects.length;
  const nextIdx = (activeIndex + 1) % projects.length;
  useGSAP(() => {
    if (headerRef.current) {
      gsap.fromTo(Array.from(headerRef.current.children), { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: headerRef.current, start: "top 80%", once: true } });
    }
    if (carouselRef.current) {
      gsap.fromTo(carouselRef.current, { y: 48, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: carouselRef.current, start: "top 80%", once: true } });
    }
  }, { scope: sectionRef });
  return (
    <section id="work" ref={sectionRef} style={{ backgroundColor: "#EDE7D9", padding: "120px 0", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
        <div ref={headerRef} style={{ marginBottom: 56 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#2E9B82", display: "block", marginBottom: 16 }}>Work</span>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(36px,4vw,52px)", fontWeight: 700, color: "#1C3D35", margin: "0 0 12px", lineHeight: 1.1 }}>Selected Projects</h2>
          <p style={{ fontSize: 14, color: "#718096", margin: 0 }}>Scroll through or click any project to view the full presentation.</p>
        </div>
        <div ref={carouselRef} onMouseEnter={stopTimer} onMouseLeave={startTimer}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", gap: 16, alignItems: "start" }}>
            <div style={{ opacity: 0.5, cursor: "pointer", transition: "opacity 0.3s ease" }} onClick={() => goTo(prevIdx)}
              onMouseEnter={(e) => (e.currentTarget as HTMLDivElement).style.opacity = "0.7"}
              onMouseLeave={(e) => (e.currentTarget as HTMLDivElement).style.opacity = "0.5"}>
              <ProjectCard project={projects[prevIdx]} isActive={false} onClick={() => goTo(prevIdx)} />
            </div>
            <div>
              <ProjectCard project={projects[activeIndex]} isActive={true} onClick={() => setModalProject(projects[activeIndex])} />
            </div>
            <div style={{ opacity: 0.5, cursor: "pointer", transition: "opacity 0.3s ease" }} onClick={() => goTo(nextIdx)}
              onMouseEnter={(e) => (e.currentTarget as HTMLDivElement).style.opacity = "0.7"}
              onMouseLeave={(e) => (e.currentTarget as HTMLDivElement).style.opacity = "0.5"}>
              <ProjectCard project={projects[nextIdx]} isActive={false} onClick={() => goTo(nextIdx)} />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginTop: 32 }}>
            <button onClick={() => goTo(prevIdx)} style={{ background: "none", border: "1.5px solid rgba(28,61,53,0.25)", borderRadius: "50%", width: 40, height: 40, cursor: "pointer", fontSize: 18, color: "#1C3D35", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s ease" }}
              onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.borderColor = "#1C3D35"}
              onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(28,61,53,0.25)"}>←</button>
            {projects.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 0" }}>
                <div style={{ width: i === activeIndex ? 28 : 8, height: 4, borderRadius: 2, backgroundColor: i === activeIndex ? "#1C3D35" : "rgba(28,61,53,0.2)", transition: "width 0.3s ease, background-color 0.3s ease" }} />
              </button>
            ))}
            <button onClick={() => goTo(nextIdx)} style={{ background: "none", border: "1.5px solid rgba(28,61,53,0.25)", borderRadius: "50%", width: 40, height: 40, cursor: "pointer", fontSize: 18, color: "#1C3D35", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s ease" }}
              onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.borderColor = "#1C3D35"}
              onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(16, 29, 26, 0.25)"}>→</button>
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
