"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const allCases: Record<string, {
  id: string;
  title: string;
  type: string;
  severity: string;
  overview: string;
  clues: { word: string; info: string }[];
  quiz: {
    beginner: { q: string; options: string[]; correct: number; explanation: string }[];
    intermediate: { q: string; options: string[]; correct: number; explanation: string }[];
    advanced: { q: string; options: string[]; correct: number; explanation: string }[];
  };
  xp: { beginner: number; intermediate: number; advanced: number };
  ethicsQuestion: { q: string; options: { label: string; outcome: string; points: number }[] };
}> = {
  "001": {
    id: "001",
    title: "Phishing Campaign Analysis",
    type: "HIGH ALERT",
    severity: "high",
    overview: `In Q3 2024, a coordinated phishing campaign targeted 47 executives across 12 financial institutions. Attackers registered lookalike domains using homograph attacks — replacing standard Latin characters with visually identical Unicode characters. Emails were sent from these spoofed domains, bypassing standard SPF and DKIM checks due to misconfigured DNS records. Each email contained a pixel-perfect replica of the company's internal IT portal, prompting victims to re-enter credentials due to a "mandatory security update." Within 72 hours, 23 executive accounts were fully compromised, leading to $4.2M in fraudulent wire transfers.`,
    clues: [
      { word: "homograph attacks", info: "Homograph attacks use Unicode characters that look identical to ASCII letters. For example, using the Cyrillic 'а' instead of Latin 'a' to register paypal.com as pаypal.com — visually identical but a completely different domain." },
      { word: "SPF and DKIM", info: "SPF (Sender Policy Framework) and DKIM (DomainKeys Identified Mail) are email authentication protocols. SPF verifies the sending server is authorized. DKIM adds a cryptographic signature. Both must be correctly configured to prevent email spoofing." },
      { word: "pixel-perfect replica", info: "Attackers cloned the exact HTML, CSS, and images of the legitimate IT portal. The only difference was the domain name — which most users never check. This technique is called website cloning or UI spoofing." },
    ],
    quiz: {
      beginner: [
        { q: "What is a phishing attack?", options: ["Hacking a server directly", "Tricking users into revealing credentials via fake communications", "Installing malware via USB", "Intercepting network traffic"], correct: 1, explanation: "Phishing deceives users into giving up sensitive information by impersonating trusted entities via email, SMS, or fake websites." },
        { q: "How can you spot a suspicious email domain?", options: ["Check if the email has images", "Look for spelling errors in the subject", "Hover over links and check the actual URL carefully", "Check if the email is in your spam folder"], correct: 2, explanation: "Always hover over links before clicking. The displayed text can say anything — the real destination URL is what matters. Look for subtle misspellings or Unicode substitutions." },
        { q: "What should you do if you receive a suspicious email asking for your password?", options: ["Enter your password to verify it is legitimate", "Forward it to colleagues to warn them", "Report it to IT security and do not click any links", "Reply asking if it is real"], correct: 2, explanation: "Never click links or enter credentials from unsolicited emails. Report to IT security immediately so they can investigate and warn others." },
      ],
      intermediate: [
        { q: "What is a homograph attack?", options: ["Sending identical emails to multiple targets", "Using Unicode characters to create visually identical but different domains", "Copying a website's design exactly", "Intercepting DNS requests"], correct: 1, explanation: "Homograph attacks exploit Unicode's international characters. The Cyrillic 'а' looks identical to Latin 'a' but creates a completely different domain that bypasses visual inspection." },
        { q: "Which DNS record helps prevent email spoofing by specifying authorized mail servers?", options: ["A Record", "CNAME Record", "SPF Record", "MX Record"], correct: 2, explanation: "SPF (Sender Policy Framework) records specify which servers are authorized to send email for your domain. A failing SPF check indicates potential spoofing." },
        { q: "What is the most effective technical control against phishing credential theft?", options: ["Strong passwords", "Hardware security keys (FIDO2)", "Email filters", "VPN usage"], correct: 1, explanation: "FIDO2 hardware keys are phishing-resistant because they cryptographically bind the credential to the legitimate domain. Even if you're phished, the attacker cannot use your credential on a different domain." },
      ],
      advanced: [
        { q: "An attacker registers xn--pypal-4ve.com. What type of attack is this?", options: ["Typosquatting", "Punycode homograph attack", "DNS cache poisoning", "BGP hijacking"], correct: 1, explanation: "xn-- is the Punycode prefix for internationalized domain names. Attackers register domains using Unicode characters that render identically to legitimate domains in browsers, bypassing visual inspection." },
        { q: "Which combination of controls provides the strongest defense against spear phishing?", options: ["SPF + DKIM + DMARC + Security awareness training + FIDO2 MFA", "Antivirus + Firewall + Strong passwords", "Email filtering + VPN + Regular backups", "2FA via SMS + Employee training"], correct: 0, explanation: "Defense in depth requires layered controls. SPF/DKIM/DMARC handle email authentication, FIDO2 ensures credentials cannot be replayed on attacker domains, and awareness training is the last line of defense." },
        { q: "During incident response, what is the FIRST action after confirming an executive's credentials were phished?", options: ["Reset the password", "Revoke all active sessions and tokens immediately", "Notify the executive", "Scan the network for malware"], correct: 1, explanation: "Password reset alone is insufficient — active sessions remain valid. Revoking all sessions and OAuth tokens first prevents the attacker from maintaining access while you respond." },
      ],
    },
    ethicsQuestion: {
      q: "You discover the phishing attack succeeded because IT ignored multiple employee warnings 3 weeks earlier. Do you include this in your incident report?",
      options: [
        { label: "Yes — include everything. Accurate reporting prevents future failures.", outcome: "Correct. Honest reporting, even when uncomfortable, is the ethical and professional standard.", points: 50 },
        { label: "Soften it — mention delays without naming the IT team.", outcome: "Partially ethical. Important context is lost. Future incidents may repeat.", points: 25 },
        { label: "No — it will create conflict and affect colleagues' jobs.", outcome: "Choosing comfort over truth. The organization cannot learn from hidden failures.", points: 5 },
        { label: "Report it privately to your manager only.", outcome: "Better than hiding it but limits organizational learning and accountability.", points: 30 },
      ]
    },
    xp: { beginner: 80, intermediate: 120, advanced: 200 }
  },

  "002": {
    id: "002",
    title: "Session Hijack Trace",
    type: "CRITICAL",
    severity: "critical",
    overview: `A threat actor positioned themselves at a popular co-working space and used a rogue WiFi access point named "CafeWork_Free" to conduct a man-in-the-middle attack. Victims connected believing it was the venue's legitimate network. The attacker used SSLstrip to downgrade HTTPS connections to HTTP, allowing session tokens to be captured in plaintext. Within 4 hours, 31 session tokens were harvested across banking, corporate email, and SaaS platforms. The attacker used these tokens directly in their browser — bypassing password authentication entirely — a technique known as pass-the-cookie.`,
    clues: [
      { word: "rogue WiFi access point", info: "A rogue access point is a wireless network set up by an attacker to mimic a legitimate network. Victims connect thinking it is safe, but all traffic flows through the attacker's device. Also called an evil twin attack." },
      { word: "SSLstrip", info: "SSLstrip is a tool that intercepts HTTPS redirects and serves HTTP instead, capturing traffic in plaintext. It exploits the moment before HTTPS is established. HSTS (HTTP Strict Transport Security) prevents this attack by forcing HTTPS for known domains." },
      { word: "pass-the-cookie", info: "Session cookies authenticate users after login. If stolen, an attacker can inject them directly into their browser and access the account without knowing the password or MFA code — because the session is already authenticated." },
    ],
    quiz: {
      beginner: [
        { q: "What is a session cookie?", options: ["A file that stores your browsing history", "A token that keeps you logged in after authentication", "A type of malware", "A network packet"], correct: 1, explanation: "Session cookies store your authenticated state. When you log in, the server issues a cookie. Your browser sends it with every request so the server knows you are still you." },
        { q: "Why is public WiFi dangerous?", options: ["It is slower than home WiFi", "Attackers can intercept unencrypted traffic on the same network", "It uses more battery", "Public WiFi always has malware"], correct: 1, explanation: "On public WiFi, traffic may be visible to others on the same network. Attackers can use tools to capture, modify, or inject traffic — especially if the connection is not encrypted." },
        { q: "What is the safest way to use public WiFi?", options: ["Only visit sites you trust", "Use a VPN to encrypt all traffic", "Log out of accounts when done", "Use incognito mode"], correct: 1, explanation: "A VPN encrypts all traffic between your device and the VPN server, preventing interception on the local network — even if the WiFi is compromised." },
      ],
      intermediate: [
        { q: "What does SSLstrip do?", options: ["Encrypts HTTP traffic", "Downgrades HTTPS to HTTP to capture plaintext traffic", "Steals SSL certificates", "Blocks HTTPS connections"], correct: 1, explanation: "SSLstrip intercepts the redirect from HTTP to HTTPS and serves the HTTP version instead. The victim never realizes their connection is unencrypted. HSTS prevents this by pre-loading HTTPS requirements." },
        { q: "How does pass-the-cookie bypass MFA?", options: ["It cracks the MFA code", "It replays the session token which was issued after MFA was completed", "It disables MFA on the server", "It guesses the session token"], correct: 1, explanation: "MFA is only required at login. Once authenticated, a session token is issued. If stolen, this token grants access without re-authentication — the attacker skips the MFA step entirely." },
        { q: "Which HTTP header prevents SSLstrip attacks?", options: ["X-Frame-Options", "Content-Security-Policy", "Strict-Transport-Security", "X-XSS-Protection"], correct: 2, explanation: "HSTS (HTTP Strict Transport Security) tells browsers to always use HTTPS for a domain, even if HTTP is requested. This prevents downgrade attacks like SSLstrip." },
      ],
      advanced: [
        { q: "An attacker captures a JWT session token. The token uses HS256. What is the most critical security control to implement?", options: ["Use RS256 instead of HS256", "Implement short token expiry with refresh token rotation", "Encrypt the JWT payload", "Add the user's IP address to the token claims"], correct: 1, explanation: "Short-lived tokens with refresh token rotation limit the window of exploitation. Even if stolen, the token expires quickly. Rotation invalidates old refresh tokens on use, detecting theft." },
        { q: "During forensic analysis, you find session tokens were stolen 6 hours before account takeover. What does this indicate?", options: ["The attacker was testing the tokens", "The attacker was waiting for high-value activity or selling the tokens", "The tokens were invalid initially", "The attack was automated"], correct: 1, explanation: "A delay between theft and use suggests deliberate timing — waiting for financial transactions, selling tokens on dark web markets, or selecting the highest-value targets from a batch." },
        { q: "What is the most effective server-side control against session hijacking?", options: ["Longer session tokens", "Binding sessions to IP address and User-Agent with anomaly detection", "Requiring password re-entry every hour", "Using cookies with Secure flag only"], correct: 1, explanation: "Binding sessions to device fingerprints and detecting anomalies (sudden location change, different UA) allows real-time session invalidation upon suspicious activity." },
      ],
    },
    ethicsQuestion: {
      q: "You identify all 31 victims. Your company policy says to notify them but legal says it may expose the company to liability. What do you do?",
      options: [
        { label: "Notify all victims immediately regardless of legal advice.", outcome: "Ethical but potentially legally complex. Victims can protect themselves.", points: 45 },
        { label: "Follow legal guidance and delay notification.", outcome: "Legally safer but victims remain at risk during the delay. Ethically questionable.", points: 20 },
        { label: "Notify victims anonymously without company attribution.", outcome: "Creative but may cause confusion and is not a sustainable practice.", points: 25 },
        { label: "Escalate to senior leadership with a clear ethical recommendation to notify.", outcome: "Best practice. You advocate for victims while respecting organizational process.", points: 50 },
      ]
    },
    xp: { beginner: 100, intermediate: 150, advanced: 250 }
  },

  "009": {
    id: "009",
    title: "Google Meet Job Scam",
    type: "PLATFORM ABUSE",
    severity: "critical",
    overview: `A sophisticated threat group operated a fake recruitment agency across LinkedIn, Indeed, and WhatsApp. Targets received personalized messages referencing their actual skills and work history — gathered from public profiles. After initial conversation, victims were invited to a Google Meet interview with professional-looking fake recruiters using deepfake video. During the technical assessment phase, victims were asked to share their screen and install a "coding environment" tool that was actually a Remote Access Trojan (RAT). The malware established persistence, exfiltrated credentials, and enrolled the attacker's device in MFA — locking the victim out of their own accounts.`,
    clues: [
      { word: "deepfake video", info: "Deepfake technology uses AI to generate realistic video of a person saying or doing things they never did. Attackers now use real-time deepfake tools during video calls to impersonate legitimate recruiters, celebrities, or executives — making video verification unreliable." },
      { word: "Remote Access Trojan", info: "A RAT is malware that gives attackers full remote control of the infected device. Once installed, attackers can see your screen, capture keystrokes, access files, activate your camera, and use your device as a pivot point into corporate networks." },
      { word: "enrolled the attacker's device in MFA", info: "If an attacker has temporary access to your account, they can add their own phone number or authenticator app as an MFA device. This locks you out while giving them permanent authenticated access — even after you change your password." },
    ],
    quiz: {
      beginner: [
        { q: "What is a red flag during an online job interview?", options: ["The interviewer asks about your experience", "You are asked to install software or share your screen", "The interview is conducted via video call", "The job pays well"], correct: 1, explanation: "Legitimate employers never need you to install software or share your screen during an interview. Any such request is a major red flag indicating potential malware delivery." },
        { q: "How can you verify a recruiter is legitimate?", options: ["They have a LinkedIn profile", "They contact you first", "Verify via the company's official website and call the official HR number", "They offer a high salary"], correct: 2, explanation: "Always verify independently. Look up the company's official contact details and reach out directly — not via numbers or links provided by the recruiter." },
        { q: "What should you do if you accidentally installed software from a fake recruiter?", options: ["Uninstall it and hope for the best", "Disconnect from internet, run antivirus, change all passwords from a different device, enable MFA", "Restart your computer", "Contact the recruiter to ask what it was"], correct: 1, explanation: "Assume full compromise. Disconnect immediately to stop data exfiltration. Change credentials from a clean device. Contact your bank and employer." },
      ],
      intermediate: [
        { q: "What technique did attackers use to make the interview seem real?", options: ["Voice changers", "Real-time deepfake video", "Professional email addresses", "Fake company websites"], correct: 1, explanation: "Real-time deepfake tools can superimpose a realistic face over the attacker's face during a live video call, making it appear you are speaking with a legitimate person." },
        { q: "How did the RAT maintain access even after discovery?", options: ["It encrypted the hard drive", "It enrolled the attacker's MFA device to the victim's accounts", "It changed the admin password", "It disabled Windows Defender"], correct: 1, explanation: "By adding their own MFA device, attackers ensure continued access even after password changes. Victims must check and remove all authorized MFA devices during incident response." },
        { q: "What is the most important thing to check on your accounts after a suspected RAT infection?", options: ["Login history", "All authorized MFA devices and active sessions", "Email filters", "Account privacy settings"], correct: 1, explanation: "Attackers add their devices to MFA and create persistent sessions. Auditing and revoking all authorized devices and active sessions is the critical first response step." },
      ],
      advanced: [
        { q: "How would you detect a deepfake during a video call?", options: ["Ask them to smile", "Look for unnatural blinking, edge artifacts around hair, lighting inconsistencies, and ask them to turn sideways", "Check their internet connection quality", "Ask them to show their ID"], correct: 1, explanation: "Current deepfakes struggle with profile views, hair edges, and sudden lighting changes. Ask the person to turn to the side or move near a window. Artifacts become visible under scrutiny." },
        { q: "A RAT is detected. What is the correct order of incident response?", options: ["Notify HR → Remove malware → Change passwords → Assess damage", "Isolate device → Preserve forensic image → Remove malware → Change credentials from clean device → Assess blast radius", "Remove malware → Change passwords → Notify IT → Continue working", "Change passwords → Run antivirus → Resume work"], correct: 1, explanation: "Isolation preserves evidence and stops exfiltration. Forensic imaging before remediation allows investigation. Clean credentials ensure the attacker's access is revoked." },
        { q: "The attacker used LinkedIn data to personalize their approach. What is this technique called?", options: ["Social engineering via OSINT", "Spear phishing using open-source intelligence", "Watering hole attack", "Business email compromise"], correct: 1, explanation: "Spear phishing uses OSINT — publicly available information — to create highly personalized, convincing lures. LinkedIn, Twitter, and company websites are primary intelligence sources for attackers." },
      ],
    },
    ethicsQuestion: {
      q: "You discover 200 people were targeted by this scam. You can identify the attackers but exposing them publicly may tip them off before law enforcement acts. What do you do?",
      options: [
        { label: "Post everything publicly to warn potential victims immediately.", outcome: "Victims warned but attackers alerted. They disappear. No prosecution possible.", points: 20 },
        { label: "Report to law enforcement only and wait for their guidance.", outcome: "Correct process. Coordinated action maximizes victim protection and prosecution chances.", points: 50 },
        { label: "Warn potential victims privately without revealing attacker identity.", outcome: "Good balance. Victims protected without tipping off attackers.", points: 40 },
        { label: "Do nothing — it is not your responsibility.", outcome: "200 more people get scammed. Inaction when you have the power to help is its own ethical failure.", points: 0 },
      ]
    },
    xp: { beginner: 100, intermediate: 150, advanced: 230 }
  },

  "010": {
    id: "010",
    title: "Google Meet Romance Extortion",
    type: "CYBER HARASSMENT",
    severity: "critical",
    overview: `Operation Heartbreak was a 6-month investigation into a transnational cybercrime ring operating romantic extortion schemes via Google Meet. Attackers created elaborate fake personas — using stolen photos, fabricated backstories, and AI-generated voice notes — to build genuine emotional connections with victims over weeks. Once trust was established, victims were invited to private Google Meet calls where intimate content was shared. This content was immediately recorded and used for extortion, demanding payments of $500-$10,000 in cryptocurrency. Victims who refused faced threats of exposure to employers and family. The ring operated from three countries and victimized over 800 people across 14 nations.`,
    clues: [
      { word: "fabricated backstories", info: "Romance scammers invest weeks building trust using detailed fake identities. They research targets to personalize conversations, create fake social media histories, and use AI tools to generate consistent personas. This emotional investment makes victims less likely to question inconsistencies." },
      { word: "AI-generated voice notes", info: "Modern AI voice cloning can replicate a person's voice from just 3 seconds of audio. Scammers use this to send voice messages that seem personal and real, further solidifying the fake relationship and bypassing the victim's suspicion." },
      { word: "cryptocurrency", info: "Cryptocurrency is demanded because transactions are pseudonymous, irreversible, and cross-border. Unlike bank transfers, crypto payments cannot be easily frozen, reversed, or traced back to a recipient — making it the preferred payment method for cybercriminals." },
    ],
    quiz: {
      beginner: [
        { q: "What is sextortion?", options: ["A type of computer virus", "Blackmail using intimate content as leverage to demand money", "A phishing email technique", "Identity theft via social media"], correct: 1, explanation: "Sextortion is when someone threatens to share intimate images or videos unless demands — usually money — are met. It is a serious crime in most countries." },
        { q: "If someone you met online asks to move your conversation to Google Meet, what should you do?", options: ["Agree — video calls confirm they are real", "Be cautious. Verify their identity through other means first", "Share your personal details to build trust", "Send them money to show you are serious"], correct: 1, explanation: "Moving to video does not guarantee authenticity — deepfakes and screen recordings can be used. Verify identity through mutual connections or official channels before sharing anything personal." },
        { q: "What should a victim of sextortion do?", options: ["Pay the demanded amount to make it stop", "Do not pay. Report to police, platform, and a trusted person immediately", "Delete all evidence", "Block the attacker and hope they forget"], correct: 1, explanation: "Paying does not guarantee the content will be deleted — it signals you will pay again. Report to law enforcement, the platform, and organizations like the Cyber Civil Rights Initiative." },
      ],
      intermediate: [
        { q: "Why do romance scammers take weeks to build a relationship before attempting extortion?", options: ["They are genuinely interested in the victim", "Trust reduces the victim's critical thinking and increases compliance and shame", "They need time to create fake accounts", "Legal requirements prevent immediate action"], correct: 1, explanation: "Psychological manipulation relies on emotional investment. The longer the relationship, the more shame, confusion, and attachment the victim feels — making them more likely to comply and less likely to report." },
        { q: "What makes cryptocurrency ideal for extortion payments?", options: ["It is legal everywhere", "It is fast, irreversible, pseudonymous, and cross-border", "Banks accept it easily", "It can be refunded if fraud occurs"], correct: 1, explanation: "Crypto transactions cannot be reversed by a bank, are difficult to trace to a real person, can be sent across borders instantly, and can be quickly converted or tumbled to hide the trail." },
        { q: "How can you verify someone's identity during a video call?", options: ["Ask them their name", "Request they write a specific word on paper and hold it up, or ask them to perform an unexpected action", "Check their profile picture matches", "Ask them personal questions"], correct: 1, explanation: "Deepfakes struggle with unexpected requests and objects. Asking someone to hold up a specific written word, make a sudden movement, or change lighting on command can reveal AI-generated video." },
      ],
      advanced: [
        { q: "What legal charge applies when intimate content is shared without consent as blackmail?", options: ["Fraud only", "Non-consensual intimate image sharing — criminal in 48 US states and multiple countries", "Civil defamation only", "Breach of privacy contract"], correct: 1, explanation: "Most jurisdictions now criminalize non-consensual intimate image sharing (revenge porn) with additional charges for blackmail and extortion. Victims have legal recourse beyond civil remedies." },
        { q: "How would a threat intelligence analyst attribute this crime ring across three countries?", options: ["By the cryptocurrency wallet addresses only", "By correlating metadata, linguistic patterns, operational timing, infrastructure overlap, and cryptocurrency transaction clustering", "By asking Google for user data", "By IP address geolocation alone"], correct: 1, explanation: "Attribution requires correlation of multiple signals. No single indicator is sufficient. Operational patterns, linguistic analysis (grammar, idioms), infrastructure reuse, and blockchain analysis together build a picture." },
        { q: "A victim paid $3000 and the attacker demands more. What is the correct professional advice?", options: ["Pay once more to resolve it", "Stop all payments. The content may be published anyway. Paying funds continued harassment and signals vulnerability.", "Negotiate a lower amount", "Delete all communication evidence"], correct: 1, explanation: "Payment rarely ends the extortion — it confirms the victim will pay. The content may be published regardless. Preserve all evidence for law enforcement and stop contact with the attacker." },
      ],
    },
    ethicsQuestion: {
      q: "A victim asks you not to report the incident to police because they are ashamed. You have evidence that could stop the ring. What do you do?",
      options: [
        { label: "Respect their wishes completely. Consent matters above all.", outcome: "The victim's autonomy is respected but 800+ others remain at risk. The ring continues.", points: 25 },
        { label: "Report anyway without telling them.", outcome: "May help others but violates the victim's trust and autonomy. Legally complex in many jurisdictions.", points: 20 },
        { label: "Explain the impact, provide support resources, and give them time to reconsider while preserving evidence.", outcome: "Excellent. You respect autonomy while ensuring informed decision-making and preserving options.", points: 50 },
        { label: "Report only the technical indicators without victim-identifying information.", outcome: "Good balance. Law enforcement is informed. Victim identity is protected. Investigation can begin.", points: 45 },
      ]
    },
    xp: { beginner: 110, intermediate: 160, advanced: 240 }
  },
};

