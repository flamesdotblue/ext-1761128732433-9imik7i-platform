import { Home, FileText, Settings, User, Plus, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NavBar({ current, setCurrent, onPlus }) {
  const items = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'note', icon: FileText, label: 'Notes' },
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-30 flex justify-center">
      <motion.div
        className="pointer-events-auto relative flex items-center gap-2 rounded-3xl border border-white/15 bg-white/8 px-3 py-2 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_20px_60px_rgba(0,0,0,0.45)]"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
      >
        <button
          className="group hidden rounded-2xl p-2 text-white/70 hover:text-white/90 md:block"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
        {items.map((it) => (
          <NavItem key={it.id} active={current === it.id} onClick={() => setCurrent(it.id)} Icon={it.icon} label={it.label} />
        ))}
        <button
          onClick={onPlus}
          className="group ml-1 flex items-center gap-2 rounded-2xl border border-white/20 bg-gradient-to-b from-white/20 to-white/5 px-3 py-2 text-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl hover:from-white/30 hover:to-white/10"
          aria-label="New Note"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden text-sm font-medium md:block">New</span>
        </button>
      </motion.div>
    </div>
  );
}

function NavItem({ active, onClick, Icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`group relative flex items-center gap-2 rounded-2xl px-3 py-2 transition-colors ${
        active ? 'text-white' : 'text-white/70 hover:text-white/90'
      }`}
    >
      {active && (
        <motion.span
          layoutId="navActive"
          className="absolute inset-0 -z-10 rounded-2xl border border-white/25 bg-white/15"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
      <Icon className="h-[18px] w-[18px] drop-shadow-[0_0_8px_rgba(115,170,255,0.6)]" />
      <span className="hidden text-sm font-medium md:block">{label}</span>
    </button>
  );
}
