"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, MessageSquare } from "lucide-react";

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

    setTimeout(() => {
      // Advanced Intent Matching Logic
      let botResponse = "";
      const lowerInput = userMsg.text.toLowerCase();

      const intents = [
        {
          keywords: ["skill", "tech", "stack", "language", "framework", "tool", "know", "use", "program", "code", "coding", "can you do"],
          response: "Dan is an AI/ML Engineer specializing in Python, TensorFlow, React, and Next.js. He bridges the gap between complex machine learning models and beautiful web interfaces!"
        },
        {
          keywords: ["experience", "work", "job", "intern", "l&t", "larsen", "toubro", "career", "history", "employed"],
          response: "Dan worked as an AI/ML Intern at Larsen & Toubro EduTech, where he built intelligent systems. He has hands-on experience bringing AI concepts into production."
        },
        {
          keywords: ["project", "build", "create", "made", "portfolio", "github", "showcase", "done"],
          response: "Dan has built several impressive projects! You can check out the Projects section above to see his AI applications and full-stack web builds."
        },
        {
          keywords: ["contact", "hire", "email", "reach", "touch", "message", "call", "talk", "connect"],
          response: "You can reach Dan directly at dan.abraham1602@gmail.com, or through his LinkedIn linked above. His inbox is always open for exciting opportunities!"
        },
        {
          keywords: ["education", "study", "college", "school", "degree", "btech", "university", "graduate"],
          response: "Dan is currently pursuing his BTech, specializing in Artificial Intelligence and Machine Learning. He's passionate about continuous learning."
        },
        {
          keywords: ["about", "who is dan", "background", "bio", "tell me about"],
          response: "Dan Abraham Jose is a passionate AI/ML Engineer who loves combining artificial intelligence with modern, interactive web development."
        },
        {
          keywords: ["name", "who are you", "what are you", "bot", "ai", "nexus", "assistant"],
          response: "I'm Nexus, a custom AI assistant built specifically for Dan's portfolio. I'm here to answer your questions about him!"
        },
        {
          keywords: ["hello", "hi", "hey", "greetings", "sup", "yo", "morning", "evening"],
          response: "Hello there! I'm Nexus. What would you like to know about Dan?"
        },
        {
          keywords: ["thank", "thanks", "appreciate", "good job", "cool", "awesome"],
          response: "You're welcome! Let me know if you need anything else."
        },
        {
          keywords: ["resume", "cv", "download", "document"],
          response: "You can download Dan's resume by clicking the glowing 'Resume' button in the navigation bar!"
        }
      ];

      // Find the first matching intent
      for (const intent of intents) {
        if (intent.keywords.some(k => lowerInput.includes(k))) {
          botResponse = intent.response;
          break;
        }
      }

      // Dynamic Fallback
      if (!botResponse) {
        const fallbacks = [
          "I'm a simple bot and didn't quite catch that. Try asking about Dan's skills, projects, or experience!",
          "Hmm, I'm not sure. You can ask me things like 'What are Dan's skills?' or 'How do I contact him?'",
          "My AI circuits are still training on that one! Want to know about Dan's tech stack or internship instead?"
        ];
        botResponse = fallbacks[Math.floor(Math.random() * fallbacks.length)];
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
                  <video src="/walking-robot.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover scale-[1.2]" />
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
