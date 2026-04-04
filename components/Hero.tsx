"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Typed from "typed.js";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function Hero() {
  // Ref for the div whose direct children GSAP will stagger in
  const contentRef = useRef<HTMLDivElement>(null);

  // Ref for the span Typed.js types into
  const typewriterRef = useRef<HTMLSpanElement>(null);

  // ── 1. Lenis smooth scroll ────────────────────────────────────────────────
  // Initialized here and applies globally — Lenis intercepts all native
  // scroll events and replaces them with its eased, buttery scroll.
  // Navigation's scrollIntoView calls are automatically picked up by Lenis.
  useEffect(() => {
    const lenis = new Lenis();
    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // ── 2. Typed.js typewriter ────────────────────────────────────────────────
  // Targets the empty span via ref — Typed.js will write into its innerHTML.
  // showCursor: true adds the blinking | cursor Typed.js manages itself.
  useEffect(() => {
    if (!typewriterRef.current) return;

    const typed = new Typed(typewriterRef.current, {
      strings: [
        "AI Strategist",
        "Analytics Consultant",
        "Product Thinker",
        "Data Storyteller",
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1800,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });

    return () => typed.destroy();
  }, []);

  // ── 3. GSAP fade-up stagger on page load ──────────────────────────────────
  // useGSAP is @gsap/react's hook — handles GSAP context creation and cleanup
  // automatically, which prevents animation leaks between hot-reloads.
  // Targets every direct child of contentRef so we don't need individual refs.
  useGSAP(
    () => {
      if (!contentRef.current) return;

      gsap.fromTo(
        Array.from(contentRef.current.children),
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.13,  // Each element starts 130ms after the previous
          ease: "power3.out",
        }
      );
    },
    { scope: contentRef }
  );

  return (
    <section
      id="home"
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // Radial gradient gives subtle depth — lighter navy at center fades
        // to the deeper background color at the edges.
        background: "radial-gradient(ellipse at center, #0D1A35 0%, #0A0F1E 70%)",
      }}
    >
      {/*
        Content wrapper sits at z-index 2 so it paints above the fixed
        particle canvas (z-index 1). position: relative is required for
        z-index to take effect.
      */}
      <div
        ref={contentRef}
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 24,
          padding: "0 24px",
          maxWidth: 800,
          width: "100%",
        }}
      >
        {/* 1. Teal category label ------------------------------------------ */}
        <span
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#00D4AA",
          }}
        >
          AI STRATEGY &amp; ANALYTICS
        </span>

        {/* 2. Name headline — clamp() scales 48px (mobile) → 72px (desktop) -- */}
        <h1
          style={{
            fontSize: "clamp(48px, 7vw, 72px)",
            fontWeight: 700,
            color: "#FFFFFF",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          Manaal Fatima
        </h1>

        {/* 3. Typewriter line ---------------------------------------------- */}
        {/*
          minHeight prevents layout shift as different-length role strings
          cycle. The span is empty in the DOM — Typed.js writes into it.
        */}
        <div
          style={{
            fontSize: 18,
            color: "#00D4AA",
            minHeight: 30,
          }}
        >
          <span ref={typewriterRef} />
        </div>

        {/* 4. Subtitle ----------------------------------------------------- */}
        <p
          style={{
            fontSize: 18,
            color: "#94A3B8",
            margin: 0,
            lineHeight: 1.6,
            maxWidth: 560,
          }}
        >
          I don&apos;t start with the data. I start with what we&apos;re
          actually trying to solve.
        </p>

        {/* 5. CTA buttons -------------------------------------------------- */}
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",        // Stack on very narrow screens
            justifyContent: "center",
            marginTop: 8,
          }}
        >
          {/* Primary: teal filled, dark text */}
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              fontSize: 14,
              fontWeight: 500,
              backgroundColor: "#00D4AA",
              color: "#0A0F1E",
              padding: "12px 24px",
              borderRadius: 8,
              textDecoration: "none",
              border: "1px solid #00D4AA",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.85")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")
            }
          >
            View My Work
          </a>

          {/* Secondary: outlined, white text */}
          <a
            href="/resume.pdf"
            download
            style={{
              fontSize: 14,
              fontWeight: 500,
              backgroundColor: "transparent",
              color: "#FFFFFF",
              padding: "12px 24px",
              borderRadius: 8,
              textDecoration: "none",
              border: "1px solid #FFFFFF",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.75")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")
            }
          >
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
