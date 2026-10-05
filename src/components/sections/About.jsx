import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { personalInfo } from '../../data'

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      ref={ref}
      className="flex flex-col justify-center px-6 max-w-6xl mx-auto py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-16"
      >
        <span className="text-xs tracking-[0.3em] uppercase text-accent font-medium">
          About Me
        </span>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-16 items-start">

        {/* Left — big quote */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2
            className="text-4xl sm:text-5xl font-bold leading-tight text-slate-900 dark:text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Started with GTA.<br />
            Ended up building<br />
            <span className="text-accent">AI-powered apps.</span>
          </h2>
        </motion.div>

        {/* Right — bio + links */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-6"
        >
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
            {personalInfo.bio.p2}
          </p>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
            {personalInfo.bio.p3}
          </p>

          {/* Status */}
          <div className="flex items-center gap-3 pt-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Open to internship opportunities
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4 pt-4">
            {[
              { label: 'GitHub', href: personalInfo.contact.github },
              { label: 'LinkedIn', href: personalInfo.contact.linkedin },
              { label: 'Hashnode', href: personalInfo.contact.hashnode },
              { label: 'Resume ↗', href: personalInfo.contact.resume },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-slate-400 hover:text-accent transition-colors tracking-wide border-b border-slate-200 dark:border-slate-700 hover:border-accent pb-0.5"
              >
                {label}
              </a>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}