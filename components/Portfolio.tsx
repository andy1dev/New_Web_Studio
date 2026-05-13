'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const projects = [
  {
    id: 1,
    title: 'BCB Play',
    category: 'eCommerce Gaming',
    date: '2024',
    description: 'Plataforma de venta de juegos digitales con integración de pagos múltiples y sistema de claves automatizado.',
    gradient: 'from-purple-600 to-blue-600',
    image: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
  },
  {
    id: 2,
    title: 'Clínica Los Ángeles',
    category: 'Sistema Médico',
    date: '2024',
    description: 'Sistema de gestión hospitalaria con agendamiento de citas, historias clínicas electrónicas y facturación SRI.',
    gradient: 'from-emerald-600 to-teal-600',
    image: 'linear-gradient(135deg, #0d1b2a 0%, #1b3a4b 100%)',
  },
  {
    id: 3,
    title: 'Reuma Excelencia',
    category: 'Landing Page médica',
    date: '2023',
    description: 'Sitio web informativo para consultorio de reumatología con sistema de citas en línea y zona de pacientes.',
    gradient: 'from-orange-600 to-red-600',
    image: 'linear-gradient(135deg, #1a0a0a 0%, #2d1b1b 100%)',
  },
  {
    id: 4,
    title: 'Biology Locbio',
    category: 'eCommerce Científico',
    date: '2024',
    description: 'Tienda online para productos de laboratorio con catálogo avanzado, búsqueda por características y gestión de inventario.',
    gradient: 'from-cyan-600 to-blue-600',
    image: 'linear-gradient(135deg, #0a1a2e 0%, #1a2d4a 100%)',
  },
  {
    id: 5,
    title: 'Handy VIP',
    category: 'App de Servicios',
    date: '2023',
    description: 'Aplicación móvil para servicios de limpieza premium con geolocalización, seguimiento en tiempo real y pagos integrados.',
    gradient: 'from-amber-600 to-yellow-600',
    image: 'linear-gradient(135deg, #1a1a0a 0%, #2d2a1a 100%)',
  },
]

export default function Portfolio() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeProject, setActiveProject] = useState<number | null>(null)

  return (
    <section id="portafolio" className="relative py-32 px-6">
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      <div className="relative z-10 max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-neon-cyan text-sm font-semibold tracking-widest uppercase mb-4 block">
            Nuestro Trabajo
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Proyectos que <span className="gradient-text">Inspiran</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Cada proyecto es una historia de transformación digital. Conoce cómo hemos ayudado a empresas como la tuya.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className={`portfolio-card aspect-[4/3] overflow-hidden cursor-pointer ${activeProject === project.id ? 'ring-2 ring-neon-blue' : ''}`}>
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${project.image}`}
                />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-20 group-hover:opacity-30 transition-opacity">
                    {project.id === 1 && '🎮'}
                    {project.id === 2 && '🏥'}
                    {project.id === 3 && '💊'}
                    {project.id === 4 && '🧬'}
                    {project.id === 5 && '✨'}
                  </div>
                </div>

                <div className="overlay" />
                
                <div className="content absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-neon-blue/20 text-neon-cyan border border-neon-blue/30">
                      {project.category}
                    </span>
                    <span className="text-zinc-500 text-sm">{project.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="w-10 h-10 rounded-full bg-neon-blue flex items-center justify-center">
                    <svg className="w-5 h-5 text-dark-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <h4 className="font-semibold group-hover:text-neon-cyan transition-colors">
                  {project.title}
                </h4>
                <span className="text-sm text-zinc-500">{project.date}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <button className="group px-8 py-4 rounded-xl font-semibold border border-zinc-700 text-zinc-300 hover:border-neon-blue hover:text-white transition-all duration-300 glass">
            <span className="flex items-center gap-2">
              Ver Todos los Proyectos
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}