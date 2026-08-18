"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [scanLine, setScanLine] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const [time, setTime] = useState("");
  const [activeTab, setActiveTab] = useState("cases");
  const [selectedCase, setSelectedCase] = useState<null | number>(null);
  const [xp, setXp] = useState(0);
  const [ethicsScore, setEthicsScore] = useState(0);
  const [casesSolved, setCasesSolved] = useState(0);
  const [answeredScenarios, setAnsweredScenarios] = useState<Record<string, number>>({});
  const [solvedCases, setSolvedCases] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
  }, [status, router]);

  useEffect(() => {
    const id = setInterval(() => setScanLine(p => (p + 1) % 100), 20);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    }, 1000);
    setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    return () => clearInterval(id);
  }, []);

  const riskProfile = xp >= 500 ? "VIGILANT" : xp >= 200 ? "MODERATE" : "HIGH RISK";
  const riskColor = xp >= 500 ? "#00e5ff" : xp >= 200 ? "#ff8c00" : "#ff003c";

  const cases = [
    { id: "001", title: "Phishing Campaign Analysis", desc: "Credential harvesting via spoofed communication layers targeting executive accounts. Attackers mimicked internal IT department emails with pixel-perfect domain spoofing.", type: "HIGH ALERT", severity: "high", xp: 120 },
    { id: "002", title: "Session Hijack Trace", desc: "Authentication sessions compromised via replay attacks on unencrypted channels. Attacker intercepted tokens over public WiFi and reused them within the session window.", type: "CRITICAL", severity: "critical", xp: 200 },
    { id: "003", title: "XSS Injection Event", desc: "Malicious script execution altering interface behavior and harvesting session cookies from thousands of users via a compromised comment field.", type: "VULNERABILITY", severity: "medium", xp: 80 },
    { id: "004", title: "IDOR Exposure Incident", desc: "Unauthorized access to restricted data objects via predictable resource identifiers. User IDs were sequential integers — attacker iterated through all 50,000 records.", type: "ACCESS FLAW", severity: "medium", xp: 90 },
    { id: "005", title: "CSRF Manipulation Event", desc: "Forged requests executed without user consent via trusted session token abuse. Victims clicked a link that silently transferred funds from their banking session.", type: "REQUEST FORGERY", severity: "high", xp: 110 },
    { id: "006", title: "SSRF Internal Probe", desc: "Server-side request abuse targeting internal systems and cloud metadata endpoints. Attacker gained AWS IAM credentials via a vulnerable image upload feature.", type: "INFRA BREACH", severity: "critical", xp: 180 },
    { id: "007", title: "JWT Token Tampering", desc: "Authentication token modification and replay detected across distributed microservices. Attacker changed the algorithm to none bypassing signature verification entirely.", type: "AUTH BREACH", severity: "critical", xp: 160 },
    { id: "008", title: "Quishing Operation", desc: "QR-based phishing redirecting victims to a fake authentication portal that harvested Google and Microsoft SSO credentials at scale during a corporate conference.", type: "SOCIAL ENGINEERING", severity: "high", xp: 130 },
    { id: "009", title: "Google Meet Job Scam", desc: "Threat actors posed as recruiters, invited victims to fake Google Meet interviews, then requested screen sharing to run a technical test — installing RAT malware silently.", type: "PLATFORM ABUSE", severity: "critical", xp: 175 },
    { id: "010", title: "Google Meet Romance Extortion", desc: "Scammers built weeks-long romantic relationships before inviting victims to private Google Meet calls. Explicit content was recorded and used for extortion demanding crypto payments.", type: "CYBER HARASSMENT", severity: "critical", xp: 190 },
  ];

  const urgentScenarios = [
    {
      id: "U1",
      title: "THE WHISTLEBLOWER",
      situation: "A junior employee leaks internal data proving your company is selling user data illegally. They come to you — a security analyst — asking for help. Exposing this protects millions but violates your NDA.",
      options: [
        { label: "Report internally to management", outcome: "Safe but likely suppressed. You followed protocol but the harm continues.", ethicsPoints: 20, awarenessPoints: 15, best: false },
        { label: "Leak anonymously to the press", outcome: "Public wins. You risk prosecution. Ethical but legally dangerous path.", ethicsPoints: 30, awarenessPoints: 20, best: false },
        { label: "Contact a data protection regulator directly", outcome: "Legal, protected by whistleblower law, slower but the correct channel.", ethicsPoints: 50, awarenessPoints: 40, best: true },
        { label: "Do nothing — it is not your problem", outcome: "Millions harmed. You stayed safe. This is complicity by silence.", ethicsPoints: 0, awarenessPoints: 0, best: false },
      ]
    },
    {
      id: "U2",
      title: "RANSOM DECISION",
      situation: "A hospital's systems are locked by ransomware. Patient records are inaccessible. Attackers demand $2M in crypto. Paying funds criminals. Not paying may cost lives today.",
      options: [
        { label: "Pay the ransom immediately", outcome: "Patients potentially safe now but you funded future attacks on others.", ethicsPoints: 15, awarenessPoints: 10, best: false },
        { label: "Refuse and restore from backup", outcome: "Correct if backups exist and are clean. 48 hour delay is a real patient risk.", ethicsPoints: 40, awarenessPoints: 45, best: false },
        { label: "Negotiate to buy time while restoring", outcome: "Smart play. Delays attacker, buys your team critical recovery time.", ethicsPoints: 50, awarenessPoints: 50, best: true },
        { label: "Report to FBI and wait", outcome: "Legally correct but slow. Patients at risk during the response window.", ethicsPoints: 35, awarenessPoints: 30, best: false },
      ]
    },
    {
      id: "U3",
      title: "THE GOOGLE MEET TRAP",
      situation: "You get a LinkedIn message from a recruiter at a top firm. They invite you to a Google Meet interview. During the call they ask you to share your screen and install a proctoring tool.",
      options: [
        { label: "Share screen and install the tool", outcome: "Malware installed. Keylogger active. Your credentials stolen within minutes.", ethicsPoints: 0, awarenessPoints: 0, best: false },
        { label: "Refuse and ask for official company email first", outcome: "Correct. Legitimate recruiters use corporate domains not Gmail accounts.", ethicsPoints: 40, awarenessPoints: 50, best: true },
        { label: "Verify the recruiter profile before proceeding", outcome: "Good instinct. Fake profiles have few connections and recent creation dates.", ethicsPoints: 35, awarenessPoints: 45, best: false },
        { label: "End the call and report the profile to LinkedIn", outcome: "Excellent. Reporting protects other job seekers from the same scam operation.", ethicsPoints: 50, awarenessPoints: 45, best: true },
      ]
    },
  ];

  const severityColor: Record<string, string> = {
    critical: "#ff003c", high: "#ff4500", medium: "#ff8c00", low: "#ffd700",
  };

  function solveCase(i: number, caseXp: number) {
    if (!solvedCases[i]) {
      setXp(p => p + caseXp);
      setCasesSolved(p => p + 1);
      setSolvedCases(p => ({ ...p, [i]: true }));
    }
  }

  function answerScenario(scenarioId: string, optionIdx: number, ethPts: number, awPts: number) {
    if (scenarioId in answeredScenarios) return;
    setAnsweredScenarios(p => ({ ...p, [scenarioId]: optionIdx }));
    setXp(p => p + awPts);
    setEthicsScore(p => p + ethPts);
  }

  if (status === "loading") {
    return (
      <div style={{
        minHeight: "100vh", background: "black",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Share Tech Mono', monospace",
        color: "#ff003c", letterSpacing: "0.5em", fontSize: 18
      }}>
        LOADING INTEL...
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh", background: "#050000",
      color: "white", fontFamily: "'Exo 2', sans-serif",
      position: "relative", overflowX: "hidden"
    }}>

      {/* GRID BG */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(139,0,0,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(139,0,0,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px"
      }} />

      {/* SCAN LINE */}
      <div style={{
        position: "fixed", left: 0, right: 0, zIndex: 10,
        top: `${scanLine}%`, height: "1px", pointerEvents: "none",
        background: "linear-gradient(90deg, transparent, rgba(180,0,0,0.15), transparent)"
      }} />

      {/* CORNERS */}
      {[
        { top: 12, left: 12, borderTop: "2px solid", borderLeft: "2px solid" },
        { top: 12, right: 12, borderTop: "2px solid", borderRight: "2px solid" },
        { bottom: 12, left: 12, borderBottom: "2px solid", borderLeft: "2px solid" },
        { bottom: 12, right: 12, borderBottom: "2px solid", borderRight: "2px solid" },
      ].map((s, i) => (
        <div key={i} style={{
          position: "fixed", width: 24, height: 24,
          borderColor: "rgba(180,0,0,0.4)", zIndex: 50, pointerEvents: "none", ...s
        }} />
      ))}

      {/* NAVBAR */}
      <nav style={{
        position: "relative", zIndex: 30,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "18px 40px",
        borderBottom: "1px solid rgba(139,0,0,0.3)",
        background: "rgba(3,0,0,0.98)",
        backdropFilter: "blur(20px)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#cc0000" }} />
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(180,0,0,0.5)" }} />
          </div>
          <span style={{
            fontWeight: 800, letterSpacing: "0.2em", fontSize: 22, color: "white",
            textShadow: glitch ? "2px 0 #ff003c, -2px 0 #00ffff" : "0 0 20px rgba(200,0,0,0.4)",
            fontFamily: "'Rajdhani', sans-serif"
          }}>
            CYBER<span style={{ color: "#cc0000" }}>INTEL</span>
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <span style={{ color: "rgba(180,0,0,0.5)", fontSize: 14, letterSpacing: "0.3em", fontFamily: "'Share Tech Mono', monospace" }}>N109-ZONE</span>
          <span style={{ color: "rgba(180,0,0,0.8)", fontSize: 15, fontFamily: "'Share Tech Mono', monospace" }}>{time}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/instructions")}
            style={{
              background: "transparent", border: "1px solid rgba(180,0,0,0.25)",
              color: "rgba(255,120,120,0.7)", padding: "9px 18px", borderRadius: 6,
              fontSize: 14, letterSpacing: "0.15em", cursor: "pointer",
              fontFamily: "'Exo 2', sans-serif", fontWeight: 600
            }}>
            BRIEF
          </motion.button>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src={session?.user?.image || ""} alt="avatar"
              style={{ width: 40, height: 40, borderRadius: "50%", border: "2px solid rgba(180,0,0,0.5)" }} />
            <div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>
                {session?.user?.name}
              </div>
              <div style={{ fontSize: 12, color: "rgba(180,0,0,0.5)", letterSpacing: "0.1em" }}>
                AGENT // LVL 1
              </div>
            </div>
          </div>

          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => signOut({ callbackUrl: "/" })}
            style={{
              background: "transparent", border: "1px solid rgba(255,0,60,0.35)",
              color: "#ff003c", padding: "9px 18px", borderRadius: 6,
              fontSize: 14, letterSpacing: "0.15em", cursor: "pointer",
              fontFamily: "'Exo 2', sans-serif", fontWeight: 600
            }}>
            EXIT
          </motion.button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{
        position: "relative", zIndex: 20, padding: "36px 40px",
        borderBottom: "1px solid rgba(139,0,0,0.15)",
        background: "linear-gradient(180deg, rgba(15,0,0,0.8), transparent)"
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            color: "rgba(180,0,0,0.5)", fontSize: 13,
            letterSpacing: "0.5em", marginBottom: 10,
            fontFamily: "'Share Tech Mono', monospace"
          }}>
            ── INVESTIGATION SYSTEM ACTIVE ──
          </div>
          <h1 style={{
            fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900,
            letterSpacing: "0.12em", color: "white", margin: "0 0 8px",
            textShadow: "0 0 40px rgba(180,0,0,0.25)",
            fontFamily: "'Rajdhani', sans-serif"
          }}>
            AGENT {session?.user?.name?.split(" ")[0]?.toUpperCase()}
          </h1>
          <div style={{
            color: "rgba(180,0,0,0.55)", fontSize: 15,
            letterSpacing: "0.2em", marginBottom: 32, fontWeight: 600
          }}>
            CYBER CRIMES INVESTIGATION UNIT
          </div>

          {/* STAT CARDS */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, maxWidth: 780 }}>
            {[
              { val: xp, label: "AWARENESS XP", color: "#ff003c" },
              { val: ethicsScore, label: "ETHICS SCORE", color: "#ff8c00" },
              { val: `${casesSolved}/${cases.length}`, label: "CASES SOLVED", color: "#cc0000" },
              { val: riskProfile, label: "RISK LEVEL", color: riskColor },
            ].map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  textAlign: "center", padding: "20px 16px", borderRadius: 10,
                  background: "rgba(8,0,0,0.9)",
                  border: `1px solid ${s.color}25`,
                  boxShadow: `0 0 20px ${s.color}08`
                }}>
                <div style={{
                  fontWeight: 900, fontSize: 32, color: s.color,
                  textShadow: `0 0 20px ${s.color}50`,
                  marginBottom: 8, fontFamily: "'Rajdhani', sans-serif"
                }}>
                  {s.val}
                </div>
                <div style={{
                  fontSize: 13, color: "rgba(220,120,120,0.6)",
                  letterSpacing: "0.15em", fontWeight: 600
                }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* TABS */}
      <div style={{
        position: "relative", zIndex: 20,
        borderBottom: "1px solid rgba(139,0,0,0.25)",
        background: "rgba(3,0,0,0.95)", padding: "0 40px"
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex" }}>
          {[
            { id: "cases", label: "CASE FILES" },
            { id: "urgent", label: "URGENT RESPONSE" },
            { id: "intel", label: "INTEL BRIEF" },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "18px 28px", fontSize: 15,
                letterSpacing: "0.2em", fontWeight: 700,
                borderBottom: `3px solid ${activeTab === tab.id ? "#cc0000" : "transparent"}`,
                color: activeTab === tab.id ? "#ff5555" : "rgba(180,80,80,0.35)",
                background: "transparent", border: "none",
                borderBottom: `3px solid ${activeTab === tab.id ? "#cc0000" : "transparent"}`,
                cursor: "pointer", fontFamily: "'Exo 2', sans-serif",
                transition: "all 0.2s"
              }}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ position: "relative", zIndex: 20, maxWidth: 1100, margin: "0 auto", padding: "40px" }}>
        <AnimatePresence mode="wait">

          {/* CASE FILES */}
          {activeTab === "cases" && (
            <motion.div key="cases"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}>

              <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", marginBottom: 28
              }}>
                <div style={{
                  color: "rgba(220,100,100,0.7)", fontSize: 15,
                  letterSpacing: "0.3em", fontWeight: 700,
                  fontFamily: "'Share Tech Mono', monospace"
                }}>
                  BREACH INTELLIGENCE FILES // {cases.length} ACTIVE CASES
                </div>
                <div style={{
                  color: "rgba(180,0,0,0.45)", fontSize: 14,
                  letterSpacing: "0.15em", fontWeight: 600
                }}>
                  CLICK ANY FILE TO OPEN →
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {cases.map((c, i) => {
                  const sc = severityColor[c.severity];
                  const isOpen = selectedCase === i;
                  const isSolved = solvedCases[i];
                  return (
                    <motion.div key={c.id}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => router.push(`/case/${c.id}`)}
                      style={{
                        background: isOpen ? "rgba(18,0,0,0.95)" : "rgba(10,0,0,0.85)",
                        border: `1px solid ${isOpen ? sc + "45" : "rgba(100,0,0,0.25)"}`,
                        borderRadius: 12, cursor: "pointer",
                        overflow: "hidden", transition: "all 0.25s",
                        boxShadow: isOpen ? `0 0 30px ${sc}12` : "none",
                        position: "relative"
                      }}>

                      <div style={{
                        position: "absolute", left: 0, top: 0, bottom: 0,
                        width: isSolved ? 5 : 4,
                        background: isSolved ? "#00e5ff" : sc,
                        borderRadius: "12px 0 0 12px", transition: "all 0.3s"
                      }} />

                      <div style={{
                        display: "flex", alignItems: "center",
                        justifyContent: "space-between",
                        padding: "22px 28px 22px 32px"
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
                          <span style={{
                            color: "rgba(180,0,0,0.4)", fontSize: 14,
                            fontWeight: 700, letterSpacing: "0.2em", flexShrink: 0,
                            fontFamily: "'Share Tech Mono', monospace"
                          }}>
                            #{c.id}
                          </span>
                          <div>
                            <div style={{
                              fontWeight: 700, fontSize: 17,
                              color: isSolved ? "#00e5ff" : "white",
                              letterSpacing: "0.05em", marginBottom: 6,
                              textShadow: isSolved ? "0 0 15px rgba(0,229,255,0.3)" : "none"
                            }}>
                              {c.title}
                            </div>
                            <div style={{
                              fontSize: 14, color: "rgba(255,180,180,0.5)",
                              lineHeight: 1.6, maxWidth: 540
                            }}>
                              {c.desc}
                            </div>
                          </div>
                        </div>

                        <div style={{
                          display: "flex", alignItems: "center",
                          gap: 14, marginLeft: 20, flexShrink: 0
                        }}>
                          <span style={{
                            fontSize: 12, padding: "5px 12px", borderRadius: 4,
                            letterSpacing: "0.1em", fontWeight: 700,
                            color: sc, background: `${sc}12`,
                            border: `1px solid ${sc}30`
                          }}>
                            {c.type}
                          </span>
                          <span style={{
                            fontSize: 14, fontWeight: 700,
                            color: isSolved ? "#00e5ff" : "rgba(180,0,0,0.35)",
                            fontFamily: "'Share Tech Mono', monospace"
                          }}>
                            {isSolved ? `+${c.xp} XP ✓` : "??? XP"}
                          </span>
                          <span style={{
                            fontSize: 22, color: "rgba(180,0,0,0.45)",
                            transform: isOpen ? "rotate(90deg)" : "rotate(0)",
                            transition: "transform 0.3s", display: "inline-block"
                          }}>›</span>
                        </div>
                      </div>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{
                              borderTop: `1px solid ${sc}18`,
                              padding: "22px 32px",
                              background: "rgba(5,0,0,0.6)"
                            }}>
                            <div style={{
                              display: "flex", alignItems: "center",
                              justifyContent: "space-between"
                            }}>
                              <div style={{
                                fontSize: 14, letterSpacing: "0.15em",
                                color: isSolved ? "rgba(0,200,150,0.7)" : "rgba(255,120,120,0.5)",
                                fontWeight: 600
                              }}>
                                {isSolved
                                  ? `✓ CASE INVESTIGATED — ${c.xp} XP ADDED TO YOUR PROFILE`
                                  : "REVIEW THIS CASE DOSSIER TO EARN XP"}
                              </div>
                              {!isSolved && (
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={(e) => { e.stopPropagation(); solveCase(i, c.xp); }}
                                  style={{
                                    background: `${sc}15`,
                                    border: `1px solid ${sc}40`,
                                    color: sc, padding: "11px 22px",
                                    borderRadius: 6, fontSize: 14,
                                    letterSpacing: "0.15em", cursor: "pointer",
                                    fontFamily: "'Exo 2', sans-serif", fontWeight: 700
                                  }}>
                                  MARK INVESTIGATED →
                                </motion.button>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* URGENT RESPONSE */}
          {activeTab === "urgent" && (
            <motion.div key="urgent"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}>

              <div style={{
                color: "rgba(220,100,100,0.7)", fontSize: 15,
                letterSpacing: "0.3em", marginBottom: 32, fontWeight: 700,
                fontFamily: "'Share Tech Mono', monospace"
              }}>
                ⚠ URGENT RESPONSE // YOUR CHOICES SHAPE YOUR RISK PROFILE
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                {urgentScenarios.map((s) => {
                  const answered = s.id in answeredScenarios;
                  const chosenIdx = answeredScenarios[s.id];
                  return (
                    <motion.div key={s.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        borderRadius: 14, overflow: "hidden",
                        border: "1px solid rgba(139,0,0,0.28)",
                        background: "rgba(8,0,0,0.85)"
                      }}>

                      <div style={{
                        padding: "22px 30px",
                        background: "rgba(18,0,0,0.95)",
                        borderBottom: "1px solid rgba(139,0,0,0.18)"
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#cc0000" }} />
                          <span style={{
                            color: "rgba(180,0,0,0.6)", fontSize: 13,
                            letterSpacing: "0.3em", fontWeight: 600,
                            fontFamily: "'Share Tech Mono', monospace"
                          }}>
                            URGENT SCENARIO
                          </span>
                        </div>
                        <div style={{
                          fontWeight: 800, letterSpacing: "0.1em",
                          fontSize: 20, color: "white",
                          fontFamily: "'Rajdhani', sans-serif"
                        }}>
                          {s.title}
                        </div>
                      </div>

                      <div style={{
                        padding: "22px 30px",
                        borderBottom: "1px solid rgba(139,0,0,0.12)"
                      }}>
                        <div style={{
                          fontSize: 13, letterSpacing: "0.25em",
                          color: "rgba(180,0,0,0.5)", marginBottom: 12,
                          fontWeight: 600, fontFamily: "'Share Tech Mono', monospace"
                        }}>
                          SITUATION BRIEF
                        </div>
                        <div style={{
                          fontSize: 16, color: "rgba(255,255,255,0.8)",
                          lineHeight: 1.85
                        }}>
                          {s.situation}
                        </div>
                      </div>

                      <div style={{ padding: "22px 30px" }}>
                        <div style={{
                          fontSize: 13, letterSpacing: "0.25em",
                          color: "rgba(180,0,0,0.5)", marginBottom: 16,
                          fontWeight: 600, fontFamily: "'Share Tech Mono', monospace"
                        }}>
                          {answered ? "RESPONSE LOGGED // OUTCOME REVEALED" : "SELECT YOUR RESPONSE // CHOOSE WISELY"}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                          {s.options.map((opt, oi) => {
                            const isChosen = answered && chosenIdx === oi;
                            const isBest = opt.best;
                            return (
                              <motion.button key={oi}
                                whileHover={!answered ? { x: 6 } : {}}
                                whileTap={!answered ? { scale: 0.99 } : {}}
                                disabled={answered}
                                onClick={() => answerScenario(s.id, oi, opt.ethicsPoints, opt.awarenessPoints)}
                                style={{
                                  width: "100%", textAlign: "left",
                                  padding: "16px 20px", borderRadius: 8,
                                  background: isChosen
                                    ? isBest ? "rgba(0,80,0,0.2)" : "rgba(180,0,0,0.15)"
                                    : answered && isBest ? "rgba(0,60,0,0.1)" : "rgba(12,0,0,0.7)",
                                  border: isChosen
                                    ? isBest ? "1px solid rgba(0,200,0,0.35)" : "1px solid rgba(255,0,60,0.35)"
                                    : answered && isBest ? "1px solid rgba(0,150,0,0.2)" : "1px solid rgba(100,0,0,0.22)",
                                  cursor: answered ? "default" : "pointer",
                                  fontFamily: "'Exo 2', sans-serif",
                                  transition: "all 0.2s"
                                }}>
                                <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                                  <span style={{
                                    color: "rgba(180,0,0,0.5)", fontSize: 15,
                                    fontWeight: 800, flexShrink: 0, marginTop: 1
                                  }}>
                                    {String.fromCharCode(65 + oi)}.
                                  </span>
                                  <div style={{ flex: 1 }}>
                                    <div style={{
                                      color: "rgba(255,255,255,0.85)",
                                      fontSize: 15, lineHeight: 1.6, fontWeight: 500
                                    }}>
                                      {opt.label}
                                    </div>
                                    {answered && (
                                      <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        style={{
                                          marginTop: 8, fontSize: 13, lineHeight: 1.5,
                                          color: isBest ? "rgba(0,220,120,0.8)" : "rgba(255,140,100,0.7)",
                                          fontWeight: 500
                                        }}>
                                        → {opt.outcome}
                                      </motion.div>
                                    )}
                                  </div>
                                  {answered && (
                                    <div style={{ flexShrink: 0, textAlign: "right" }}>
                                      <div style={{
                                        fontSize: 14, fontWeight: 700,
                                        color: isChosen ? "#ff8c00" : "rgba(180,0,0,0.3)",
                                        fontFamily: "'Share Tech Mono', monospace"
                                      }}>
                                        +{opt.awarenessPoints} XP
                                      </div>
                                      <div style={{
                                        fontSize: 12, color: "rgba(180,0,0,0.35)",
                                        marginTop: 3, fontFamily: "'Share Tech Mono', monospace"
                                      }}>
                                        {opt.ethicsPoints} ETH
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* INTEL BRIEF */}
          {activeTab === "intel" && (
            <motion.div key="intel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}>

              <div style={{
                color: "rgba(220,100,100,0.7)", fontSize: 15,
                letterSpacing: "0.3em", marginBottom: 28, fontWeight: 700,
                fontFamily: "'Share Tech Mono', monospace"
              }}>
                THREAT INTELLIGENCE BRIEFING // 2026 ACTIVE VECTORS
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { title: "QUISHING", desc: "QR codes embedding malicious URLs. Bypasses traditional email link filters. Growing 400% year over year.", level: "RISING THREAT" },
                  { title: "MFA FATIGUE", desc: "Flooding authentication apps with push requests until user approves. Used in the MGM $100M breach.", level: "ACTIVE THREAT" },
                  { title: "SHADOW AI", desc: "Employees using unauthorized AI tools that send proprietary data to unprotected third-party servers.", level: "EMERGING" },
                  { title: "BROWSER-IN-BROWSER", desc: "Fake browser popup windows rendered inside webpages to steal OAuth credentials convincingly.", level: "ACTIVE THREAT" },
                  { title: "GOOGLE MEET SCAMS", desc: "Fake Meet links used for job fraud, romance extortion, and malware delivery via screen share abuse.", level: "CRITICAL" },
                  { title: "CONSENT PHISHING", desc: "Malicious OAuth apps requesting Mail.ReadWrite permissions to silently monitor corporate email.", level: "CRITICAL" },
                ].map((item, i) => {
                  const lc = item.level === "CRITICAL" ? "#ff003c" : item.level === "ACTIVE THREAT" ? "#ff4500" : item.level === "EMERGING" ? "#ff8c00" : "#ffd700";
                  return (
                    <motion.div key={i}
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.07 }}
                      whileHover={{ scale: 1.02 }}
                      style={{
                        padding: "24px 26px", borderRadius: 12,
                        background: "rgba(8,0,0,0.85)",
                        border: "1px solid rgba(100,0,0,0.25)"
                      }}>
                      <div style={{
                        display: "flex", justifyContent: "space-between",
                        alignItems: "flex-start", marginBottom: 14
                      }}>
                        <div style={{
                          fontWeight: 800, letterSpacing: "0.1em",
                          fontSize: 17, color: "white",
                          fontFamily: "'Rajdhani', sans-serif"
                        }}>
                          {item.title}
                        </div>
                        <span style={{
                          fontSize: 11, padding: "4px 10px", borderRadius: 4,
                          letterSpacing: "0.1em", fontWeight: 700,
                          color: lc, border: `1px solid ${lc}30`,
                          background: `${lc}08`, flexShrink: 0, marginLeft: 12
                        }}>
                          {item.level}
                        </span>
                      </div>
                      <div style={{
                        fontSize: 14, color: "rgba(255,200,200,0.55)",
                        lineHeight: 1.75
                      }}>
                        {item.desc}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}