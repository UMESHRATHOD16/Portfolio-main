import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { projects } from '../../data'

const projectMeta = {
  megablog: {
    accent: '#8b5cf6',
    num: '01',
    tech: 'React · Appwrite',
  },
  ecosangam: {
    accent: '#06b6d4',
    num: '02',
    tech: 'React · Node.js · MongoDB',
  },
}

function ProjectRow({ project, index, inView }) {
  const [hovered, setHovered] = useState(false)
  const [mouseY, setMouseY] = useState(0)
  const meta = projectMeta[project.id] || projectMeta.megablog

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMouseY(e.clientY - rect.top)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative group"
    >
      {/* Hover preview image */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.85, x: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-72 h-44 rounded-xl overflow-hidden pointer-events-none z-20"
            style={{
              border: `1px solid ${meta.accent}30`,
              boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px ${meta.accent}20`,
            }}
          >
            {/* Visual placeholder */}
            <div
              className="w-full h-full flex items-center justify-center relative"
              style={{
                background: `linear-gradient(135deg, ${meta.accent}15, rgba(0,0,0,0.8))`,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${meta.accent}20, transparent 70%)`,
                }}
              />
              <div className="relative z-10 text-center">
                <div
                  className="font-black leading-none select-none"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '5rem',
                    WebkitTextStroke: `1px ${meta.accent}50`,
                    color: 'transparent',
                  }}
                >
                  {meta.num}
                </div>
                <p
                  className="text-xs font-medium mt-2"
                  style={{ color: meta.accent }}
                >
                  {project.title}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Row */}
      <a
        href={project.github}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-6 py-6 border-b group"
        style={{
          borderColor: hovered
            ? `${meta.accent}30`
            : 'rgba(255,255,255,0.06)',
          transition: 'border-color 0.3s',
        }}
      >
        {/* Number */}
        <span
          className="text-xs font-mono w-6 flex-shrink-0 transition-colors duration-300"
          style={{ color: hovered ? meta.accent : 'rgba(255,255,255,0.2)' }}
        >
          {meta.num}
        </span>

        {/* Tech */}
        <span
          className="text-xs tracking-widest uppercase hidden sm:block w-40 flex-shrink-0 transition-colors duration-300"
          style={{ color: hovered ? meta.accent : 'rgba(255,255,255,0.3)' }}
        >
          {meta.tech}
        </span>

        {/* Title */}
        <h3
          className="flex-1 font-black text-3xl sm:text-4xl lg:text-5xl leading-none transition-all duration-300"
          style={{
            fontFamily: "'Syne', sans-serif",
            color: hovered ? 'white' : 'rgba(255,255,255,0.7)',
            transform: hovered ? 'translateX(8px)' : 'translateX(0)',
          }}
        >
          {project.title.toUpperCase()}
        </h3>

        {/* Arrow */}
        <motion.span
          animate={{
            x: hovered ? 0 : -8,
            opacity: hovered ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="text-2xl flex-shrink-0"
          style={{ color: meta.accent }}
        >
          ↗
        </motion.span>
      </a>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="projects"
      ref={ref}
      className="py-20 px-6 max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="mb-14">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[0.3em] uppercase text-accent font-medium"
        >
          03 — Projects
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mt-3"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          What I've Built
        </motion.h2>
      </div>

      {/* Top border */}
      <div
        className="border-t mb-0"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      />

      {/* Project rows */}
      {projects.map((project, i) => (
        <ProjectRow
          key={project.id}
          project={project}
          index={i}
          inView={inView}
        />
      ))}

    </section>
  )
}