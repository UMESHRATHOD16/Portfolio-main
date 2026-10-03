import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { personalInfo } from '../../data'

export default function Hero() {
  const circleRef = useRef(null)

  useEffect(() => {
    const circle = circleRef.current
    if (!circle) return
    let angle = 0
    const animate = () => {
      angle += 0.3
      circle.style.transform = `rotate(${angle}deg)`
      requestAnimationFrame(animate)
    }
    const id = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between px-6 pt-8  overflow-hidden"
    >

      {/* Top row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex items-center justify-end pt-20"
      >
      </motion.div>

      {/* CENTER */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <h1
            className="leading-none select-none w-full"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(5rem, 20vw, 22rem)',
              lineHeight: 0.88,
              letterSpacing: '0.05em',
            }}
          >
            <span className="block text-slate-900 dark:text-white">
              RATHOD
            </span>
            <span className="block text-slate-900 dark:text-white">
              UMESH
            </span>

          </h1>

          {/* Below name */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="text-xs tracking-[0.4em] uppercase text-slate-400 dark:text-slate-500 mt-6"
          >
            Full-Stack Developer · Builder · IT Student
          </motion.p>

        </motion.div>
      </div>

      {/* Bottom row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="flex items-end justify-between pb-4"
      >

        {/* Circular rotating badge */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          <svg
            ref={circleRef}
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full"
          >
            <path
              id="circlePath"
              d="M 50,50 m -30,0 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0"
              fill="none"
            />
            <text className="text-[9px]" fill="#8b5cf6" fontSize="9" letterSpacing="3">
              <textPath href="#circlePath">
                AVAILABLE FOR INTERNSHIPS · OPEN TO WORK ·
              </textPath>
            </text>
          </svg>
          <span className="text-accent text-xs font-bold">✦</span>
        </div>

      </motion.div>

    </section>
  )
}