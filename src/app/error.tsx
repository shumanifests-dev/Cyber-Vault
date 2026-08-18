'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative font-mono">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(180,0,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(180,0,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            className="text-red-800/60 text-xs tracking-[0.5em] mb-4"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            ── SYSTEM ERROR ──
          </motion.div>

          <motion.h1
            className="text-5xl font-bold tracking-[0.15em] mb-6"
            style={{
              color: '#ff0000',
              textShadow: '0 0 40px rgba(255,0,0,0.4)',
            }}
          >
            ERROR 500
          </motion.h1>

          <p className="text-gray-600 text-sm mb-8 max-w-md mx-auto">
            An unexpected error occurred. Our team has been notified. Please try again or contact support.
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={reset}
            className="px-6 py-3 rounded-lg text-sm tracking-widest relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #1a0000, #2d0000)',
              border: '1px solid rgba(180,0,0,0.3)',
            }}
          >
            <span className="relative text-red-300 tracking-[0.3em] text-xs">RETRY OPERATION</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
