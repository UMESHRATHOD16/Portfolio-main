import { useState } from 'react'

import { useTheme } from './hooks/useTheme'
import { useLenis } from './hooks/useLenis'

import MeshBackground from './components/background/MeshBackground'
import Cursor from './components/ui/Cursor'
import Navbar from './components/ui/Navbar'
import ScrollProgress from './components/ui/ScrollProgress'
import WelcomeScreen from './components/ui/Welcome'

import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import GitHub from './components/sections/GitHub'
import Blogs from './components/sections/Blogs'
import Contact from './components/sections/Contact'

export default function App() {
  const { theme, toggleTheme } = useTheme()

  const [loading, setLoading] = useState(() => {
    return sessionStorage.getItem('welcomeShown') !== 'true'
  })

  useLenis()

  const handleWelcomeComplete = () => {
    sessionStorage.setItem('welcomeShown', 'true')
    setLoading(false)
  }

  return (
    <div className={`${theme} relative min-h-screen`}>

      {/* Welcome screen */}
      {loading && (
        <WelcomeScreen
          onComplete={handleWelcomeComplete}
        />
      )}

      {/* Portfolio */}
      <div
        className="
          bg-light-bg
          dark:bg-dark-bg
          text-slate-800
          dark:text-slate-200
          transition-colors
          duration-500
          min-h-screen
        "
      >
        <MeshBackground />

        <Cursor />

        <ScrollProgress />

        <Navbar
          toggleTheme={toggleTheme}
          theme={theme}
        />

        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <GitHub />
          <Blogs />
          <Contact />
        </main>
      </div>
    </div>
  )
}