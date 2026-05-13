'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const navLinks = {
  servicios: ['Frontend', 'Backend', 'eCommerce', 'Facturación', 'ERP', 'LMS'],
  empresa: ['Sobre Nosotros', 'Portafolio', 'Metodología', 'Carreras'],
  legal: ['Términos', 'Privacidad', 'Cookies'],
}

const socialLinks = [
  { name: 'LinkedIn', icon: 'in', href: '#' },
  { name: 'GitHub', icon: 'gh', href: '#' },
  { name: 'Twitter', icon: 'x', href: '#' },
  { name: 'Instagram', icon: 'ig', href: '#' },
]

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormState({ name: '', email: '', message: '' })
    }, 3000)
  }

  return (
    <footer className="relative pt-32 pb-12 px-6 bg-dark-900">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold mb-4">
                ¿Listo para <span className="gradient-text">transformar</span> tu negocio?
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Agenda una consulta gratuita y descubre cómo podemos ayudarte a alcanzar tus objetivos digitales.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-neon-blue/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold mb-1">Ubicación</p>
                  <p className="text-zinc-400 text-sm">Av. Unidad Nacional y México, Cuenca, Ecuador</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold mb-1">Email</p>
                  <a href="mailto:hola@sptech.ec" className="text-zinc-400 text-sm hover:text-neon-cyan transition-colors">
                    hola@sptech.ec
                  </a>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-12 h-12 rounded-xl bg-dark-800 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:border-neon-blue hover:text-neon-cyan transition-all duration-300"
                  aria-label={social.name}
                >
                  <span className="text-xs font-bold">{social.icon}</span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-3xl space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-zinc-800 text-white placeholder-zinc-500 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue/20 transition-all"
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-zinc-800 text-white placeholder-zinc-500 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue/20 transition-all"
                    placeholder="correo@ejemplo.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-zinc-800 text-white placeholder-zinc-500 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue/20 transition-all resize-none"
                  placeholder="Cuéntanos sobre tu proyecto..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  submitted
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gradient-to-r from-neon-blue to-neon-cyan text-dark-950 hover:shadow-lg hover:shadow-neon-blue/25'
                }`}
              >
                {submitted ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    ¡Mensaje Enviado!
                  </span>
                ) : (
                  'Enviar Mensaje'
                )}
              </button>
            </form>
          </motion.div>
        </div>

        <div className="border-t border-zinc-800 pt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-semibold mb-4">Servicios</h4>
              <ul className="space-y-3">
                {navLinks.servicios.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-zinc-400 text-sm hover:text-neon-cyan transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-3">
                {navLinks.empresa.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-zinc-400 text-sm hover:text-neon-cyan transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-3">
                {navLinks.legal.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-zinc-400 text-sm hover:text-neon-cyan transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="mb-4">
                <span className="text-2xl font-bold">SPTECH</span>
                <span className="text-2xl font-light text-neon-cyan">Studio Web</span>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Transformamos desafíos en activos digitales. Desarrollo de software a medida en Cuenca.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-zinc-800">
            <p className="text-zinc-500 text-sm">
              © 2024 SPTECH Studio Web. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-2 text-zinc-500 text-sm">
              <span>Hecho con</span>
              <span className="text-red-500">❤</span>
              <span>en Cuenca, Ecuador</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}