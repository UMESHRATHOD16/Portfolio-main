import { useEffect, useRef } from 'react'

export default function MeshBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []
    const mouse = { x: -1000, y: -1000 }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      createParticles()
    }

    const createParticles = () => {
      particles = []
      const count = Math.floor((canvas.width * canvas.height) / 6000)
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2.5 + 1,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          baseOpacity: Math.random() * 0.4 + 0.2,
          opacity: Math.random() * 0.4 + 0.2,
        })
      }
    }

    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener('mousemove', handleMouseMove)

    const isDark = () => document.documentElement.classList.contains('dark')

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const dark = isDark()
      const rgb = dark ? '139, 92, 246' : '124, 58, 237'

      particles.forEach((p, i) => {
        // Mouse repulsion
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const mouseRadius = 120

        if (dist < mouseRadius) {
          const force = (mouseRadius - dist) / mouseRadius
          p.x += (dx / dist) * force * 2.5
          p.y += (dy / dist) * force * 2.5
          p.opacity = Math.min(1, p.baseOpacity + force * 0.6)
        } else {
          p.opacity += (p.baseOpacity - p.opacity) * 0.05
        }

        // Move
        p.x += p.vx
        p.y += p.vy

        // Wrap
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb}, ${p.opacity})`
        ctx.fill()

        // Connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx2 = p.x - p2.x
          const dy2 = p.y - p2.y
          const d = Math.sqrt(dx2 * dx2 + dy2 * dy2)

          if (d < 140) {
            const opacity = (1 - d / 140) * 0.25
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(${rgb}, ${opacity})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      })

      // Cursor glow
      const glowRadius = 80
      const gradient = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, glowRadius
      )
      gradient.addColorStop(0, `rgba(${rgb}, 0.08)`)
      gradient.addColorStop(1, `rgba(${rgb}, 0)`)
      ctx.beginPath()
      ctx.arc(mouse.x, mouse.y, glowRadius, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  )
}