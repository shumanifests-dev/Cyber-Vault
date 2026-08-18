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
      <div className="relative z-20 flex flex-col items-center justify-between min-h-[calc(100vh-60px)] px-8 py-12">

        {/* LOGO AREA - TOP SECTION */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 mt-8"
        >
          {/* TOP LABEL WITH GLOW */}
          <motion.div
            className="text-blue-400 text-xs tracking-[0.5em] mb-6 font-bold"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 3 }}
            style={{ textShadow: "0 0 20px rgba(96, 165, 250, 0.8)" }}
          >
            ⚡ SECURE TRAINING NEXUS ⚡
          </motion.div>

          {/* MAIN TITLE WITH MASSIVE GLOW */}
          <motion.h1
            className="text-6xl md:text-7xl font-black tracking-[0.08em] mb-3"
            style={{
              background: "linear-gradient(135deg, #4285F4, #60a5fa, #4285F4)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 20px rgba(66, 133, 244, 0.6))",
            }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            CYBERVAULT
          </motion.h1>

          {/* SUBTITLE */}
          <motion.div
            className="text-xl md:text-2xl tracking-[0.2em] mb-6"
            style={{
              color: "#ff6b6b",
              textShadow: "0 0 15px rgba(255, 107, 107, 0.5)",
            }}
          >
            ACADEMY
          </motion.div>

          {/* BADGE SECTION */}
          <div className="flex items-center justify-center gap-4 mb-4 flex-wrap">
            <motion.div
              className="px-4 py-2 rounded-full text-xs font-bold tracking-[0.2em]"
              style={{
                background: "linear-gradient(135deg, rgba(66, 133, 244, 0.2), rgba(96, 165, 250, 0.2))",
                border: "1px solid rgba(66, 133, 244, 0.5)",
                color: "#60a5fa",
              }}
              whileHover={{ scale: 1.1 }}
            >
              🛡️ SECURE
            </motion.div>
            <motion.div
              className="px-4 py-2 rounded-full text-xs font-bold tracking-[0.2em]"
              style={{
                background: "linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(255, 87, 87, 0.2))",
                border: "1px solid rgba(255, 107, 107, 0.5)",
                color: "#ff6b6b",
              }}
              whileHover={{ scale: 1.1 }}
            >
              🎓 CERTIFIED
            </motion.div>
            <motion.div
              className="px-4 py-2 rounded-full text-xs font-bold tracking-[0.2em]"
              style={{
                background: "linear-gradient(135deg, rgba(51, 220, 130, 0.2), rgba(52, 211, 153, 0.2))",
                border: "1px solid rgba(51, 220, 130, 0.5)",
                color: "#33dc82",
              }}
              whileHover={{ scale: 1.1 }}
            >
              ✓ VERIFIED
            </motion.div>
          </div>

          <div className="flex items-center gap-3 justify-center">
            <div className="h-px w-12 bg-red-800/40" />
            <span className="text-red-400/80 text-xs tracking-[0.4em] font-semibold">INTEL DIVISION</span>
            <div className="h-px w-12 bg-red-800/40" />
          </div>
        </motion.div>

        {/* LOGIN CARD - MIDDLE/BOTTOM SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-md mb-12"
        >
          {/* CARD BORDER GLOW */}
          <div className="absolute inset-0 rounded-2xl"
            style={{ boxShadow: "0 0 60px rgba(66, 133, 244, 0.2), inset 0 0 40px rgba(0,0,0,0.5)" }}
          />

          <div className="relative bg-black/80 border border-blue-500/40 rounded-2xl p-8 backdrop-blur-xl">

            {/* CARD TOP */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-blue-400/80 text-xs tracking-[0.3em] font-bold">▲ AUTHENTICATE</span>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <motion.div 
                  className="w-1.5 h-1.5 rounded-full bg-blue-300"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              </div>
            </div>

            <p className="text-gray-400 text-xs mb-8 tracking-wider font-medium">
              SECURE ACCESS REQUIRED FOR CLASSIFIED TRAINING MODULES
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col gap-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(66, 133, 244, 0.6)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="w-full py-4 px-6 rounded-xl text-sm tracking-widest relative overflow-hidden group font-semibold"
                style={{
                  background: "linear-gradient(135deg, #4285F4, #3367D6)",
                  border: "2px solid #4285F4",
                  boxShadow: "0 0 20px rgba(66, 133, 244, 0.3)",
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, #5A9FFF, #4285F4)" }}
                />
                <span className="relative text-white tracking-[0.2em] text-sm font-bold flex items-center justify-center gap-2">
                  🔐 GOOGLE ACCESS
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(96, 165, 250, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                className="w-full py-4 px-6 rounded-xl text-sm tracking-widest relative overflow-hidden group font-semibold"
                style={{
                  background: "linear-gradient(135deg, #1f2937, #374151)",
                  border: "2px solid #60a5fa",
                  boxShadow: "0 0 20px rgba(96, 165, 250, 0.3)",
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, #4b5563, #2d3748)" }}
                />
                <span className="relative text-white tracking-[0.2em] text-sm font-bold flex items-center justify-center gap-2">
                  ⚙️ GITHUB ACCESS
                </span>
              </motion.button>
            </div>

            {/* BOTTOM WARNING */}
            <div className="mt-6 pt-4 border-t border-blue-900/30">
              <p className="text-blue-600/60 text-xs text-center tracking-wider font-semibold">
                🔒 AUTHORIZED ACCESS ONLY - ALL ACTIVITY LOGGED
              </p>
            </div>
          </div>
        </motion.div>

        {/* BOTTOM STATUS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-blue-900/50 text-xs tracking-[0.4em] font-mono"
        >
          CYBERVAULT ACADEMY // EST. 2024
        </motion.div>

      </div>
    </div>
  );
}