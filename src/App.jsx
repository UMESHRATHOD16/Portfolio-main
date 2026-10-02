import { useTheme } from './hooks/useTheme'
import { useLenis } from './hooks/useLenis'
import MeshBackground from './components/background/MeshBackground'
import Cursor from './components/ui/Cursor'
import Navbar from './components/ui/Navbar'
import ScrollProgress from './components/ui/ScrollProgress'
import Hero from './components/sections/Hero'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import GitHub from './components/sections/GitHub'
import Blogs from './components/sections/Blogs'
import Contact from './components/sections/Contact'
import About from './components/sections/About'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  useLenis()

  return (
    <div className={`${theme} relative min-h-screen`}>
      <div className="bg-light-bg dark:bg-dark-bg text-slate-800 dark:text-slate-200 transition-colors duration-500 min-h-screen">
        
        <MeshBackground />
        
        <Cursor />
        <ScrollProgress />
        <Navbar toggleTheme={toggleTheme} theme={theme} />

        <main>
          <Hero />
          <About/>
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