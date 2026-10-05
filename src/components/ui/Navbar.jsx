import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personalInfo } from '../../data'

const links = [
  { name: 'Hero', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'GitHub', href: '#github' },
  { name: 'Blogs', href: '#blogs' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar({ toggleTheme, theme }) {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const menuRef = useRef(null)

  // Close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.4 }
    )

    links.forEach(({ name }) => {
      const el = document.getElementById(
        name.toLowerCase()
      )

      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* ================================
          TOP LEFT — HAMBURGER
      ================================= */}

      <div
        ref={menuRef}
        className="fixed top-6 left-6 z-[200]"
      >
        {/* Hamburger button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          className="w-10 h-10 flex items-center justify-center
                     rounded-lg transition-all duration-300"
          style={{
            background: open
              ? 'rgba(244, 63, 94, 0.1)'
              : 'rgba(9, 9, 11, 0.75)',

            border: `1px solid ${
              open
                ? 'rgba(244, 63, 94, 0.5)'
                : '#27272A'
            }`,

            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="relative w-4 h-4 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {open ? (
                <motion.span
                  key="close"
                  initial={{
                    opacity: 0,
                    rotate: -45,
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 45,
                    scale: 0.7,
                  }}
                  transition={{ duration: 0.2 }}
                  className="text-lg leading-none"
                  style={{
                    color: '#F43F5E',
                  }}
                >
                  ×
                </motion.span>
              ) : (
                <motion.div
                  key="menu"
                  initial={{
                    opacity: 0,
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.7,
                  }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-[3px]"
                >
                  <span
                    className="w-4 h-[1.5px]"
                    style={{
                      background: '#FAFAFA',
                    }}
                  />

                  <span
                    className="w-3 h-[1.5px] ml-auto"
                    style={{
                      background: '#F43F5E',
                    }}
                  />

                  <span
                    className="w-4 h-[1.5px]"
                    style={{
                      background: '#FAFAFA',
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>

        {/* ================================
            DROPDOWN
        ================================= */}

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                opacity: 0,
                y: -8,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -8,
                scale: 0.96,
              }}
              transition={{
                duration: 0.2,
                ease: 'easeOut',
              }}
              className="absolute top-12 left-0
                         w-52 rounded-xl overflow-hidden"
              style={{
                background: 'rgba(9, 9, 11, 0.96)',
                border: '1px solid #27272A',
                backdropFilter: 'blur(20px)',
                boxShadow:
                  '0 20px 60px rgba(0,0,0,0.55)',
              }}
            >
              <div className="py-2">
                {links.map(({ name, href }, i) => (
                  <motion.a
                    key={name}
                    href={href}
                    initial={{
                      opacity: 0,
                      x: -10,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      duration: 0.2,
                      delay: i * 0.03,
                    }}
                    onClick={() => setOpen(false)}
                    className="flex items-center
                               justify-between px-4 py-2.5
                               group transition-all duration-200"
                    style={{
                      color:
                        activeSection ===
                        name.toLowerCase()
                          ? '#F43F5E'
                          : '#A1A1AA',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        'rgba(244, 63, 94, 0.08)'

                      e.currentTarget.style.color =
                        '#FAFAFA'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        'transparent'

                      e.currentTarget.style.color =
                        activeSection ===
                        name.toLowerCase()
                          ? '#F43F5E'
                          : '#A1A1AA'
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {/* Number */}
                      <span
                        className="text-[10px] font-mono
                                   w-4"
                        style={{
                          color:
                            activeSection ===
                            name.toLowerCase()
                              ? '#F43F5E'
                              : '#52525B',
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>

                      {/* Label */}
                      <span
                        className="text-sm font-medium
                                   transition-colors duration-200"
                      >
                        {name}
                      </span>
                    </div>

                    {/* Active indicator */}
                    {activeSection ===
                      name.toLowerCase() && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: '#F43F5E',
                          boxShadow:
                            '0 0 8px rgba(244,63,94,0.6)',
                        }}
                      />
                    )}
                  </motion.a>
                ))}
              </div>

              {/* Divider */}
              <div
                className="px-4 py-3 border-t"
                style={{
                  borderColor: '#27272A',
                }}
              >
                <p
                  className="text-[10px] tracking-widest
                             uppercase mb-1"
                  style={{
                    color: '#52525B',
                  }}
                >
                  Contact
                </p>

                <a
                  href={`mailto:${personalInfo.contact.email}`}
                  className="text-[11px] truncate block
                             transition-colors duration-200"
                  style={{
                    color: '#A1A1AA',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color =
                      '#F43F5E'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color =
                      '#A1A1AA'
                  }}
                >
                  {personalInfo.contact.email}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ================================
          TOP RIGHT — THEME TOGGLE
      ================================= */}

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
        }}
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="fixed top-6 right-6 z-[200]
                   w-10 h-10 flex items-center
                   justify-center rounded-lg
                   transition-all duration-300"
        style={{
          background: 'rgba(9, 9, 11, 0.75)',
          border: '1px solid #27272A',
          color: '#A1A1AA',
          backdropFilter: 'blur(12px)',
        }}
      >
        {theme === 'dark' ? '☀' : '☾'}
      </motion.button>
    </>
  )
}