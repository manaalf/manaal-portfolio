import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Inter with the three weights specified in CLAUDE.md
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Manaal Fatma — AI Strategy & Analytics",
  description:
    "Portfolio of Manaal Fatma, MSBA candidate at UCI. AI strategy, business analytics, consulting, and product management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body
        className="min-h-full"
        style={{ backgroundColor: "#0A0F1E", fontFamily: "var(--font-inter)" }}
      >
        {children}
      </body>
    </html>
  );
}
