import { motion } from 'framer-motion';
import { ChevronLeft, Edit3, Share2, Trash } from 'lucide-react';

export default function NoteView({ note, onBack }) {
  return (
    <motion.div
      className="relative"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 140, damping: 18 }}
    >
      <div className="mb-4 flex items-center gap-3">
        <button onClick={onBack} className="group flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-3 py-2 text-white/80 backdrop-blur-xl hover:bg-white/15">
          <ChevronLeft className="h-4 w-4" />
          <span className="text-sm">Back</span>
        </button>
        <div className="ml-auto flex items-center gap-2">
          <GlassIconButton Icon={Edit3} label="Edit" />
          <GlassIconButton Icon={Share2} label="Share" />
          <GlassIconButton Icon={Trash} label="Delete" danger />
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_40px_100px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
        <div className="pointer-events-none absolute -inset-[1px] rounded-[24px] bg-gradient-to-br from-white/20 to-white/0" />
        <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/30" />

        <h2 className="relative z-10 text-2xl font-light tracking-[-0.02em] text-white/95">{note.title}</h2>
        <div className="relative z-10 mt-4 h-[1px] w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <p className="relative z-10 mt-6 whitespace-pre-wrap text-[15px] leading-7 text-white/85">
          {note.content}
        </p>

        <motion.div
          className="absolute -left-12 top-1/3 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl"
          animate={{ x: [0, 20, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-16 bottom-6 h-48 w-48 rounded-full bg-blue-400/10 blur-3xl"
          animate={{ x: [0, -20, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
}

function GlassIconButton({ Icon, label, danger }) {
  return (
    <button
      className={`group flex items-center gap-2 rounded-2xl border px-3 py-2 text-white/90 backdrop-blur-xl transition-colors ${
        danger
          ? 'border-red-300/30 bg-red-300/10 hover:bg-red-300/15'
          : 'border-white/20 bg-white/10 hover:bg-white/15'
      }`}
      aria-label={label}
    >
      <Icon className={`h-4 w-4 ${danger ? 'text-red-200' : ''}`} />
      <span className="hidden text-sm md:block">{label}</span>
      <span className={`absolute inset-0 -z-10 rounded-2xl ${danger ? 'ring-red-300/40' : 'ring-cyan-300/30'} ring-1 ring-inset opacity-0 group-hover:opacity-100 transition-opacity`} />
    </button>
  );
}
