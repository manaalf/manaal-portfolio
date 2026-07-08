"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis();
    let rafId: number;
    function raf(time: number) { lenis.raf(time); rafId = requestAnimationFrame(raf); }
    rafId = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);

  useGSAP(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      Array.from(contentRef.current.children),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.14, ease: "power3.out" }
    );
  }, { scope: contentRef });

  return (
    <section id="home" style={{ position: "relative", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(160deg, #1C3D35 0%, #152E27 60%, #0F2118 100%)", overflow: "hidden" }}>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(to bottom, transparent, rgba(15,33,24,0.6))", pointerEvents: "none", zIndex: 2 }} />
      <div ref={contentRef} style={{ position: "relative", zIndex: 11, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 24, padding: "0 24px", maxWidth: 720, width: "100%" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(56px, 8vw, 96px)", fontWeight: 700, color: "var(--cream)", margin: 0, lineHeight: 1.05 }}>
          Manaal Fatima
        </h1>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
          <a href="#work" onClick={(e: React.MouseEvent) => { e.preventDefault(); document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{ fontSize: 14, fontWeight: 600, backgroundColor: "var(--teal)", color: "var(--forest)", padding: "13px 28px", borderRadius: 6, border: "2px solid var(--teal)", transition: "all 0.2s ease", letterSpacing: "0.02em", textDecoration: "none" }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--teal)"; }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = "var(--teal)"; e.currentTarget.style.color = "var(--forest)"; }}>
            View My Work
          </a>
          <a href="/resume.pdf" download
            style={{ fontSize: 14, fontWeight: 600, backgroundColor: "transparent", color: "var(--cream)", padding: "13px 28px", borderRadius: 6, border: "2px solid rgba(245,240,232,0.35)", transition: "all 0.2s ease", letterSpacing: "0.02em", textDecoration: "none" }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = "var(--cream)"; }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = "rgba(245,240,232,0.35)"; }}>
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
