import { motion } from 'framer-motion';

export default function HomeGrid({ notes, onSelect }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note, idx) => (
        <NoteCard key={note.id} note={note} index={idx} onClick={() => onSelect(note.id)} />
      ))}
    </div>
  );
}

function NoteCard({ note, index, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className="group relative w-full overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.05 * index, type: 'spring', stiffness: 140, damping: 16 }}
    >
      <div className={`pointer-events-none absolute -inset-[1px] rounded-[24px] bg-gradient-to-br ${note.color}`} />
      <div className="pointer-events-none absolute inset-0 rounded-[24px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(800px 200px at 0% 0%, rgba(255,255,255,0.25), rgba(255,255,255,0))' }} />

      <div className="relative z-10">
        <h3 className="text-[15px] font-medium tracking-[-0.01em] text-white/95">{note.title}</h3>
        <p className="mt-2 line-clamp-2 text-[13px] text-white/70">{note.preview}</p>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-[11px] text-white/50">Edited 2h ago</span>
          <span className="rounded-full bg-cyan-400/20 px-2 py-0.5 text-[11px] text-cyan-200/90 ring-1 ring-cyan-300/30">Glass</span>
        </div>
      </div>

      <motion.div
        className="absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/30"
        initial={{ opacity: 0.5 }}
        whileHover={{ opacity: 0.9 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute -bottom-8 left-1/2 h-24 w-[120%] -translate-x-1/2 rounded-[32px] bg-white/10 blur-3xl"
        initial={{ opacity: 0.15 }}
        whileHover={{ opacity: 0.35 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}
