import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const SPARK_CHARS = ['✦', '✧', '♡', '✨', '⋆']
const SPARK_COLORS = ['#E889AD', '#F4AFC8', '#DDD2F3', '#CDE8D0', '#FFF1DC']

/**
 * Efecto interactivo: al tocar/hacer clic en cualquier parte de la pantalla,
 * brotan pequeñas estrellitas y corazones pastel que suben suavemente.
 */
export default function ClickSparkles({ onGlobalClick }) {
  const reduced = useReducedMotion()
  const [sparkles, setSparkles] = useState([])

  useEffect(() => {
    if (reduced) return undefined

    const handlePointerDown = (e) => {
      const { clientX: x, clientY: y } = e
      onGlobalClick?.({ x, y })

      const newBatch = Array.from({ length: 4 }).map((_, i) => ({
        id: `${Date.now()}-${Math.random()}-${i}`,
        x,
        y,
        char: SPARK_CHARS[(Math.random() * SPARK_CHARS.length) | 0],
        color: SPARK_COLORS[(Math.random() * SPARK_COLORS.length) | 0],
        size: 14 + Math.random() * 10,
        dx: (Math.random() - 0.5) * 60,
        dy: -30 - Math.random() * 50,
      }))

      setSparkles((prev) => [...prev.slice(-16), ...newBatch])

      // Limpieza automática tras la animación
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => !newBatch.includes(s)))
      }, 1200)
    }

    window.addEventListener('pointerdown', handlePointerDown)
    return () => window.removeEventListener('pointerdown', handlePointerDown)
  }, [reduced, onGlobalClick])

  if (reduced || sparkles.length === 0) return null

  return (
    <div className="click-sparkles-container" aria-hidden="true">
      {sparkles.map((s) => (
        <motion.span
          key={s.id}
          className="click-sparkle"
          style={{
            left: s.x,
            top: s.y,
            color: s.color,
            fontSize: `${s.size}px`,
          }}
          initial={{ opacity: 1, scale: 0.4, x: 0, y: 0 }}
          animate={{
            opacity: [1, 0.9, 0],
            x: s.dx,
            y: s.dy,
            scale: [0.4, 1.2, 0.8],
          }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
        >
          {s.char}
        </motion.span>
      ))}
    </div>
  )
}
