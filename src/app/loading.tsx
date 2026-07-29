export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#121212] overflow-hidden">
      
      {/* Glowing background orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-emerald-400/10 blur-[100px] pointer-events-none animate-pulse" />

      {/* Loading content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        
        {/* Animated rings */}
        <div className="relative flex items-center justify-center w-24 h-24">
          <div className="absolute w-full h-full border-t-2 border-r-2 border-emerald-400 rounded-full animate-spin" style={{ animationDuration: '1.5s' }} />
          <div className="absolute w-3/4 h-3/4 border-b-2 border-l-2 border-blue-400 rounded-full animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
          
          {/* Center dot */}
          <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse" />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-xl md:text-2xl font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400 uppercase">
            Initializing
          </h2>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '0.15s' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '0.3s' }} />
          </div>
        </div>

      </div>
    </div>
  );
}
