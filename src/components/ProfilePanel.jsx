import { motion } from 'framer-motion';

export default function ProfilePanel() {
  return (
    <motion.div
      className="relative"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 140, damping: 18 }}
    >
      <div className="relative mx-auto mb-6 flex max-w-lg items-center gap-6">
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 rounded-full border border-white/25 bg-white/10 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_20px_60px_rgba(0,0,0,0.45)]" />
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-cyan-300/40" />
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(60%_60%_at_40%_40%,rgba(180,220,255,0.6),rgba(255,255,255,0.05))]" />
        </div>
        <div>
          <h2 className="text-xl font-light tracking-[-0.02em] text-white/95">Alex Mercer</h2>
          <p className="mt-1 text-sm text-white/60">Designing calm interfaces since 2016</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <GlassMetric title="Notes" value="128" accent="from-cyan-300/30 to-blue-400/20" />
        <GlassMetric title="Folders" value="12" accent="from-sky-200/30 to-cyan-300/20" />
        <GlassMetric title="Streak" value="24d" accent="from-blue-200/30 to-indigo-300/20" />
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-2xl">
        <div className="pointer-events-none -m-6 mb-6 h-24 w-[calc(100%+3rem)] bg-[radial-gradient(90%_80%_at_50%_0%,rgba(255,255,255,0.15),rgba(255,255,255,0))]" />
        <h3 className="text-[15px] font-medium text-white/95">About</h3>
        <p className="mt-2 text-[13px] leading-6 text-white/75">Passionate about spatial design, transparency, and making technology feel weightless. Exploring how light and depth can guide attention with grace.</p>
      </div>
    </motion.div>
  );
}

function GlassMetric({ title, value, accent }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
      <div className={`pointer-events-none absolute -inset-[1px] rounded-[24px] bg-gradient-to-br ${accent}`} />
      <div className="relative z-10">
        <p className="text-[12px] uppercase tracking-[0.12em] text-white/60">{title}</p>
        <p className="mt-2 text-2xl font-light text-white/95">{value}</p>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/30" />
    </div>
  );
}
