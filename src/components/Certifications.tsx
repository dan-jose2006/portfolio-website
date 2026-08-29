"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Award, ExternalLink } from "lucide-react";
import { usePerformance } from "@/context/PerformanceContext";

export type CertType = 
  | 'lnt' 
  | 'christ' 
  | 'yesummit-2025' 
  | 'yesummit-2026' 
  | 'unlox-hackathon' 
  | 'promptwars'
  | 'aws-cloud'
  | 'lnt-frontend'
  | 'infosys-se';

interface CertificationsProps {
  onShowCertificate: (type: CertType) => void;
}

interface CertItem {
  id: CertType;
  title: string;
  issuer: string;
  date: string;
  badge?: string;
  description: string;
  skills: string[];
  externalVerify?: string;
}

const CERTIFICATIONS: CertItem[] = [
  {
    id: "aws-cloud",
    title: "AWS Academy Graduate - Cloud Foundations",
    issuer: "AWS Academy (Amazon Web Services)",
    date: "August 28, 2026",
    badge: "20 Hours • Credly Digital Badge",
    description: "Completed comprehensive training on AWS cloud architecture, security & compliance, core services (EC2, S3, RDS, VPC), compute, networking, and cloud economics.",
    skills: ["AWS Cloud", "Cloud Architecture", "Security", "Cloud Economics", "DevOps Fundamentals"],
    externalVerify: "https://www.credly.com/go/W2PFwIAv"
  },
  {
    id: "lnt-frontend",
    title: "Front end UI and UX Developer",
    issuer: "L&T EduTech CollegeConnect",
    date: "Jun 2025 – Oct 2025",
    badge: "First Class",
    description: "Certified with First Class honours in modern frontend engineering, UX design heuristics, responsive layouts, web performance optimization, and interactive component architecture.",
    skills: ["UI/UX Design", "Frontend Engineering", "Responsive Web", "Interaction Design"]
  },
  {
    id: "infosys-se",
    title: "Software Engineering",
    issuer: "Infosys Springboard",
    date: "July 8, 2026",
    badge: "Course Completion",
    description: "Validated proficiency in modern software engineering principles, Agile & SDLC workflows, requirements engineering, object-oriented design, and software testing practices.",
    skills: ["Software Engineering", "SDLC", "Agile Methodologies", "System Design", "Quality Assurance"]
  }
];

export default function Certifications({ onShowCertificate }: CertificationsProps) {
  const { tier } = usePerformance();
  const isLowEnd = tier === "low";

  return (
    <section id="certifications" className="relative z-20 bg-transparent py-16 md:py-24 px-6 md:px-12 lg:px-24">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-950/15 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <Award className="text-emerald-400 w-5 h-5" />
            <h3 className="text-sm font-medium text-emerald-400 uppercase tracking-widest">
              Professional Certifications
            </h3>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            Industry-recognized credentials.
          </h2>
          <p className="text-white/50 text-lg mt-4 max-w-2xl">
            Certified technical proficiencies across cloud architecture, modern frontend UI/UX engineering, and software development methodologies.
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CERTIFICATIONS.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              whileHover={isLowEnd ? {} : { y: -6 }}
              className={`relative rounded-[2rem] border border-white/10 p-8 flex flex-col justify-between transition-all duration-500 group overflow-hidden ${
                isLowEnd ? 'bg-[#1e1e1e]' : 'bg-white/5 backdrop-blur-md hover:border-emerald-500/30'
              }`}
            >
              {!isLowEnd && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-emerald-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem]" />
                  <div className="rotating-border-glow opacity-60 group-hover:opacity-100" />
                </>
              )}

              <div className="relative z-10">
                {/* Issuer & Date Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono">
                    {cert.issuer}
                  </span>
                  <span className="text-white/50 text-xs font-mono bg-black/40 px-3 py-1 rounded-full border border-white/5">
                    {cert.date}
                  </span>
                </div>

                {/* Badge pill if available */}
                {cert.badge && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-medium mb-4">
                    <Award className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{cert.badge}</span>
                  </div>
                )}

                {/* Title */}
                <h4 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors duration-300">
                  {cert.title}
                </h4>

                {/* Description */}
                <p className="text-white/70 text-sm leading-relaxed mb-6 font-light">
                  {cert.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 bg-white/5 text-white/70 text-xs rounded-full border border-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="relative z-10 flex items-center gap-3 pt-4 border-t border-white/10 mt-auto">
                <motion.button
                  onClick={() => onShowCertificate(cert.id)}
                  whileHover={isLowEnd ? {} : { scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 text-white font-medium text-sm rounded-xl transition-all duration-300 cursor-pointer ${
                    isLowEnd 
                      ? 'bg-[#333] hover:bg-[#444]' 
                      : 'bg-white/10 hover:bg-white/20 border border-white/15 shadow-sm hover:shadow-emerald-500/10'
                  }`}
                >
                  <span>Show Certificate</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.button>

                {cert.externalVerify && (
                  <a
                    href={cert.externalVerify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/20 transition-all duration-300"
                    title="Verify on Credly"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
