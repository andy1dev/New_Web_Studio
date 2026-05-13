'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

const techCategories = [
  {
    title: 'Frontend',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    color: '#00D4FF',
    gradient: 'from-cyan-500/20 to-blue-500/10',
    borderColor: 'border-cyan-500/30',
    skills: [
      { name: 'React', level: 95, icon: '⚛️' },
      { name: 'Next.js', level: 92, icon: '▲' },
      { name: 'TypeScript', level: 90, icon: 'TS' },
      { name: 'Vue.js', level: 78, icon: 'V' },
      { name: 'Tailwind CSS', level: 95, icon: '🌬️' },
      { name: 'Framer Motion', level: 88, icon: '🎭' },
      { name: 'Three.js', level: 75, icon: '3D' },
      { name: 'CSS3 / SASS', level: 90, icon: '🎨' },
    ]
  },
  {
    title: 'Backend',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <circle cx="6" cy="6" r="1" fill="currentColor" />
        <circle cx="6" cy="18" r="1" fill="currentColor" />
      </svg>
    ),
    color: '#8B5CF6',
    gradient: 'from-purple-500/20 to-violet-500/10',
    borderColor: 'border-purple-500/30',
    skills: [
      { name: 'Node.js', level: 93, icon: '🟢' },
      { name: 'Python', level: 88, icon: '🐍' },
      { name: 'Go', level: 72, icon: 'Go' },
      { name: 'Java', level: 70, icon: '☕' },
      { name: 'PostgreSQL', level: 90, icon: '🐘' },
      { name: 'GraphQL', level: 82, icon: '◈' },
      { name: 'REST APIs', level: 95, icon: '🔗' },
      { name: 'NestJS', level: 85, icon: 'N' },
    ]
  },
  {
    title: 'Cloud & DevOps',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    color: '#F59E0B',
    gradient: 'from-amber-500/20 to-orange-500/10',
    borderColor: 'border-amber-500/30',
    skills: [
      { name: 'AWS', level: 88, icon: '☁️' },
      { name: 'Docker', level: 92, icon: '🐳' },
      { name: 'Kubernetes', level: 78, icon: '☸️' },
      { name: 'CI/CD', level: 90, icon: '🔄' },
      { name: 'Terraform', level: 75, icon: '🏗️' },
      { name: 'Linux', level: 85, icon: '🐧' },
      { name: 'GCP', level: 70, icon: 'G' },
      { name: 'Azure', level: 68, icon: 'A' },
    ]
  },
  {
    title: 'Mobile',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
    color: '#10B981',
    gradient: 'from-emerald-500/20 to-green-500/10',
    borderColor: 'border-emerald-500/30',
    skills: [
      { name: 'React Native', level: 90, icon: '⚛️' },
      { name: 'Flutter', level: 75, icon: '🦋' },
      { name: 'Swift', level: 68, icon: '🍎' },
      { name: 'Kotlin', level: 65, icon: 'K' },
      { name: 'Expo', level: 88, icon: 'E' },
      { name: 'Firebase', level: 85, icon: '🔥' },
      { name: 'GraphQL', level: 80, icon: '◈' },
      { name: 'REST APIs', level: 92, icon: '🔗' },
    ]
  },
]

const toolCategories = [
  {
    name: 'Diseño',
    icon: '🎨',
    items: ['Figma', 'Adobe XD', 'Sketch', 'Illustrator', 'Photoshop', 'After Effects', 'InVision', 'Zeplin'],
    color: '#EC4899'
  },
  {
    name: 'Gestión',
    icon: '📊',
    items: ['Git', 'GitHub', 'GitLab', 'Jira', 'Notion', 'Trello', 'Linear', 'Slack'],
    color: '#3B82F6'
  },
  {
    name: 'Testing',
    icon: '🧪',
    items: ['Jest', 'Cypress', 'Playwright', 'Mocha', 'Chai', 'Selenium', 'Postman', 'Insomnia'],
    color: '#10B981'
  },
  {
    name: 'Infraestructura',
    icon: '🛠️',
    items: ['Nginx', 'Vercel', 'Supabase', 'Firebase', 'Cloudflare', 'Datadog', 'Sentry', 'Elastic'],
    color: '#F59E0B'
  },
]

const stats = [
  { value: 50, suffix: '+', label: 'Proyectos Entregados', icon: '🚀' },
  { value: 99.9, suffix: '%', label: 'Uptime Garantizado', icon: '⚡' },
  { value: 24, suffix: '/7', label: 'Soporte Técnico', icon: '💬' },
  { value: 5, suffix: '+', label: 'Años de Experiencia', icon: '⭐' },
]

function AnimatedNumber({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const end = value
    const duration = 2000
    const increment = end / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [inView, value])

  return <span>{count}{suffix}</span>
}

export default function Technologies() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -200])

  return (
    <section id="technologies" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      {/* Parallax background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/20 to-transparent" />
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "auto" } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-zinc-800/50 border border-zinc-700/50 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-zinc-300 text-sm font-medium tracking-wide">Stack Tecnológico</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Tecnologías que <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Dominamos</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Implementamos soluciones modernas con un stack tecnológico de vanguardia para crear experiencias digitales excepcionales.
          </p>
        </motion.div>

        {/* Tech Categories Grid with Parallax */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {techCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: categoryIndex * 0.15 }}
              className={`relative rounded-2xl p-8 backdrop-blur-xl border ${category.borderColor} bg-gradient-to-br ${category.gradient} group hover:scale-[1.02] transition-all duration-500`}
            >
              {/* Glow effect on hover */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500`}
                style={{ backdropFilter: 'blur(20px)' }}
              />

              {/* Category Header */}
              <div className="relative z-10 flex items-center gap-4 mb-8">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${category.color}20`, color: category.color, border: `1px solid ${category.color}40` }}
                >
                  <div className="w-7 h-7">{category.icon}</div>
                </div>
                <h3 className="text-2xl font-bold" style={{ color: category.color }}>
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="relative z-10 space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: categoryIndex * 0.15 + skillIndex * 0.08 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="flex items-center gap-3 text-zinc-300 text-sm font-medium">
                        <span className="w-8 h-8 rounded-lg bg-zinc-800/80 flex items-center justify-center text-xs font-bold border border-zinc-700/50">
                          {skill.icon}
                        </span>
                        {skill.name}
                      </span>
                      <span className="text-sm font-bold font-mono" style={{ color: category.color }}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-zinc-800/80 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full relative"
                        style={{ background: `linear-gradient(90deg, ${category.color}80, ${category.color})` }}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1.2, delay: categoryIndex * 0.15 + skillIndex * 0.08 + 0.3, ease: 'easeOut' }}
                      >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tools Section with Hover Effects */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-10">
            Herramientas & Infraestructura
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {toolCategories.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="group relative"
              >
                <div className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" style={{ background: `${tool.color}30` }} />
                <div className="relative p-6 rounded-xl bg-zinc-900/80 border border-zinc-800/50 backdrop-blur-sm transition-all duration-300 group-hover:border-zinc-700/80">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-2xl">{tool.icon}</span>
                    <h4 className="text-lg font-semibold text-zinc-200">
                      {tool.name}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tool.items.map((item) => (
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        key={item}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-zinc-800/80 text-zinc-300 border border-zinc-700/50 transition-all duration-200 group-hover:border-zinc-600/80 cursor-default"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border border-zinc-800/50 backdrop-blur-sm transition-all duration-300 group"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={isInView} />
              </div>
              <p className="text-zinc-400 text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}