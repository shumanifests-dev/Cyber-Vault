"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Instructions() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
  }, [status, router]);

  const steps = [
    {
      num: "01",
      title: "OPEN CASE FILES",
      desc: "Browse active cyber crime investigations. Each case teaches you a real attack vector used by threat actors in the wild.",
      color: "#ff003c"
    },
    {
      num: "02",
      title: "INVESTIGATE & LEARN",
      desc: "Click any case to open the dossier. Read the attack brief, analyze the evidence, and understand how the breach happened.",
      color: "#ff4500"
    },
    {
      num: "03",
      title: "URGENT RESPONSE",
      desc: "Face morally complex cyber scenarios. Your choices reveal your ethical framework and affect your Human Risk Score.",
      color: "#ff8c00"
    },
    {
      num: "04",
      title: "EARN XP & RANK UP",
      desc: "Solve cases and respond to scenarios to earn XP. Your Awareness Score and Risk Profile update in real time.",
      color: "#cc0000"
    },
    {
      num: "05",
      title: "FINAL ASSESSMENT",
      desc: "Complete all modules to receive your Cyber Risk Profile — Vigilant Agent, Moderate Risk, or High Risk classification.",
      color: "#ff003c"
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden"
      style={{ fontFamily: "'Orbitron', monospace" }}>

      {/* GRID */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(139,0,0,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(139,0,0,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px"
      }} />

      {/* CORNERS */}
      {["top-3 left-3 border-t-2 border-l-2", "top-3 right-3 border-t-2 border-r-2",
        "bottom-3 left-3 border-b-2 border-l-2", "bottom-3 right-3 border-b-2 border-r-2"].map((c, i) => (
        <div key={i} className={`fixed w-6 h-6 border-red-800/50 z-50 pointer-events-none ${c}`} />
      ))}

      {/* NAV */}
      <nav className="relative z-30 flex justify-between items-center px-8 py-4 border-b border-red-950/40"
        style={{ background: "rgba(5,0,0,0.95)", backdropFilter: "blur(20px)" }}>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <span className="text-white font-bold tracking-[0.2em] text-sm">
            CYBER<span style={{ color: "#cc0000" }}>INTEL</span> DIVISION
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/dashboard")}
          className="text-xs tracking-[0.2em] px-4 py-2 rounded"
          style={{ border: "1px solid rgba(180,0,0,0.3)", color: "#ff003c" }}>
          ← BACK TO BASE
        </motion.button>
      </nav>

      <div className="relative z-20 max-w-3xl mx-auto px-8 py-12">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14">
          <div className="text-red-800/60 text-xs tracking-[0.5em] mb-4">
            ── AGENT BRIEFING ──
          </div>
          <h1 className="text-4xl font-black tracking-[0.2em] mb-4"
            style={{ textShadow: "0 0 40px rgba(180,0,0,0.4)", color: "white" }}>
            MISSION INSTRUCTIONS
          </h1>
          <p className="text-red-700/60 text-sm tracking-wider leading-relaxed">
            YOU ARE AN INVESTIGATIVE AGENT IN THE CYBER CRIMES UNIT.<br />
            YOUR MISSION: ANALYSE BREACHES. MAKE ETHICAL DECISIONS. PROTECT THE DIGITAL WORLD.
          </p>
        </motion.div>

        {/* STEPS */}
        <div className="space-y-4 mb-12">
          {steps.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12 }}
              className="flex gap-6 p-6 rounded-xl relative overflow-hidden"
              style={{
                background: "rgba(10,0,0,0.7)",
                border: "1px solid rgba(139,0,0,0.2)"
              }}>
              <div className="absolute left-0 top-0 bottom-0 w-0.5"
                style={{ background: s.color }} />
              <div className="text-3xl font-black flex-shrink-0"
                style={{ color: `${s.color}30`, fontFamily: "'Orbitron', monospace" }}>
                {s.num}
              </div>
              <div>
                <div className="font-bold tracking-[0.2em] mb-2 text-sm"
                  style={{ color: s.color }}>
                  {s.title}
                </div>
                <div className="text-white/60 text-xs leading-relaxed tracking-wider">
                  {s.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SCORING */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="p-6 rounded-xl mb-8"
          style={{ background: "rgba(10,0,0,0.8)", border: "1px solid rgba(180,0,0,0.25)" }}>
          <div className="text-red-800/60 text-xs tracking-[0.4em] mb-4">SCORING SYSTEM</div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "CASE SOLVED", pts: "+100-200 XP" },
              { label: "CORRECT ETHICS", pts: "+25-50 XP" },
              { label: "QUIZ ANSWER", pts: "+10 XP" },
            ].map((sc, i) => (
              <div key={i} className="text-center p-3 rounded-lg"
                style={{ background: "rgba(20,0,0,0.6)", border: "1px solid rgba(139,0,0,0.15)" }}>
                <div className="text-white font-bold text-sm mb-1">{sc.pts}</div>
                <div className="text-red-900/60 text-xs tracking-wider">{sc.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RISK PROFILES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="p-6 rounded-xl mb-10"
          style={{ background: "rgba(10,0,0,0.8)", border: "1px solid rgba(180,0,0,0.25)" }}>
          <div className="text-red-800/60 text-xs tracking-[0.4em] mb-4">RISK PROFILES</div>
          <div className="space-y-3">
            {[
              { profile: "VIGILANT AGENT", range: "500+ XP", color: "#00e5ff", desc: "Exemplary cyber awareness. Ethical decision maker." },
              { profile: "MODERATE RISK", range: "200-499 XP", color: "#ff8c00", desc: "Some vulnerabilities in behavior. Needs improvement." },
              { profile: "HIGH RISK", range: "0-199 XP", color: "#ff003c", desc: "Significant threat to organizational security." },
            ].map((rp, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg"
                style={{ background: "rgba(15,0,0,0.6)", border: `1px solid ${rp.color}20` }}>
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: rp.color }} />
                <div className="flex-1">
                  <div className="text-xs font-bold tracking-wider mb-0.5" style={{ color: rp.color }}>
                    {rp.profile}
                  </div>
                  <div className="text-white/40 text-xs">{rp.desc}</div>
                </div>
                <div className="text-xs tracking-wider" style={{ color: `${rp.color}60` }}>{rp.range}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/dashboard")}
            className="px-12 py-4 rounded-xl font-bold tracking-[0.3em] text-sm"
            style={{
              background: "linear-gradient(135deg, #1a0000, #2d0000)",
              border: "1px solid rgba(180,0,0,0.4)",
              color: "#ff4444",
              boxShadow: "0 0 30px rgba(180,0,0,0.15)"
            }}>
            BEGIN INVESTIGATION →
          </motion.button>
        </motion.div>

      </div>
    </div>
  );
}