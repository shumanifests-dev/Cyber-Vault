"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  GridBackground,
  ScanLine,
  CornerDecorations,
  SideDataStreams,
  FloatingBinary,
} from "@/components/CyberpunkBackground";
import { TopBar } from "@/components/TopBar";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [glitch, setGlitch] = useState(false);
  const [scanLine, setScanLine] = useState(0);

  useEffect(() => {
    if (status === "authenticated") router.push("/dashboard");
  }, [status, router]);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 3000);
    return () => clearInterval(glitchInterval);
  }, []);

  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanLine(prev => (prev + 1) % 100);
    }, 20);
    return () => clearInterval(scanInterval);
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-red-500 tracking-[0.5em] text-sm font-mono"
        >
          AUTHENTICATING...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative font-mono">
      <GridBackground />
      <ScanLine scanLine={scanLine} />
      <CornerDecorations />
      <SideDataStreams />
      <FloatingBinary />
      <TopBar />

      {/* MAIN CONTENT */}
      <div className="relative z-20 flex flex-col items-center justify-between min-h-[calc(100vh-60px)] px-4 md:px-8 py-6 md:py-12">

        {/* TOP SECTION - BRANDING (30% of space) */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center w-full"
        >
          {/* DECORATIVE TOP ELEMENT */}
          <motion.div
            className="text-red-600 text-2xl md:text-3xl font-black tracking-[0.8em] mb-4"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            ▼ ▼ ▼
          </motion.div>

          {/* MAIN TITLE */}
          <motion.div
            className="mb-2"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
          >
            <h1 
              className="text-5xl md:text-7xl font-black tracking-[0.15em] mb-1"
              style={{
                color: "#ff0000",
                textShadow: "0 0 40px rgba(255, 0, 0, 0.8), 0 0 80px rgba(255, 0, 0, 0.4)",
                letterSpacing: "0.15em",
              }}
            >
              CYBER
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h2 
              className="text-4xl md:text-6xl font-black tracking-[0.2em] mb-4"
              style={{
                background: "linear-gradient(90deg, #ff0000, #cc0000, #ff0000)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "gradient 3s ease infinite",
              }}
            >
              VAULT
            </h2>
          </motion.div>

          {/* SUBTITLE */}
          <motion.div
            className="text-red-500/80 text-xs md:text-sm tracking-[0.4em] font-mono mb-6"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            [ SECURE TRAINING NEXUS ]
          </motion.div>

          {/* DECORATIVE LINE */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-red-600" />
            <span className="text-red-600 text-xs tracking-[0.3em]">///</span>
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-red-600" />
          </div>
        </motion.div>

        {/* MIDDLE SECTION - LOGIN CARD (40% of space) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-md my-4"
        >
          {/* CARD GLOW EFFECT */}
          <div 
            className="absolute inset-0 rounded-lg blur-2xl"
            style={{ 
              background: "linear-gradient(135deg, rgba(255, 0, 0, 0.3), rgba(200, 0, 0, 0.1))",
            }}
          />

          <div 
            className="relative bg-black/90 border-2 rounded-lg p-6 md:p-8 backdrop-blur-md"
            style={{ borderColor: "rgba(255, 0, 0, 0.5)" }}
          >
            {/* CARD HEADER */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-red-900/40">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                <span className="text-red-600 text-xs md:text-sm tracking-[0.3em] font-bold">ACCESS</span>
              </div>
              <div className="flex gap-1">
                <motion.div className="w-1 h-1 rounded-full bg-red-700" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5 }} />
                <motion.div className="w-1 h-1 rounded-full bg-red-600" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, delay: 0.2 }} />
                <motion.div className="w-1 h-1 rounded-full bg-red-500" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, delay: 0.4 }} />
              </div>
            </div>

            <p className="text-gray-400 text-xs md:text-sm mb-8 tracking-wider leading-relaxed font-mono">
              AUTHENTICATION REQUIRED<br/>
              CLEARANCE LEVEL: SECRET<br/>
              STATUS: ARMED
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col gap-3 md:gap-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255, 0, 0, 0.8)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="w-full py-3 md:py-4 px-4 md:px-6 rounded-lg text-xs md:text-sm tracking-widest relative overflow-hidden group font-bold transition-all"
                style={{
                  background: "linear-gradient(135deg, #990000, #660000)",
                  border: "2px solid #ff0000",
                  boxShadow: "0 0 20px rgba(255, 0, 0, 0.4), inset 0 0 20px rgba(255, 0, 0, 0.1)",
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, #cc0000, #990000)" }}
                />
                <span className="relative text-white tracking-[0.15em] text-xs md:text-sm font-black">
                  🔐 GOOGLE AUTH
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255, 0, 0, 0.6)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                className="w-full py-3 md:py-4 px-4 md:px-6 rounded-lg text-xs md:text-sm tracking-widest relative overflow-hidden group font-bold transition-all"
                style={{
                  background: "linear-gradient(135deg, #1a0000, #330000)",
                  border: "2px solid #cc0000",
                  boxShadow: "0 0 20px rgba(204, 0, 0, 0.3), inset 0 0 20px rgba(255, 0, 0, 0.05)",
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, #4d0000, #1a0000)" }}
                />
                <span className="relative text-red-300 tracking-[0.15em] text-xs md:text-sm font-black">
                  ⚙️ GITHUB AUTH
                </span>
              </motion.button>
            </div>

            {/* CARD FOOTER */}
            <div className="mt-6 pt-4 border-t border-red-900/40">
              <p className="text-red-700/70 text-xs text-center tracking-widest font-mono">
                ENCRYPTED • MONITORED • SECURE
              </p>
            </div>
          </div>
        </motion.div>

        {/* BOTTOM SECTION - STATUS (30% of space) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center w-full"
        >
          {/* BOTTOM DECORATIVE */}
          <motion.div
            className="text-red-900/60 text-xl md:text-2xl font-black tracking-[0.8em] mb-3"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            ▲ ▲ ▲
          </motion.div>

          {/* FOOTER TEXT */}
          <div className="space-y-2">
            <p className="text-red-800/80 text-xs md:text-sm tracking-[0.3em] font-mono">
              CYBERVAULT ACADEMY
            </p>
            <p className="text-red-900/60 text-xs tracking-[0.25em] font-mono">
              EST.2024 • CLASSIFIED • ENCRYPTED
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}