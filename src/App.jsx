import { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import GlassBackground from './components/GlassBackground';
import NavBar from './components/NavBar';
import PanelsRouter from './components/PanelsRouter';

export default function App() {
  const [screen, setScreen] = useState('home'); // 'home' | 'note' | 'settings' | 'profile'
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const notes = useMemo(
    () => [
      {
        id: 'n1',
        title: 'Vision Notes — Concepts',
        preview: 'Exploring spatial UIs, depth-driven focus, and ambient intent…',
        content:
          'A new paradigm emerges where windows are no longer flat. Depth, light, and motion work together to create calm and clarity. Notes should float, respond subtly to presence, and never demand attention unless asked.\n\nKey ideas:\n- Glass layers with meaningful blur and parallax.\n- Soft neon accents as guidance, not decoration.\n- Precision typography and generous negative space.\n\nInteractions should feel ultra-smooth, like sliding light across metal. Transitions become narrative moments that guide without distraction.',
        color: 'from-sky-300/40 to-blue-500/30',
      },
      {
        id: 'n2',
        title: 'Design Language',
        preview: 'Silver gradients, pearl whites, and ice blue tint—calm confidence.',
        content:
          'Typography: SF Pro, thin weights for chrome, regular for content.\nPalette: Silver, pearl, ice blue, faint neon.\nMotion: Ease-in-out, sub-200ms micro transitions, 400–700ms scene transitions.',
        color: 'from-slate-200/40 to-cyan-400/30',
      },
      {
        id: 'n3',
        title: 'Roadmap',
        preview: 'MVP → polish → ambient intelligence.',
        content:
          'Phase 1: Core note experience, glass cards, quick capture.\nPhase 2: Live depth backgrounds, parallax, light sweep.\nPhase 3: Learning focus states, prioritize relevant notes contextually.',
        color: 'from-indigo-300/40 to-blue-400/30',
      },
      {
        id: 'n4',
        title: 'Microinteractions',
        preview: 'Haptic taps, light glides, magnetic alignment.',
        content:
          'Buttons should glow gently on hover, brighten on press, and fade with a soft tail. Cards magnetically align on drag. Ambient parallax responds to device tilt or pointer. Everything is quiet, intentional, and reassuring.',
        color: 'from-blue-200/40 to-cyan-300/30',
      },
    ],
    []
  );

  const selectedNote = useMemo(
    () => notes.find((n) => n.id === selectedNoteId) || null,
    [notes, selectedNoteId]
  );

  const openNote = (id) => {
    setSelectedNoteId(id);
    setScreen('note');
  };

  const goHome = () => {
    setScreen('home');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0b0e13] to-[#0a0c10] text-white">
      <GlassBackground />

      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(61,100,255,0.08),rgba(0,0,0,0)_70%)]" />

      <main className="relative z-10 flex min-h-screen flex-col">
        <header className="mx-auto mt-8 flex w-full max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-xl border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_8px_30px_rgba(0,0,0,0.35)]" />
            <div>
              <h1 className="text-[28px] leading-none font-light tracking-[-0.02em] text-white/90">Aura Notes</h1>
              <p className="mt-1 text-[12px] text-white/50">Calm. Precise. Effortlessly glass.</p>
            </div>
          </div>
        </header>

        <section className="relative mx-auto mt-6 w-full max-w-6xl flex-1 px-4 pb-28 md:px-6">
          <AnimatePresence mode="wait" initial={false}>
            <PanelsRouter
              key={screen}
              screen={screen}
              notes={notes}
              selectedNote={selectedNote}
              onSelectNote={openNote}
              onBackHome={goHome}
            />
          </AnimatePresence>
        </section>

        <NavBar current={screen} setCurrent={setScreen} onPlus={() => setScreen('note')} />
      </main>
    </div>
  );
}
