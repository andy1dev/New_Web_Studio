'use client'

import { useState, useEffect } from "react"

interface CombinedPreloaderProps {
  duration?: number
}

export default function CombinedPreloader({ duration = 3000 }: CombinedPreloaderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    const updateRate = 50 // Mayor frecuencia de actualización para máxima fluidez
    const steps = duration / updateRate
    const incrementPerStep = 100 / steps

    const updateProgress = () => {
      setProgress(prev => {
        if (prev >= 100) return 100
        // Varianza mucho más pequeña para que el avance sea orgánico pero suave
        const variance = Math.random() * 0.8
        const next = prev + incrementPerStep + variance
        return next >= 99.5 ? 100 : next
      })
    }
    interval = setInterval(updateProgress, updateRate)

    return () => clearInterval(interval)
  }, [duration])

  useEffect(() => {
    if (progress >= 100) {
      setFadeOut(true)
      const timer = setTimeout(() => setIsLoading(false), 800)
      return () => clearTimeout(timer)
    }
  }, [progress])

  if (!isLoading) return <span className="sr-only" aria-label="Carga completada" />

  return (
    <>
      <style>{`
        @keyframes spinCube {
          0% { transform: rotateX(-20deg) rotateY(0deg); }
          100% { transform: rotateX(-20deg) rotateY(360deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.6; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
      <div
        role="status"
        aria-label="Cargando contenido"
        aria-live="polite"
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-all duration-700 ${
          fadeOut ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          background: 'linear-gradient(180deg, #0f172a 0%, #020617 100%)',
          pointerEvents: fadeOut ? 'none' : 'auto'
        }}
      >
      {/* Cubo 3D */}
      <div className="relative mb-12" style={{ perspective: '1000px', width: '140px', height: '140px' }}>
        <div
          className="w-full h-full relative"
          style={{
            transformStyle: 'preserve-3d',
            animation: 'spinCube 6s linear infinite'
          }}
        >
          {/* Cara frontal */}
          <div className="absolute w-full h-full border-2 border-cyan-400 bg-cyan-500/20" 
               style={{ transform: 'translateZ(70px)', boxShadow: '0 0 30px rgba(34,211,238,0.4), inset 0 0 20px rgba(34,211,238,0.2)' }} />
          
          {/* Cara trasera */}
          <div className="absolute w-full h-full border-2 border-purple-500 bg-purple-500/20" 
               style={{ transform: 'rotateY(180deg) translateZ(70px)', boxShadow: '0 0 30px rgba(168,85,247,0.4), inset 0 0 20px rgba(168,85,247,0.2)' }} />
          
          {/* Cara derecha */}
          <div className="absolute w-full h-full border-2 border-cyan-400 bg-cyan-500/20" 
               style={{ transform: 'rotateY(90deg) translateZ(70px)', boxShadow: '0 0 30px rgba(34,211,238,0.4)' }} />
          
          {/* Cara izquierda */}
          <div className="absolute w-full h-full border-2 border-purple-500 bg-purple-500/20" 
               style={{ transform: 'rotateY(-90deg) translateZ(70px)', boxShadow: '0 0 30px rgba(168,85,247,0.4)' }} />
          
          {/* Cara superior */}
          <div className="absolute w-full h-full border-2 border-indigo-500 bg-indigo-500/20" 
               style={{ transform: 'rotateX(90deg) translateZ(70px)', boxShadow: '0 0 30px rgba(99,102,241,0.4)' }} />
          
          {/* Cara inferior */}
          <div className="absolute w-full h-full border-2 border-indigo-500 bg-indigo-500/20" 
               style={{ transform: 'rotateX(-90deg) translateZ(70px)', boxShadow: '0 0 30px rgba(99,102,241,0.4)' }} />
        </div>
        
        {/* Core brillante */}
        <div 
          className="absolute rounded-full"
          style={{
            top: '50%',
            left: '50%',
            width: '30px',
            height: '30px',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            boxShadow: '0 0 40px 10px rgba(255,255,255,0.8)',
            animation: 'pulse 1.5s ease-in-out infinite'
          }}
        />
      </div>

      {/* Texto "GENERATING" */}
      <div className="text-cyan-400 text-4xl font-bold tracking-[0.5em] mb-6 uppercase"
           style={{ textShadow: '0 0 20px rgba(34,211,238,0.8)' }}>
        GENERATING
      </div>

      {/* Barra de progreso */}
      <div className="w-72 h-1.5 bg-slate-700 rounded-full overflow-hidden mb-4">
        <div 
          className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 rounded-full transition-all duration-75 ease-out"
          style={{ 
            width: `${Math.min(progress, 100)}%`,
            boxShadow: '0 0 10px rgba(34,211,238,0.8)'
          }}
        />
      </div>

      {/* Texto de carga */}
      <div className="text-slate-400 text-sm font-mono">
        {Math.round(progress)}%
      </div>
    </div>
    </>
  )
}