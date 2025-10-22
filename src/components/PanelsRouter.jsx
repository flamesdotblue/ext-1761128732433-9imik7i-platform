import { motion, AnimatePresence } from 'framer-motion';
import HomeGrid from './HomeGrid';
import NoteView from './NoteView';
import SettingsPanel from './SettingsPanel';
import ProfilePanel from './ProfilePanel';

export default function PanelsRouter({ screen, notes, selectedNote, onSelectNote, onBackHome }) {
  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {screen === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-light tracking-[-0.02em] text-white/95">Your Notes</h2>
              <div className="rounded-2xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white/80 backdrop-blur-xl">Sorted by recents</div>
            </div>
            <HomeGrid notes={notes} onSelect={onSelectNote} />
          </motion.div>
        )}

        {screen === 'note' && selectedNote && (
          <motion.div key="note" className="relative">
            <NoteView note={selectedNote} onBack={onBackHome} />
          </motion.div>
        )}

        {screen === 'settings' && (
          <motion.div key="settings" className="relative">
            <SettingsPanel />
          </motion.div>
        )}

        {screen === 'profile' && (
          <motion.div key="profile" className="relative">
            <ProfilePanel />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
