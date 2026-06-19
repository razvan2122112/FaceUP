"use client";

import { useState } from "react";

/* ─── Inline SVG icons ──────────────────────────────────────────────── */
function IconCamera() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z"/>
      <circle cx="12" cy="13" r="3.5"/>
    </svg>
  );
}
function IconScan() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="6" width="12" height="12" rx="2.5"/>
      <path d="M9 1.5v3M15 1.5v3M9 19.5v3M15 19.5v3M1.5 9h3M1.5 15h3M19.5 9h3M19.5 15h3"/>
      <circle cx="12" cy="12" r="2.5"/>
    </svg>
  );
}
function IconProtocol() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-3"/>
      <rect x="9" y="2" width="6" height="4" rx="1"/>
      <path d="m8.5 13 2 2 4-4"/>
    </svg>
  );
}
function IconCheck({ color = "#60a5fa" }: { color?: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12 5 5 9-11"/>
    </svg>
  );
}
function IconCheckSm({ color = "#22c55e" }: { color?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12 5 5 9-11"/>
    </svg>
  );
}
function IconStar() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#22c55e">
      <path d="m12 2 2.4 4.8L20 7.6l-4 3.9.9 5.5L12 14.4 7.1 17l.9-5.5-4-3.9 5.6-.8z"/>
    </svg>
  );
}
function IconLock() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#52525b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}
function IconScanFace() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

/* ─── Brand logo mark (inline SVG) ────────────────────────────────────── */
function FaceUpLogo({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="4" width="36" height="56" rx="8" stroke="#3b82f6" strokeWidth="3" fill="none"/>
      <circle cx="32" cy="32" r="14" stroke="#60a5fa" strokeWidth="2.2" fill="none"/>
      <circle cx="25" cy="27" r="2" fill="#60a5fa"/>
      <circle cx="39" cy="27" r="2" fill="#60a5fa"/>
      <circle cx="32" cy="35" r="2" fill="#60a5fa"/>
      <line x1="25" y1="27" x2="32" y2="35" stroke="#3b82f6" strokeWidth="1.4" opacity="0.7"/>
      <line x1="39" y1="27" x2="32" y2="35" stroke="#3b82f6" strokeWidth="1.4" opacity="0.7"/>
      <line x1="18" y1="32" x2="46" y2="32" stroke="#93c5fd" strokeWidth="1" opacity="0.5"/>
    </svg>
  );
}

/* ─── Face scan visualization (phone screen visual) ───────────────────── */
function FaceScanVisual() {
  const DOTS: [number, number][] = [
    [130, 72], [104, 112], [156, 112], [130, 148],
    [112, 180], [148, 180], [86, 104], [174, 104],
    [78, 148], [182, 148], [130, 228],
    [100, 90], [160, 90], [115, 200], [145, 200],
  ];
  return (
    <svg viewBox="0 0 260 320" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
      <radialGradient id="faceglow" cx="50%" cy="45%" r="50%">
        <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.9"/>
        <stop offset="100%" stopColor="#04060c" stopOpacity="1"/>
      </radialGradient>
      <rect width="260" height="320" fill="url(#faceglow)"/>

      {[60,80,100,120,140,160,180,200,220,240,260].map(y => (
        <line key={`h${y}`} x1="20" y1={y} x2="240" y2={y} stroke="rgba(96,165,250,0.07)" strokeWidth="0.6"/>
      ))}
      {[40,80,120,160,200,240].map(x => (
        <line key={`v${x}`} x1={x} y1="20" x2={x} y2="300" stroke="rgba(96,165,250,0.07)" strokeWidth="0.6"/>
      ))}

      <path
        d="M130,26 C90,26 64,60 62,120 C60,182 86,266 130,296 C174,266 200,182 198,120 C196,60 170,26 130,26 Z"
        fill="rgba(59,130,246,0.06)" stroke="rgba(96,165,250,0.55)" strokeWidth="1.2"
      />

      <line x1="130" y1="26" x2="130" y2="296" stroke="rgba(96,165,250,0.22)" strokeWidth="0.8" strokeDasharray="3 4"/>
      <line x1="64" y1="104" x2="196" y2="104" stroke="rgba(96,165,250,0.18)" strokeWidth="0.8" strokeDasharray="3 4"/>
      <line x1="61" y1="180" x2="199" y2="180" stroke="rgba(96,165,250,0.18)" strokeWidth="0.8" strokeDasharray="3 4"/>

      <path d="M64,104 L56,104 L56,180 L64,180" stroke="rgba(96,165,250,0.4)" strokeWidth="0.9" fill="none"/>
      <path d="M196,104 L204,104 L204,180 L196,180" stroke="rgba(96,165,250,0.4)" strokeWidth="0.9" fill="none"/>

      <line x1="104" y1="112" x2="130" y2="148" stroke="rgba(59,130,246,0.35)" strokeWidth="0.9"/>
      <line x1="156" y1="112" x2="130" y2="148" stroke="rgba(59,130,246,0.35)" strokeWidth="0.9"/>
      <line x1="86" y1="104" x2="104" y2="112" stroke="rgba(59,130,246,0.25)" strokeWidth="0.8"/>
      <line x1="174" y1="104" x2="156" y2="112" stroke="rgba(59,130,246,0.25)" strokeWidth="0.8"/>
      <line x1="112" y1="180" x2="130" y2="228" stroke="rgba(59,130,246,0.3)" strokeWidth="0.8"/>
      <line x1="148" y1="180" x2="130" y2="228" stroke="rgba(59,130,246,0.3)" strokeWidth="0.8"/>

      {DOTS.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.2" fill="#60a5fa" opacity={0.75}
          style={{ animation: `pulse-dot ${1.4 + i * 0.15}s ease-in-out infinite` }}
        />
      ))}

      <ellipse cx="104" cy="104" rx="16" ry="9" fill="none" stroke="rgba(96,165,250,0.45)" strokeWidth="1"/>
      <ellipse cx="156" cy="104" rx="16" ry="9" fill="none" stroke="rgba(96,165,250,0.45)" strokeWidth="1"/>
      <circle cx="104" cy="104" r="4" fill="rgba(96,165,250,0.3)"/>
      <circle cx="156" cy="104" r="4" fill="rgba(96,165,250,0.3)"/>

      <path d="M130,130 C126,148 122,160 118,172 C122,176 138,176 142,172 C138,160 134,148 130,130" fill="none" stroke="rgba(96,165,250,0.3)" strokeWidth="0.9"/>

      <path d="M112,204 C118,200 124,198 130,200 C136,198 142,200 148,204 C142,212 118,212 112,204 Z" fill="none" stroke="rgba(96,165,250,0.4)" strokeWidth="0.9"/>

      <path d="M68,68 L68,80 M68,68 L80,68" stroke="rgba(96,165,250,0.6)" strokeWidth="1.5" fill="none"/>
      <path d="M192,68 L192,80 M192,68 L180,68" stroke="rgba(96,165,250,0.6)" strokeWidth="1.5" fill="none"/>
      <path d="M68,252 L68,240 M68,252 L80,252" stroke="rgba(96,165,250,0.6)" strokeWidth="1.5" fill="none"/>
      <path d="M192,252 L192,240 M192,252 L180,252" stroke="rgba(96,165,250,0.6)" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

