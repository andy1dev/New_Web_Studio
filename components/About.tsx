'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="nosotros" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-neon-blue/5 rounded-full blur-[120px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-neon-blue/20 via-transparent to-neon-purple/20 rounded-3xl blur-xl opacity-50" />
            
            <div className="relative glass-card p-10 rounded-3xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-neon-blue/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-lg">Innovación</h4>
                  <p className="text-zinc-400 text-sm">Tecnología de vanguardia para soluciones modernas.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-neon-cyan/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-lg">Equipos Dedicados</h4>
                  <p className="text-zinc-400 text-sm">Profesionales especializados en cada área.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-neon-purple/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-neon-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-lg">Seguridad</h4>
                  <p className="text-zinc-400 text-sm">Estándares enterprise en cada proyecto.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-lg">Escalabilidad</h4>
                  <p className="text-zinc-400 text-sm">Soluciones que crecen con tu negocio.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <span className="text-neon-cyan text-sm font-semibold tracking-widest uppercase mb-4 block">
                Sobre Nosotros
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Tu Partner Estratégico en <span className="gradient-text">Transformación Digital</span>
              </h2>
            </div>

            <div className="space-y-6 text-zinc-400 leading-relaxed">
              <p>
                En SPTECH Studio Web somos más que una agencia de desarrollo. Somos tus partners estratégicos en el camino hacia la transformación digital.
              </p>
              <p>
                Trabajamos con metodologías ágiles que nos permiten iterar rápidamente, adaptarnos a tus necesidades y entregar resultados excepcionales en cada sprint.
              </p>
              <p>
                Nuestra experiencia en múltiples sectoresindustriales nos permite comprender los desafíos únicos de cada proyecto y ofrecer soluciones a medida que impulsan el crecimiento real de tu negocio.
              </p>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {['MG', 'CP', 'JR'].map((initials, i) => (
                  <div 
                    key={i}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-sm font-bold text-dark-950 border-2 border-dark-950"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <p className="font-semibold text-white">Equipo Experto</p>
                <p className="text-zinc-500">Profesionales certificados</p>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <svg className="w-5 h-5 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Scrum & Kanban
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <svg className="w-5 h-5 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                CI/CD Pipeline
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <svg className="w-5 h-5 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Code Review
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}