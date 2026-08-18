'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
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
            ── PAGE NOT FOUND ──
          </motion.div>

          <motion.h1
            className="text-5xl font-bold tracking-[0.15em] mb-6"
            style={{
              color: '#ff0000',
              textShadow: '0 0 40px rgba(255,0,0,0.4)',
            }}
          >
            404
          </motion.h1>

          <p className="text-gray-600 text-sm mb-8 max-w-md mx-auto">
            The page you are looking for does not exist or has been moved.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/"
              className="px-6 py-3 rounded-lg text-sm tracking-widest inline-block relative overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, #1a0000, #2d0000)',
                border: '1px solid rgba(180,0,0,0.3)',
              }}
            >
              <span className="relative text-red-300 tracking-[0.3em] text-xs">RETURN HOME</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
