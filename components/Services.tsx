'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
  {
    num: '01',
    category: 'Desarrollo',
    title: 'Desarrollo Web a Medida',
    description: 'Construimos sitios y apps con React, Next.js y Node ? sin plantillas, sin atajos. Cada l?nea pensada para escalar contigo.',
    tags: ['React', 'Next.js', 'Node', 'Core Web Vitals'],
    size: 'hero' as const,
    pos: 0,
  },
  {
    num: '02',
    category: 'Comercio',
    title: 'E-commerce que vende',
    description: 'Tiendas online optimizadas para conversi?n. Pasarelas locales, inventario y experiencia impecable.',
    tags: [],
    size: 'tall' as const,
    pos: 1,
  },
  {
    num: '03',
    category: 'Crecimiento',
    title: 'SEO & Performance',
    description: 'Posicionamiento org?nico real. Lighthouse 90+. Que Google y tus clientes te encuentren.',
    tags: [],
    size: 'wide' as const,
    pos: 2,
    stat: '90+',
    statLabel: 'Lighthouse',
  },
  {
    num: '04',
    category: 'Sistemas',
    title: 'ERP & Facturaci?n',
    description: 'Facturaci?n electr?nica SRI, ERP a medida y plataformas Moodle / LMS.',
    tags: [],
    size: 'square' as const,
    pos: 3,
  },
  {
    num: '05',
    category: 'Soporte',
    title: 'Soporte VIP',
    description: 'No te dejamos solo. Mejora continua post-lanzamiento.',
    tags: [],
    size: 'square' as const,
    pos: 4,
    stat: '24h',
  },
  {
    num: '06',
    category: 'Track record',
    title: '+50',
    description: '',
    tags: [],
    size: 'square' as const,
    pos: 5,
    statLabel: 'Proyectos ? 4 pa?ses',
    isStat: true,
  },
]

