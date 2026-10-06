import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const COLORS = ['#E889AD', '#F4AFC8', '#F8C8DC', '#DDD2F3', '#FFF1DC', '#CDE8D0', '#FFD166']
const SHAPES = ['rect', 'circle', 'heart', 'star', 'sparkle']

export default function ConfettiCelebration({ active = false, count = 56 }) {
  const reduced = useReducedMotion()
  const [pieces, setPieces] = useState([])

  useEffect(() => {
    if (!active) {
      setPieces([])
      return
    }

    const items = Array.from({ length: count }, (_, i) => {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5
      const distance = 90 + Math.random() * 260
      return {
        id: i,
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 9 + Math.random() * 14,
        // Burst physics
        startX: Math.cos(angle) * distance,
        startY: Math.sin(angle) * distance * 0.7 - 60,
        // Fall physics
        endY: 320 + Math.random() * 300,
        rotate: Math.random() * 720 - 360,
        delay: Math.random() * 0.3,
        duration: 2.6 + Math.random() * 1.4
      }
    })

    setPieces(items)
  }, [active, count])

  if (!active || pieces.length === 0 || reduced) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 99,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      aria-hidden="true"
    >
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.shape === 'rect' ? p.size * 1.6 : p.size,
            backgroundColor: p.shape === 'heart' || p.shape === 'star' || p.shape === 'sparkle' ? 'transparent' : p.color,
            borderRadius: p.shape === 'circle' ? '50%' : p.shape === 'rect' ? '2px' : '0',
            color: p.color,
            fontSize: `${p.size * 1.3}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textShadow: '0 0 4px rgba(255,255,255,0.8)'
          }}
          initial={{ opacity: 0, x: 0, y: 0, scale: 0.2, rotate: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: [0, p.startX, p.startX * 1.25 + (p.id % 2 === 0 ? 35 : -35)],
            y: [0, p.startY, p.endY],
            scale: [0.2, 1.3, 1.05, 0.7],
            rotate: [0, p.rotate * 0.5, p.rotate]
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.18, 0.75, 1]
          }}
        >
          {p.shape === 'heart' && '♡'}
          {p.shape === 'star' && '★'}
          {p.shape === 'sparkle' && '✦'}
        </motion.div>
      ))}
    </div>
  )
}
