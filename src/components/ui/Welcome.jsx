import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const greetings = [
  { text: 'नमस्ते', lang: 'हिन्दी' },
  { text: 'నమస్కారం', lang: 'తెలుగు' },
  { text: 'வணக்கம்', lang: 'தமிழ்' },
  { text: 'ನಮಸ್ಕಾರ', lang: 'ಕನ್ನಡ' },
  { text: 'नमस्कार', lang: 'मराठी' },
  { text: 'নমস্কার', lang: 'বাংলা' },
  { text: 'NAMASTE', lang: 'INDIA' },
]

export default function WelcomeScreen({ onComplete }) {
  const [index, setIndex] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev >= greetings.length - 1) {
          clearInterval(interval)
          return prev
        }

        return prev + 1
      })
    }, 400)

    const exitTimer = setTimeout(() => {
      setExiting(true)

      setTimeout(() => {
        onComplete?.()
      }, 700)
    }, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(exitTimer)
    }
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{
        opacity: exiting ? 0 : 1,
      }}
      transition={{
        duration: 0.7,
        ease: 'easeInOut',
      }}
      className="fixed inset-0 z-[9999] bg-[#09090B]
                 flex items-center justify-center overflow-hidden"
    >
      {/* Subtle crimson glow */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.08, 0.14, 0.08],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute w-[500px] h-[500px]
                   rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(244,63,94,0.18), transparent 65%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Greeting */}
      <div className="relative flex flex-col items-center">

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -12,
            }}
            transition={{
              duration: 0.22,
              ease: 'easeOut',
            }}
            className="text-center"
          >
            <h1
              className="text-6xl md:text-8xl font-semibold
                         tracking-tight text-[#FAFAFA]"
              style={{
                fontFamily: "'Syne', sans-serif",
              }}
            >
              {greetings[index].text}
            </h1>

            <p
              className="mt-5 text-[10px]
                         tracking-[0.45em]
                         uppercase text-[#A1A1AA]"
            >
              {greetings[index].lang}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress line */}
        <div
          className="absolute top-[calc(100%+55px)]
                     w-32 h-[1px] bg-[#27272A]
                     overflow-hidden"
        >
          <motion.div
            className="h-full bg-[#F43F5E]"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: 3,
              ease: 'linear',
            }}
          />
        </div>
      </div>

      {/* Corner text */}
      <div
        className="absolute bottom-8 left-8
                   text-[9px] tracking-[0.3em]
                   uppercase text-[#52525B]"
      >
        UMESH RATHOD
      </div>

      <div
        className="absolute bottom-8 right-8
                   text-[9px] tracking-[0.3em]
                   uppercase text-[#52525B]"
      >
        2026
      </div>
    </motion.div>
  )
}