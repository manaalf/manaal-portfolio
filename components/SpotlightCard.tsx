"use client";

import { useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
  // Per-card border colors — defaults to the dark-navy design-system values
  borderColor?: string;
  borderHoverColor?: string;
}

export default function SpotlightCard({
  children,
  style,
  onClick,
  borderColor      = "#1E3A5F",
  borderHoverColor = "#2A5298",
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [gradient, setGradient] = useState("transparent");
  const [hovered,  setHovered]  = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setGradient(
      `radial-gradient(circle at ${x}px ${y}px, rgba(0,212,170,0.08) 0%, transparent 60%)`
    );
  };

  const handleMouseLeave = () => {
    setGradient("transparent");
    setHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        position: "relative",
        backgroundColor: "#111D35",
        border: `1px solid ${hovered ? borderHoverColor : borderColor}`,
        borderRadius: 16,
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
        transition: "border-color 0.3s ease",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: gradient,
          transition: gradient === "transparent" ? "background 0.3s ease" : "none",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
