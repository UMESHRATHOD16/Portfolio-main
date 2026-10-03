import { useEffect, useRef, useState } from 'react'
import { personalInfo } from '../../data'
import { Moon, Sun, FileText } from 'lucide-react'

const links = ['Hero', 'About', 'Skills', 'Projects', 'Experience', 'GitHub', 'Blogs', 'Contact']

export default function Navbar({ toggleTheme, theme }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 })
  const navRef = useRef(null)
  const ulRef = useRef(null)
  const linkRefs = useRef({})

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Update pill position
  useEffect(() => {
    const updatePill = () => {
      const activeEl = linkRefs.current[active]
      if (!activeEl || !ulRef.current) return
      const ulRect = ulRef.current.getBoundingClientRect()
      const elRect = activeEl.getBoundingClientRect()
      setPillStyle({
        left: elRect.left - ulRect.left,
        width: elRect.width,
        opacity: 1,
      })
    }

    const timeout = setTimeout(updatePill, 50)
    return () => clearTimeout(timeout)
  }, [active])

  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { threshold: 0.4 }
    )
    links.forEach((link) => {
      const el = document.getElementById(link.toLowerCase())
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed top-4 left-0 right-0 z-[100] flex justify-center px-6">
      <nav
        ref={navRef}
        className={`w-full max-w-5xl flex items-center justify-between px-5 h-14 rounded-2xl transition-all duration-500 ${
          scrolled
            ? 'bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-xl border border-light-border dark:border-dark-border shadow-lg shadow-black/10'
            : 'bg-light-bg/40 dark:bg-dark-bg/40 backdrop-blur-md border border-light-border/50 dark:border-dark-border/50'
        }`}
      >
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white text-xs font-bold tracking-wide">
            RU
          </div>
          <span className="font-semibold text-sm hidden sm:block dark:text-slate-200 text-slate-800">
            Rathod Umesh
          </span>
        </a>

        {/* Links with sliding pill */}
        <ul
          ref={ulRef}
          className="hidden md:flex items-center gap-0.5 relative h-8"
        >
          {/* Sliding pill */}
          <div
            className="absolute top-0 bottom-0 rounded-lg pointer-events-none transition-all duration-300 ease-out"
            style={{
              left: pillStyle.left,
              width: pillStyle.width,
              opacity: pillStyle.opacity,
              background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(139,92,246,0.15))',
              boxShadow: '0 0 16px rgba(139,92,246,0.35), inset 0 1px 0 rgba(255,255,255,0.12)',
              border: '1px solid rgba(139,92,246,0.4)',
              backdropFilter: 'blur(8px)',
            }}
          />

          {links.map((link) => (
            <li key={link}>
              <a
                ref={(el) => (linkRefs.current[link.toLowerCase()] = el)}
                href={`#${link.toLowerCase()}`}
                onClick={() => setActive(link.toLowerCase())}
                className={`relative z-10 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200 tracking-wide block whitespace-nowrap ${
                  active === link.toLowerCase()
                    ? 'text-accent'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Right */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-accent hover:bg-accent/10 transition-all duration-200"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          <a
            href={personalInfo.contact.resume}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-accent/30 text-accent text-xs font-medium hover:bg-accent/10 transition-all duration-200"
          >
            <FileText size={12} />
            Resume
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-8 h-8 rounded-lg flex flex-col items-center justify-center gap-1.5 hover:bg-light-surface dark:hover:bg-dark-surface transition-all"
          >
            <span className={`block w-4 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-4 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-4 h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

      </nav>

      {/* Mobile menu */}
      <div className={`md:hidden absolute top-16 left-6 right-6 transition-all duration-300 overflow-hidden rounded-2xl ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-light-bg/95 dark:bg-dark-bg/95 backdrop-blur-xl border border-light-border dark:border-dark-border p-3 space-y-1">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active === link.toLowerCase()
                  ? 'text-accent bg-accent/10'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {link}
            </a>
          ))}
        </div>
      </div>

    </header>
  )
}