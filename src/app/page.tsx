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

        {/* MIDDLE SECTION - FEATURES & LOGIN CARD (50% of space) */}
        <div className="relative w-full max-w-6xl my-2 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-center">
          {/* LEFT FEATURE PANEL */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:flex flex-col justify-center space-y-3"
          >
            <div className="bg-black/60 border border-red-900/50 rounded-lg p-3 backdrop-blur-sm hover:border-red-700/70 transition-colors">
              <div className="text-red-600 text-sm font-bold mb-2">🛡️ PHISHING</div>
              <p className="text-gray-400 text-xs leading-tight">Email auth, social engineering, attack scenarios</p>
            </div>
            <div className="bg-black/60 border border-red-900/50 rounded-lg p-3 backdrop-blur-sm hover:border-red-700/70 transition-colors">
              <div className="text-red-600 text-sm font-bold mb-2">🔐 THREATS</div>
              <p className="text-gray-400 text-xs leading-tight">Malware analysis, vulnerability assessment, response</p>
            </div>
            <div className="bg-black/60 border border-red-900/50 rounded-lg p-3 backdrop-blur-sm hover:border-red-700/70 transition-colors">
              <div className="text-red-600 text-sm font-bold mb-2">📊 COMPLIANCE</div>
              <p className="text-gray-400 text-xs leading-tight">GDPR, HIPAA, industry security standards</p>
            </div>
          </motion.div>

          {/* CENTER LOGIN CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="md:col-span-1 flex flex-col justify-center"
          >
            {/* CARD GLOW EFFECT */}
            <div 
              className="absolute inset-0 rounded-lg blur-2xl -z-10"
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
            <div className="flex flex-col gap-3">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 42px rgba(66, 133, 244, 0.8)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="w-full py-3 md:py-4 px-4 md:px-6 rounded-xl text-xs md:text-sm tracking-[0.12em] relative overflow-hidden group font-bold transition-all"
                style={{
                  background: "linear-gradient(135deg, #0b3d91, #1a5ed9)",
                  border: "2px solid rgba(96, 165, 250, 0.9)",
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.45), inset 0 0 20px rgba(255,255,255,0.12)",
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, rgba(96,165,250,0.38), rgba(29,78,216,0.28))" }}
                />
                <span className="relative text-white tracking-[0.12em] text-xs md:text-sm font-black flex items-center justify-center gap-2">
                  🔐 GOOGLE
                </span>
              </motion.button>

              <div className="flex items-center gap-3 text-red-800/60 my-1 px-2">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-700/70 to-red-600/70" />
                <span className="text-[10px] font-mono tracking-[0.25em] text-red-400">OR</span>
                <div className="flex-1 h-px bg-gradient-to-r from-red-600/70 via-red-700/70 to-transparent" />
              </div>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 42px rgba(255, 0, 0, 0.95)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                className="w-full py-3 md:py-4 px-4 md:px-6 rounded-xl text-xs md:text-sm tracking-[0.12em] relative overflow-hidden group font-bold transition-all"
                style={{
                  background: "linear-gradient(135deg, #3a0d0d 0%, #680d0d 35%, #9c1a1a 100%)",
                  border: "2px solid rgba(255, 120, 120, 0.9)",
                  boxShadow: "0 0 18px rgba(255, 0, 0, 0.6), inset 0 0 18px rgba(255,255,255,0.07)",
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,0,0,0.38))" }}
                />
                <span className="relative text-white tracking-[0.12em] text-xs md:text-sm font-black flex items-center justify-center gap-2">
                  ⚙️ GITHUB
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

          {/* RIGHT FEATURE PANEL */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:flex flex-col justify-center space-y-3"
          >
            <div className="bg-black/60 border border-red-900/50 rounded-lg p-3 backdrop-blur-sm hover:border-red-700/70 transition-colors">
              <div className="text-red-600 text-sm font-bold mb-2">🎯 RANSOMWARE</div>
              <p className="text-gray-400 text-xs leading-tight">Encryption, backups, recovery procedures</p>
            </div>
            <div className="bg-black/60 border border-red-900/50 rounded-lg p-3 backdrop-blur-sm hover:border-red-700/70 transition-colors">
              <div className="text-red-600 text-sm font-bold mb-2">💻 FORENSICS</div>
              <p className="text-gray-400 text-xs leading-tight">Evidence collection, timeline analysis, investigation</p>
            </div>
            <div className="bg-black/60 border border-red-900/50 rounded-lg p-3 backdrop-blur-sm hover:border-red-700/70 transition-colors">
              <div className="text-red-600 text-sm font-bold mb-2">🔍 SOC TRAINING</div>
              <p className="text-gray-400 text-xs leading-tight">SIEM tools, threat detection, operations</p>
            </div>
          </motion.div>
        </div>
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
            <p className="inline-block border border-red-700/50 bg-black/40 px-4 py-2 text-red-200 text-xs md:text-sm tracking-[0.35em] font-mono shadow-[0_0_20px_rgba(255,0,0,0.25)]">
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