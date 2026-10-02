import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      if (barRef.current) {
        barRef.current.style.width = `${progress}%`
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[9997] bg-transparent">
      <div
        ref={barRef}
        className="h-full bg-accent transition-none"
        style={{
          width: '0%',
          boxShadow: '0 0 8px rgba(139,92,246,0.8)',
        }}
      />
    </div>
  )
}