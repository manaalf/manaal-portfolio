"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Typed from "typed.js";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const lenis = new Lenis();
    let rafId: number;
    function raf(time: number) { lenis.raf(time); rafId = requestAnimationFrame(raf); }
    rafId = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);

  useEffect(() => {
    if (!typewriterRef.current) return;
    const typed = new Typed(typewriterRef.current, {
      strings: ["AI Strategist", "Analytics Consultant", "Product Thinker", "Data Storyteller"],
      typeSpeed: 60, backSpeed: 40, backDelay: 1800, loop: true,
      showCursor: true, cursorChar: "|",
    });
    return () => typed.destroy();
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
    <section
      id="home"
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // Deep forest green — the anchor of the palette
        background: "linear-gradient(160deg, #1C3D35 0%, #152E27 60%, #0F2118 100%)",
        overflow: "hidden",
      }}
    >
      {/* Subtle warm vignette at bottom to ease transition */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: 120,
        background: "linear-gradient(to bottom, transparent, rgba(15,33,24,0.6))",
        pointerEvents: "none", zIndex: 2,
      }} />

      <div
        ref={contentRef}
        style={{
          position: "relative", zIndex: 11,
          display: "flex", flexDirection: "column",
          alignItems: "center", textAlign: "center",
          gap: 20, padding: "0 24px", maxWidth: 720, width: "100%",
        }}
      >
        {/* Label */}
        <span style={{
          fontFamily: "var(--font-body)",
          fontSize: 11, fontWeight: 600,
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: "var(--teal)",
        }}>
          AI Strategy & Analytics
        </span>

        {/* Name — Playfair for personality */}
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(52px, 7vw, 80px)",
          fontWeight: 700, color: "var(--cream)",
          margin: 0, lineHeight: 1.05,
        }}>
          Manaal Fatima
        </h1>

        {/* Typewriter */}
        <div style={{ fontSize: 18, color: "var(--teal)", minHeight: 30, fontWeight: 500 }}>
          <span ref={typewriterRef} />
        </div>

        {/* Subtitle */}
        <p style={{
          fontSize: 17, color: "rgba(245,240,232,0.65)",
          margin: 0, lineHeight: 1.7, maxWidth: 520,
          fontStyle: "italic",
          fontFamily: "var(--font-display)",
        }}>
          I don&apos;t start with the data. I start with what we&apos;re actually trying to solve.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginTop: 8 }}>
          <a
            href="#work"
            onClick={(e) => { e.preventDefault(); document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{
              fontSize: 14, fontWeight: 600,
              backgroundColor: "var(--teal)", color: "var(--forest)",
              padding: "13px 28px", borderRadius: 6,
              border: "2px solid var(--teal)",
              transition: "all 0.2s ease", letterSpacing: "0.02em",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--teal)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--teal)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--forest)"; }}
          >
            View My Work
          </a>
          <a
            href="/resume.pdf"
            download
            style={{
              fontSize: 14, fontWeight: 600,
              backgroundColor: "transparent", color: "var(--cream)",
              padding: "13px 28px", borderRadius: 6,
              border: "2px solid rgba(245,240,232,0.35)",
              transition: "all 0.2s ease", letterSpacing: "0.02em",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--cream)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(245,240,232,0.35)"; }}
          >
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
