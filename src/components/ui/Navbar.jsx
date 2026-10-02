import { useEffect, useRef, useState } from 'react'
import { personalInfo } from '../../data'
import { Moon, Sun, FileText } from 'lucide-react'

const links = ['About', 'Skills', 'Projects', 'Experience', 'GitHub', 'Blogs', 'Contact']

export default function Navbar({ toggleTheme, theme }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
    <header
      className={`fixed top-0 left-0 right-0 z-100 transition-all duration-500 ${
        scrolled
          ? 'bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-xl border-b border-light-border dark:border-dark-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white text-sm font-bold">
            {personalInfo.monogram}
          </div>
          <span className="font-semibold text-sm hidden sm:block dark:text-slate-200 text-slate-800">
            {personalInfo.name}
          </span>
        </a>

        {/* Links — desktop */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active === link.toLowerCase()
                    ? 'text-accent bg-accent/10'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-light-surface dark:hover:bg-dark-surface'
                }`}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-accent hover:bg-accent/10 transition-all duration-200"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <a
            href={personalInfo.contact.resume}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border border-accent/30 text-accent text-sm font-medium hover:bg-accent/10 transition-all duration-200"
          >
            <FileText size={14} />
            Resume
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 rounded-lg flex flex-col items-center justify-center gap-1.5 hover:bg-light-surface dark:hover:bg-dark-surface transition-all"
          >
            <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="bg-light-bg/95 dark:bg-dark-bg/95 backdrop-blur-xl border-b border-light-border dark:border-dark-border px-6 pb-4">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className={`block py-3 text-sm font-medium border-b border-light-border dark:border-dark-border last:border-0 transition-colors ${
                active === link.toLowerCase()
                  ? 'text-accent'
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