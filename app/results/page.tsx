"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AnalysisResult {
  overall_score: number;
  subscores: {
    symmetry: number;
    jawline: number;
    skin: number;
    eye_area: number;
    facial_thirds: number;
  };
  flaws: Array<{
    name: string;
    severity: "low" | "medium" | "high";
    description: string;
  }>;
  protocol: Array<{
    title: string;
    description: string;
  }>;
  summary: string;
}

const SUBSCORE_LABELS: Record<string, string> = {
  symmetry: "Facial Symmetry",
  jawline: "Jawline Definition",
  skin: "Skin Quality",
  eye_area: "Eye Area",
  facial_thirds: "Facial Thirds",
};

const SEVERITY_STYLES: Record<string, string> = {
  low: "bg-green-500/10 text-green-400 border border-green-500/20",
  medium: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  high: "bg-red-500/10 text-red-400 border border-red-500/20",
};

function ScoreRing({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div className="relative w-40 h-40 mx-auto">
      <svg className="w-40 h-40 -rotate-90" viewBox="0 0 128 128">
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="white"
          strokeOpacity="0.06"
          strokeWidth="10"
        />
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="url(#scoreGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${progress} ${circumference}`}
          style={{ transition: "stroke-dasharray 1s ease" }}
        />
        <defs>
          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-white text-4xl font-bold">{score}</span>
        <span className="text-white/40 text-xs">/ 100</span>
      </div>
    </div>
  );
}

function ScoreBar({ value, label }: { value: number; label: string }) {
  const color =
    value >= 70 ? "#3b82f6" : value >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-white/70 text-sm">{label}</span>
        <span className="text-white text-sm font-semibold">{value}</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("faceup_results");
    if (!raw) {
      router.replace("/analyze");
      return;
    }
    try {
      setResult(JSON.parse(raw));
    } catch {
      router.replace("/analyze");
    }
  }, [router]);

  if (!result) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const visibleProtocol = result.protocol.slice(0, 2);
  const lockedProtocol = result.protocol.slice(2);

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-24">
      {/* Header */}
      <div className="px-4 pt-10 pb-6 text-center">
        <p className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-2">
          Analysis Complete
        </p>
        <h1 className="text-white text-2xl font-bold mb-1">Your Facial Report</h1>
        <p className="text-white/40 text-sm max-w-xs mx-auto">{result.summary}</p>
      </div>

      {/* Overall Score */}
      <div className="px-4 mb-8">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-center max-w-lg mx-auto">
          <ScoreRing score={result.overall_score} />
          <p className="text-white/50 text-sm mt-4">Overall Harmony Score</p>
        </div>
      </div>

      {/* Subscores */}
      <div className="px-4 mb-8">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 max-w-lg mx-auto">
          <h2 className="text-white font-semibold mb-5">Breakdown</h2>
          {Object.entries(result.subscores).map(([key, value]) => (
            <ScoreBar key={key} value={value} label={SUBSCORE_LABELS[key] ?? key} />
          ))}
        </div>
      </div>

      {/* Flaws */}
      <div className="px-4 mb-8">
        <div className="max-w-lg mx-auto">
          <h2 className="text-white font-semibold mb-4">Detected Issues</h2>
          <div className="flex flex-col gap-3">
            {result.flaws.map((flaw, i) => (
              <div
                key={i}
                className="bg-white/[0.03] border border-white/10 rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-white font-medium text-sm">{flaw.name}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-semibold ${SEVERITY_STYLES[flaw.severity]}`}
                  >
                    {flaw.severity.charAt(0).toUpperCase() + flaw.severity.slice(1)}
                  </span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">
                  {flaw.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Protocol */}
      <div className="px-4">
        <div className="max-w-lg mx-auto">
          <h2 className="text-white font-semibold mb-4">Your Improvement Protocol</h2>

          {/* Visible items */}
          <div className="flex flex-col gap-3 mb-0">
            {visibleProtocol.map((item, i) => (
              <div
                key={i}
                className="bg-white/[0.03] border border-white/10 rounded-xl p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-400 text-xs font-bold">{i + 1}</span>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm mb-0.5">{item.title}</p>
                    <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Paywall blur section */}
          {lockedProtocol.length > 0 && (
            <div className="relative mt-3">
              {/* Blurred items */}
              <div className="flex flex-col gap-3 pointer-events-none select-none">
                {lockedProtocol.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white/[0.03] border border-white/10 rounded-xl p-4 blur-[5px]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-400 text-xs font-bold">
                          {visibleProtocol.length + i + 1}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm mb-0.5">{item.title}</p>
                        <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Paywall overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent rounded-xl">
                <div className="text-center px-6 py-6">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <p className="text-white font-bold text-lg mb-1">
                    {lockedProtocol.length} more steps locked
                  </p>
                  <p className="text-white/40 text-sm mb-5">
                    Unlock your full personalized protocol
                  </p>
                  <button className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white rounded-xl font-bold transition-all text-sm">
                    Unlock your full protocol — $4.99
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Retake CTA */}
      <div className="px-4 mt-10 max-w-lg mx-auto">
        <Link
          href="/analyze"
          className="block w-full py-4 border border-white/10 hover:border-white/20 text-white/50 hover:text-white/80 rounded-2xl font-semibold text-center text-sm transition-all"
        >
          Retake Analysis
        </Link>
      </div>
    </div>
  );
}
