"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Navbar from "@/components/Navbar";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Achievements from "@/components/Achievements";
import Certifications, { CertType } from "@/components/Certifications";
import Contact from "@/components/Contact";
import Modal from "@/components/Modal";
import ChatBot from "@/components/ChatBot";

export default function Home() {
  const [activeCert, setActiveCert] = useState<CertType | null>(null);
  const [certError, setCertError] = useState(false);

  return (
    <main className="bg-transparent min-h-screen selection:bg-emerald-400 selection:text-[#121212]">
      {/* Top Navigation */}
      <Navbar />

      {/* Scroll-Linked Animation Section */}
      <section className="relative w-full">
        <ScrollyCanvas />
        <Overlay />
      </section>

      {/* About Section */}
      <About />

      {/* Skills Section */}
      <Skills />

      {/* Experience Section */}
      <Experience onShowCertificate={(type) => {
        setCertError(false);
        setActiveCert(type);
      }} />

      {/* Education Section */}
      <Education />

      {/* Achievements Section */}
      <Achievements onShowCertificate={(type) => {
        setCertError(false);
        setActiveCert(type);
      }} />

      {/* Professional Certifications Section */}
      <Certifications onShowCertificate={(type) => {
        setCertError(false);
        setActiveCert(type);
      }} />

      {/* Projects Grid Section */}
      <div id="projects">
        <Projects />
      </div>

      {/* Contact Section at the Bottom */}
      <Contact />

      {/* Certificate Modal */}
      <Modal isOpen={activeCert !== null} onClose={() => setActiveCert(null)}>
        <div className="p-2 w-full">
          {!certError && activeCert ? (
            <div className="relative w-full h-[50vh] sm:h-[65vh] md:h-[75vh] lg:h-[80vh]">
              <Image
                src={
                  activeCert === 'lnt' ? "/certificate.png" : 
                  activeCert === 'christ' ? "/christ-certificate.jpeg" :
                  activeCert === 'yesummit-2025' ? "/yesummit-2025-v2.jpeg" :
                  activeCert === 'unlox-hackathon' ? "/unlox-hackathon.jpeg" :
                  activeCert === 'promptwars' ? "/promptwars-certificate.png" :
                  activeCert === 'aws-cloud' ? "/aws-cloud-certificate.png" :
                  activeCert === 'lnt-frontend' ? "/lnt-frontend-certificate.png" :
                  activeCert === 'infosys-se' ? "/infosys-se-certificate.png" :
                  "/yesummit-2026-v2.jpeg"
                }
                alt={
                  activeCert === 'unlox-hackathon' ? "Unlox Hackathon Trophy" : 
                  activeCert === 'promptwars' ? "PromptWars Certificate" :
                  activeCert === 'aws-cloud' ? "AWS Academy Graduate Certificate" :
                  activeCert === 'lnt-frontend' ? "L&T EduTech Front End Developer Certificate" :
                  activeCert === 'infosys-se' ? "Infosys Springboard Software Engineering Certificate" :
                  `${activeCert} Certificate`
                }
                fill
                className="object-contain rounded-xl"
                onError={() => setCertError(true)}
              />
            </div>
          ) : (
            <div className="p-12 text-center bg-white/5 rounded-xl border border-white/10">
              <p className="text-white text-lg font-medium mb-2">Certificate Image Not Found</p>
              <p className="text-white/60">
                {activeCert === 'lnt'
                  ? "Please place your certificate image in the `public` folder and name it <b>certificate.png</b> to see it here."
                  : activeCert === 'christ'
                  ? "Please place your Christ University certificate image in the `public` folder and name it <b>christ-certificate.jpeg</b> to see it here."
                  : activeCert === 'yesummit-2025'
                  ? "Please place your YESummit 2025 certificate image in the `public` folder and name it <b>yesummit-2025-v2.jpeg</b> to see it here."
                  : activeCert === 'unlox-hackathon'
                  ? "Please place your Unlox Hackathon image in the `public` folder and name it <b>unlox-hackathon.jpeg</b> to see it here."
                  : activeCert === 'promptwars'
                  ? "Please place your PromptWars certificate image in the `public` folder and name it <b>promptwars-certificate.png</b> to see it here."
                  : activeCert === 'aws-cloud'
                  ? "Please place your AWS Academy certificate image in the `public` folder and name it <b>aws-cloud-certificate.png</b> to see it here."
                  : activeCert === 'lnt-frontend'
                  ? "Please place your L&T Front End certificate image in the `public` folder and name it <b>lnt-frontend-certificate.png</b> to see it here."
                  : activeCert === 'infosys-se'
                  ? "Please place your Infosys Springboard certificate image in the `public` folder and name it <b>infosys-se-certificate.png</b> to see it here."
                  : "Please place your YESummit 2026 certificate image in the `public` folder and name it <b>yesummit-2026-v2.jpeg</b> to see it here."}
              </p>
            </div>
          )}
        </div>
      </Modal>

      {/* AI Assistant */}
      <ChatBot />

    </main>
  );
}
