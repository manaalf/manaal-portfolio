"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// ── Proficiency grid data ─────────────────────────────────────────────────────
const PROFICIENCY_ROWS = [
  { skill: "Python",                 context: "ML models, RAG pipelines, data analysis"  },
  { skill: "SQL",                    context: "analytics projects, data querying"         },
  { skill: "Tableau / Power BI",     context: "data visualization, dashboards"            },
  { skill: "Machine Learning",       context: "Yelp classifier, predictive modeling"      },
  { skill: "NLP & LLMs",            context: "NBA chatbot, PolicyPal RAG systems"        },
  { skill: "A/B Testing",            context: "analytics coursework"                      },
  { skill: "Stakeholder Management", context: "Engro, Habib Bank internships"             },
];


export default function Skills() {
  const sectionRef      = useRef<HTMLElement>(null);
  const headerRef       = useRef<HTMLDivElement>(null);
  const proficiencyRef  = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // ── Header (label + heading) fades up ──────────────────────────────
      if (headerRef.current) {
        gsap.fromTo(
          Array.from(headerRef.current.children),
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // ── Proficiency rows stagger in one by one ──────────────────────────
      if (proficiencyRef.current) {
        gsap.fromTo(
          Array.from(proficiencyRef.current.children),
          { x: -16, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.09,
            ease: "power3.out",
            scrollTrigger: {
              trigger: proficiencyRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

    },
    { scope: sectionRef }
  );

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{ backgroundColor: "#0A0F1E", padding: "120px 0" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

        {/* ── Section header ── */}
        <div
          ref={headerRef}
          style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 72 }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#00D4AA",
            }}
          >
            EXPERTISE
          </span>
          <h2
            style={{
              fontSize: "clamp(36px, 4vw, 56px)",
              fontWeight: 700,
              color: "#FFFFFF",
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            Capabilities
          </h2>
        </div>

        {/* ── Proficiency grid — full width ── */}
        <div ref={proficiencyRef} style={{
          display: "flex",
          flexDirection: "column",
          gap: 0,
          background: "linear-gradient(90deg, rgba(0,212,170,0.05) 0%, rgba(41,82,152,0.08) 100%)",
          borderLeft: "1px solid rgba(0,212,170,0.4)",
          borderRadius: 4,
        }}>
            {PROFICIENCY_ROWS.map(({ skill, context }) => (
              <div
                key={skill}
                style={{
                  // Subtle teal left border on each row
                  borderLeft: "2px solid rgba(0, 212, 170, 0.4)",
                  paddingLeft: 16,
                  paddingTop: 14,
                  paddingBottom: 14,
                  // Faint separator between rows
                  borderBottom: "1px solid rgba(30, 58, 95, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  minWidth: 0,  // Prevents flex children from overflowing
                }}
              >
                {/* Skill name */}
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                    color: "#00D4AA",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {skill}
                </span>

                {/* Dotted teal leader line */}
                <div
                  style={{
                    flex: 1,
                    borderBottom: "1px dotted rgba(0,212,170,0.4)",
                    marginBottom: 2,  // Optical alignment with text baseline
                    minWidth: 16,
                  }}
                />

                {/* Context label */}
                <span
                  style={{
                    fontSize: 13,
                    color: "#94A3B8",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {context}
                </span>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
