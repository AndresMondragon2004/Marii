import { useEffect, useState, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const SPARK_CHARS = ['✦', '♡', '✨', '⋆']
const SPARK_COLORS = ['#E889AD', '#F4AFC8', '#DDD2F3', '#FFF1DC']

/**
 * Efecto interactivo ultra-ligero para toques en pantalla.
 * Limitado y optimizado para cero consumo excesivo de CPU en celular.
 */
export default function ClickSparkles({ onGlobalClick }) {
  const reduced = useReducedMotion()
  const [sparkles, setSparkles] = useState([])
  const lastTapRef = useRef(0)

  useEffect(() => {
    if (reduced) return undefined

    const handlePointerDown = (e) => {
      const now = Date.now()
      // Throttle: máximo 1 ráfaga cada 120ms para evitar spam en scroll
      if (now - lastTapRef.current < 120) return
      lastTapRef.current = now

      const { clientX: x, clientY: y } = e
      onGlobalClick?.({ x, y })

      const newBatch = [
        {
          id: `${now}-0`,
          x,
          y,
          char: SPARK_CHARS[(Math.random() * SPARK_CHARS.length) | 0],
          color: SPARK_COLORS[(Math.random() * SPARK_COLORS.length) | 0],
          size: 13 + Math.random() * 5,
          dx: (Math.random() - 0.5) * 36,
          dy: -24 - Math.random() * 24
        },
        {
          id: `${now}-1`,
          x,
          y,
          char: SPARK_CHARS[(Math.random() * SPARK_CHARS.length) | 0],
          color: SPARK_COLORS[(Math.random() * SPARK_COLORS.length) | 0],
          size: 11 + Math.random() * 4,
          dx: (Math.random() - 0.5) * 36,
          dy: -20 - Math.random() * 20
        }
      ]

      setSparkles((prev) => [...prev.slice(-4), ...newBatch])

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newBatch[0].id && s.id !== newBatch[1].id))
      }, 700)
    }

    window.addEventListener('pointerdown', handlePointerDown, { passive: true })
    return () => window.removeEventListener('pointerdown', handlePointerDown)
  }, [reduced, onGlobalClick])

  if (reduced || sparkles.length === 0) return null

  return (
    <div className="click-sparkles-container" aria-hidden="true" style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 999 }}>
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="click-sparkle"
          style={{
            position: 'absolute',
            left: s.x,
            top: s.y,
            color: s.color,
            fontSize: `${s.size}px`,
            pointerEvents: 'none',
            userSelect: 'none',
            transform: `translate3d(${s.dx}px, ${s.dy}px, 0)`,
            transition: 'transform 0.65s ease-out, opacity 0.65s ease-out',
            animation: 'sparkle-fade 0.65s forwards'
          }}
        >
          {s.char}
        </span>
      ))}
      <style>{`
        @keyframes sparkle-fade {
          0% { opacity: 1; transform: translate3d(0, 0, 0) scale(0.6); }
          60% { opacity: 0.9; }
          100% { opacity: 0; transform: translate3d(var(--dx, 0), var(--dy, -30px), 0) scale(1.1); }
        }
      `}</style>
    </div>
  )
}
