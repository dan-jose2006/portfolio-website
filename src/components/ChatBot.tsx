"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X } from "lucide-react";

type Message = {
  id: string;
  sender: "user" | "bot";
  text: string;
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "bot", text: "Hi! I'm Nexus, Dan's AI assistant. How can I help you today?" }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsgText = input;
    const userMsg: Message = { id: Date.now().toString(), sender: "user", text: userMsgText };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const history = messages
        .filter(m => m.id !== "1")
        .map(m => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text
        }));

      history.push({ role: "user", content: userMsgText });

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "groq/compound-mini",
          messages: [
            {
              role: "system",
              content: `You are Nexus, a professional and friendly AI assistant for Dan Abraham Jose's personal portfolio website. Your goal is to answer visitor questions about Dan, his projects, skills, education, and experience.

Here is all the information about Dan you should use:
- About Him: Dan Abraham Jose is an AI/ML Engineer who loves building intelligent systems and highly polished, interactive web applications.
- Current Status: 3rd Year B.Tech student in Artificial Intelligence and Machine Learning (2026-2027) at Christ (Deemed to be University), Kengeri Campus, working on enterprise AI projects. Co-founder / Pre-incubatee at CHRIST Incubation Centre (CIC).
- Education Background:
  - B.Tech in AI & ML: Christ (Deemed to be University), Kengeri Campus.
  - Pre-University (PUC): St. Joseph's HSS, Peravoor.
  - High School: Navajothy English Medium School.
- Tech Stack: Python, TensorFlow, PyTorch, OpenCV, Scikit-Learn, Next.js, React, Node.js, FastAPI, n8n, Supabase, TailwindCSS, Git.
- Professional Experience:
  1. AI/ML Internship at Larsen & Toubro (L&T) EduTech (April - May 2026, Chennai): Designed enterprise ML applications and system-level pipelines.
  2. Co-Founder / Pre-Incubatee at CHRIST Incubation Centre (CIC): Directing development of novel startups and software prototypes.
- Key Projects:
  1. CampusFlow: AI-powered student productivity app with n8n deadline tracking, WhatsApp notifications, and Google Calendar sync. Won 1st Prize at UNLOX Codestorm Hackathon.
  2. FanFlow AI: Football event management platform, volunteer routing, stadium guides, real-time queues. Built for FIFA fans and Groq-powered helper assistant. Secured Top 400 rank out of 40,000+ global participants in PromptWars Virtual Hackathon (Google for Developers & Hack2Skill).
  3. AMA System: Content generation workflow and digital assets workspace dashboard.
  4. 6-Bubble Puzzle Simulator: Mathematical logic React web game with particle effects.
  5. JARVIS AI Assistant: Voice-controlled local LLM assistant utilizing Ollama (Whisper/Python) for offline commands.
  6. Facial Emotion Detection: Convolutional Neural Network (CNN) emotion predictor model running on webcams.
  7. DCD Detection ML Model: Early health classifier model for Developmental Coordination Disorder (DCD).
  8. Kinetic Gym Energy: Sustainability IoT prototype mapping mechanical gym motions to electrical outputs with a React dashboard.
- Achievements & Awards:
  1. 1st Prize Winner – UNLOX Hackathon (June 2026, ₹10,000 cash prize).
  2. Top 400 Leaderboard – PromptWars Virtual Hackathon (August 2026, out of 40,000+ participants, Google for Developers & Hack2Skill).
  3. National YESummit 2026 – Recognized for entrepreneurial innovation and leadership.
  4. Karnataka State YESummit 2025 – Recognized for innovative thinking and startup initiatives.
- Professional Certifications:
  1. AWS Academy Graduate: Cloud Foundations (August 2026, Credly digital badge, 20 hours cloud architecture & security).
  2. L&T EduTech: Front end UI and UX Developer (First Class, CollegeConnect Programme).
  3. Infosys Springboard: Software Engineering (July 2026, SDLC, Agile, testing, and modern architecture).
- Contact Details:
  - Email: dan.abraham1602@gmail.com
  - LinkedIn & GitHub links are available on the page.
  - Resume is available via the 'Resume' download button at the top navbar.

Instructions:
1. Always remain polite, enthusiastic, and represent Dan in a positive light.
2. Keep your answers clear, concise, and direct (max 2-3 sentences where possible).
3. If asked questions unrelated to Dan, his career, or skills, politely redirect the focus back to him.`
            },
            ...history
          ],
          temperature: 0.7,
          max_tokens: 250
        })
      });

      const data = await response.json();

      if (!response.ok) {
        const errMsg = data?.error?.message || `API error ${response.status}`;
        console.error("Groq API error response:", data);
        throw new Error(errMsg);
      }

      const botText = data?.choices?.[0]?.message?.content?.trim();
      if (!botText) {
        console.error("Unexpected Groq response shape:", data);
        throw new Error("Empty response from AI");
      }
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: "bot", text: botText }]);
    } catch (err) {
      console.error("Groq API error:", err);
      const errDetail = err instanceof Error ? err.message : "Unknown error";
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: "bot", text: `⚠️ ${errDetail}. Please try again shortly!` }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] flex flex-col items-end pointer-events-none max-w-[calc(100vw-2rem)]">
      
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto w-[calc(100vw-2rem)] sm:w-80 md:w-96 h-[480px] max-h-[75vh] sm:max-h-[80vh] bg-[#1a1a1a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-3 sm:mb-4 relative"
          >
            {/* Header */}
            <div className="p-3.5 sm:p-4 border-b border-white/10 bg-black/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 relative bg-emerald-900/30 rounded-full border border-emerald-500/30 overflow-hidden flex items-center justify-center">
                  <video src="/walking-robot.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover scale-[1.2]" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Nexus Assistant</h3>
                  <p className="text-emerald-400 text-[11px] sm:text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 flex flex-col gap-3.5 sm:gap-4">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] sm:max-w-[80%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === "user" 
                      ? "bg-emerald-500/20 text-white border border-emerald-500/20 rounded-tr-sm" 
                      : "bg-white/5 text-white/90 border border-white/5 rounded-tl-sm"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 text-white/60 border border-white/5 rounded-2xl rounded-tl-sm p-3 text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 sm:p-4 border-t border-white/10 bg-black/40">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask Nexus anything..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 sm:py-3 pl-4 pr-11 text-xs sm:text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-400 rounded-full transition-colors"
                >
                  <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button & Initial Pop-up */}
      <div className="pointer-events-auto flex items-end gap-2.5 sm:gap-4 max-w-full">
        
        {/* Initial Pop-up Bubble */}
        <AnimatePresence>
          {!isOpen && !hasOpened && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: 2, duration: 0.5 }}
              className="bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-medium py-2 px-3.5 sm:px-4 rounded-2xl rounded-br-sm shadow-lg cursor-pointer hover:bg-emerald-500/20 transition-colors max-w-[200px] sm:max-w-none"
              onClick={() => {
                setIsOpen(true);
                setHasOpened(true);
              }}
            >
              Hi, I&apos;m Nexus! Ask me anything 👋
            </motion.div>
          )}
        </AnimatePresence>

        {/* Robot Button */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setHasOpened(true);
          }}
          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl relative shrink-0 ${
            isOpen ? "bg-[#1a1a1a] border border-white/10" : "bg-emerald-900/30 border border-emerald-500/30 hover:scale-110 hover:shadow-[0_0_30px_rgba(52,211,153,0.3)]"
          }`}
        >
          {isOpen ? (
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Glowing portal effect */}
              <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-md animate-pulse" />
              <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-emerald-500/30 flex items-center justify-center bg-black/60 backdrop-blur-md z-10 shadow-[inset_0_0_15px_rgba(52,211,153,0.3)]">
                <video 
                  src="/walking-robot.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover scale-[1.2]" 
                  style={{ mixBlendMode: 'screen' }}
                />
              </div>
            </div>
          )}
        </button>

      </div>
    </div>
  );
}
