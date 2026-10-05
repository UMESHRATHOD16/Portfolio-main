import { useEffect, useRef } from 'react'

export default function MeshBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let animationId
    let dots = []

    let width = 0
    let height = 0

    const mouse = {
      x: -1000,
      y: -1000,
      active: false,
    }

    const DOT_SPACING = 30
    const DOT_RADIUS = 1
    const INFLUENCE_RADIUS = 170

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight

      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = width * dpr
      canvas.height = height * dpr

      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      dots = []

      const cols = Math.ceil(width / DOT_SPACING) + 1
      const rows = Math.ceil(height / DOT_SPACING) + 1

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({
            baseX: i * DOT_SPACING,
            baseY: j * DOT_SPACING,

            x: i * DOT_SPACING,
            y: j * DOT_SPACING,

            vx: 0,
            vy: 0,

            phase: Math.random() * Math.PI * 2,

            hue: Math.random() * 360,
          })
        }
      }
    }

    resize()

    window.addEventListener('resize', resize)

    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
    }

    const handleMouseLeave = () => {
      mouse.active = false
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height)

      const seconds = time * 0.001

      dots.forEach((dot) => {
        let targetX = dot.baseX
        let targetY = dot.baseY

        const dx = mouse.x - dot.x
        const dy = mouse.y - dot.y

        const distance = Math.sqrt(
          dx * dx + dy * dy
        )

        let influence = 0

        if (
          mouse.active &&
          distance < INFLUENCE_RADIUS
        ) {
          influence =
            1 - distance / INFLUENCE_RADIUS

          // Smooth influence
          influence =
            influence * influence
        }

        // --------------------------------
        // IDLE JUMP / BOUNCE
        // --------------------------------

        if (influence > 0) {
          const jumpStrength =
            influence * 1.8

          const jumpX =
            Math.sin(
              seconds * 5 +
              dot.phase
            ) * jumpStrength

          const jumpY =
            Math.cos(
              seconds * 4.2 +
              dot.phase * 1.7
            ) * jumpStrength

          targetX += jumpX
          targetY += jumpY
        }

        // --------------------------------
        // CURSOR PUSH
        // --------------------------------

        if (influence > 0) {
          const angle =
            Math.atan2(dy, dx)

          const push =
            influence * 28

          targetX -=
            Math.cos(angle) * push

          targetY -=
            Math.sin(angle) * push
        }

        // --------------------------------
        // SPRING PHYSICS
        // --------------------------------

        const spring = 0.08
        const friction = 0.82

        dot.vx +=
          (targetX - dot.x) * spring

        dot.vy +=
          (targetY - dot.y) * spring

        dot.vx *= friction
        dot.vy *= friction

        dot.x += dot.vx
        dot.y += dot.vy

        // --------------------------------
        // RAINBOW
        // --------------------------------

        const hue =
          (dot.hue + time * 0.03) % 360

        const radius =
          DOT_RADIUS +
          influence * 2.4

        const alpha =
          0.12 +
          influence * 0.75

        ctx.beginPath()

        ctx.arc(
          dot.x,
          dot.y,
          radius,
          0,
          Math.PI * 2
        )

        ctx.fillStyle = `hsla(
          ${hue},
          85%,
          65%,
          ${alpha}
        )`

        ctx.fill()
      })

      animationId =
        requestAnimationFrame(draw)
    }

    animationId =
      requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationId)

      window.removeEventListener(
        'resize',
        resize
      )

      window.removeEventListener(
        'mousemove',
        handleMouseMove
      )

      window.removeEventListener(
        'mouseleave',
        handleMouseLeave
      )
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  )
}