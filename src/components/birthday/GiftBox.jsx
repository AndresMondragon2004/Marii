import { motion, useReducedMotion } from 'framer-motion'

/**
 * Cajita de regalo pastel, 100% SVG (sin imágenes).
 * Estados: idle (respira) → tap (rebote + moño) → open (tapa vuela, brillo).
 * El brillo y el estallido de brillitos los pinta el padre.
 */
export default function GiftBox({ opened = false, onTap, width = 190 }) {
  const reduced = useReducedMotion()

  const idle = reduced
    ? undefined
    : opened
      ? undefined
      : { y: [0, -4, 0], scale: [1, 1.015, 1] }
  const idleTransition = { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }

  const tapBounce = {
    scale: [1, 0.9, 1.06, 1],
    y: [0, 4, -6, 0],
    transition: { duration: 0.55, ease: 'easeOut' },
  }

  return (
    <motion.button
      type="button"
      className="giftbox"
      style={{ lineHeight: 0 }}
      onClick={onTap}
      disabled={opened}
      aria-label={opened ? 'la cajita ya está abierta' : 'abrir la cajita de regalo'}
      animate={opened ? undefined : idle}
      transition={opened || !idle ? undefined : idleTransition}
      whileTap={opened || reduced ? undefined : tapBounce}
      initial={false}
    >
      <svg viewBox="0 0 200 200" width={width} aria-hidden="true">
        {/* resplandor detrás de la caja al abrir */}
        {opened && (
          <motion.circle
            cx="100"
            cy="118"
            r="10"
            fill="#FFF1DC"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: [0.4, 8], opacity: [0, 0.85, 0] }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
        )}

        {/* caja (la tapa puede salir volando por encima) */}
        <g overflow="visible">
          <g overflow="hidden">
            {/* tapa con moño, sale volando al abrir */}
            <motion.g
              animate={
                opened
                  ? { y: -64, x: -10, rotate: -18, opacity: 0 }
                  : { y: 0, x: 0, rotate: 0, opacity: 1 }
              }
              transition={opened ? { duration: 0.9, ease: 'easeOut' } : { duration: 0.3 }}
              style={{ transformBox: 'fill-box', transformOrigin: '20% 80%' }}
            >
              <rect x="16" y="22" width="168" height="36" rx="12" fill="#F4AFC8" stroke="#5D4B55" strokeWidth="6" />
              <rect x="82" y="22" width="36" height="36" fill="#E889AD" />
              {/* moñito de la tapa */}
              <motion.g
                animate={opened ? { rotate: [0, -8, 10, 0] } : { rotate: 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
              >
                <path d="M100 20 C 84 2 60 8 70 22 C 60 34 84 40 100 20 Z" fill="#E889AD" stroke="#5D4B55" strokeWidth="5" strokeLinejoin="round" />
                <path d="M100 20 C 116 2 140 8 130 22 C 140 34 116 40 100 20 Z" fill="#E889AD" stroke="#5D4B55" strokeWidth="5" strokeLinejoin="round" />
                <circle cx="100" cy="21" r="7" fill="#FFF1DC" stroke="#5D4B55" strokeWidth="4.5" />
              </motion.g>
            </motion.g>

            {/* cuerpo de la caja */}
            <rect x="26" y="58" width="148" height="118" rx="14" fill="#F8C8DC" stroke="#5D4B55" strokeWidth="6" />
            <rect x="82" y="58" width="36" height="118" fill="#E889AD" />
            {/* corazoncito de la caja */}
            <path
              d="M100 118 c -4 -6 -12 -5 -12 2 c 0 5 7 9 12 13 c 5 -4 12 -8 12 -13 c 0 -7 -8 -8 -12 -2 z"
              fill="#FFF8FC"
              stroke="#5D4B55"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </svg>
    </motion.button>
  )
}
