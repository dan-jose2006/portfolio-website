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
import Contact from "@/components/Contact";
import Modal from "@/components/Modal";

export default function Home() {
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
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
      <Experience onShowCertificate={() => setIsCertModalOpen(true)} />

      {/* Projects Grid Section */}
      <div id="projects">
        <Projects />
      </div>

      {/* Contact Section at the Bottom */}
      <Contact />

      {/* Certificate Modal */}
      <Modal isOpen={isCertModalOpen} onClose={() => setIsCertModalOpen(false)}>
        <div className="p-2 w-full">
          {!certError ? (
            <div className="relative w-full h-[60vh] md:h-[80vh]">
              <Image 
                src="/certificate.png" 
                alt="L&T EduTech Certificate" 
                fill
                className="object-contain rounded-xl"
                onError={() => setCertError(true)}
              />
            </div>
          ) : (
            <div className="p-12 text-center bg-white/5 rounded-xl border border-white/10">
              <p className="text-white text-lg font-medium mb-2">Certificate Image Not Found</p>
              <p className="text-white/60">Please place your certificate image in the `public` folder and name it <b>certificate.png</b> to see it here.</p>
            </div>
          )}
        </div>
      </Modal>

    </main>
  );
}
