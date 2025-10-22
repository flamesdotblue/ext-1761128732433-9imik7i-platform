import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export default function SettingsPanel() {
  const [dark, setDark] = useState(true);
  const [parallax, setParallax] = useState(true);
  const [haptics, setHaptics] = useState(true);

  return (
    <motion.div
      className="relative"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 140, damping: 18 }}
    >
      <h2 className="mb-4 text-xl font-light tracking-[-0.02em] text-white/95">Settings</h2>

      <div className="space-y-4">
        <FrostedToggle
          checked={dark}
          onChange={setDark}
          title="Appearance"
          subtitle="Choose your preferred theme"
          onLabel={<span className="flex items-center gap-2"><Moon className="h-4 w-4" /> Dark</span>}
          offLabel={<span className="flex items-center gap-2"><Sun className="h-4 w-4" /> Light</span>}
        />
        <FrostedToggle
          checked={parallax}
          onChange={setParallax}
          title="Parallax Depth"
          subtitle="Enable motion-based glass depth"
        />
        <FrostedToggle
          checked={haptics}
          onChange={setHaptics}
          title="Haptics"
          subtitle="Gentle taps to confirm actions"
        />
      </div>
    </motion.div>
  );
}

function FrostedToggle({ checked, onChange, title, subtitle, onLabel, offLabel }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/30" />
      <div className="flex items-center gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-medium text-white/95">{title}</p>
          {subtitle && <p className="mt-1 text-[12px] text-white/60">{subtitle}</p>}
        </div>
        <button
          onClick={() => onChange(!checked)}
          className={`relative h-9 w-16 rounded-full border transition-colors ${
            checked
              ? 'border-cyan-300/40 bg-gradient-to-r from-cyan-300/30 to-blue-400/20'
              : 'border-white/25 bg-white/10'
          }`}
        >
          <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/30" />
          <motion.span
            className={`absolute top-1/2 h-7 w-7 -translate-y-1/2 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_20px_rgba(0,0,0,0.35)] backdrop-blur-xl ${
              checked ? 'bg-cyan-200/60' : 'bg-white/50'
            }`}
            initial={false}
            animate={{ x: checked ? 36 : 4 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          />
          <div className="absolute inset-y-0 left-2 flex items-center text-[11px] text-white/90">
            {!checked ? offLabel : null}
          </div>
          <div className="absolute inset-y-0 right-2 flex items-center text-[11px] text-white/90">
            {checked ? onLabel : null}
          </div>
        </button>
      </div>
    </div>
  );
}
