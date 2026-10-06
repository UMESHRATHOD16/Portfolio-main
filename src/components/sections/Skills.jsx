import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaCss3Alt } from 'react-icons/fa'
import {
  SiReact, SiJavascript, SiNodedotjs,
  SiExpress, SiMongodb, SiTailwindcss, SiRedux,
  SiGit, SiGithub, SiHtml5,
  SiPython, SiFastapi, SiAppwrite, SiVite
} from 'react-icons/si'
import { TbBrandCpp } from 'react-icons/tb'

const techStack = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Redux', icon: SiRedux, color: '#764ABC' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'Express', icon: SiExpress, color: '#ffffff' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
  { name: 'Appwrite', icon: SiAppwrite, color: '#FD366E' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'C++', icon: TbBrandCpp, color: '#00599C' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'GitHub', icon: SiGithub, color: '#ffffff' },
  { name: 'Vite', icon: SiVite, color: '#646CFF' },
]

const rows = [
  [0, 1, 2, 3],
  [4, 5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15],
]

function TechIcon({ tech, delay, inView }) {
  const [hovered, setHovered] = useState(false)
  const Icon = tech.icon

  // Random float values per icon
  const floatY = Math.random() * 10 + 6
  const floatDuration = Math.random() * 2 + 3
  const floatDelay = Math.random() * 2

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 30 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col items-center gap-3 cursor-default relative"
      style={{ width: '90px' }}
    >
      {/* Floating wrapper */}
      <motion.div
        animate={inView ? {
          y: [-floatY / 2, floatY / 2, -floatY / 2],
        } : {}}
        transition={{
          duration: floatDuration,
          delay: floatDelay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="flex flex-col items-center gap-3"
      >
        <motion.div
          animate={hovered ? { y: -8, scale: 1.15 } : { y: 0, scale: 1 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            background: hovered
              ? `${tech.color}20`
              : 'rgba(255,255,255,0.04)',
            border: `1px solid ${hovered ? tech.color + '60' : 'rgba(255,255,255,0.08)'}`,
            boxShadow: hovered
              ? `0 0 30px ${tech.color}40, 0 8px 30px rgba(0,0,0,0.4)`
              : 'none',
            transition: 'background 0.25s, border 0.25s, box-shadow 0.25s',
          }}
        >
          <Icon
            size={30}
            color={hovered ? tech.color : 'rgba(255,255,255,0.55)'}
            style={{ transition: 'color 0.25s' }}
          />
        </motion.div>

        <span
          className="text-xs font-medium text-center transition-colors duration-200"
          style={{ color: hovered ? tech.color : 'rgba(255,255,255,0.4)' }}
        >
          {tech.name}
        </span>
      </motion.div>

      {hovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -top-9 px-2.5 py-1 rounded-lg text-[10px] font-semibold text-white pointer-events-none z-20 whitespace-nowrap"
          style={{
            background: `linear-gradient(135deg, ${tech.color}, ${tech.color}aa)`,
            boxShadow: `0 4px 12px ${tech.color}40`,
          }}
        >
          {tech.name}
        </motion.div>
      )}
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  let delayCounter = 0

  return (
    <section
      id="skills"
      ref={ref}
      className="py-20 px-6 relative overflow-hidden"
    >

      {/* Purple orb */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Section header */}
      <div className="max-w-6xl mx-auto mb-14">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xls tracking-[0.3em] uppercase text-accent font-medium"
        >
         Skills
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mt-3"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Tech Stack
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-500 dark:text-slate-400 text-sm mt-3"
        >
          Technologies I work with — and ones I'm currently unlocking.
        </motion.p>
      </div>

      {/* Icon diamond */}
      <div className="flex flex-col items-center gap-6 relative z-10">
        {rows.map((row, rowIndex) => (
          <motion.div
            key={rowIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: rowIndex * 0.1 + 0.3 }}
            className="flex items-center gap-6"
          >
            {row.map((techIndex) => {
              const d = delayCounter++ * 0.04 + 0.3
              return (
                <TechIcon
                  key={techIndex}
                  tech={techStack[techIndex]}
                  delay={d}
                  inView={inView}
                />
              )
            })}
          </motion.div>
        ))}
      </div>

      {/* Bottom text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1 }}
        className="text-center text-xs tracking-[0.3em] uppercase text-slate-500 mt-14"
      >
        Still in training arc · Power level: rising ↑
      </motion.p>

    </section>
  )
}