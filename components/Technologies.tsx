'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

const categories = [
  {
    title: 'Frontend',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    color: '#00D4FF',
    gradient: 'from-cyan-500/20 to-blue-500/10',
    borderColor: 'border-cyan-500/30',
    shadow: 'hover:shadow-cyan-500/20',
    direction: 'normal',
    duration: 25,
    skills: [
      { name: 'React', icon: '⚛️' },
      { name: 'Next.js', icon: '▲' },
      { name: 'TypeScript', icon: 'TS' },
      { name: 'Vue.js', icon: 'V' },
      { name: 'Tailwind', icon: '🌬️' },
      { name: 'Framer', icon: '🎭' },
      { name: 'Three.js', icon: '3D' },
      { name: 'CSS3', icon: '🎨' },
    ]
  },
  {
    title: 'Backend',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <circle cx="6" cy="6" r="1" fill="currentColor" />
        <circle cx="6" cy="18" r="1" fill="currentColor" />
      </svg>
    ),
    color: '#8B5CF6',
    gradient: 'from-purple-500/20 to-violet-500/10',
    borderColor: 'border-purple-500/30',
    shadow: 'hover:shadow-purple-500/20',
    direction: 'reverse',
    duration: 28,
    skills: [
      { name: 'Node.js', icon: '🟢' },
      { name: 'Python', icon: '🐍' },
      { name: 'Go', icon: 'Go' },
      { name: 'Java', icon: '☕' },
      { name: 'PostgreSQL', icon: '🐘' },
      { name: 'GraphQL', icon: '◈' },
      { name: 'REST API', icon: '🔗' },
      { name: 'NestJS', icon: 'N' },
    ]
  },
  {
    title: 'Cloud & DevOps',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    color: '#F59E0B',
    gradient: 'from-amber-500/20 to-orange-500/10',
    borderColor: 'border-amber-500/30',
    shadow: 'hover:shadow-amber-500/20',
    direction: 'normal',
    duration: 22,
    skills: [
      { name: 'AWS', icon: '☁️' },
      { name: 'Docker', icon: '🐳' },
      { name: 'K8s', icon: '☸️' },
      { name: 'CI/CD', icon: '🔄' },
      { name: 'Terraform', icon: '🏗️' },
      { name: 'Linux', icon: '🐧' },
      { name: 'GCP', icon: 'GCP' },
      { name: 'Azure', icon: 'Az' },
    ]
  },
  {
    title: 'Mobile',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
    color: '#10B981',
    gradient: 'from-emerald-500/20 to-green-500/10',
    borderColor: 'border-emerald-500/30',
    shadow: 'hover:shadow-emerald-500/20',
    direction: 'reverse',
    duration: 26,
    skills: [
      { name: 'React Native', icon: '⚛️' },
      { name: 'Flutter', icon: '🦋' },
      { name: 'Swift', icon: '🍎' },
      { name: 'Kotlin', icon: 'K' },
      { name: 'Expo', icon: 'E' },
      { name: 'Firebase', icon: '🔥' },
      { name: 'GraphQL', icon: '◈' },
      { name: 'REST API', icon: '🔗' },
    ]
  },
]

function TechCard({ name, icon }: { name: string; icon: string }) {
  return (
    <div className="w-[120px] flex-shrink-0 bg-zinc-900/80 border border-zinc-800/50 rounded-xl p-4 text-center hover:border-cyan-500/50 hover:bg-zinc-800/80 transition-all cursor-pointer shadow-lg hover:shadow-cyan-500/20">
      <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-zinc-800/80 flex items-center justify-center text-xl border border-zinc-700/50 shadow-inner">
        {icon}
      </div>
      <span className="text-zinc-300 text-sm font-medium block">{name}</span>
    </div>
  )
}

function InfiniteSlider({ skills, duration, direction, borderColor, shadowColor }: { 
  skills: { name: string; icon: string }[]; 
  duration: number; 
  direction: 'normal' | 'reverse';
  borderColor: string;
  shadowColor: string;
}) {
  const doubledSkills = [...skills, ...skills]
  
  return (
    <div 
      className="relative z-10 pb-4 overflow-hidden group"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
    >
      <div
        className="flex gap-4 w-max"
        style={{
          animation: `scroll ${duration}s linear infinite`,
          animationDirection: direction === 'reverse' ? 'reverse' : 'normal',
        }}
        onMouseEnter={(e) => {
          const target = e.currentTarget as HTMLElement
          target.style.animationPlayState = 'paused'
        }}
        onMouseLeave={(e) => {
          const target = e.currentTarget as HTMLElement
          target.style.animationPlayState = 'running'
        }}
      >
        {doubledSkills.map((skill, index) => (
          <div 
            key={`${skill.name}-${index}`}
            className={`w-[120px] flex-shrink-0 bg-zinc-900/80 border border-zinc-800/50 rounded-xl p-4 text-center hover:border-opacity-50 transition-all cursor-pointer shadow-lg hover:shadow-xl ${borderColor} ${shadowColor}`}
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-zinc-800/80 flex items-center justify-center text-xl border border-zinc-700/50 shadow-inner">
              {skill.icon}
            </div>
            <span className="text-zinc-300 text-sm font-medium block">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Technologies() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -200])

  const getCategoryStyles = (category: typeof categories[0]) => {
    const colorMap: Record<string, { border: string; shadow: string }> = {
      '#00D4FF': { border: 'hover:border-cyan-500/50', shadow: 'hover:shadow-cyan-500/20' },
      '#8B5CF6': { border: 'hover:border-purple-500/50', shadow: 'hover:shadow-purple-500/20' },
      '#F59E0B': { border: 'hover:border-amber-500/50', shadow: 'hover:shadow-amber-500/20' },
      '#10B981': { border: 'hover:border-emerald-500/50', shadow: 'hover:shadow-emerald-500/20' },
    }
    return colorMap[category.color] || { border: 'hover:border-violet-500/50', shadow: 'hover:shadow-violet-500/20' }
  }

  return (
    <>
      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 0.5rem));
          }
        }
      `}</style>
      
      <section id="technologies" className="relative py-32 px-6 overflow-hidden" ref={ref}>
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 mt-8"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: "auto" } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-zinc-800/50 border border-zinc-700/50 mb-6 shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
              <span className="text-zinc-300 text-sm font-medium tracking-wide">Stack Tecnológico</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Tecnologías que <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400">Dominamos</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Implementamos soluciones modernas con un stack tecnológico de vanguardia para crear experiencias digitales excepcionales.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {categories.map((category, categoryIndex) => {
              const styles = getCategoryStyles(category)
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 60 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: categoryIndex * 0.15 }}
                  className={`relative rounded-2xl p-8 backdrop-blur-xl border ${category.borderColor} bg-gradient-to-br ${category.gradient} group transition-all duration-500 hover:scale-[1.02] overflow-hidden`}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none`}
                  />

                  <div className="relative z-10 flex items-center gap-4 mb-8">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${category.color}20`, color: category.color, border: `1px solid ${category.color}40` }}
                    >
                      {category.icon}
                    </div>
                    <h3 className="text-2xl font-bold" style={{ color: category.color }}>
                      {category.title}
                    </h3>
                  </div>

                  <InfiniteSlider
                    skills={category.skills}
                    duration={category.duration}
                    direction={category.direction as 'normal' | 'reverse'}
                    borderColor={styles.border}
                    shadowColor={styles.shadow}
                  />
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}