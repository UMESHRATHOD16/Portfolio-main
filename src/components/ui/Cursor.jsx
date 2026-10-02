import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const isHovering = useRef(false)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current

    const onMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
    }

    const onMouseOver = (e) => {
      if (e.target.closest('a, button, [data-cursor]')) {
        isHovering.current = true
        ring.style.width = '48px'
        ring.style.height = '48px'
        ring.style.borderColor = 'rgba(139,92,246,0.8)'
        ring.style.backgroundColor = 'rgba(139,92,246,0.08)'
      }
    }

    const onMouseOut = (e) => {
      if (e.target.closest('a, button, [data-cursor]')) {
        isHovering.current = false
        ring.style.width = '32px'
        ring.style.height = '32px'
        ring.style.borderColor = 'rgba(139,92,246,0.4)'
        ring.style.backgroundColor = 'transparent'
      }
    }

    const onMouseDown = () => {
      ring.style.transform = `translate(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px) scale(0.85)`
    }

    const onMouseUp = () => {
      ring.style.transform = `translate(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px) scale(1)`
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseover', onMouseOver)
    window.addEventListener('mouseout', onMouseOut)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    // Ring follows with lag
    let rafId
    const lerp = (a, b, t) => a + (b - a) * t

    const animate = () => {
      ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.1)
      ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.1)

      const x = ringPos.current.x - (isHovering.current ? 24 : 16)
      const y = ringPos.current.y - (isHovering.current ? 24 : 16)

      ring.style.transform = `translate(${x}px, ${y}px)`
      rafId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
      window.removeEventListener('mouseout', onMouseOut)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none z-9999"
        style={{ transition: 'none' }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent/40 pointer-events-none z-9998"
        style={{
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background-color 0.3s ease',
        }}
      />
    </>
  )
}