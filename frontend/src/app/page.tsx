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
      <section className="max-w-7xl mx-auto">
        <TimingTower />
      </section>

      <footer className="max-w-6xl mx-auto mt-24 pt-8 border-t border-zinc-900 flex justify-between items-center text-zinc-800 font-mono text-[10px]">
        <div>UNDERCUT-F1 ENGINE v1.0</div>
        <div>DESIGNED BY ANTIGRAVITY</div>
      </footer>
    </main>
  );
}
