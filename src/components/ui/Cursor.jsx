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
      dot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`
    }

    const onMouseOver = (e) => {
      if (e.target.closest('a, button, [data-cursor]')) {
        isHovering.current = true
        ring.style.width = '44px'
        ring.style.height = '44px'
        ring.style.borderColor = 'rgba(244,63,94,0.8)'
        ring.style.backgroundColor = 'rgba(244,63,94,0.06)'
      }
    }

    const onMouseOut = (e) => {
      if (e.target.closest('a, button, [data-cursor]')) {
        isHovering.current = false
        ring.style.width = '28px'
        ring.style.height = '28px'
        ring.style.borderColor = 'rgba(244,63,94,0.35)'
        ring.style.backgroundColor = 'transparent'
      }
    }

    const onMouseDown = () => {
      dot.style.transform = `translate(${pos.current.x - 3}px, ${pos.current.y - 3}px) scale(0.6)`
      ring.style.transform = `translate(${ringPos.current.x - 14}px, ${ringPos.current.y - 14}px) scale(0.85)`
    }

    const onMouseUp = () => {
      dot.style.transform = `translate(${pos.current.x - 3}px, ${pos.current.y - 3}px) scale(1)`
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseover', onMouseOver)
    window.addEventListener('mouseout', onMouseOut)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    let rafId
    const lerp = (a, b, t) => a + (b - a) * t

    const animate = () => {
      ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.1)
      ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.1)

      const size = isHovering.current ? 22 : 14
      const x = ringPos.current.x - size
      const y = ringPos.current.y - size

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
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999]"
        style={{
          background: '#F43F5E',
          boxShadow: '0 0 6px rgba(244,63,94,0.8)',
          transition: 'transform 0.05s, width 0.2s, height 0.2s',
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-7 h-7 rounded-full pointer-events-none z-[9998]"
        style={{
          border: '1px solid rgba(244,63,94,0.35)',
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background-color 0.3s ease',
        }}
      />
    </>
  )
}