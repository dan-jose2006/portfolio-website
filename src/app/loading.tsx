export default function Loading() {
  return (
    <div className="min-h-screen bg-[#121212] overflow-hidden">

      {/* Navbar skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-24 py-6">
        <div className="h-5 w-24 rounded-full bg-white/10 animate-pulse" />
        <div className="hidden md:flex gap-8">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-16 rounded-full bg-white/10 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center gap-6 pt-24">
        <div className="h-4 w-32 rounded-full bg-emerald-400/20 animate-pulse" />
        <div className="flex flex-col items-center gap-4 w-full max-w-3xl">
          <div className="h-14 md:h-20 w-full rounded-2xl bg-white/10 animate-pulse" />
          <div className="h-14 md:h-20 w-3/4 rounded-2xl bg-white/10 animate-pulse" style={{ animationDelay: "0.1s" }} />
          <div className="h-14 md:h-20 w-1/2 rounded-2xl bg-white/10 animate-pulse" style={{ animationDelay: "0.2s" }} />
        </div>
        <div className="h-5 w-64 rounded-full bg-white/5 animate-pulse mt-4" />
        <div className="flex gap-4 mt-4">
          <div className="h-12 w-36 rounded-full bg-white/10 animate-pulse" />
          <div className="h-12 w-36 rounded-full bg-white/5 animate-pulse" />
        </div>

        {/* Glowing orb effect matching site aesthetic */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-400/5 blur-3xl pointer-events-none" />
      </div>

      {/* About skeleton */}
      <div className="px-6 md:px-12 lg:px-24 py-24 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-1/3 flex flex-col gap-4">
            <div className="h-3 w-24 rounded-full bg-emerald-400/20 animate-pulse" />
            <div className="h-10 w-full rounded-xl bg-white/10 animate-pulse" />
            <div className="h-10 w-3/4 rounded-xl bg-white/10 animate-pulse" />
          </div>
          <div className="md:w-2/3 flex flex-col gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-5 rounded-full bg-white/5 animate-pulse" style={{ animationDelay: `${i * 0.1}s`, width: i === 3 ? "60%" : "100%" }} />
            ))}
            <div className="h-12 w-44 rounded-full bg-white/10 animate-pulse mt-6" />
          </div>
        </div>
      </div>

      {/* Cards skeleton (Skills / Experience / Education) */}
      <div className="px-6 md:px-12 lg:px-24 py-16 max-w-7xl mx-auto flex flex-col gap-8">
        <div className="h-3 w-28 rounded-full bg-emerald-400/20 animate-pulse mx-auto" />
        <div className="h-10 w-72 rounded-xl bg-white/10 animate-pulse mx-auto" />

        <div className="flex flex-col gap-6 mt-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 animate-pulse"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="flex justify-between items-center mb-6">
                <div className="h-7 w-48 rounded-lg bg-white/10" />
                <div className="h-6 w-28 rounded-full bg-white/5" />
              </div>
              <div className="flex flex-col gap-3">
                <div className="h-4 w-full rounded-full bg-white/5" />
                <div className="h-4 w-5/6 rounded-full bg-white/5" />
                <div className="h-4 w-4/6 rounded-full bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
