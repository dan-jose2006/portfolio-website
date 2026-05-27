import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dan Abraham Jose | AI/ML Engineer",
  description: "Portfolio of Dan Abraham Jose, a BTech student specializing in Artificial Intelligence and Machine Learning, building intelligent technology solutions.",
  keywords: ["AI Engineer", "Machine Learning", "Dan Abraham Jose", "Portfolio", "Next.js", "Full Stack", "Developer"],
  openGraph: {
    title: "Dan Abraham Jose | AI/ML Engineer",
    description: "Building intelligent, interactive, and user-focused technology solutions.",
    type: "website",
  },
};

import { PerformanceProvider } from "@/context/PerformanceContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PerformanceProvider>
          {children}
          <Analytics />
        </PerformanceProvider>
      </body>
    </html>
  );
}
