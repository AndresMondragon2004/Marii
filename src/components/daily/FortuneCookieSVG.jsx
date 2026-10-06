import { motion, useReducedMotion } from 'framer-motion'

/**
 * Galleta de la fortuna SVG interactiva.
 * Toca para que se divida en dos mitades y libere el papelito.
 */
export default function FortuneCookieSVG({ isBroken = false, onCrack, width = 160 }) {
  const reduced = useReducedMotion()

  return (
    <motion.button
      type="button"
      onClick={onCrack}
      disabled={isBroken}
      aria-label={isBroken ? 'Galleta abierta' : 'Partir galletita de la fortuna'}
      whileHover={reduced || isBroken ? undefined : { scale: 1.06, y: -3 }}
      whileTap={reduced || isBroken ? undefined : { scale: 0.94 }}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: isBroken ? 'default' : 'pointer',
        width,
        outline: 'none',
        WebkitTapHighlightColor: 'transparent',
        filter: 'drop-shadow(0 8px 18px rgba(93, 75, 85, 0.18))'
      }}
    >
      <svg viewBox="0 0 200 160" width="100%" style={{ overflow: 'visible', display: 'block' }}>
        <defs>
          <linearGradient id="cookieGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF1DC" />
            <stop offset="60%" stopColor="#E6BA7A" />
            <stop offset="100%" stopColor="#D49E5A" />
          </linearGradient>
          <linearGradient id="cookieGradRight" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF1DC" />
            <stop offset="60%" stopColor="#E6BA7A" />
            <stop offset="100%" stopColor="#D49E5A" />
          </linearGradient>
        </defs>

        {/* Mitad Izquierda */}
        <motion.g
          animate={isBroken ? { x: -35, y: -10, rotate: -25, opacity: 0.85 } : { x: 0, y: 0, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: '50px 80px' }}
        >
          <path
            d="M 100 80 C 85 30 30 40 20 80 C 15 110 55 135 90 115 C 98 105 100 95 100 80 Z"
            fill="url(#cookieGradLeft)"
            stroke="#5D4B55"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />
          {/* Pliegue interior */}
          <path d="M 40 75 Q 65 95 90 88" fill="none" stroke="#5D4B55" strokeWidth="3" opacity="0.4" />
        </motion.g>

        {/* Mitad Derecha */}
        <motion.g
          animate={isBroken ? { x: 35, y: -10, rotate: 25, opacity: 0.85 } : { x: 0, y: 0, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: '150px 80px' }}
        >
          <path
            d="M 100 80 C 115 30 170 40 180 80 C 185 110 145 135 110 115 C 102 105 100 95 100 80 Z"
            fill="url(#cookieGradRight)"
            stroke="#5D4B55"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />
          {/* Pliegue interior */}
          <path d="M 160 75 Q 135 95 110 88" fill="none" stroke="#5D4B55" strokeWidth="3" opacity="0.4" />
        </motion.g>

        {/* Pliegue central antes de romper */}
        {!isBroken && (
          <line x1="100" y1="50" x2="100" y2="110" stroke="#5D4B55" strokeWidth="3.5" strokeDasharray="2 4" opacity="0.5" />
        )}
      </svg>
    </motion.button>
  )
}
