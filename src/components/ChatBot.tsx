"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, MessageSquare, Bot } from "lucide-react";

type Message = {
  id: string;
  sender: "user" | "bot";
  text: string;
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "bot", text: "Hi! I'm Nexus, Dan's AI assistant. How can I help you today?" }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Simple NLP / Keyword Matching Logic
    setTimeout(() => {
      let botResponse = "I'm still learning! You can ask me about Dan's skills, his experience, or how to contact him.";
      const lowerInput = userMsg.text.toLowerCase();

      if (lowerInput.includes("skill") || lowerInput.includes("tech") || lowerInput.includes("stack")) {
        botResponse = "Dan specializes in AI & Machine Learning. He is skilled in Python, TensorFlow, React, Next.js, and creating interactive web experiences.";
      } else if (lowerInput.includes("experience") || lowerInput.includes("internship") || lowerInput.includes("l&t")) {
        botResponse = "Dan completed an AI/ML Internship at Larsen & Toubro EduTech in Chennai (April-May 2026), where he built intelligent systems.";
      } else if (lowerInput.includes("contact") || lowerInput.includes("hire") || lowerInput.includes("email")) {
        botResponse = "You can reach Dan directly at dan.abraham1602@gmail.com! His inbox is always open for exciting opportunities.";
      } else if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
        botResponse = "Hello there! Ask me anything about Dan's portfolio.";
      } else if (lowerInput.includes("name") || lowerInput.includes("who are you")) {
        botResponse = "I'm Nexus, Dan's custom-built AI assistant!";
      }

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: "bot", text: botResponse }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none">
      
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto w-80 md:w-96 h-[500px] max-h-[80vh] bg-[#1a1a1a]/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 relative"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-black/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 relative bg-emerald-900/30 rounded-full border border-emerald-500/30 overflow-hidden flex items-center justify-center">
                  <object data="/robot-assistant.svg" type="image/svg+xml" width="32" height="32" className="object-contain mt-1 pointer-events-none">
                    <img src="/robot-assistant.svg" alt="Nexus Robot" width="32" height="32" className="object-contain mt-1" />
                  </object>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Nexus Assistant</h3>
                  <p className="text-emerald-400 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.sender === "user" 
                      ? "bg-emerald-500/20 text-white border border-emerald-500/20 rounded-tr-sm" 
                      : "bg-white/5 text-white/90 border border-white/5 rounded-tl-sm"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-black/40">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask Nexus anything..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-400 rounded-full transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button & Initial Pop-up */}
      <div className="pointer-events-auto flex items-end gap-4">
        
        {/* Initial Pop-up Bubble */}
        <AnimatePresence>
          {!isOpen && !hasOpened && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: 2, duration: 0.5 }}
              className="bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 text-emerald-400 text-sm font-medium py-2 px-4 rounded-2xl rounded-br-sm shadow-lg cursor-pointer hover:bg-emerald-500/20 transition-colors"
              onClick={() => {
                setIsOpen(true);
                setHasOpened(true);
              }}
            >
              Hi, I'm Nexus! Ask me any questions 👋
            </motion.div>
          )}
        </AnimatePresence>

        {/* Robot Button */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setHasOpened(true);
          }}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl relative ${
            isOpen ? "bg-[#1a1a1a] border border-white/10" : "bg-emerald-900/30 border border-emerald-500/30 hover:scale-110 hover:shadow-[0_0_30px_rgba(52,211,153,0.3)]"
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Add a subtle pulsing glow behind the robot */}
              <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-md animate-pulse" />
              <object data="/robot-assistant.svg" type="image/svg+xml" width="48" height="48" className="object-contain relative z-10 pointer-events-none">
                <img src="/robot-assistant.svg" alt="Nexus Robot" width="48" height="48" className="object-contain relative z-10" />
              </object>
            </div>
          )}
        </button>

      </div>
    </div>
  );
}
