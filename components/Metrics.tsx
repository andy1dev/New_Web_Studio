'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const metrics = [
  {
    value: 247,
    suffix: '+',
    label: 'Proyectos Realizados',
    description: 'Soluciones entregadas exitosamente',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    value: 312,
    suffix: '+',
    label: 'Clientes Satisfechos',
    description: 'Empresas que confían en nosotros',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    value: 12,
    suffix: '+',
    label: 'Años de Experiencia',
    description: 'Trayectoria en desarrollo web',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    value: 98,
    suffix: '%',
    label: 'Tasa de Éxito',
    description: 'Proyectos entregados a tiempo',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
]

export default function Metrics() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const countersRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    if (!isInView) return

    countersRef.current.forEach((counter, index) => {
      if (!counter) return

      const target = metrics[index].value
      const obj = { value: 0 }

      gsap.to(obj, {
        value: target,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
        },
        onUpdate: () => {
          if (counter) {
            counter.textContent = Math.round(obj.value).toString()
          }
        },
      })
    })
  }, [isInView])

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-neon-blue/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-neon-cyan text-sm font-semibold tracking-widest uppercase mb-4 block">
            Resultados
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Números que <span className="gradient-text">Hablan</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-8 text-center group hover:border-neon-blue/30 transition-all duration-500"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-neon-blue/20 to-neon-cyan/10 flex items-center justify-center text-neon-cyan group-hover:scale-110 transition-transform duration-300">
                {metric.icon}
              </div>

              <div className="text-5xl md:text-6xl font-bold mb-3">
                <span
                  ref={(el) => { countersRef.current[index] = el }}
                  className="counter-value text-white"
                >
                  0
                </span>
                <span className="gradient-text">{metric.suffix}</span>
              </div>

              <h3 className="text-xl font-semibold mb-2">{metric.label}</h3>
              <p className="text-zinc-500 text-sm">{metric.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}