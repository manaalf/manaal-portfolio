import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manaal Fatima — AI Strategy & Analytics",
  description:
    "Portfolio of Manaal Fatima, MSBA candidate at UCI. AI strategy, business analytics, consulting, and product management.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">
        {children}
      </body>
    </html>
  );
}
