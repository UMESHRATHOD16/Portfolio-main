
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import {
  FaGithub,
  FaLinkedinIn,
  FaFileAlt,
} from 'react-icons/fa'
import { SiHashnode } from 'react-icons/si'

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/UMESHRATHOD16',
    Icon: FaGithub,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/rathodumesh',
    Icon: FaLinkedinIn,
  },
  {
    label: 'Hashnode',
    href: 'https://hashnode.com/@umeshhhhh',
    Icon: SiHashnode,
  },
]

const resumeUrl =
  'https://drive.google.com/file/d/1H_TmCLIgexfeNlC69a4NLTsvaXuw56mT/view?usp=drive_link'

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, {
    once: true,
    margin: '-100px',
  })
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="about"
      ref={ref}
      className="mx-auto flex max-w-6xl flex-col justify-center px-6 py-20 sm:px-10 md:py-28"
    >
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 15 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <span
          className="text-xs font-medium uppercase tracking-[0.3em]"
          style={{ color: '#F43F5E' }}
        >
          About Me
        </span>
      </motion.div>

      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left — personal statement */}
        <motion.div
          initial={{
            opacity: 0,
            x: reduceMotion ? 0 : -30,
          }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.1 }}
        >
          <h2
            className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl"
            style={{
              fontFamily: "'Syne', sans-serif",
              color: '#FAFAFA',
            }}
          >
            Curious by nature.
            <br />
            <span style={{ color: '#F43F5E' }}>
              Building by choice.
            </span>
          </h2>

          <p
            className="mt-6 max-w-md text-base leading-7"
            style={{ color: '#71717A' }}
          >
            From exploring how technology works to building
            solutions of my own, I'm driven by the process of
            learning, experimenting, and making ideas useful.
          </p>
        </motion.div>

        {/* Right — bio and links */}
        <motion.div
          initial={{
            opacity: 0,
            x: reduceMotion ? 0 : 30,
          }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.2 }}
          className="space-y-6"
        >
          <p
            className="text-base leading-8 sm:text-lg"
            style={{ color: '#D4D4D8' }}
          >
            I'm Umesh Rathod, a third-year B.Tech student at
            NIT Jalandhar, interested in software development
            and artificial intelligence. I enjoy understanding
            problems at their core and turning what I learn
            into practical, well-built applications.
          </p>

          <p
            className="text-sm leading-7 sm:text-base"
            style={{ color: '#A1A1AA' }}
          >
            Currently, I'm strengthening my problem-solving
            skills with Python and DSA, building interfaces
            with React, and exploring backend development
            with FastAPI alongside AI and Generative AI
            integration.
          </p>

          {/* Current focus */}
          <div className="flex items-center gap-3 pt-1">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-40" />
              <span className="relative h-2 w-2 rounded-full bg-rose-500" />
            </span>

            <span
              className="text-sm"
              style={{ color: '#A1A1AA' }}
            >
              Open to internships and meaningful collaborations
            </span>
          </div>

          {/* Social links — minimal, no cards */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-3">
            {socials.map(({ label, href, Icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={reduceMotion ? {} : { y: -2 }}
                className="group inline-flex items-center gap-2 text-sm transition-colors duration-300"
                style={{ color: '#A1A1AA' }}
              >
                <Icon
                  size={16}
                  className="transition-colors duration-300 group-hover:text-rose-500"
                />

                <span className="transition-colors duration-300 group-hover:text-rose-500">
                  {label}
                </span>
              </motion.a>
            ))}

            <motion.a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduceMotion ? {} : { y: -2 }}
              className="group inline-flex items-center gap-2 text-sm transition-colors duration-300"
              style={{ color: '#A1A1AA' }}
            >
              <FaFileAlt
                size={15}
                className="transition-colors duration-300 group-hover:text-rose-500"
              />

              <span className="transition-colors duration-300 group-hover:text-rose-500">
                Resume
              </span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
