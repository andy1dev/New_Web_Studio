'use client'

import { useRef, useEffect, Suspense } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import dynamic from 'next/dynamic'
import { SplineScene } from '@/components/ui/splite'
import { Spotlight } from '@/components/ui/spotlight'

const ParticleBackground = dynamic(() => import('./3d/ParticleBackground'), { ssr: false })

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)
  const secondCtaRef = useRef<HTMLButtonElement>(null)
  const isInView = useInView(containerRef, { once: true })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ctaRef.current) return
      const rect = ctaRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      ctaRef.current.style.setProperty('--mouse-x', `${x}px`)
      ctaRef.current.style.setProperty('--mouse-y', `${y}px`)

      if (secondCtaRef.current) {
        const rect2 = secondCtaRef.current.getBoundingClientRect()
        const x2 = e.clientX - rect2.left - rect2.width / 2
        const y2 = e.clientY - rect2.top - rect2.height / 2
        secondCtaRef.current.style.setProperty('--mouse-x', `${x2}px`)
        secondCtaRef.current.style.setProperty('--mouse-y', `${y2}px`)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const headlineWords = ['Transformamos', 'Desafíos', 'en Activos Digitales']

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg pt-20"
    >
      <ParticleBackground />

      <div className="absolute inset-0 z-[5]">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center bg-dark-950/50">
            <div className="w-12 h-12 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" 
            className="w-full h-full"
          />
        </Suspense>
      </div>

      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="cyan" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-950/50 to-dark-950 z-10" />

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-20 max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] mb-6 md:mb-8">
          {headlineWords.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.3 + index * 0.15,
                ease: [0.215, 0.61, 0.355, 1]
              }}
              className={`inline-block mr-4 ${index === 1 ? 'gradient-text' : 'dark:text-white text-zinc-900'}`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-lg sm:text-xl md:text-2xl dark:text-zinc-400 text-zinc-600 max-w-2xl lg:max-w-3xl mx-auto mb-8 md:mb-10 leading-relaxed"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
          >
            Estrategia, diseño y desarrollo a medida para empresas.
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.1 }}
            className="dark:text-zinc-500 text-zinc-500"
          >
            Construimos soluciones que impulsan tu negocio al siguiente nivel.
          </motion.span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 md:mb-16"
        >
          <motion.button
            ref={ctaRef}
            className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg overflow-hidden transition-all duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'linear-gradient(135deg, #00D4FF 0%, #00FFE5 100%)',
              color: '#050508',
              boxShadow: '0 0 30px rgba(0, 212, 255, 0.4)'
            }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
              style={{ transform: 'skewX(-20deg)' }}
            />
            <span className="relative z-10 flex items-center gap-2">
              Comenzar Proyecto
              <motion.svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </span>
          </motion.button>

          <motion.button
            ref={secondCtaRef}
            className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg border dark:border-zinc-700 border-zinc-300 dark:text-zinc-300 text-zinc-700 transition-all duration-300 glass overflow-hidden"
            whileHover={{ scale: 1.05, borderColor: 'rgba(0, 212, 255, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Ver Portafolio
              <motion.svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </span>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.3 }}
          className="flex items-center justify-center gap-2 dark:text-zinc-500 text-zinc-400"
        >
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-zinc-700" />
          <motion.span
            className="text-sm tracking-widest uppercase"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll para explorar
          </motion.span>
          <motion.svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </motion.svg>
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-zinc-700" />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-950 to-transparent z-10" />
    </section>
  )
}