import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function GlassBackground() {
  const containerRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20, mass: 0.8 });
  const sy = useSpring(my, { stiffness: 50, damping: 20, mass: 0.8 });

  const rotateX = useTransform(sy, [ -50, 50 ], [ 8, -8 ]);
  const rotateY = useTransform(sx, [ -50, 50 ], [ -8, 8 ]);
  const lightX = useTransform(sx, [-50, 50], ['20%', '80%']);
  const lightY = useTransform(sy, [-50, 50], ['10%', '70%']);

  useEffect(() => {
    const handleMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mx.set(Math.max(-50, Math.min(50, x / 10)));
      my.set(Math.max(-50, Math.min(50, y / 10)));
    };
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, [mx, my]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <motion.div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ perspective: 1200 }}
      aria-hidden
    >
      <motion.div
        className="absolute inset-0"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        {/* Depth gradient layers */}
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_80%_-10%,rgba(99,132,255,0.20),rgba(0,0,0,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_500px_at_10%_110%,rgba(0,230,255,0.10),rgba(0,0,0,0))]" />

        {/* Frosted blobs */}
        <div className="absolute -top-32 -left-20 h-[38rem] w-[38rem] rounded-full bg-gradient-to-br from-white/10 to-white/0 blur-3xl" />
        <div className="absolute -bottom-48 -right-24 h-[42rem] w-[42rem] rounded-full bg-gradient-to-tr from-cyan-400/10 to-sky-200/0 blur-[100px]" />

        {/* Subtle grid for depth */}
        <div className="absolute inset-0 opacity-[0.06] [mask-image:radial-gradient(80%_80%_at_50%_50%,black,transparent)]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        {/* Moving light sweep */}
        <motion.div
          className="absolute h-[65%] w-[45%] rounded-[40px] bg-gradient-to-br from-white/12 to-white/0 blur-2xl"
          style={{ left: lightX, top: lightY }}
          animate={mounted ? { opacity: [0.25, 0.4, 0.25] } : {}}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Tiny stars */}
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-px bg-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 5 + (i % 5), repeat: Infinity, delay: i * 0.15 }}
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 59) % 100}%`,
              boxShadow: '0 0 6px 2px rgba(140,210,255,0.5)'
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
