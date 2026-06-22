"use client";

import { useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
  borderColor?: string;
  borderHoverColor?: string;
}

export default function SpotlightCard({
  children, style, onClick,
  borderColor      = "rgba(196,168,130,0.2)",
  borderHoverColor = "rgba(62,191,160,0.5)",
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [gradient, setGradient] = useState("transparent");
  const [hovered, setHovered]   = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left, y = e.clientY - top;
    setGradient(`radial-gradient(circle at ${x}px ${y}px, rgba(62,191,160,0.07) 0%, transparent 60%)`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setGradient("transparent"); setHovered(false); }}
      onClick={onClick}
      style={{
        position: "relative",
        backgroundColor: "var(--cream)",
        border: `1px solid ${hovered ? borderHoverColor : borderColor}`,
        borderRadius: 4,
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        boxShadow: hovered ? "0 8px 32px rgba(28,61,53,0.1)" : "0 2px 8px rgba(28,61,53,0.05)",
        ...style,
      }}
    >
      <div style={{
        position: "absolute", inset: 0,
        background: gradient,
        transition: gradient === "transparent" ? "background 0.3s ease" : "none",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}
