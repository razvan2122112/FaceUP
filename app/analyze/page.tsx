"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

type Angle = "front" | "left" | "right";
type Stage = "capture" | "review" | "loading";

const ANGLE_ORDER: Angle[] = ["front", "left", "right"];
const ANGLE_LABELS: Record<Angle, string> = {
  front: "Front",
  left: "Left Profile",
  right: "Right Profile",
};
const ANGLE_INSTRUCTIONS: Record<Angle, string> = {
  front: "Look directly at the camera, keep your face centered",
  left: "Turn your head to show your left profile",
  right: "Turn your head to show your right profile",
};

export default function AnalyzePage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [stage, setStage] = useState<Stage>("capture");
  const [currentAngleIdx, setCurrentAngleIdx] = useState(0);
  const [captures, setCaptures] = useState<Partial<Record<Angle, string>>>({});
  const [previewAngle, setPreviewAngle] = useState<Angle | null>(null);
  const [error, setError] = useState<string | null>(null);

  const currentAngle = ANGLE_ORDER[currentAngleIdx];

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch {
      setError("Camera access denied. Please allow camera access and refresh.");
    }
  }, []);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => {
    if (stage === "capture") {
      startCamera();
    } else {
      stopCamera();
    }
    return stopCamera;
  }, [stage, startCamera, stopCamera]);

  const capturePhoto = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
    const base64 = dataUrl.split(",")[1];

    setCaptures((prev) => ({ ...prev, [currentAngle]: base64 }));
    setPreviewAngle(currentAngle);
  }, [currentAngle]);

  const retake = useCallback(() => {
    setCaptures((prev) => {
      const next = { ...prev };
      delete next[currentAngle];
      return next;
    });
    setPreviewAngle(null);
  }, [currentAngle]);

  const confirmCapture = useCallback(() => {
    setPreviewAngle(null);
    if (currentAngleIdx < ANGLE_ORDER.length - 1) {
      setCurrentAngleIdx((i) => i + 1);
    } else {
      setStage("review");
    }
  }, [currentAngleIdx]);

  const analyze = useCallback(async () => {
    const { front, left, right } = captures as Record<Angle, string>;
    setStage("loading");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ front, left, right }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Analysis failed");
      }

      const result = await res.json();
      sessionStorage.setItem("faceup_results", JSON.stringify(result));
      router.push("/results");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Analysis failed";
      setError(msg);
      setStage("review");
    }
  }, [captures, router]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <p className="text-white font-semibold mb-2">Something went wrong</p>
          <p className="text-white/50 text-sm mb-6">{error}</p>
          <button
            onClick={() => { setError(null); setStage("capture"); setCurrentAngleIdx(0); setCaptures({}); }}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (stage === "loading") {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <svg className="w-24 h-24 animate-spin" viewBox="0 0 96 96" fill="none">
              <circle cx="48" cy="48" r="40" stroke="white" strokeOpacity="0.1" strokeWidth="4" />
              <path d="M48 8 A40 40 0 0 1 88 48" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-10 h-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
              </svg>
            </div>
          </div>
          <h2 className="text-white text-xl font-semibold mb-3">
            AI is analyzing your facial structure...
          </h2>
          <p className="text-white/40 text-sm">This usually takes 10–20 seconds</p>
        </div>
      </div>
    );
  }

  if (stage === "review") {
    return (
      <div className="min-h-screen bg-[#0a0a0a] px-4 py-10">
        <div className="max-w-lg mx-auto">
          <div className="mb-8">
            <h1 className="text-white text-2xl font-bold mb-1">Review Your Photos</h1>
            <p className="text-white/40 text-sm">Make sure all three angles are clear before analyzing</p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-8">
            {ANGLE_ORDER.map((angle) => {
              const src = captures[angle];
              return (
                <div key={angle} className="aspect-[3/4] rounded-xl overflow-hidden bg-white/5 border border-white/10 relative">
                  {src ? (
                    <img
                      src={`data:image/jpeg;base64,${src}`}
                      alt={ANGLE_LABELS[angle]}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white/20 text-3xl">?</span>
                    </div>
                  )}
                  <div className="absolute bottom-0 inset-x-0 bg-black/60 py-1 px-2 text-center">
                    <span className="text-white/70 text-xs">{ANGLE_LABELS[angle]}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={analyze}
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white rounded-2xl font-bold text-lg transition-all"
          >
            Analyze My Face
          </button>
          <button
            onClick={() => { setStage("capture"); setCurrentAngleIdx(0); setCaptures({}); }}
            className="w-full py-3 mt-3 text-white/40 hover:text-white/70 text-sm transition-colors"
          >
            Retake all photos
          </button>
        </div>
      </div>
    );
  }

  // Capture stage
  const capturedForCurrent = captures[currentAngle];

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Header */}
      <div className="px-4 pt-8 pb-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-1">
            {ANGLE_ORDER.map((angle, idx) => (
              <div
                key={angle}
                className={`flex-1 h-1 rounded-full transition-colors ${
                  idx < currentAngleIdx
                    ? "bg-blue-500"
                    : idx === currentAngleIdx
                    ? "bg-blue-500/60"
                    : "bg-white/10"
                }`}
              />
            ))}
          </div>
          <p className="text-white/40 text-xs mt-2">
            Step {currentAngleIdx + 1} of {ANGLE_ORDER.length}
          </p>
        </div>
      </div>

      {/* Camera / Preview */}
      <div className="flex-1 flex flex-col items-center px-4">
        <div className="w-full max-w-lg relative">
          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-black border border-white/10 relative">
            {capturedForCurrent ? (
              <img
                src={`data:image/jpeg;base64,${capturedForCurrent}`}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover scale-x-[-1]"
              />
            )}

            {/* Angle overlay guide */}
            {!capturedForCurrent && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-4 border-2 border-blue-400/30 rounded-xl" />
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-blue-400 rounded-tl-lg" />
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-blue-400 rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-blue-400 rounded-bl-lg" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-blue-400 rounded-br-lg" />
              </div>
            )}

            {/* Preview checkmark overlay */}
            {capturedForCurrent && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-400 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Instructions */}
        <div className="w-full max-w-lg mt-5 mb-6 text-center">
          <h2 className="text-white text-xl font-bold mb-1">{ANGLE_LABELS[currentAngle]}</h2>
          <p className="text-white/40 text-sm">{ANGLE_INSTRUCTIONS[currentAngle]}</p>
        </div>

        {/* Buttons */}
        <div className="w-full max-w-lg">
          {capturedForCurrent ? (
            <div className="flex gap-3">
              <button
                onClick={retake}
                className="flex-1 py-4 border border-white/20 hover:border-white/40 text-white/70 hover:text-white rounded-2xl font-semibold transition-all"
              >
                Retake
              </button>
              <button
                onClick={confirmCapture}
                className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white rounded-2xl font-bold transition-all"
              >
                {currentAngleIdx < ANGLE_ORDER.length - 1 ? "Next Angle →" : "Review All"}
              </button>
            </div>
          ) : (
            <button
              onClick={capturePhoto}
              className="w-full py-5 bg-white hover:bg-white/90 active:scale-[0.98] text-black rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Capture Photo
            </button>
          )}
        </div>
      </div>

      <div className="h-8" />
    </div>
  );
}
