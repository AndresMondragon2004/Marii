import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const HEART = 'M12 21s-7.5-4.7-9.7-9C0.6 8 2.6 4 6.5 4c2.3 0 3.9 1.3 5.5 3.4C13.6 5.3 15.2 4 17.5 4 21.4 4 23.4 8 21.7 12c-2.2 4.3-9.7 9-9.7 9z'
const STAR = 'M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4L12 2z'

const SPARKS = [
  { char: '♡', color: '#E889AD', dx: -52, dy: -74, size: 20 },
  { char: '✦', color: '#DDD2F3', dx: 48, dy: -82, size: 16 },
  { char: '✧', color: '#F4AFC8', dx: -22, dy: -96, size: 13 },
  { char: '♡', color: '#F4AFC8', dx: 20, dy: -62, size: 15 },
  { char: '✨', color: '#E889AD', dx: 2, dy: -104, size: 18 },
]

const EMOJI = new Set(['✨'])

/**
 * Ráfaga delicada de partículas (corazones, estrellitas, brillos) que suben
 * con un arco suave y se desvanecen. Máximo 5, sin confeti masivo.
 * Cada disparo usa una `key` distinta para poder repetirse.
 */
export default function SparkleBurst({ trigger = 0, origin = { x: '50%', y: '60%' } }) {
  const reduced = useReducedMotion()
  const [burstId, setBurstId] = useState(null)

  useEffect(() => {
    if (!trigger) return undefined
    const id = { current: trigger }
    setBurstId(id)
    const t = setTimeout(() => setBurstId(null), 1900)
    return () => clearTimeout(t)
  }, [trigger])

  if (!burstId) return null

  return (
    <div className="sparkle-burst" style={{ left: origin.x, top: origin.y }} aria-hidden="true">
      {SPARKS.map((spark, i) =>
        reduced ? (
          <span
            key={`${burstId.current}-${i}`}
            className="sparkle-burst__spark"
            style={{ color: spark.color, fontSize: spark.size, opacity: 0 }}
          />
        ) : (
          <motion.span
            key={`${burstId.current}-${i}`}
            className="sparkle-burst__spark"
            style={{ color: spark.color, fontSize: spark.size }}
            initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: [0, spark.dx * 0.6, spark.dx],
              y: [0, spark.dy, spark.dy * 1.25],
              scale: [0.5, 1, 0.9, 0.7],
            }}
            transition={{ duration: 1.7, delay: i * 0.09, ease: 'easeOut' }}
          >
            {EMOJI.has(spark.char) ? (
              <span role="img" aria-label="brillos">{spark.char}</span>
            ) : (
              spark.char
            )}
          </motion.span>
        ),
      )}
    </div>
  )
}
