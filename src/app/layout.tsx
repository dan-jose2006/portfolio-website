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
  keywords: ["Dan Abraham Jose", "AI Engineer", "Machine Learning", "Artificial Intelligence", "Portfolio", "Next.js", "Full Stack", "Developer", "Software Engineer"],
  authors: [{ name: "Dan Abraham Jose" }],
  creator: "Dan Abraham Jose",
  openGraph: {
    title: "Dan Abraham Jose | AI/ML Engineer",
    description: "Portfolio of Dan Abraham Jose, building intelligent, interactive, and user-focused technology solutions in AI and Full Stack.",
    type: "profile",
    firstName: "Dan Abraham",
    lastName: "Jose",
    siteName: "Dan Abraham Jose Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dan Abraham Jose | AI/ML Engineer",
    description: "Portfolio of Dan Abraham Jose, building intelligent technology solutions.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dan Abraham Jose",
  jobTitle: "AI/ML Engineer",
  url: "https://dan-jose-portfolio.vercel.app/",
  sameAs: [
    "https://github.com/yourgithub", // Note: Replace with actual GitHub URL
    "https://www.linkedin.com/in/dan-jose-4997b5315"
  ],
  knowsAbout: ["Artificial Intelligence", "Machine Learning", "Web Development", "React", "Next.js", "Full Stack Development"]
};

import { PerformanceProvider } from "@/context/PerformanceContext";
import Starfield from "@/components/Starfield";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="w-full relative bg-[#121212]">
        <PerformanceProvider>
          <Starfield />
          <div className="relative z-10 w-full">
            {children}
          </div>
          <Analytics />
        </PerformanceProvider>
      </body>
    </html>
  );
}
