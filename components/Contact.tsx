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
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.481C19.137 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  useEffect(() => () => { if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current); }, []);

  useGSAP(() => {
    if (contentRef.current) {
      gsap.fromTo(Array.from(contentRef.current.children),
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.14, ease: "power3.out",
          scrollTrigger: { trigger: contentRef.current, start: "top 80%", once: true } }
      );
    }
  }, { scope: sectionRef });

  const btnBase = {
    fontSize: 14, fontWeight: 600,
    padding: "13px 28px", borderRadius: 6,
    textDecoration: "none",
    transition: "all 0.2s ease",
    display: "inline-flex", alignItems: "center", gap: 8,
    cursor: "pointer", letterSpacing: "0.02em",
  } as const;

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ backgroundColor: "var(--forest)", padding: "120px 0 0", position: "relative", overflow: "hidden" }}
    >
      {/* Subtle texture overlay */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 80%, rgba(62,191,160,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(196,168,130,0.06) 0%, transparent 50%)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div ref={contentRef} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>

          <span className="section-label" style={{ color: "var(--teal)" }}>
            Contact
          </span>

          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px,5vw,64px)", fontWeight: 700, color: "var(--cream)", margin: 0, lineHeight: 1.05 }}>
            Let&apos;s build{" "}
            <em style={{ color: "var(--teal)", fontStyle: "italic" }}>something.</em>
          </h2>

          <p style={{ fontSize: 16, color: "rgba(245,240,232,0.6)", margin: 0, maxWidth: 440, lineHeight: 1.7 }}>
            Open to roles in AI strategy, analytics, consulting, and product. Based in California.
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginTop: 8 }}>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"
              style={{ ...btnBase, backgroundColor: "var(--teal)", color: "var(--forest)", border: "2px solid var(--teal)" }}
              onMouseEnter={(e) => { const a = e.currentTarget as HTMLAnchorElement; a.style.backgroundColor = "transparent"; a.style.color = "var(--teal)"; }}
              onMouseLeave={(e) => { const a = e.currentTarget as HTMLAnchorElement; a.style.backgroundColor = "var(--teal)"; a.style.color = "var(--forest)"; }}>
              Connect on LinkedIn
            </a>
            <a href={`mailto:${EMAIL}`} onClick={handleEmailClick}
              style={{ ...btnBase, backgroundColor: "transparent", color: "var(--cream)", border: "2px solid rgba(245,240,232,0.35)", minWidth: 148, justifyContent: "center" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--cream)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(245,240,232,0.35)")}>
              {copied ? "Copied!" : "Send an Email"}
            </a>
          </div>

          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
            style={{ color: "rgba(245,240,232,0.4)", transition: "color 0.2s ease", marginTop: 4 }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--teal)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,240,232,0.4)")}>
            <GitHubIcon />
          </a>
        </div>
      </div>

      <footer style={{ textAlign: "center", padding: "64px 24px 32px", marginTop: 80, borderTop: "1px solid rgba(245,240,232,0.08)", position: "relative", zIndex: 1 }}>
        <p style={{ fontSize: 13, color: "rgba(245,240,232,0.35)", margin: 0 }}>© 2026 Manaal Fatima</p>
      </footer>
    </section>
  );
}
