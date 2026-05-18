"use client";

import { useState, useEffect } from "react";

interface HtmlPreloaderProps {
  duration?: number;
  onComplete?: () => void;
}

const PARTICLE_COUNT = 15;

const FIXED_SEEDS = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
  const seed = (i * 137.5086184732847) % 1;
  return {
    left: 5 + seed * 90,
    size: 2 + (seed * 4),
    delay: seed * 3,
    duration: 3 + seed * 4,
    shadowSize: 5 + seed * 10,
  };
});

export default function HtmlPreloader({ duration = 4000, onComplete }: HtmlPreloaderProps) {
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}:${seconds}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let interval;
    const updateRate = 50;
    const steps = duration / updateRate;
    const incrementPerStep = 100 / steps;

    const updateProgress = () => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        const variance = Math.random() * 0.6;
        const next = prev + incrementPerStep + variance;
        return next >= 99.5 ? 100 : next;
      });
    };
    interval = setInterval(updateProgress, updateRate);

    return () => clearInterval(interval);
  }, [duration]);

  useEffect(() => {
    if (progress >= 100) {
      setFadeOut(true);
      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  const particles = FIXED_SEEDS.map((seed, i) => ({
    key: i,
    ...seed,
    color: i % 2 === 0 ? "#22d3ee" : "#a855f7",
  }));

  return (
    <>
      <style jsx global>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes spinCube {
          0% { transform: rotateX(-25deg) rotateY(0deg); }
          100% { transform: rotateX(-25deg) rotateY(360deg); }
        }
        @keyframes floatParticles {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) rotate(720deg); opacity: 0; }
        }
        @keyframes panelGlow {
          0%, 100% { box-shadow: 0 0 30px rgba(34,211,238,0.1), 0 0 60px rgba(168,85,247,0.05); }
          50% { box-shadow: 0 0 40px rgba(34,211,238,0.2), 0 0 80px rgba(168,85,247,0.1); }
        }
        @keyframes cubePulse {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(34,211,238,0.3)); }
          50% { filter: drop-shadow(0 0 20px rgba(34,211,238,0.6)); }
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#050508",
          transition: "all 0.7s ease",
          opacity: fadeOut ? 0 : 1,
          pointerEvents: fadeOut ? "none" : "auto",
          fontFamily: "'JetBrains Mono', monospace",
          overflow: "hidden",
        }}
      >
        {/* Particles - only render on client after hydration */}
        {mounted && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            {particles.map((p) => (
              <div
                key={p.key}
                style={{
                  position: "absolute",
                  width: p.size,
                  height: p.size,
                  background: p.color,
                  borderRadius: "50%",
                  left: `${p.left}%`,
                  boxShadow: `0 0 ${p.shadowSize}px ${p.color}`,
                  opacity: 0.6,
                  animation: `floatParticles ${p.duration}s linear infinite`,
                  animationDelay: `${p.delay}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Main Content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            padding: "0 20px",
            width: "100%",
            maxWidth: "100%",
          }}
        >
          {/* 3D Cube */}
          <div
            style={{
              perspective: "600px",
              width: isMobile ? "60px" : "80px",
              height: isMobile ? "60px" : "80px",
              marginBottom: isMobile ? "12px" : "20px",
              animation: "cubePulse 2s ease-in-out infinite",
            }}
          >
            <div
              style={{
                transformStyle: "preserve-3d",
                animation: "spinCube 8s linear infinite",
                width: "100%",
                height: "100%",
                position: "relative",
              }}
            >
              {[
                { transform: isMobile ? "translateZ(20px)" : "translateZ(30px)", borderColor: "rgba(34,211,238,0.3)" },
                { transform: isMobile ? "rotateY(180deg) translateZ(20px)" : "rotateY(180deg) translateZ(30px)", borderColor: "rgba(168,85,247,0.3)" },
                { transform: isMobile ? "rotateY(90deg) translateZ(20px)" : "rotateY(90deg) translateZ(30px)", borderColor: "rgba(34,211,238,0.3)" },
                { transform: isMobile ? "rotateY(-90deg) translateZ(20px)" : "rotateY(-90deg) translateZ(30px)", borderColor: "rgba(168,85,247,0.3)" },
              ].map((face, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    border: "1px solid",
                    borderColor: face.borderColor,
                    transform: face.transform,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Panel */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? "8px" : "12px",
              padding: isMobile ? "14px" : "20px",
              borderRadius: isMobile ? "8px" : "12px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 0 30px rgba(34,211,238,0.1), 0 0 60px rgba(168,85,247,0.05)",
              width: "100%",
              maxWidth: isMobile ? "300px" : "360px",
              animation: "panelGlow 3s ease-in-out infinite",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "4px" : "8px", width: "100%", flexWrap: "wrap" }}>
              <span style={{ color: "#22d3ee", fontSize: isMobile ? "9px" : "11px", fontWeight: 700 }}>LOCAL_TIME</span>
              <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: isMobile ? "10px" : "12px" }}>(UTC-5:00)</span>
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: isMobile ? "10px" : "12px" }}>{time}</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "4px" : "8px", width: "100%" }}>
              <span style={{ color: "#22d3ee", fontSize: isMobile ? "9px" : "11px", fontWeight: 700 }}>LOADING</span>
              <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
              <span style={{ fontSize: isMobile ? "12px" : "14px" }}>
                <span style={{ color: "#fff" }}>{Math.round(progress)}</span>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: isMobile ? "10px" : "12px" }}>%</span>
                <span style={{ color: "#22d3ee", animation: "blink 1s infinite", marginLeft: "2px" }}>_</span>
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "4px" : "8px", width: "100%" }}>
              <span style={{ color: "#22d3ee", fontSize: isMobile ? "9px" : "11px", fontWeight: 700 }}>STATUS</span>
              <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
              <span
                style={{
                  color: progress >= 100 ? "#4ade80" : "#fbbf24",
                  fontSize: isMobile ? "12px" : "14px",
                  textShadow: progress < 100 ? "0 0 10px #fbbf24" : "0 0 10px #4ade80",
                }}
              >
                {progress >= 100 ? "COMPLETE" : "PROCESSING"}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "4px" : "6px", width: "100%", marginTop: isMobile ? "2px" : "4px" }}>
              <span style={{ color: "#22d3ee", fontSize: isMobile ? "12px" : "14px" }}>[</span>
              <div
                style={{
                  flex: 1,
                  height: isMobile ? "6px" : "8px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: isMobile ? "3px" : "4px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: `${Math.min(progress, 100)}%`,
                    height: "100%",
                    background: "linear-gradient(90deg, #22d3ee, #a855f7)",
                    borderRadius: "2px",
                    boxShadow: "0 0 10px rgba(34,211,238,0.6)",
                    transition: "width 0.05s linear",
                  }}
                />
              </div>
              <span style={{ color: "#22d3ee", fontSize: isMobile ? "12px" : "14px" }}>]</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: isMobile ? "16px" : "24px",
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "8px" : "12px",
            fontSize: isMobile ? "9px" : "11px",
            color: "rgba(255,255,255,0.3)",
            letterSpacing: isMobile ? "0.1em" : "0.15em",
          }}
        >
          <span>STUDIO</span>
          <span style={{ color: "#22d3ee" }}>//</span>
          <span style={{ color: "#a855f7" }}>v2.0.0</span>
        </div>
      </div>
    </>
  );
}