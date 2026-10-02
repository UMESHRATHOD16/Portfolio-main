import { motion } from 'framer-motion'
import { personalInfo } from '../../data'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between px-6 pt-8 pb-8 overflow-hidden"
    >

      {/* Top row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex items-center justify-between pt-20"
      >
        <span className="text-xs tracking-[0.3em] uppercase text-slate-400 dark:text-slate-500">
          {personalInfo.name}
        </span>
        <span className="text-xs tracking-[0.3em] uppercase text-slate-400 dark:text-slate-500">
          NIT Jalandhar · India
        </span>
      </motion.div>

      {/* CENTER — name */}
      <div className="flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="leading-none tracking-tighter select-none "
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 680,
              fontSize: 'clamp(4rem, 17vw, 18rem)',
              lineHeight: 0.88,
            }}
          >
            <span className="block text-slate-900 dark:text-white">
              UMESH
            </span>
            <span className="block text-slate-900 dark:text-white">
              RATHOD
            </span>
            {/* <span
              className="block"
              style={{
                WebkitTextStroke: '2px #8b5cf6',
                color: 'transparent',
              }}
            >
              UMESH
            </span> */}
          </h1>
        </motion.div>
      </div>

      {/* Bottom row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="flex items-end justify-between pb-4"
      >
        <span className="text-xs tracking-[0.3em] uppercase text-slate-400 dark:text-slate-500">
          Developer · Student · Builder
        </span>

        <div className="flex flex-col items-end gap-1">
          <div className="w-px h-10 bg-gradient-to-b from-accent/60 to-transparent mx-auto" />
          <span className="text-xs tracking-widest text-slate-400 uppercase">scroll</span>
        </div>
      </motion.div>

    </section>
  )
}