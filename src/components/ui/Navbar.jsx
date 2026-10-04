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
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.4 }
    )
    links.forEach(({ name }) => {
      const el = document.getElementById(name.toLowerCase())
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Top left — square menu button + dropdown */}
      <div ref={menuRef} className="fixed top-6 left-6 z-[200]">

        {/* Square button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          onClick={() => setOpen(!open)}
          className="w-9 h-9 flex items-center justify-center transition-all duration-300"
          style={{
            background: open ? '#8b5cf6' : 'rgba(139,92,246,0.08)',
            border: '1px solid rgba(139,92,246,0.35)',
            borderRadius: '6px',
          }}
        >
          <motion.div
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {open ? (
              <span className="text-white text-lg font-light leading-none">×</span>
            ) : (
              <div
                className="w-3.5 h-3.5 rounded-sm border transition-all duration-300"
                style={{ borderColor: 'rgba(139,92,246,0.8)' }}
              />
            )}
          </motion.div>
        </motion.button>

        {/* Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute top-12 left-0 w-52 rounded-xl overflow-hidden"
              style={{
                background: 'rgba(13,15,26,0.95)',
                border: '1px solid rgba(139,92,246,0.2)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(139,92,246,0.1)',
              }}
            >
              <div className="py-2">
                {links.map(({ name, href }, i) => (
                  <motion.a
                    key={name}
                    href={href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.03 }}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 group transition-all duration-200 hover:bg-accent/10"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-accent/50 w-4">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`text-sm font-medium transition-colors duration-200 ${
                          activeSection === name.toLowerCase()
                            ? 'text-accent'
                            : 'text-white/60 group-hover:text-white'
                        }`}
                      >
                        {name}
                      </span>
                    </div>
                    {activeSection === name.toLowerCase() && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="w-1 h-1 rounded-full bg-accent"
                      />
                    )}
                  </motion.a>
                ))}
              </div>

              {/* Bottom divider + email */}
              <div
                className="px-4 py-3 border-t"
                style={{ borderColor: 'rgba(139,92,246,0.1)' }}
              >
                <p className="text-[10px] text-white/25 tracking-widest uppercase mb-0.5">
                  Contact
                </p>
                <a
                  href={`mailto:${personalInfo.contact.email}`}
                  className="text-[11px] text-white/40 hover:text-accent transition-colors truncate block"
                >
                  {personalInfo.contact.email}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Top right — theme toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-200 w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-accent transition-colors"
        style={{
          background: 'rgba(139,92,246,0.05)',
          border: '1px solid rgba(139,92,246,0.2)',
        }}
      >
        {theme === 'dark' ? '☀' : '☾'}
      </motion.button>
    </>
  )
}