"use client";

import dynamic from "next/dynamic";

// ssr: false is only valid inside a Client Component.
// This wrapper exists solely to host the dynamic import so page.tsx
// can remain a Server Component.
const ParticleBackground = dynamic(() => import("./ParticleBackground"), {
  ssr: false,
});

export default function ParticleBackgroundClient() {
  return <ParticleBackground />;
}
