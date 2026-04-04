"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const LINKEDIN_URL = "https://www.linkedin.com/in/manaalfatima/";
const EMAIL        = "manaalf@uci.edu";
const GITHUB_URL   = "https://github.com/manaalf";

function GitHubIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.481C19.137 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  // "Copied!" feedback state for the email button
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Copy to clipboard; if it fails the mailto href still opens normally
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      // Clipboard API unavailable — mailto fallback proceeds via href
    });
  };

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  // ── Slow-moving gradient animation ─────────────────────────────────────────
  // A CSS keyframe animation shifts the background-position of a large
  // teal→purple gradient, creating a slow drift at very low opacity.
  useEffect(() => {
    const styleId = "contact-gradient-keyframes";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        @keyframes gradientDrift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  useGSAP(
    () => {
      if (contentRef.current) {
        gsap.fromTo(
          Array.from(contentRef.current.children),
          { y: 32, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.14, ease: "power3.out",
            scrollTrigger: { trigger: contentRef.current, start: "top 80%", once: true },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  const btnBase = {
    fontSize: 14,
    fontWeight: 500,
    padding: "12px 24px",
    borderRadius: 8,
    textDecoration: "none",
    transition: "opacity 0.2s ease",
    display: "inline-block",
    cursor: "pointer",
  } as const;

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ backgroundColor: "#0D1526", paddingTop: 120, position: "relative", overflow: "hidden" }}
    >
      {/*
        Animated gradient layer — very low opacity so it reads as a subtle
        atmospheric effect rather than a graphic. background-size: 300% lets
        the animation travel far enough to feel like motion.
      */}
      <div
        ref={gradientRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, #00D4AA, #0D1526, #8B5CF6, #0D1526, #00D4AA)",
          backgroundSize: "300% 300%",
          opacity: 0.07,
          animation: "gradientDrift 18s ease infinite",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Centered content ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div ref={contentRef} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>

          <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#00D4AA" }}>
            CONTACT
          </span>

          <h2 style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, color: "#FFFFFF", margin: 0, lineHeight: 1.15 }}>
            Let&apos;s build{" "}
            <span style={{ color: "#00D4AA" }}>something.</span>
          </h2>

          <p style={{ fontSize: 16, color: "#94A3B8", margin: 0 }}>
            Open to roles in AI strategy, analytics, consulting, and product. Based in Anaheim, CA.
          </p>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginTop: 8 }}>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...btnBase, backgroundColor: "#00D4AA", color: "#0A0F1E", border: "1px solid #00D4AA" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.85")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
            >
              Connect on LinkedIn
            </a>

            {/*
              href keeps the mailto as a fallback for when clipboard API is
              unavailable. onClick copies the address and shows "Copied!" for 2s.
              No target="_blank" — mailto should open the local mail client.
            */}
            <a
              href={`mailto:${EMAIL}`}
              onClick={handleEmailClick}
              style={{
                ...btnBase,
                backgroundColor: "transparent",
                color: "#FFFFFF",
                border: "1px solid #FFFFFF",
                minWidth: 148,   // prevents layout shift when text swaps to "Copied!"
                textAlign: "center",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.75")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
            >
              {copied ? "Copied!" : "Send an Email"}
            </a>
          </div>

          {/* GitHub icon — no label */}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            style={{ color: "#94A3B8", transition: "color 0.2s ease", marginTop: 4 }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#00D4AA")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#94A3B8")}
          >
            <GitHubIcon />
          </a>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer
        style={{
          textAlign: "center",
          padding: "48px 24px 32px",
          marginTop: 80,
          borderTop: "1px solid rgba(30,58,95,0.4)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <p style={{ fontSize: 13, color: "#94A3B8", margin: 0 }}>
          © 2026 Manaal Fatima
        </p>
      </footer>
    </section>
  );
}