function BentoCanvas({ type }: { type: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frame = 0
    let animId: number

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    new ResizeObserver(resize).observe(canvas)

    const draw = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight

      if (type === 'dev') {
        ctx.fillStyle = 'rgba(10,10,14,1)'
        ctx.fillRect(0, 0, w, h)

        const codeX = w * 0.55
        const codeY = h * 0.18
        const codeW = w * 0.42
        const codeLines = [
          { indent: 0, text: 'export default function App() {', col: 'kw' },
          { indent: 1, text: 'const [data, setData] = useState([]);', col: 'fn' },
          { indent: 1, text: 'useEffect(() => fetch(url), []);', col: 'fn' },
          { indent: 1, text: 'return (', col: 'kw' },
          { indent: 2, text: '<Layout title="SPTECH">', col: 'tag' },
          { indent: 3, text: '<Hero data={data} />', col: 'tag' },
          { indent: 3, text: '<Footer />', col: 'tag' },
          { indent: 2, text: '</Layout>', col: 'tag' },
          { indent: 1, text: ');', col: 'kw' },
          { indent: 0, text: '}', col: 'kw' },
        ]

        const lineH = 16
        const charW = 6.6
        const cycle = 600
        const t = (frame % cycle) / cycle
        const totalChars = codeLines.reduce((s, l) => s + l.text.length + 1, 0)
        let charsToShow = Math.floor(t * totalChars * 1.4)

        ctx.font = '500 11px Geist Mono, monospace'
        let charsDone = 0
        codeLines.forEach((line, i) => {
          const y = codeY + i * lineH
          ctx.fillStyle = 'rgba(255,255,255,0.12)'
          ctx.fillText(String(i + 1).padStart(2, ' '), codeX, y)
          const startX = codeX + 22 + line.indent * charW * 2
          const remaining = Math.max(0, charsToShow - charsDone)
          const visible = line.text.slice(0, remaining)
          const colorMap: Record<string, string> = {
            kw: 'rgba(0,240,255,0.55)',
            fn: 'rgba(255,255,255,0.32)',
            tag: 'rgba(120,220,255,0.42)',
          }
          ctx.fillStyle = colorMap[line.col] || 'rgba(255,255,255,0.4)'
          ctx.fillText(visible, startX, y)
          if (remaining > 0 && remaining < line.text.length && Math.floor(frame / 20) % 2 === 0) {
            const cx = startX + visible.length * charW
            ctx.fillStyle = 'rgba(0,240,255,0.9)'
            ctx.fillRect(cx, y - 9, 1.5, 11)
          }
          charsDone += line.text.length + 1
        })

        const g = ctx.createLinearGradient(0, 0, w, 0)
        g.addColorStop(0, 'rgba(10,10,14,1)')
        g.addColorStop(0.45, 'rgba(10,10,14,0.85)')
        g.addColorStop(0.65, 'rgba(10,10,14,0)')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, w, h)
      } else if (type === 'ecommerce') {
        ctx.fillStyle = 'rgba(8,12,16,1)'
        ctx.fillRect(0, 0, w, h)

        const cx = w / 2
        const cy = h * 0.42

        for (let i = 0; i < 3; i++) {
          const t = ((frame * 0.012) + i * 0.33) % 1
          const r = 30 + t * Math.min(w, h) * 0.55
          ctx.strokeStyle = `rgba(0,240,255,${(1 - t) * 0.35})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(cx, cy, r, 0, Math.PI * 2)
          ctx.stroke()
        }

        ctx.save()
        ctx.translate(cx, cy)
        const scale = Math.min(w, h) / 220
        ctx.scale(scale, scale)
        ctx.strokeStyle = 'rgba(0,240,255,0.85)'
        ctx.lineWidth = 2.4
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.beginPath()
        ctx.moveTo(-32, -22)
        ctx.lineTo(-22, -22)
        ctx.lineTo(-14, 14)
        ctx.lineTo(26, 14)
        ctx.lineTo(34, -10)
        ctx.lineTo(-18, -10)
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(-8, 24, 4, 0, Math.PI * 2)
        ctx.arc(20, 24, 4, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()

        const tags = ['+$1.2K', '+$840', '+$2.1K', '+$560', '+$3.4K']
        ctx.font = '600 11px Geist Mono, monospace'
        for (let i = 0; i < tags.length; i++) {
          const t = ((frame * 0.008) + i * 0.2) % 1
          const x = w * 0.15 + ((i * 173) % (w * 0.7))
          const y = h - t * h * 0.9
          const alpha = Math.sin(t * Math.PI) * 0.55
          ctx.fillStyle = `rgba(0,240,255,${alpha})`
          ctx.fillText(tags[i], x, y)
        }
      } else {
        // Default
        ctx.fillStyle = 'rgba(10,10,14,1)'
        ctx.fillRect(0, 0, w, h)

        for (let i = 0; i < 20; i++) {
          const x = Math.sin(frame * 0.01 + i * 0.5) * w * 0.3 + w / 2
          const y = Math.cos(frame * 0.01 + i * 0.3) * h * 0.3 + h / 2
          const alpha = 0.1 + Math.sin(frame * 0.02 + i) * 0.1
          ctx.fillStyle = `rgba(0,240,255,${alpha})`
          ctx.beginPath()
          ctx.arc(x, y, 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      frame++
      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => cancelAnimationFrame(animId)
  }, [type])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-[0.18] transition-opacity duration-500 group-hover:opacity-[0.32]"
      style={{ zIndex: 1 }}
    />
  )
}

export default function Services() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="servicios"
      className="relative py-32 px-6 md:px-16 overflow-hidden"
      style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* Watermark */}
      <div
        className="absolute top-1/2 right-[-60px] md:right-[-100px] -translate-y-1/2 text-[clamp(100px,18vw,220px)] font-bold tracking-tighter select-none pointer-events-none opacity-[0.018] text-white whitespace-nowrap"
        style={{ zIndex: 0 }}
      >
        SERVICIOS
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-16 relative z-10"
      >
        <div>
          <p className="text-xs tracking-[0.18em] uppercase text-white/30 font-mono mb-3">
            Lo que hacemos
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white" style={{ letterSpacing: '-0.035em' }}>
            nuestros <em className="not-italic text-white/40 font-normal">servicios</em>
          </h2>
        </div>
        <p className="text-white/50 text-sm leading-relaxed max-w-sm">
          Cinco disciplinas, un solo equipo. Sin intermediarios, sin terciarizaciones. Estrategia, dise?o, c?digo y soporte bajo el mismo techo.
        </p>
      </motion.div>

      {/* Bento Grid with Tarot Fan Effect */}
      <div className="bento-wrapper relative z-10" ref={ref}>
        <div className="bento-grid">
          {services.map((service, index) => {
            const isHero = service.size === 'hero'
            const isTall = service.size === 'tall'
            const isWide = service.size === 'wide'

            if (service.isStat) {
              return (
                <motion.div
                  key={service.num}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className={`
                    bento-card relative rounded-3xl border border-white/[0.08]
                    bg-gradient-to-b from-white/[0.025] to-white/[0.005]
                    flex flex-col justify-between p-6 md:p-8
                    col-span-1 md:col-span-3
                  `}
                  style={{
                    boxShadow: '0 1px 1px rgba(255,255,255,0.04), 0 12px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
                    cursor: 'default',
                    zIndex: 1,
                  }}
                >
                  <span className="text-[11px] tracking-[0.12em] uppercase text-white/40 font-mono">
                    Track record
                  </span>
                  <div>
                    <div className="text-4xl md:text-5xl font-bold text-white" style={{ letterSpacing: '-0.04em' }}>
                      +50
                    </div>
                    <p className="text-[11px] font-mono tracking-wider uppercase text-white/40 mt-2">
                      {service.statLabel}
                    </p>
                  </div>
                </motion.div>
              )
            }

            return (
              <motion.a
                key={service.num}
                href="https://wa.link/mjgcu3"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className={`
                  bento-card group relative rounded-3xl border border-white/[0.08]
                  bg-gradient-to-b from-white/[0.025] to-white/[0.005]
                  transition-all duration-500
                  hover:-translate-y-2 hover:rotate-x-2 hover:scale-[1.01]
                  hover:border-cyan-400/40
                  flex flex-col justify-between p-6 md:p-8
                  ${isHero ? 'col-span-2 md:col-span-4 row-span-2' : ''}
                  ${isTall ? 'col-span-1 md:col-span-2 row-span-2' : ''}
                  ${isWide ? 'col-span-1 md:col-span-3' : ''}
                  ${service.size === 'square' ? 'col-span-1 md:col-span-3' : ''}
                `}
                style={{
                  boxShadow: '0 1px 1px rgba(255,255,255,0.04), 0 12px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
                  zIndex: 1,
                }}
                data-pos={service.pos}
              >
                {/* Canvas Visual */}
                <BentoCanvas type={service.num === '01' ? 'dev' : service.num === '02' ? 'ecommerce' : 'default'} />

                {/* Arrow */}
                <div
                  className="arrow-icon absolute top-6 right-6 md:top-8 md:right-8 w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center transition-all duration-300 group-hover:bg-cyan-400 group-hover:rotate-[45deg]"
                >
                  <svg className="w-4 h-4 text-white transition-colors duration-300 group-hover:stroke-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>

                {/* Top: Number */}
                <p className="text-[11px] tracking-[0.12em] uppercase text-cyan-400 font-mono relative z-10">
                  {service.num} / {service.category}
                </p>

                {/* Bottom content */}
                <div className="relative z-10">
                  <h3
                    className={`font-bold text-white leading-tight mb-3 ${isHero ? 'text-2xl md:text-3xl' : isTall ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}`}
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {service.title}
                  </h3>

                  {service.description && (
                    <p className="text-white/50 text-[13px] leading-relaxed mb-4 max-w-[90%]">
                      {service.description}
                    </p>
                  )}

                  {/* Tags */}
                  {service.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase text-white/50 border border-white/[0.08] rounded-full bg-black/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Stat */}
                  {service.stat && (
                    <div className="text-right mt-4">
                      <div className="text-3xl md:text-4xl font-bold text-white" style={{ letterSpacing: '-0.04em' }}>
                        {service.stat}
                      </div>
                      {service.statLabel && (
                        <p className="text-[11px] font-mono tracking-wider uppercase text-white/40 mt-2">
                          {service.statLabel}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        .bento-wrapper:has(.bento-card:hover) .bento-card:not(:hover) {
          opacity: 0.4;
          filter: blur(2px) saturate(0.6);
        }

        .bento-card {
          position: relative;
          overflow: hidden;
        }

        .bento-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          grid-auto-rows: 240px;
          gap: 16px;
          max-width: 1400px;
          margin: 0 auto;
        }

        @media (max-width: 1024px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 200px;
          }
          .bento-card {
            grid-column: span 2 !important;
          }
          .bento-card[data-pos="0"],
          .bento-card[data-pos="1"] {
            grid-row: span 2;
          }
        }

        @media (max-width: 640px) {
          .bento-grid {
            grid-template-columns: 1fr;
          }
          .bento-card {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
          }
        }
      `}</style>
    </section>
  )
}

