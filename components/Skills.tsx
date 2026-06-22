"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SKILL_GROUPS = [
  {
    category: "Technical",
    color: "var(--teal)",
    skills: [
      { name: "Python",             note: "ML models, RAG pipelines, data analysis" },
      { name: "SQL",                note: "analytics projects, data querying" },
      { name: "Tableau / Power BI", note: "dashboards, data visualization" },
    ],
  },
  {
    category: "AI & Machine Learning",
    color: "#6DB5A8",
    skills: [
      { name: "Machine Learning",  note: "Yelp classifier, predictive modeling" },
      { name: "NLP & LLMs",        note: "NBA chatbot, PolicyPal RAG systems" },
      { name: "RAG Architecture",  note: "vector stores, retrieval pipelines" },
    ],
  },
  {
    category: "Business & Strategy",
    color: "var(--sand)",
    skills: [
      { name: "A/B Testing",              note: "analytics coursework" },
      { name: "Stakeholder Management",   note: "Engro, Habib Bank internships" },
      { name: "Product Thinking",         note: "GTM strategy, roadmapping" },
    ],
  },
];

export default function Skills() {
  const sectionRef   = useRef<HTMLElement>(null);
  const headerRef    = useRef<HTMLDivElement>(null);
  const groupsRef    = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (headerRef.current) {
      gsap.fromTo(Array.from(headerRef.current.children),
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 80%", once: true } }
      );
    }
    if (groupsRef.current) {
      gsap.fromTo(Array.from(groupsRef.current.children),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: groupsRef.current, start: "top 80%", once: true } }
      );
    }
  }, { scope: sectionRef });

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{ backgroundColor: "var(--forest)", padding: "120px 0" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>

        <div ref={headerRef} style={{ marginBottom: 72 }}>
          <span className="section-label" style={{ color: "var(--teal)", display: "block", marginBottom: 16 }}>
            Expertise
          </span>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 4vw, 52px)",
            fontWeight: 700, color: "var(--cream)",
            margin: 0, lineHeight: 1.1,
          }}>
            Capabilities
          </h2>
        </div>

        {/* Three columns — one per category */}
        <div ref={groupsRef} style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 2,
        }}
          className="skills-grid"
        >
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.category}
              style={{
                backgroundColor: "rgba(245,240,232,0.05)",
                padding: "36px 32px",
                borderTop: `3px solid ${group.color}`,
              }}
            >
              {/* Category label in accent color */}
              <span style={{
                fontSize: 11, fontWeight: 600,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: group.color, display: "block", marginBottom: 28,
              }}>
                {group.category}
              </span>

              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {group.skills.map(({ name, note }, i) => (
                  <div
                    key={name}
                    style={{
                      padding: "18px 0",
                      borderBottom: i < group.skills.length - 1
                        ? "1px solid rgba(245,240,232,0.08)"
                        : "none",
                    }}
                  >
                    <span style={{
                      fontSize: 16, fontWeight: 600,
                      color: "var(--cream)", display: "block", marginBottom: 4,
                    }}>
                      {name}
                    </span>
                    <span style={{ fontSize: 13, color: "rgba(245,240,232,0.45)", lineHeight: 1.5 }}>
                      {note}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
