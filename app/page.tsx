import ParticleBackgroundClient from "../components/ParticleBackgroundClient";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Contact from "../components/Contact";

// Thin teal divider rendered between each section pair
function Divider() {
  return (
    <div
      style={{
        height: 1,
        backgroundColor: "rgba(0,212,170,0.15)",
        position: "relative",
        zIndex: 2,
      }}
    />
  );
}

export default function Home() {
  return (
    <main style={{ position: "relative", backgroundColor: "#0A0F1E" }}>
      {/* Fixed particle layer — z-index 0, behind everything */}
      <ParticleBackgroundClient />

      {/* Sticky navigation — z-index 50 */}
      <Navigation />

      <Hero />
      <Divider />
      <About />
      <Divider />
      <Skills />
      <Divider />
      <Projects />
      <Divider />
      <Experience />
      <Divider />
      <Contact />
    </main>
  );
}
