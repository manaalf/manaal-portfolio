"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const CERTS = [
  {
    name: "Google Data Analytics Certificate",
    issuer: "Google",
    year: "2024",
    color: "var(--teal)",
  },
  {
    name: "Claude Code Certification",
    issuer: "Anthropic",
    year: "2025",
    color: "#C4A882",
  },
  {
    name: "Cowork Certification",
    issuer: "Anthropic",
    year: "2025",
    color: "#C4A882",
  },
];

const SKILLS = [
  { category: "Technical", items: ["Python", "SQL", "Tableau", "Power BI", "R"] },
  { category: "AI & ML", items: ["Machine Learning", "NLP", "RAG Architecture", "LLMs", "Deep Learning"] },
  { category: "Business", items: ["Stakeholder Management", "GTM Strategy", "A/B Testing", "Consulting", "Product Thinking"] },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const bodyRef    = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (headerRef.current) {
      gsap.fromTo(Array.from(headerRef.current.children),
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 80%", once: true } }
      );
    }
    if (bodyRef.current) {
      gsap.fromTo(Array.from(bodyRef.current.children),
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: bodyRef.current, start: "top 82%", once: true } }
      );
    }
  }, { scope: sectionRef });

  return (
    <section id="skills" ref={sectionRef} style={{ backgroundColor: "var(--forest)", padding: "120px 0", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>

        <div ref={headerRef} style={{ marginBottom: 72 }}>
          <span className="section-label" style={{ color: "var(--teal)", display: "block", marginBottom: 16 }}>
            Skills & Credentials
          </span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,4vw,52px)", fontWeight: 700, color: "var(--cream)", margin: 0, lineHeight: 1.1 }}>
            What I work with
          </h2>
        </div>

        <div ref={bodyRef}>
          {/* Skills by category */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, marginBottom: 64 }} className="skills-grid">
            {SKILLS.map((group) => (
              <div key={group.category} style={{ backgroundColor: "rgba(245,240,232,0.05)", padding: "32px 28px", borderTop: "2px solid var(--teal)" }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--teal)", display: "block", marginBottom: 24 }}>
                  {group.category}
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {group.items.map(item => (
                    <span key={item} style={{ fontSize: 15, fontWeight: 500, color: "var(--cream)" }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,240,232,0.4)", display: "block", marginBottom: 24 }}>
              Certifications
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {CERTS.map((cert, i) => (
                <div key={cert.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", borderTop: "1px solid rgba(245,240,232,0.08)", borderBottom: i === CERTS.length - 1 ? "1px solid rgba(245,240,232,0.08)" : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: cert.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 16, fontWeight: 500, color: "var(--cream)" }}>{cert.name}</span>
                  </div>
                  <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
                    <span style={{ fontSize: 13, color: "rgba(245,240,232,0.5)" }}>{cert.issuer}</span>
                    <span style={{ fontSize: 13, color: cert.color, fontWeight: 600 }}>{cert.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