type Difficulty = "beginner" | "intermediate" | "advanced";
type Phase = "difficulty" | "evidence" | "quiz" | "ethics" | "verdict";

export default function CasePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const caseData = allCases[id];

  const [phase, setPhase] = useState<Phase>("difficulty");
  const [difficulty, setDifficulty] = useState<Difficulty>("beginner");
  const [foundClues, setFoundClues] = useState<Set<number>>(new Set());
  const [activeClue, setActiveClue] = useState<number | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [ethicsAnswer, setEthicsAnswer] = useState<number | null>(null);
  const [totalXp, setTotalXp] = useState(0);
  const [ethicsXp, setEthicsXp] = useState(0);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
  }, [status, router]);

  if (!caseData) {
    return (
      <div style={{
        minHeight: "100vh", background: "#050000",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        fontFamily: "'Exo 2', sans-serif", color: "white", gap: 20
      }}>
        <div style={{ color: "#ff003c", fontSize: 48, fontWeight: 900 }}>404</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 18 }}>Case file not found</div>
        <button onClick={() => router.push("/dashboard")}
          style={{
            background: "transparent", border: "1px solid rgba(255,0,60,0.35)",
            color: "#ff003c", padding: "12px 24px", borderRadius: 8,
            fontSize: 15, cursor: "pointer", fontFamily: "'Exo 2', sans-serif"
          }}>
          ← Return to Base
        </button>
      </div>
    );
  }

  const severityColor: Record<string, string> = {
    critical: "#ff003c", high: "#ff4500", medium: "#ff8c00", low: "#ffd700"
  };
  const sc = severityColor[caseData.severity];

  const quiz = caseData.quiz[difficulty];

  function handleClueClick(i: number) {
    setActiveClue(i);
    setFoundClues(prev => new Set([...prev, i]));
  }

  function handleQuizAnswer(qIdx: number, optIdx: number) {
    if (qIdx in quizAnswers) return;
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  }

  function handleEthicsAnswer(optIdx: number) {
    if (ethicsAnswer !== null) return;
    setEthicsAnswer(optIdx);
    setEthicsXp(caseData.ethicsQuestion.options[optIdx].points);
  }

  function proceedToQuiz() {
    if (foundClues.size < caseData.clues.length) return;
    setPhase("quiz");
  }

  function proceedToEthics() {
    if (Object.keys(quizAnswers).length < quiz.length) return;
    const correct = quiz.filter((q, i) => quizAnswers[i] === q.correct).length;
    const earned = Math.round((correct / quiz.length) * caseData.xp[difficulty]);
    setTotalXp(earned);
    setPhase("ethics");
  }

  function proceedToVerdict() {
    if (ethicsAnswer === null) return;
    setPhase("verdict");
  }

  function renderTextWithClues(text: string) {
    let parts: (string | JSX.Element)[] = [text];
    caseData.clues.forEach((clue, i) => {
      parts = parts.flatMap(part => {
        if (typeof part !== "string") return [part];
        const segments = part.split(clue.word);
        return segments.flatMap((seg, j) =>
          j < segments.length - 1
            ? [seg, (
              <motion.span
                key={`${i}-${j}`}
                onClick={() => handleClueClick(i)}
                whileHover={{ scale: 1.05 }}
                style={{
                  color: foundClues.has(i) ? "#00e5ff" : "#ff8c00",
                  borderBottom: `2px solid ${foundClues.has(i) ? "#00e5ff" : "#ff8c00"}`,
                  cursor: "pointer",
                  padding: "0 2px",
                  background: foundClues.has(i) ? "rgba(0,229,255,0.08)" : "rgba(255,140,0,0.08)",
                  borderRadius: 3,
                  fontWeight: 700,
                }}>
                {clue.word}
              </motion.span>
            )]
            : [seg]
        );
      });
    });
    return parts;
  }

  return (
    <div style={{
      minHeight: "100vh", background: "#050000",
      color: "white", fontFamily: "'Exo 2', sans-serif",
      position: "relative"
    }}>

      {/* GRID */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(139,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,0,0,0.04) 1px, transparent 1px)`,
        backgroundSize: "50px 50px"
      }} />

      {/* NAVBAR */}
      <nav style={{
        position: "relative", zIndex: 30,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "18px 40px",
        borderBottom: "1px solid rgba(139,0,0,0.3)",
        background: "rgba(3,0,0,0.98)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/dashboard")}
            style={{
              background: "transparent", border: "1px solid rgba(180,0,0,0.3)",
              color: "rgba(255,100,100,0.7)", padding: "8px 16px",
              borderRadius: 6, fontSize: 14, cursor: "pointer",
              fontFamily: "'Exo 2', sans-serif", fontWeight: 600,
              letterSpacing: "0.1em"
            }}>
            ← BASE
          </motion.button>
          <span style={{ color: "rgba(180,0,0,0.4)", fontSize: 14 }}>
            CASE #{caseData.id}
          </span>
        </div>

        <span style={{
          fontWeight: 800, fontSize: 20, color: "white",
          fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.15em"
        }}>
          CYBER<span style={{ color: "#cc0000" }}>INTEL</span>
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: sc, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em" }}>
            {caseData.type}
          </span>
          <img src={session?.user?.image || ""} alt="avatar"
            style={{ width: 36, height: 36, borderRadius: "50%", border: `2px solid ${sc}60` }} />
        </div>
      </nav>

      {/* PHASE INDICATOR */}
      <div style={{
        position: "relative", zIndex: 20,
        padding: "16px 40px",
        borderBottom: "1px solid rgba(139,0,0,0.15)",
        background: "rgba(8,0,0,0.9)",
        display: "flex", alignItems: "center", gap: 8
      }}>
        {[
          { key: "difficulty", label: "01 DIFFICULTY" },
          { key: "evidence", label: "02 EVIDENCE" },
          { key: "quiz", label: "03 QUIZ" },
          { key: "ethics", label: "04 ETHICS" },
          { key: "verdict", label: "05 VERDICT" },
        ].map((p, i, arr) => {
          const phases: Phase[] = ["difficulty", "evidence", "quiz", "ethics", "verdict"];
          const currentIdx = phases.indexOf(phase);
          const phaseIdx = phases.indexOf(p.key as Phase);
          const isDone = phaseIdx < currentIdx;
          const isActive = p.key === phase;
          return (
            <div key={p.key} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{
                fontSize: 12, fontWeight: 700, letterSpacing: "0.15em",
                color: isActive ? sc : isDone ? "rgba(0,229,255,0.6)" : "rgba(180,0,0,0.25)",
                fontFamily: "'Share Tech Mono', monospace"
              }}>
                {isDone ? "✓ " : ""}{p.label}
              </span>
              {i < arr.length - 1 && (
                <span style={{ color: "rgba(180,0,0,0.2)", fontSize: 12 }}>──</span>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ position: "relative", zIndex: 20, maxWidth: 900, margin: "0 auto", padding: "40px" }}>
        <AnimatePresence mode="wait">

          {/* PHASE 1 — DIFFICULTY */}
          {phase === "difficulty" && (
            <motion.div key="difficulty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}>

              <div style={{ marginBottom: 32 }}>
                <div style={{
                  color: "rgba(180,0,0,0.5)", fontSize: 13,
                  letterSpacing: "0.4em", marginBottom: 10,
                  fontFamily: "'Share Tech Mono', monospace"
                }}>
                  CASE FILE #{caseData.id}
                </div>
                <h1 style={{
                  fontSize: 36, fontWeight: 900, color: "white",
                  fontFamily: "'Rajdhani', sans-serif",
                  letterSpacing: "0.1em", marginBottom: 8,
                  textShadow: `0 0 30px ${sc}25`
                }}>
                  {caseData.title}
                </h1>
                <span style={{
                  fontSize: 13, padding: "5px 14px", borderRadius: 4,
                  color: sc, background: `${sc}12`,
                  border: `1px solid ${sc}30`, fontWeight: 700,
                  letterSpacing: "0.1em"
                }}>
                  {caseData.type}
                </span>
              </div>

              <div style={{ marginBottom: 40 }}>
                <div style={{
                  fontSize: 14, letterSpacing: "0.3em", fontWeight: 700,
                  color: "rgba(180,0,0,0.5)", marginBottom: 20,
                  fontFamily: "'Share Tech Mono', monospace"
                }}>
                  SELECT INVESTIGATION DIFFICULTY
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                  {([
                    { key: "beginner", label: "RECRUIT", desc: "Core concepts. No prior knowledge needed.", color: "#ff8c00", xp: caseData.xp.beginner },
                    { key: "intermediate", label: "ANALYST", desc: "Technical depth. Some security knowledge helpful.", color: "#ff4500", xp: caseData.xp.intermediate },
                    { key: "advanced", label: "SPECIALIST", desc: "Expert level. Deep technical and tactical knowledge.", color: "#ff003c", xp: caseData.xp.advanced },
                  ] as const).map(d => (
                    <motion.div key={d.key}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setDifficulty(d.key)}
                      style={{
                        padding: "24px 20px", borderRadius: 12, cursor: "pointer",
                        background: difficulty === d.key ? `${d.color}12` : "rgba(10,0,0,0.85)",
                        border: `2px solid ${difficulty === d.key ? d.color : "rgba(100,0,0,0.2)"}`,
                        textAlign: "center", transition: "all 0.2s"
                      }}>
                      <div style={{
                        fontSize: 20, fontWeight: 900, color: d.color,
                        fontFamily: "'Rajdhani', sans-serif",
                        letterSpacing: "0.15em", marginBottom: 8
                      }}>
                        {d.label}
                      </div>
                      <div style={{
                        fontSize: 13, color: "rgba(255,200,200,0.55)",
                        lineHeight: 1.6, marginBottom: 14
                      }}>
                        {d.desc}
                      </div>
                      <div style={{
                        fontSize: 15, fontWeight: 700, color: d.color,
                        fontFamily: "'Share Tech Mono', monospace"
                      }}>
                        UP TO {d.xp} XP
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setPhase("evidence")}
                style={{
                  background: `${sc}15`, border: `2px solid ${sc}50`,
                  color: sc, padding: "16px 40px", borderRadius: 10,
                  fontSize: 17, fontWeight: 800, cursor: "pointer",
                  fontFamily: "'Rajdhani', sans-serif",
                  letterSpacing: "0.2em"
                }}>
                BEGIN INVESTIGATION →
              </motion.button>
            </motion.div>
          )}

          {/* PHASE 2 — EVIDENCE HUNT */}
          {phase === "evidence" && (
            <motion.div key="evidence"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}>

              <div style={{ marginBottom: 24 }}>
                <div style={{
                  color: "rgba(180,0,0,0.5)", fontSize: 13,
                  letterSpacing: "0.4em", marginBottom: 8,
                  fontFamily: "'Share Tech Mono', monospace"
                }}>
                  PHASE 02 — EVIDENCE HUNT
                </div>
                <h2 style={{
                  fontSize: 28, fontWeight: 900, color: "white",
                  fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.1em"
                }}>
                  {caseData.title}
                </h2>
              </div>

              {/* CLUE PROGRESS */}
              <div style={{
                display: "flex", alignItems: "center", gap: 12,
                marginBottom: 24, padding: "14px 20px", borderRadius: 8,
                background: "rgba(10,0,0,0.8)",
                border: "1px solid rgba(139,0,0,0.2)"
              }}>
                <span style={{
                  fontSize: 14, color: "rgba(255,140,0,0.8)", fontWeight: 700,
                  fontFamily: "'Share Tech Mono', monospace"
                }}>
                  EVIDENCE:
                </span>
                {caseData.clues.map((_, i) => (
                  <div key={i} style={{
                    width: 36, height: 36, borderRadius: 6,
                    background: foundClues.has(i) ? "rgba(0,229,255,0.15)" : "rgba(180,0,0,0.1)",
                    border: `2px solid ${foundClues.has(i) ? "#00e5ff" : "rgba(180,0,0,0.3)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16, color: foundClues.has(i) ? "#00e5ff" : "rgba(180,0,0,0.3)",
                    transition: "all 0.3s"
                  }}>
                    {foundClues.has(i) ? "✓" : "?"}
                  </div>
                ))}
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginLeft: 8 }}>
                  {foundClues.size}/{caseData.clues.length} clues found — click highlighted words in the dossier
                </span>
              </div>

              {/* CASE DOSSIER */}
              <div style={{
                padding: "28px 32px", borderRadius: 12, marginBottom: 24,
                background: "rgba(10,0,0,0.85)",
                border: `1px solid ${sc}25`,
                lineHeight: 1.95, fontSize: 16,
                color: "rgba(255,230,230,0.75)"
              }}>
                <div style={{
                  fontSize: 12, letterSpacing: "0.3em", fontWeight: 700,
                  color: "rgba(180,0,0,0.45)", marginBottom: 16,
                  fontFamily: "'Share Tech Mono', monospace"
                }}>
                  CASE DOSSIER // CLASSIFIED
                </div>
                <div>{renderTextWithClues(caseData.overview)}</div>
              </div>

              {/* CLUE POPUP */}
              <AnimatePresence>
                {activeClue !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    style={{
                      padding: "22px 28px", borderRadius: 12, marginBottom: 24,
                      background: "rgba(0,20,30,0.95)",
                      border: "2px solid rgba(0,229,255,0.35)",
                      boxShadow: "0 0 30px rgba(0,229,255,0.08)"
                    }}>
                    <div style={{
                      fontSize: 12, letterSpacing: "0.3em", fontWeight: 700,
                      color: "rgba(0,229,255,0.6)", marginBottom: 10,
                      fontFamily: "'Share Tech Mono', monospace"
                    }}>
                      ⟐ INTEL RECOVERED
                    </div>
                    <div style={{
                      fontSize: 15, color: "#00e5ff", fontWeight: 700,
                      marginBottom: 10, fontFamily: "'Rajdhani', sans-serif",
                      letterSpacing: "0.05em"
                    }}>
                      {caseData.clues[activeClue].word.toUpperCase()}
                    </div>
                    <div style={{
                      fontSize: 15, color: "rgba(200,240,255,0.8)", lineHeight: 1.75
                    }}>
                      {caseData.clues[activeClue].info}
                    </div>
                    <button onClick={() => setActiveClue(null)}
                      style={{
                        marginTop: 14, background: "transparent",
                        border: "1px solid rgba(0,229,255,0.2)",
                        color: "rgba(0,229,255,0.5)", padding: "7px 16px",
                        borderRadius: 6, fontSize: 13, cursor: "pointer",
                        fontFamily: "'Exo 2', sans-serif"
                      }}>
                      CLOSE
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={foundClues.size >= caseData.clues.length ? { scale: 1.03 } : {}}
                whileTap={foundClues.size >= caseData.clues.length ? { scale: 0.97 } : {}}
                onClick={proceedToQuiz}
                style={{
                  background: foundClues.size >= caseData.clues.length ? `${sc}15` : "rgba(30,0,0,0.5)",
                  border: `2px solid ${foundClues.size >= caseData.clues.length ? sc + "50" : "rgba(100,0,0,0.2)"}`,
                  color: foundClues.size >= caseData.clues.length ? sc : "rgba(180,0,0,0.25)",
                  padding: "16px 40px", borderRadius: 10,
                  fontSize: 17, fontWeight: 800, cursor: foundClues.size >= caseData.clues.length ? "pointer" : "not-allowed",
                  fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.2em",
                  transition: "all 0.3s"
                }}>
                {foundClues.size >= caseData.clues.length
                  ? "PROCEED TO INTERROGATION →"
                  : `FIND ALL CLUES FIRST (${foundClues.size}/${caseData.clues.length})`}
              </motion.button>
            </motion.div>
          )}

          {/* PHASE 3 — QUIZ */}
          {phase === "quiz" && (
            <motion.div key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}>

              <div style={{ marginBottom: 28 }}>
                <div style={{
                  color: "rgba(180,0,0,0.5)", fontSize: 13,
                  letterSpacing: "0.4em", marginBottom: 8,
                  fontFamily: "'Share Tech Mono', monospace"
                }}>
                  PHASE 03 — INTERROGATION // {difficulty.toUpperCase()} LEVEL
                </div>
                <h2 style={{
                  fontSize: 28, fontWeight: 900, color: "white",
                  fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.1em"
                }}>
                  {caseData.title}
                </h2>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {quiz.map((q, qi) => {
                  const answered = qi in quizAnswers;
                  const chosen = quizAnswers[qi];
                  return (
                    <motion.div key={qi}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: qi * 0.1 }}
                      style={{
                        borderRadius: 12, overflow: "hidden",
                        border: "1px solid rgba(139,0,0,0.25)",
                        background: "rgba(8,0,0,0.85)"
                      }}>

                      <div style={{
                        padding: "20px 24px",
                        background: "rgba(15,0,0,0.9)",
                        borderBottom: "1px solid rgba(139,0,0,0.15)"
                      }}>
                        <div style={{
                          fontSize: 12, letterSpacing: "0.3em", color: "rgba(180,0,0,0.45)",
                          marginBottom: 8, fontFamily: "'Share Tech Mono', monospace", fontWeight: 700
                        }}>
                          QUESTION {qi + 1} OF {quiz.length}
                        </div>
                        <div style={{ fontSize: 17, color: "white", lineHeight: 1.6, fontWeight: 600 }}>
                          {q.q}
                        </div>
                      </div>

                      <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
                        {q.options.map((opt, oi) => {
                          const isChosen = answered && chosen === oi;
                          const isCorrect = oi === q.correct;
                          const showResult = answered;
                          return (
                            <motion.button key={oi}
                              whileHover={!answered ? { x: 5 } : {}}
                              disabled={answered}
                              onClick={() => handleQuizAnswer(qi, oi)}
                              style={{
                                width: "100%", textAlign: "left",
                                padding: "14px 18px", borderRadius: 8,
                                background: showResult
                                  ? isCorrect ? "rgba(0,80,0,0.2)"
                                  : isChosen ? "rgba(180,0,0,0.18)" : "rgba(10,0,0,0.6)"
                                  : "rgba(10,0,0,0.7)",
                                border: showResult
                                  ? isCorrect ? "1px solid rgba(0,200,0,0.4)"
                                  : isChosen ? "1px solid rgba(255,0,60,0.4)" : "1px solid rgba(80,0,0,0.2)"
                                  : "1px solid rgba(100,0,0,0.22)",
                                cursor: answered ? "default" : "pointer",
                                fontFamily: "'Exo 2', sans-serif",
                                transition: "all 0.2s"
                              }}>
                              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                                <span style={{
                                  color: showResult
                                    ? isCorrect ? "rgba(0,220,0,0.7)" : isChosen ? "#ff003c" : "rgba(180,0,0,0.3)"
                                    : "rgba(180,0,0,0.4)",
                                  fontSize: 14, fontWeight: 800, flexShrink: 0
                                }}>
                                  {String.fromCharCode(65 + oi)}.
                                </span>
                                <div style={{ flex: 1 }}>
                                  <div style={{
                                    fontSize: 15, color: "rgba(255,255,255,0.82)",
                                    lineHeight: 1.55, fontWeight: 500
                                  }}>
                                    {opt}
                                  </div>
                                  {showResult && isCorrect && (
                                    <motion.div
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      style={{
                                        marginTop: 8, fontSize: 13,
                                        color: "rgba(0,220,120,0.8)", lineHeight: 1.6
                                      }}>
                                      ✓ {q.explanation}
                                    </motion.div>
                                  )}
                                </div>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.button
                whileHover={Object.keys(quizAnswers).length >= quiz.length ? { scale: 1.03 } : {}}
                onClick={proceedToEthics}
                style={{
                  marginTop: 28,
                  background: Object.keys(quizAnswers).length >= quiz.length ? `${sc}15` : "rgba(30,0,0,0.5)",
                  border: `2px solid ${Object.keys(quizAnswers).length >= quiz.length ? sc + "50" : "rgba(100,0,0,0.2)"}`,
                  color: Object.keys(quizAnswers).length >= quiz.length ? sc : "rgba(180,0,0,0.25)",
                  padding: "16px 40px", borderRadius: 10,
                  fontSize: 17, fontWeight: 800,
                  cursor: Object.keys(quizAnswers).length >= quiz.length ? "pointer" : "not-allowed",
                  fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.2em",
                  transition: "all 0.3s"
                }}>
                {Object.keys(quizAnswers).length >= quiz.length
                  ? "PROCEED TO ETHICS BOARD →"
                  : `ANSWER ALL QUESTIONS (${Object.keys(quizAnswers).length}/${quiz.length})`}
              </motion.button>
            </motion.div>
          )}

          {/* PHASE 4 — ETHICS */}
          {phase === "ethics" && (
            <motion.div key="ethics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}>

              <div style={{ marginBottom: 28 }}>
                <div style={{
                  color: "rgba(180,0,0,0.5)", fontSize: 13,
                  letterSpacing: "0.4em", marginBottom: 8,
                  fontFamily: "'Share Tech Mono', monospace"
                }}>
                  PHASE 04 — ETHICS BOARD
                </div>
                <h2 style={{
                  fontSize: 28, fontWeight: 900, color: "white",
                  fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.1em"
                }}>
                  MAKE YOUR DECISION
                </h2>
              </div>

              <div style={{
                borderRadius: 14, overflow: "hidden",
                border: "1px solid rgba(139,0,0,0.28)",
                background: "rgba(8,0,0,0.85)", marginBottom: 24
              }}>
                <div style={{
                  padding: "22px 28px",
                  background: "rgba(18,0,0,0.95)",
                  borderBottom: "1px solid rgba(139,0,0,0.18)"
                }}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 10, marginBottom: 10
                  }}>
                    <div style={{
                      width: 10, height: 10, borderRadius: "50%", background: "#cc0000"
                    }} />
                    <span style={{
                      color: "rgba(180,0,0,0.6)", fontSize: 13,
                      letterSpacing: "0.3em", fontWeight: 600,
                      fontFamily: "'Share Tech Mono', monospace"
                    }}>
                      ETHICAL DILEMMA
                    </span>
                  </div>
                  <div style={{
                    fontSize: 17, color: "white", lineHeight: 1.7, fontWeight: 600
                  }}>
                    {caseData.ethicsQuestion.q}
                  </div>
                </div>

                <div style={{ padding: "22px 28px", display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{
                    fontSize: 13, letterSpacing: "0.25em",
                    color: "rgba(180,0,0,0.5)", marginBottom: 10,
                    fontWeight: 600, fontFamily: "'Share Tech Mono', monospace"
                  }}>
                    {ethicsAnswer !== null ? "DECISION LOGGED" : "WHAT DO YOU DO?"}
                  </div>
                  {caseData.ethicsQuestion.options.map((opt, oi) => {
                    const isChosen = ethicsAnswer === oi;
                    const showResult = ethicsAnswer !== null;
                    const isBest = opt.points >= 45;
                    return (
                      <motion.button key={oi}
                        whileHover={ethicsAnswer === null ? { x: 6 } : {}}
                        disabled={ethicsAnswer !== null}
                        onClick={() => handleEthicsAnswer(oi)}
                        style={{
                          width: "100%", textAlign: "left",
                          padding: "16px 20px", borderRadius: 8,
                          background: isChosen
                            ? isBest ? "rgba(0,80,0,0.2)" : "rgba(180,0,0,0.15)"
                            : showResult && isBest ? "rgba(0,60,0,0.1)" : "rgba(12,0,0,0.7)",
                          border: isChosen
                            ? isBest ? "1px solid rgba(0,200,0,0.35)" : "1px solid rgba(255,0,60,0.35)"
                            : showResult && isBest ? "1px solid rgba(0,150,0,0.2)" : "1px solid rgba(100,0,0,0.22)",
                          cursor: ethicsAnswer !== null ? "default" : "pointer",
                          fontFamily: "'Exo 2', sans-serif", transition: "all 0.2s"
                        }}>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                          <span style={{
                            color: "rgba(180,0,0,0.5)", fontSize: 15,
                            fontWeight: 800, flexShrink: 0
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
                            {showResult && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{
                                  marginTop: 8, fontSize: 13, lineHeight: 1.5,
                                  color: isBest ? "rgba(0,220,120,0.8)" : "rgba(255,140,100,0.7)"
                                }}>
                                → {opt.outcome}
                              </motion.div>
                            )}
                          </div>
                          {showResult && (
                            <div style={{
                              flexShrink: 0, fontSize: 14, fontWeight: 700,
                              color: isChosen ? "#ff8c00" : "rgba(180,0,0,0.3)",
                              fontFamily: "'Share Tech Mono', monospace"
                            }}>
                              +{opt.points} ETH
                            </div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <motion.button
                whileHover={ethicsAnswer !== null ? { scale: 1.03 } : {}}
                onClick={proceedToVerdict}
                style={{
                  background: ethicsAnswer !== null ? `${sc}15` : "rgba(30,0,0,0.5)",
                  border: `2px solid ${ethicsAnswer !== null ? sc + "50" : "rgba(100,0,0,0.2)"}`,
                  color: ethicsAnswer !== null ? sc : "rgba(180,0,0,0.25)",
                  padding: "16px 40px", borderRadius: 10,
                  fontSize: 17, fontWeight: 800,
                  cursor: ethicsAnswer !== null ? "pointer" : "not-allowed",
                  fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.2em",
                  transition: "all 0.3s"
                }}>
                {ethicsAnswer !== null ? "VIEW VERDICT →" : "MAKE YOUR DECISION FIRST"}
              </motion.button>
            </motion.div>
          )}

          {/* PHASE 5 — VERDICT */}
          {phase === "verdict" && (
            <motion.div key="verdict"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}>

              <div style={{ textAlign: "center", marginBottom: 40 }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  style={{
                    fontSize: 64, marginBottom: 16
                  }}>
                  🗂️
                </motion.div>
                <div style={{
                  fontSize: 14, letterSpacing: "0.5em", color: "rgba(0,229,255,0.6)",
                  marginBottom: 10, fontFamily: "'Share Tech Mono', monospace"
                }}>
                  CASE CLOSED
                </div>
                <h1 style={{
                  fontSize: 40, fontWeight: 900, color: "white",
                  fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.1em",
                  marginBottom: 6
                }}>
                  {caseData.title}
                </h1>
                <div style={{
                  fontSize: 15, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em"
                }}>
                  INVESTIGATION COMPLETE // {difficulty.toUpperCase()} DIFFICULTY
                </div>
              </div>

              {/* SCORE BREAKDOWN */}
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 32
              }}>
                {[
                  {
                    label: "QUIZ SCORE",
                    val: `${quiz.filter((q, i) => quizAnswers[i] === q.correct).length}/${quiz.length}`,
                    sub: `${totalXp} XP EARNED`,
                    color: sc
                  },
                  {
                    label: "ETHICS SCORE",
                    val: `${ethicsXp}/50`,
                    sub: ethicsXp >= 45 ? "EXEMPLARY" : ethicsXp >= 25 ? "MODERATE" : "NEEDS REVIEW",
                    color: "#ff8c00"
                  },
                  {
                    label: "TOTAL EARNED",
                    val: totalXp + ethicsXp,
                    sub: "XP + ETHICS",
                    color: "#00e5ff"
                  },
                ].map((s, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    style={{
                      textAlign: "center", padding: "28px 20px", borderRadius: 12,
                      background: "rgba(8,0,0,0.9)",
                      border: `1px solid ${s.color}25`,
                      boxShadow: `0 0 25px ${s.color}08`
                    }}>
                    <div style={{
                      fontSize: 13, color: "rgba(220,120,120,0.5)",
                      letterSpacing: "0.2em", marginBottom: 10,
                      fontFamily: "'Share Tech Mono', monospace"
                    }}>
                      {s.label}
                    </div>
                    <div style={{
                      fontSize: 36, fontWeight: 900, color: s.color,
                      textShadow: `0 0 20px ${s.color}50`,
                      fontFamily: "'Rajdhani', sans-serif", marginBottom: 6
                    }}>
                      {s.val}
                    </div>
                    <div style={{ fontSize: 13, color: s.color, opacity: 0.6, fontWeight: 600 }}>
                      {s.sub}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CASE STAMP */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                style={{
                  padding: "22px 28px", borderRadius: 12, marginBottom: 32,
                  background: "rgba(0,20,10,0.7)",
                  border: "2px solid rgba(0,200,100,0.25)",
                  display: "flex", alignItems: "center", gap: 16
                }}>
                <div style={{ fontSize: 32 }}>✓</div>
                <div>
                  <div style={{
                    fontSize: 16, fontWeight: 800, color: "rgba(0,220,120,0.9)",
                    fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.1em", marginBottom: 4
                  }}>
                    CASE #{caseData.id} STAMPED AS INVESTIGATED
                  </div>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.45)" }}>
                    Your findings have been logged to your agent profile.
                  </div>
                </div>
              </motion.div>

              <div style={{ display: "flex", gap: 16 }}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => router.push("/dashboard")}
                  style={{
                    background: `${sc}15`, border: `2px solid ${sc}50`,
                    color: sc, padding: "16px 32px", borderRadius: 10,
                    fontSize: 16, fontWeight: 800, cursor: "pointer",
                    fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.15em"
                  }}>
                  ← RETURN TO BASE
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setPhase("difficulty");
                    setFoundClues(new Set());
                    setActiveClue(null);
                    setQuizAnswers({});
                    setEthicsAnswer(null);
                    setTotalXp(0);
                    setEthicsXp(0);
                  }}
                  style={{
                    background: "rgba(10,0,0,0.8)",
                    border: "1px solid rgba(139,0,0,0.3)",
                    color: "rgba(255,100,100,0.6)",
                    padding: "16px 32px", borderRadius: 10,
                    fontSize: 16, fontWeight: 700, cursor: "pointer",
                    fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.15em"
                  }}>
                  RETRY CASE
                </motion.button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}