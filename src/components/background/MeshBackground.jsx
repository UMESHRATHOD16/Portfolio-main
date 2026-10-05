import { useEffect, useRef } from 'react'

export default function MeshBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    const mouse = { x: -1000, y: -1000 }
    const DOT_SPACING = 28
    const DOT_RADIUS = 1
    const INFLUENCE_RADIUS = 120

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener('mousemove', handleMouseMove)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const cols = Math.ceil(canvas.width / DOT_SPACING) + 1
      const rows = Math.ceil(canvas.height / DOT_SPACING) + 1

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * DOT_SPACING
          const y = j * DOT_SPACING

          const dx = mouse.x - x
          const dy = mouse.y - y
          const dist = Math.sqrt(dx * dx + dy * dy)

          let radius = DOT_RADIUS
          let opacity = 0.18

          if (dist < INFLUENCE_RADIUS) {
            const influence = 1 - dist / INFLUENCE_RADIUS
            radius = DOT_RADIUS + influence * 2.5
            opacity = 0.18 + influence * 0.7

            // Crimson glow near cursor
            const r = Math.floor(244 * influence + 39 * (1 - influence))
            const g = Math.floor(63 * influence + 39 * (1 - influence))
            const b = Math.floor(94 * influence + 39 * (1 - influence))
            ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`
          } else {
            ctx.fillStyle = `rgba(255,255,255,${opacity})`
          }

          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fill()
        }
      }

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
    />
  )
}