/* ─── Analysis Demo Modal ──────────────────────────────────────────────── */
function AnalysisModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"upload" | "scanning" | "results">("upload");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoUrl(URL.createObjectURL(file));
  }

  function startAnalysis() {
    setStep("scanning");
    setTimeout(() => setStep("results"), 3200);
  }

  function useDemoFace() {
    setPhotoUrl(null);
    setStep("scanning");
    setTimeout(() => setStep("results"), 3200);
  }

  const SCAN_DOTS: [number, number][] = [
    [130,72],[104,112],[156,112],[130,148],[112,180],[148,180],
    [86,104],[174,104],[78,148],[182,148],[130,228],
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-5 animate-fadeup"
      style={{ background: "rgba(5,6,9,.82)", backdropFilter: "blur(8px)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[560px] max-h-[92vh] overflow-y-auto rounded-[26px]"
        style={{
          background: "linear-gradient(170deg,#13161d,#0b0d12)",
          border: "1px solid rgba(96,165,250,.22)",
          boxShadow: "0 40px 110px rgba(0,0,0,.7),0 0 70px rgba(59,130,246,.15)",
        }}
      >
        {/* modal header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-6 py-5"
          style={{
            borderBottom: "1px solid rgba(255,255,255,.07)",
            background: "rgba(15,18,24,.9)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[11px] tracking-[.1em] text-[#60a5fa]">FACEUP</span>
            <span className="text-[13px] text-[#71717a]">Free Analysis</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-[9px] flex items-center justify-center text-[#a1a1aa] text-base transition-colors hover:bg-white/10"
            style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)" }}
          >
            ✕
          </button>
        </div>

        {/* STEP: UPLOAD */}
        {step === "upload" && (
          <div className="px-7 py-8 animate-fadeup">
            <h2 className="text-2xl font-extrabold tracking-tight mb-2">Analyze your face free</h2>
            <p className="text-[14.5px] text-[#a1a1aa] mb-6">
              Upload a clear, front-facing photo — or run the demo to see how it works.
            </p>
            <label
              className="flex flex-col items-center justify-center gap-3 py-10 px-5 rounded-[18px] cursor-pointer text-center transition-colors hover:border-[rgba(96,165,250,.7)] hover:bg-[rgba(59,130,246,.1)]"
              style={{
                border: "1.5px dashed rgba(96,165,250,.4)",
                background: photoUrl ? "rgba(59,130,246,.1)" : "rgba(59,130,246,.05)",
              }}
            >
              {photoUrl ? (
                <>
                  <div
                    className="w-24 h-24 rounded-[14px]"
                    style={{
                      backgroundImage: `url(${photoUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      border: "1px solid rgba(96,165,250,.5)",
                      boxShadow: "0 0 22px rgba(59,130,246,.4)",
                    }}
                  />
                  <div className="text-sm font-semibold text-[#60a5fa]">Photo ready — analyze now</div>
                  <div className="text-xs text-[#71717a]">Tap to choose a different photo</div>
                </>
              ) : (
                <>
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(59,130,246,.12)", border: "1px solid rgba(59,130,246,.3)" }}
                  >
                    <IconCamera />
                  </div>
                  <div className="text-[15px] font-semibold">Upload or take a photo</div>
                  <div className="text-[12.5px] text-[#71717a]">3-angle capture for maximum precision · JPG or PNG</div>
                </>
              )}
              <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
            </label>

            <div className="flex flex-col gap-3 mt-6">
              {photoUrl && (
                <button
                  onClick={startAnalysis}
                  className="w-full py-4 rounded-[13px] font-bold text-base text-white transition-[filter] hover:brightness-110"
                  style={{ background: "#3b82f6", boxShadow: "0 8px 28px rgba(59,130,246,.45)" }}
                >
                  Analyze my face
                </button>
              )}
              <button
                onClick={useDemoFace}
                className="w-full py-3.5 rounded-[13px] font-semibold text-[14.5px] text-[#d4d4d8] transition-colors hover:bg-white/10"
                style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)" }}
              >
                Run demo with sample face
              </button>
            </div>

            <div className="flex items-center gap-2 justify-center mt-5 text-xs text-[#52525b]">
              <IconLock />
              Processed on-device for this demo · nothing is uploaded or stored
            </div>
          </div>
        )}

        {/* STEP: SCANNING */}
        {step === "scanning" && (
          <div className="px-7 py-8 animate-fadeup">
            <div
              className="relative w-[230px] h-[288px] mx-auto mb-7 rounded-[20px] overflow-hidden"
              style={{
                background: "radial-gradient(120% 80% at 50% 30%,#0e1828,#070a0f)",
                border: "1px solid rgba(96,165,250,.22)",
              }}
            >
              {photoUrl && (
                <>
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${photoUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      filter: "grayscale(.4) contrast(1.05) brightness(.85)",
                    }}
                  />
                  <div
                    className="absolute inset-0 mix-blend-overlay"
                    style={{ background: "linear-gradient(160deg,rgba(59,130,246,.35),rgba(8,12,20,.5))" }}
                  />
                </>
              )}
              <div
                className="absolute left-0 right-0 top-0 animate-scanmove"
                style={{
                  height: "46%",
                  background: "linear-gradient(to bottom,transparent,rgba(59,130,246,.08) 80%,rgba(96,165,250,.4))",
                  borderBottom: "2px solid rgba(147,197,253,.55)",
                  boxShadow: "0 0 22px rgba(59,130,246,.45)",
                }}
              />
              <svg viewBox="0 0 260 320" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" className="absolute inset-0">
                <path
                  d="M130,26 C90,26 64,60 62,120 C60,182 86,266 130,296 C174,266 200,182 198,120 C196,60 170,26 130,26 Z"
                  fill="none" stroke="rgba(96,165,250,0.5)" strokeWidth="1.1"
                />
                <line x1="130" y1="26" x2="130" y2="296" stroke="rgba(96,165,250,0.28)" strokeWidth="0.8" strokeDasharray="3 4"/>
                <line x1="66" y1="104" x2="194" y2="104" stroke="rgba(96,165,250,0.2)" strokeWidth="0.8" strokeDasharray="3 4"/>
                <line x1="62" y1="180" x2="198" y2="180" stroke="rgba(96,165,250,0.2)" strokeWidth="0.8" strokeDasharray="3 4"/>
                {SCAN_DOTS.map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="3" fill="#60a5fa" opacity={0.6}
                    style={{ animation: `pulse-dot ${1.2 + i * 0.18}s ease-in-out infinite` }}
                  />
                ))}
              </svg>
            </div>

            {["Mapping facial structure", "Measuring proportions", "Detecting flaws", "Generating protocol"].map((label, i) => (
              <div key={i} className="flex items-center gap-3 mb-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={
                    i < 3
                      ? { background: "rgba(34,197,94,.15)", border: "1px solid rgba(34,197,94,.4)" }
                      : { background: "rgba(59,130,246,.12)", border: "1px solid rgba(96,165,250,.3)" }
                  }
                >
                  {i < 3 ? (
                    <IconCheckSm />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-[#60a5fa]"
                      style={{ animation: "pulse-dot 1s ease-in-out infinite" }}
                    />
                  )}
                </div>
                <span className={`text-sm ${i < 3 ? "text-[#a1a1aa]" : "text-white font-medium"}`}>{label}</span>
              </div>
            ))}
          </div>
        )}

        {/* STEP: RESULTS */}
        {step === "results" && (
          <div className="px-7 py-8 animate-fadeup">
            <div
              className="flex items-center gap-5 mb-6 p-5 rounded-2xl"
              style={{ background: "rgba(59,130,246,.08)", border: "1px solid rgba(59,130,246,.2)" }}
            >
              <div className="relative w-20 h-20 flex-shrink-0">
                <svg width="80" height="80" viewBox="0 0 64 64" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="6"/>
                  <circle cx="32" cy="32" r="26" fill="none" stroke="#3b82f6" strokeWidth="6"
                    strokeLinecap="round" strokeDasharray="163.4"
                    className="animate-ringfill"
                    style={{ filter: "drop-shadow(0 0 4px rgba(59,130,246,.8))" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xl font-extrabold">74</div>
              </div>
              <div>
                <div className="font-mono text-[9px] tracking-[.08em] text-[#71717a] mb-1">HARMONY SCORE</div>
                <div className="text-lg font-bold mb-0.5">Top 18% of your age</div>
                <div className="text-sm text-[#60a5fa]">+26 points possible →</div>
              </div>
            </div>

            <h3 className="text-base font-bold mb-3">Detected issues</h3>
            {[
              { label: "Mild chin recession", sev: "MILD", color: "#fbbf24" },
              { label: "Slight asymmetry (left jaw)", sev: "MILD", color: "#fbbf24" },
              { label: "Negative canthal tilt", sev: "MODERATE", color: "#f97316" },
            ].map((f) => (
              <div key={f.label} className="flex items-center justify-between py-3"
                style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}
              >
                <span className="text-sm text-[#d4d4d8]">{f.label}</span>
                <span
                  className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                  style={{ background: `${f.color}18`, color: f.color, border: `1px solid ${f.color}44` }}
                >
                  {f.sev}
                </span>
              </div>
            ))}

            <div
              className="mt-6 p-4 rounded-2xl"
              style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)" }}
            >
              <div className="font-mono text-[10px] tracking-[.1em] text-[#60a5fa] mb-2">TOP PROTOCOL ACTIONS</div>
              {[
                "Mewing + tongue posture 20 min/day",
                "Face yoga — jawline series 3×/week",
                "Side-sleeping pillow adjustment",
              ].map((a) => (
                <div key={a} className="flex items-center gap-2.5 mb-2 text-sm text-[#d4d4d8]">
                  <IconCheck color="#60a5fa"/> {a}
                </div>
              ))}
            </div>

            <button
              className="w-full mt-5 py-4 rounded-[13px] font-bold text-base text-white animate-glowpulse"
              style={{ background: "#3b82f6", border: "none" }}
            >
              Unlock Full Report – $4.99
            </button>
            <p className="text-center text-xs text-[#52525b] mt-3">
              Instant delivery · Secure checkout · One-time payment
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Landing Page ──────────────────────────────────────────────────── */
export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "#0a0a0a", color: "#fff" }}>

      {/* Ambient background grid */}
      <div
        className="fixed inset-0 z-0 pointer-events-none animate-gridfloat"
        style={{
          backgroundImage: "linear-gradient(rgba(59,130,246,.10) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,.10) 1px,transparent 1px)",
          backgroundSize: "46px 46px",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 72% 18%,#000,transparent 75%)",
          maskImage: "radial-gradient(ellipse 80% 60% at 72% 18%,#000,transparent 75%)",
        }}
      />
      <div className="fixed z-0 pointer-events-none"
        style={{ top: -180, right: -120, width: 620, height: 620, background: "radial-gradient(circle,rgba(59,130,246,.22),transparent 62%)", filter: "blur(20px)" }}
      />
      <div className="fixed z-0 pointer-events-none"
        style={{ bottom: -260, left: -160, width: 640, height: 640, background: "radial-gradient(circle,rgba(59,130,246,.10),transparent 64%)", filter: "blur(20px)" }}
      />

      <div className="relative z-10">

        {/* ══════════ NAV ══════════ */}
        <nav
          className="sticky top-0 z-50 flex items-center justify-between gap-4 px-6 py-4"
          style={{
            background: "rgba(10,10,10,.55)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(255,255,255,.06)",
          }}
        >
          <div className="flex items-center gap-2.5">
            <div style={{ filter: "drop-shadow(0 0 10px rgba(59,130,246,.55))" }}>
              <FaceUpLogo size={34} />
            </div>
            <span className="font-extrabold text-[18px] tracking-[-0.01em]">
              Face<span className="text-[#60a5fa]">UP</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-7 text-sm text-[#a1a1aa]">
            {(["How it works", "Features", "Results", "Pricing"] as const).map((label, i) => (
              <a key={label} href={`#${["how","features","proof","pricing"][i]}`}
                className="transition-colors hover:text-white">
                {label}
              </a>
            ))}
          </div>

          <button onClick={openModal}
            className="shrink-0 px-[18px] py-2.5 rounded-[10px] font-semibold text-sm text-white transition-[filter,transform] hover:brightness-110 hover:-translate-y-px"
            style={{ background: "#3b82f6", boxShadow: "0 0 0 1px rgba(59,130,246,.45),0 6px 22px rgba(59,130,246,.4)" }}
          >
            Analyze My Face
          </button>
        </nav>

        {/* ══════════ HERO ══════════ */}
        <section className="flex flex-wrap items-center justify-center gap-12 max-w-[1200px] mx-auto px-7 pt-[72px] pb-[90px]">
          {/* Left — copy */}
          <div className="flex-1 min-w-[320px] max-w-[540px]">
            <div
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-[12.5px] text-[#93c5fd] font-mono tracking-[.04em] mb-6"
              style={{ background: "rgba(59,130,246,.10)", border: "1px solid rgba(59,130,246,.3)" }}
            >
              <span className="w-[7px] h-[7px] rounded-full bg-[#22c55e] animate-blink"
                style={{ boxShadow: "0 0 8px #22c55e" }}/>
              AI FACIAL ANALYSIS ENGINE v4
            </div>

            <h1 className="text-[clamp(40px,6.4vw,72px)] leading-none font-extrabold tracking-[-0.03em] mb-6">
              Your Face.<br />
              <span className="text-[#60a5fa]">Analyzed.</span> Perfected.
            </h1>
            <p className="text-[clamp(16px,2.1vw,20px)] leading-[1.55] text-[#a1a1aa] max-w-[520px] mb-9">
              AI scans your facial structure and reveals exactly what&apos;s holding you back — with a personalized protocol to fix it.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button onClick={openModal}
                className="inline-flex items-center gap-3 px-[30px] py-[18px] rounded-[13px] font-bold text-lg text-white transition-[filter,transform] hover:brightness-110 hover:-translate-y-0.5 animate-glowpulse"
                style={{ background: "#3b82f6" }}
              >
                <IconScanFace />
                Analyze My Face Free
              </button>
              <span className="text-[13px] text-[#71717a]">No signup · Results in 30 seconds</span>
            </div>

            {/* Avatar row */}
            <div className="flex items-center gap-4 text-[13px] text-[#a1a1aa]">
              <div className="flex">
                {[
                  { i: "H", from: "#3b82f6", to: "#1e3a8a" },
                  { i: "K", from: "#6366f1", to: "#312e81" },
                  { i: "M", from: "#0ea5e9", to: "#0c4a6e" },
                ].map(({ i, from, to }, idx) => (
                  <span key={idx}
                    className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-[11px] font-bold"
                    style={{ background: `linear-gradient(135deg,${from},${to})`, border: "2px solid #0a0a0a", marginLeft: idx > 0 ? -9 : 0 }}
                  >{i}</span>
                ))}
                <span className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-[10px] font-bold text-[#60a5fa]"
                  style={{ background: "#18181b", border: "2px solid #0a0a0a", marginLeft: -9 }}
                >50k</span>
              </div>
              <span><span className="text-white font-semibold">50,000+</span> faces analyzed this month</span>
            </div>
          </div>

          {/* Right — phone mockup */}
          <div className="flex-shrink-0 relative perspective-1500">
            <div className="preserve-3d animate-float3d relative">
              {/* phone body */}
              <div className="relative w-[300px] h-[600px] rounded-[48px] p-[11px] preserve-3d"
                style={{
                  background: "linear-gradient(150deg,#24262e,#0a0b0e)",
                  boxShadow: "0 0 0 1px rgba(255,255,255,.08),0 50px 100px rgba(0,0,0,.75),0 0 95px rgba(59,130,246,.25)",
                }}
              >
                {/* notch */}
                <div className="absolute top-[22px] left-1/2 -translate-x-1/2 w-[104px] h-7 bg-black rounded-b-[18px] z-[6]"/>

                {/* screen */}
                <div className="relative w-full h-full rounded-[38px] overflow-hidden"
                  style={{ background: "radial-gradient(120% 80% at 50% 32%,#0b1e3a,#04060c 78%)" }}
                >
                  <div className="absolute inset-0">
                    <FaceScanVisual />
                  </div>

                  <div className="absolute inset-0 pointer-events-none">
                    {/* status bar */}
                    <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 pt-[30px]">
                      <span className="font-mono text-[10px] tracking-[.12em] text-[#60a5fa]">FACEUP</span>
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[.08em] text-[#22c55e]">
                        <span className="w-[6px] h-[6px] rounded-full bg-[#22c55e] animate-blink-fast"
                          style={{ boxShadow: "0 0 7px #22c55e" }}/>
                        SCAN ACTIVE
                      </span>
                    </div>
                    {/* scan beam */}
                    <div className="absolute left-0 right-0 top-0 animate-scanmove"
                      style={{
                        height: "46%",
                        background: "linear-gradient(to bottom,transparent,rgba(59,130,246,.08) 80%,rgba(96,165,250,.4))",
                        borderBottom: "2px solid rgba(147,197,253,.55)",
                        boxShadow: "0 0 22px rgba(59,130,246,.45)",
                      }}
                    />
                    {/* corner brackets */}
                    {(["top-[64px] left-[18px] border-t-2 border-l-2","top-[64px] right-[18px] border-t-2 border-r-2","bottom-[110px] left-[18px] border-b-2 border-l-2","bottom-[110px] right-[18px] border-b-2 border-r-2"] as const).map((cls, i) => (
                      <div key={i} className={`absolute w-[22px] h-[22px] ${cls}`}
                        style={{ borderColor: "rgba(96,165,250,.6)" }}/>
                    ))}
                  </div>

                  {/* harmony score bar */}
                  <div className="absolute left-3 right-3 bottom-3.5 p-3.5 rounded-[22px] flex items-center gap-3.5"
                    style={{ background: "rgba(10,14,22,.8)", backdropFilter: "blur(8px)", border: "1px solid rgba(96,165,250,.25)" }}
                  >
                    <div className="relative w-[58px] h-[58px] flex-shrink-0">
                      <svg width="58" height="58" viewBox="0 0 64 64" style={{ transform: "rotate(-90deg)" }}>
                        <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="6"/>
                        <circle cx="32" cy="32" r="26" fill="none" stroke="#3b82f6" strokeWidth="6"
                          strokeLinecap="round" strokeDasharray="163.4"
                          className="animate-ringfill"
                          style={{ filter: "drop-shadow(0 0 4px rgba(59,130,246,.8))" }}/>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-[19px] font-extrabold">74</div>
                    </div>
                    <div>
                      <div className="font-mono text-[9px] tracking-[.08em] text-[#71717a]">HARMONY SCORE</div>
                      <div className="text-sm font-bold mt-0.5 mb-0.5">Top 18% of your age</div>
                      <div className="text-[11px] text-[#60a5fa]">+26 points possible →</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating chips */}
              <div className="absolute top-[84px] -left-6 p-3 px-3.5 rounded-[14px]"
                style={{ transform: "translateZ(52px)", background: "rgba(18,20,26,.78)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,.12)", boxShadow: "0 18px 50px rgba(0,0,0,.6)" }}
              >
                <div className="font-mono text-[10px] text-[#71717a] tracking-[.05em]">SYMMETRY</div>
                <div className="text-[21px] font-bold text-[#60a5fa] leading-none">82<span className="text-xs text-[#52525b]">/100</span></div>
              </div>
              <div className="absolute bottom-[150px] -right-2 p-3 px-3.5 rounded-[14px]"
                style={{ transform: "translateZ(70px)", background: "rgba(18,20,26,.78)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,.12)", boxShadow: "0 18px 50px rgba(0,0,0,.6)" }}
              >
                <div className="font-mono text-[10px] text-[#71717a] tracking-[.05em]">CANTHAL TILT</div>
                <div className="text-[15px] font-bold text-[#22c55e] leading-none">+5.4° Positive</div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ HOW IT WORKS ══════════ */}
        <section id="how" className="max-w-[1140px] mx-auto px-7 pt-[30px] pb-[90px]">
          <div className="text-center mb-14">
            <div className="font-mono text-xs tracking-[.18em] text-[#60a5fa] mb-3.5">HOW IT WORKS</div>
            <h2 className="text-[clamp(28px,4.2vw,44px)] font-extrabold tracking-[-0.02em]">Three steps to your blueprint</h2>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
            {([
              { icon: <IconCamera />, step: "01", title: "Upload or take a photo", desc: "3-angle capture — front, side, and 45° — for maximum precision and depth-accurate measurement." },
              { icon: <IconScan />, step: "02", title: "AI analyzes 50+ metrics", desc: "Symmetry, jawline, canthal tilt, facial thirds, and skin quality — measured to the sub-degree." },
              { icon: <IconProtocol />, step: "03", title: "Get your protocol", desc: "A personalized plan of exercises, products, habits, and routines — tailored precisely to your face." },
            ] as const).map(({ icon, step, title, desc }) => (
              <div key={step} className="relative p-[30px] px-[26px] rounded-[20px] overflow-hidden"
                style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.08)", backdropFilter: "blur(8px)" }}
              >
                <div className="absolute top-[18px] right-[22px] font-mono text-[13px] text-[rgba(96,165,250,.5)]">{step}</div>
                <div className="w-[50px] h-[50px] rounded-[14px] flex items-center justify-center mb-5"
                  style={{ background: "rgba(59,130,246,.12)", border: "1px solid rgba(59,130,246,.28)" }}
                >{icon}</div>
                <h3 className="text-[19px] font-bold mb-2.5">{title}</h3>
                <p className="text-[14.5px] leading-[1.55] text-[#a1a1aa]">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════ FEATURES ══════════ */}
        <section id="features" className="max-w-[1140px] mx-auto px-7 pt-[30px] pb-[90px]">
          <div className="text-center mb-14">
            <div className="font-mono text-xs tracking-[.18em] text-[#60a5fa] mb-3.5">WHAT YOU GET</div>
            <h2 className="text-[clamp(28px,4.2vw,44px)] font-extrabold tracking-[-0.02em] mb-3.5">Everything your face needs, decoded</h2>
            <p className="text-base text-[#a1a1aa] max-w-[520px] mx-auto">
              Five intelligence layers that turn a single photo into an actionable improvement system.
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[18px]">
            {([
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/><circle cx="12" cy="12" r="2.5"/></svg>,
                title: "Flaw detection with severity scores",
                desc: "Every weak point flagged and ranked from mild to severe — so you know exactly what to fix first.",
                accent: true,
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/><path d="M5 6v12"/></svg>,
                title: "Before/after projection",
                desc: "See a realistic preview of what you could look like after following your protocol consistently.",
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6h12M8 12h12M8 18h12"/><circle cx="3.5" cy="6" r="1.3"/><circle cx="3.5" cy="12" r="1.3"/><circle cx="3.5" cy="18" r="1.3"/></svg>,
                title: "Custom protocol per flaw",
                desc: "Targeted exercises, habits and routines mapped to each individual weakness in your analysis.",
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-7.2-7.2a2 2 0 0 1-.6-1.4V5a2 2 0 0 1 2-2h6.9a2 2 0 0 1 1.4.6l7.5 7.5a1.9 1.9 0 0 1 0 2.7Z"/><circle cx="7.5" cy="7.5" r="1.3"/></svg>,
                title: "Product recommendations",
                desc: "Curated, no-nonsense product picks with direct links — matched to your skin and structure.",
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m7 14 4-4 3 3 5-6"/></svg>,
                title: "Progress tracker over time",
                desc: "Re-scan monthly and watch your harmony score climb as the protocol compounds.",
              },
            ]).map(({ icon, title, desc, accent }: { icon: React.ReactNode; title: string; desc: string; accent?: boolean }) => (
              <div key={title} className="p-7 rounded-[20px]"
                style={
                  accent
                    ? { background: "linear-gradient(160deg,rgba(59,130,246,.12),rgba(59,130,246,.02))", border: "1px solid rgba(59,130,246,.25)", backdropFilter: "blur(8px)" }
                    : { background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.08)", backdropFilter: "blur(8px)" }
                }
              >
                <div className="flex items-center gap-3 mb-3.5">{icon}<h3 className="text-[18px] font-bold">{title}</h3></div>
                <p className="text-[14.5px] leading-[1.55] text-[#a1a1aa]">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════ SOCIAL PROOF ══════════ */}
        <section id="proof" className="max-w-[1140px] mx-auto px-7 pt-[30px] pb-[70px]">
          <div className="text-center mb-[50px]">
            <div className="font-mono text-xs tracking-[.18em] text-[#60a5fa] mb-3.5">THE RESULTS</div>
            <h2 className="text-[clamp(28px,4.2vw,44px)] font-extrabold tracking-[-0.02em]">They stopped guessing</h2>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-[18px] mb-12">
            {([
              {
                avatar: { i: "H", from: "#3b82f6", to: "#1e3a8a" },
                handle: "@hunter_maxx",
                quote: `"Went from a 6 to an 8 in 4 months following the protocol. The jawline routine alone changed my whole side profile."`,
                points: "+2.0 harmony points",
              },
              {
                avatar: { i: "D", from: "#6366f1", to: "#312e81" },
                handle: "@dev.ascends",
                quote: `"I thought I knew my flaws. The analysis caught my canthal tilt and recessed chin instantly — stuff I'd never have spotted myself."`,
                points: "+1.6 harmony points",
              },
              {
                avatar: { i: "K", from: "#0ea5e9", to: "#0c4a6e" },
                handle: "@kai_optimized",
                quote: `"The progress tracker is addictive. Re-scanning every month and seeing the number actually move keeps me locked in."`,
                points: "+2.3 harmony points",
              },
            ] as const).map(({ avatar, handle, quote, points }) => (
              <div key={handle} className="p-[26px] rounded-[20px]"
                style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.08)", backdropFilter: "blur(8px)" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-[42px] h-[42px] rounded-full flex items-center justify-center font-bold text-base"
                    style={{ background: `linear-gradient(135deg,${avatar.from},${avatar.to})` }}
                  >{avatar.i}</div>
                  <div>
                    <div className="font-bold text-[14.5px]">{handle}</div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#22c55e]"><IconStar /> Verified user</div>
                  </div>
                </div>
                <div className="text-[#fbbf24] mb-3">★★★★★</div>
                <p className="text-[14.5px] leading-[1.6] text-[#d4d4d8] mb-4">{quote}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12.5px] font-semibold text-[#93c5fd]"
                  style={{ background: "rgba(59,130,246,.1)", border: "1px solid rgba(59,130,246,.25)" }}
                >{points}</div>
              </div>
            ))}
          </div>

          {/* Stat bar */}
          <div className="flex flex-wrap justify-center items-center py-[30px] px-6 rounded-[20px]"
            style={{ background: "linear-gradient(160deg,rgba(255,255,255,.04),rgba(255,255,255,.01))", border: "1px solid rgba(255,255,255,.08)" }}
          >
            {([
              { value: "50,000+", label: "faces analyzed", color: "#60a5fa" },
              { value: "+1.8", label: "avg point improvement", color: "#d4b46a" },
              { value: "94%", label: "satisfaction rate", color: "#60a5fa" },
            ] as const).map(({ value, label, color }, i) => (
              <div key={i} className="flex items-center">
                {i > 0 && <div className="w-px h-[46px]" style={{ background: "rgba(255,255,255,.1)" }}/>}
                <div className="flex-1 text-center px-4 min-w-[200px]">
                  <div className="text-[clamp(28px,3.6vw,38px)] font-extrabold" style={{ color }}>{value}</div>
                  <div className="text-[13px] text-[#a1a1aa] mt-1">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════ PRICING ══════════ */}
        <section id="pricing" className="max-w-[920px] mx-auto px-7 pt-[60px] pb-[90px]">
          <div className="text-center mb-[50px]">
            <div className="font-mono text-xs tracking-[.18em] text-[#60a5fa] mb-3.5">PRICING</div>
            <h2 className="text-[clamp(28px,4.2vw,44px)] font-extrabold tracking-[-0.02em] mb-3.5">Optimization is cheaper than you think</h2>
            <p className="text-base text-[#a1a1aa]">Start free. Upgrade when you&apos;re ready to commit to the protocol.</p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5 items-stretch">
            {/* One-time */}
            <div className="flex flex-col p-8 px-7 rounded-[22px]"
              style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.1)" }}
            >
              <div className="text-sm text-[#a1a1aa] font-semibold mb-1.5">One-time report</div>
              <div className="flex items-baseline gap-1.5 mb-1.5">
                <span className="text-[46px] font-extrabold tracking-[-0.02em]">$4.99</span>
                <span className="text-sm text-[#71717a]">once</span>
              </div>
              <p className="text-sm text-[#a1a1aa] mb-6">Full facial analysis + personalized protocol. Yours forever.</p>
              <div className="flex flex-col gap-3.5 mb-6 flex-1">
                {["Full 50+ metric analysis","Flaw detection + severity","Personalized protocol","Product recommendations"].map(f => (
                  <div key={f} className="flex items-center gap-2.5 text-sm text-[#d4d4d8]"><IconCheck /> {f}</div>
                ))}
              </div>
              <button onClick={openModal}
                className="w-full py-[15px] rounded-xl font-semibold text-[15px] text-white transition-colors hover:bg-white/[0.06] hover:border-white/40"
                style={{ background: "transparent", border: "1px solid rgba(255,255,255,.2)" }}
              >Get my report</button>
            </div>

            {/* Subscription */}
            <div className="relative flex flex-col p-8 px-7 rounded-[22px]"
              style={{ background: "linear-gradient(165deg,rgba(59,130,246,.16),rgba(59,130,246,.03))", border: "1px solid rgba(59,130,246,.5)", boxShadow: "0 0 0 1px rgba(59,130,246,.2),0 24px 70px rgba(59,130,246,.22)" }}
            >
              <div className="absolute -top-[13px] left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-[15px] py-1.5 rounded-full text-[11px] font-extrabold tracking-[.06em]"
                style={{ background: "linear-gradient(135deg,#e7c87d,#c9a44e)", color: "#1a1306", boxShadow: "0 6px 20px rgba(201,164,78,.45)" }}
              >★ MOST POPULAR</div>
              <div className="text-sm text-[#93c5fd] font-semibold mb-1.5">FaceUP+ subscription</div>
              <div className="flex items-baseline gap-1.5 mb-1.5">
                <span className="text-[46px] font-extrabold tracking-[-0.02em]">$9.99</span>
                <span className="text-sm text-[#93c5fd]">/mo</span>
              </div>
              <p className="text-sm text-[#cbd5e1] mb-6">Unlimited analyses, progress tracking, and fresh protocols every month.</p>
              <div className="flex flex-col gap-3.5 mb-6 flex-1">
                {["Everything in one-time, plus:","Unlimited re-analyses","Progress tracking + trends","New protocols monthly"].map(f => (
                  <div key={f} className="flex items-center gap-2.5 text-sm text-[#e5e7eb]"><IconCheck color="#93c5fd"/> {f}</div>
                ))}
              </div>
              <button onClick={openModal}
                className="w-full py-[15px] rounded-xl font-bold text-[15px] text-white transition-[filter,transform] hover:brightness-110 hover:-translate-y-0.5"
                style={{ background: "#3b82f6", border: "none", boxShadow: "0 0 0 1px rgba(59,130,246,.4),0 8px 28px rgba(59,130,246,.45)" }}
              >Start FaceUP+</button>
            </div>
          </div>
          <p className="text-center text-[12.5px] text-[#52525b] mt-6">
            Cancel anytime · Secure checkout · Your photos are never sold or shared
          </p>
        </section>

        {/* ══════════ CTA STRIP ══════════ */}
        <section className="max-w-[1140px] mx-auto px-7 pb-[90px]">
          <div className="relative overflow-hidden text-center py-[60px] px-8 rounded-[28px]"
            style={{ background: "radial-gradient(120% 140% at 50% 0%,rgba(59,130,246,.22),rgba(10,10,10,0) 70%),#0c0e14", border: "1px solid rgba(59,130,246,.25)" }}
          >
            <h2 className="text-[clamp(26px,4vw,40px)] font-extrabold tracking-[-0.02em] mb-3.5">Your face, optimized by AI.</h2>
            <p className="text-base text-[#a1a1aa] max-w-[460px] mx-auto mb-8">
              See your harmony score and first protocol in under 30 seconds — completely free.
            </p>
            <button onClick={openModal}
              className="inline-flex items-center gap-3 px-8 py-[18px] rounded-[13px] font-bold text-lg text-white transition-[filter,transform] hover:brightness-110 hover:-translate-y-0.5 animate-glowpulse"
              style={{ background: "#3b82f6", border: "none" }}
            >
              Analyze My Face Free
            </button>
          </div>
        </section>

        {/* ══════════ FOOTER ══════════ */}
        <footer className="px-7 py-9" style={{ borderTop: "1px solid rgba(255,255,255,.07)" }}>
          <div className="max-w-[1140px] mx-auto flex flex-wrap items-center justify-between gap-5">
            <div className="flex items-center gap-2.5">
              <div style={{ filter: "drop-shadow(0 0 8px rgba(59,130,246,.5))" }}>
                <FaceUpLogo size={28} />
              </div>
              <span className="font-extrabold text-[15px]">Face<span className="text-[#60a5fa]">UP</span></span>
            </div>
            <div className="flex gap-6 text-[13.5px] text-[#a1a1aa]">
              {["Privacy","Terms","Contact"].map(l => (
                <a key={l} href="#" className="transition-colors hover:text-white">{l}</a>
              ))}
            </div>
            <div className="text-[12.5px] text-[#52525b]">© 2026 FaceUP. All rights reserved.</div>
          </div>
        </footer>
      </div>

      {/* ══════════ MODAL ══════════ */}
      {modalOpen && <AnalysisModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
