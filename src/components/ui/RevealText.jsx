import { motion, useReducedMotion } from 'framer-motion'

const TAGS = { p: motion.p, h1: motion.h1, h2: motion.h2 }

/**
 * Línea de texto que entra con fade + desplazamiento vertical pequeño.
 * Con movimiento reducido, solo hace fade (sin desplazamiento).
 */
export default function RevealText({ children, delay = 0, className = '', as = 'p' }) {
  const reduced = useReducedMotion()
  const Tag = TAGS[as] ?? motion.p
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </Tag>
  )
}
