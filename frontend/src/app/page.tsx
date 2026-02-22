import { TimingTower } from '@/components/TimingTower';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8 font-sans selection:bg-red-500 selection:text-white">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-12 h-1 bg-red-600" />
            <p className="text-red-500 font-bold tracking-[0.2em] text-xs uppercase">Telemetry Hub</p>
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-none">
            UNLEASHED <span className="text-zinc-800">F1</span>
          </h1>
        </div>

        <div className="flex gap-8 border-l border-zinc-800 pl-8 h-fit">
          <div className="flex flex-col">
            <span className="text-zinc-500 text-[10px] uppercase font-black mb-1">Session</span>
            <span className="text-white font-mono text-sm">IMOLA 2024</span>
          </div>
          <div className="flex flex-col">
            <span className="text-zinc-500 text-[10px] uppercase font-black mb-1">Status</span>
            <span className="text-green-500 font-mono text-sm tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              SIMULATED
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Timing Tower */}
        <div className="lg:col-span-8">
          <TimingTower />
        </div>

        {/* Right Column: Mini Stats (Placeholders for now) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
            <h3 className="text-zinc-400 font-black italic text-xs uppercase mb-4 tracking-wider">Race Control</h3>
            <div className="space-y-3">
              <div className="text-[11px] font-mono leading-relaxed text-zinc-500 border-l border-zinc-700 pl-3">
                Waiting for messages...
              </div>
            </div>
          </div>

          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
            <h3 className="text-zinc-400 font-black italic text-xs uppercase mb-4 tracking-wider">Weather</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-black italic">CLOUDY</p>
                <p className="text-zinc-500 text-[10px] uppercase font-bold">Track 24°C / Air 19°C</p>
              </div>
              <div className="text-zinc-700">
                {/* Weather Icon Placeholder */}
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19c.7 0 1.3-.2 1.8-.7s.7-1.1.7-1.8c0-1.4-1.1-2.5-2.5-2.5-.1 0-.3 0-.4.1C16.5 11.8 14.4 10 12 10c-2.4 0-4.5 1.8-5.1 4.1-.1-.1-.3-.1-.4-.1-1.4 0-2.5 1.1-2.5 2.5 0 .7.3 1.3.7 1.8s1.1.7 1.8.7h11z" /></svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="max-w-6xl mx-auto mt-24 pt-8 border-t border-zinc-900 flex justify-between items-center text-zinc-800 font-mono text-[10px]">
        <div>UNDERCUT-F1 ENGINE v1.0</div>
        <div>DESIGNED BY ANTIGRAVITY</div>
      </footer>
    </main>
  );
}
