"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const CERTS = [
  { name: "Google Data Analytics Certificate", issuer: "Google",    year: "2024", color: "var(--teal)" },
  { name: "Claude Code Certification",          issuer: "Anthropic", year: "2025", color: "#C4A882"     },
  { name: "Cowork Certification",               issuer: "Anthropic", year: "2025", color: "#C4A882"     },
];

// size: lg | md | sm — controls visual weight in the tag cloud
const TAGS = [
  // Technical
  { label: "Python",           size: "lg", group: "technical" },
  { label: "SQL",              size: "md", group: "technical" },
  { label: "Tableau",          size: "md", group: "technical" },
  { label: "Power BI",         size: "sm", group: "technical" },
  // AI & ML
  { label: "Machine Learning", size: "lg", group: "ai"        },
  { label: "NLP",              size: "md", group: "ai"        },
  { label: "RAG Architecture", size: "lg", group: "ai"        },
  { label: "LLMs",             size: "md", group: "ai"        },
  { label: "Deep Learning",    size: "sm", group: "ai"        },
  // Business
  { label: "Stakeholder Mgmt", size: "md", group: "business"  },
  { label: "GTM Strategy",     size: "sm", group: "business"  },
  { label: "Consulting",       size: "md", group: "business"  },
  { label: "Product Thinking", size: "md", group: "business"  },
];

const SIZE_STYLES: Record<string, React.CSSProperties> = {
  lg: { fontSize: 15, fontWeight: 600, padding: "10px 20px", opacity: 1       },
  md: { fontSize: 13, fontWeight: 500, padding: "8px 16px",  opacity: 0.85    },
  sm: { fontSize: 12, fontWeight: 400, padding: "7px 14px",  opacity: 0.65    },
};

const GROUP_COLOR: Record<string, string> = {
  technical: "var(--teal)",
  ai:        "#6DB5A8",
  business:  "#C4A882",
};

export default function Skills() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const cloudRef    = useRef<HTMLDivElement>(null);
  const certsRef    = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (headerRef.current) {
      gsap.fromTo(Array.from(headerRef.current.children),
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 80%", once: true } }
      );
    }
    if (cloudRef.current) {
      gsap.fromTo(Array.from(cloudRef.current.children),
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.04, ease: "back.out(1.4)",
          scrollTrigger: { trigger: cloudRef.current, start: "top 82%", once: true } }
      );
    }
    if (certsRef.current) {
      gsap.fromTo(Array.from(certsRef.current.children),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: certsRef.current, start: "top 85%", once: true } }
      );
    }
  }, { scope: sectionRef });

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{ backgroundColor: "var(--forest)", padding: "120px 0", position: "relative", zIndex: 2 }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>

        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: 56 }}>
          <span className="section-label" style={{ color: "var(--teal)", display: "block", marginBottom: 16 }}>
            Skills & Credentials
          </span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,4vw,52px)", fontWeight: 700, color: "var(--cream)", margin: "0 0 12px", lineHeight: 1.1 }}>
            What I work with
          </h2>
          {/* Legend */}
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {[
              { label: "Technical", color: "var(--teal)" },
              { label: "AI & ML",   color: "#6DB5A8"     },
              { label: "Business",  color: "#C4A882"      },
            ].map(({ label, color }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: color }} />
                <span style={{ fontSize: 12, color: "rgba(245,240,232,0.5)", letterSpacing: "0.08em" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tag cloud */}
        <div
          ref={cloudRef}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 72,
            // Slight horizontal offset on alternating rows via negative margins on container
          }}
        >
          {TAGS.map((tag) => {
            const color = GROUP_COLOR[tag.group];
            const sizeStyle = SIZE_STYLES[tag.size];
            return (
              <span
                key={tag.label}
                style={{
                  ...sizeStyle,
                  color,
                  border: `1px solid ${color}`,
                  borderRadius: 999,
                  backgroundColor: `${color}10`,
                  letterSpacing: "0.03em",
                  display: "inline-block",
                  transition: "background-color 0.2s ease, transform 0.2s ease",
                  cursor: "default",
                  userSelect: "none",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLSpanElement;
                  el.style.backgroundColor = `${color}22`;
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLSpanElement;
                  el.style.backgroundColor = `${color}10`;
                  el.style.transform = "translateY(0)";
                }}
              >
                {tag.label}
              </span>
            );
          })}
        </div>

        {/* Certifications */}
        <div>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,240,232,0.35)", display: "block", marginBottom: 24 }}>
            Certifications
          </span>
          <div ref={certsRef} style={{ display: "flex", flexDirection: "column" }}>
            {CERTS.map((cert, i) => (
              <div
                key={cert.name}
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "20px 0",
                  borderTop: "1px solid rgba(245,240,232,0.08)",
                  borderBottom: i === CERTS.length - 1 ? "1px solid rgba(245,240,232,0.08)" : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: cert.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 15, fontWeight: 500, color: "var(--cream)" }}>{cert.name}</span>
                </div>
                <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
                  <span style={{ fontSize: 13, color: "rgba(245,240,232,0.4)" }}>{cert.issuer}</span>
                  <span style={{ fontSize: 13, color: cert.color, fontWeight: 600 }}>{cert.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
