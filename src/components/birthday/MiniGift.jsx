import { motion, useReducedMotion } from 'framer-motion'

export default function MiniGift({ 
  opened = false, 
  onTap, 
  width = 120,
  bodyColor = '#F8C8DC',
  lidColor = '#F4AFC8',
  ribbonColor = '#E889AD'
}) {
  const reduced = useReducedMotion()

  const idle = reduced
    ? undefined
    : opened
      ? undefined
      : { y: [0, -3, 0], scale: [1, 1.02, 1] }
  const idleTransition = { duration: 3 + Math.random() * 0.5, repeat: Infinity, ease: 'easeInOut' }

  const tapBounce = {
    scale: [1, 0.9, 1.08, 1],
    y: [0, 4, -6, 0],
    transition: { duration: 0.5, ease: 'easeOut' },
  }

  return (
    <motion.button
      type="button"
      className="giftbox"
      style={{ lineHeight: 0, padding: 0, border: 'none', background: 'transparent', cursor: opened ? 'default' : 'pointer' }}
      onClick={onTap}
      disabled={opened}
      aria-label={opened ? 'regalito abierto' : 'abrir regalito'}
      animate={opened ? undefined : idle}
      transition={opened || !idle ? undefined : idleTransition}
      whileTap={opened || reduced ? undefined : tapBounce}
      initial={false}
    >
      <svg viewBox="0 0 200 200" width={width} aria-hidden="true" style={{ overflow: 'visible' }}>
        {opened && (
          <motion.circle
            cx="100"
            cy="118"
            r="10"
            fill="#FFF1DC"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: [0.4, 6], opacity: [0, 0.6, 0] }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
        )}

        <g overflow="visible">
          <g overflow="hidden">
            {/* Tapa */}
            <motion.g
              animate={
                opened
                  ? { y: -50, x: -8, rotate: -15, opacity: 0 }
                  : { y: 0, x: 0, rotate: 0, opacity: 1 }
              }
              transition={opened ? { duration: 0.7, ease: 'easeOut' } : { duration: 0.3 }}
              style={{ transformBox: 'fill-box', transformOrigin: '20% 80%' }}
            >
              <rect x="20" y="30" width="160" height="30" rx="10" fill={lidColor} stroke="#5D4B55" strokeWidth="6" />
              <rect x="85" y="30" width="30" height="30" fill={ribbonColor} />
              
              {/* Moño */}
              <motion.g
                animate={opened ? { rotate: [0, -6, 8, 0] } : { rotate: 0 }}
                transition={{ duration: 0.5 }}
                style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
              >
                <path d="M100 26 C 84 10 60 14 74 26 C 60 36 84 42 100 26 Z" fill={ribbonColor} stroke="#5D4B55" strokeWidth="5" strokeLinejoin="round" />
                <path d="M100 26 C 116 10 140 14 126 26 C 140 36 116 42 100 26 Z" fill={ribbonColor} stroke="#5D4B55" strokeWidth="5" strokeLinejoin="round" />
                <circle cx="100" cy="27" r="6" fill="#FFF1DC" stroke="#5D4B55" strokeWidth="4.5" />
              </motion.g>
            </motion.g>

            {/* Cuerpo */}
            <rect x="30" y="60" width="140" height="110" rx="12" fill={bodyColor} stroke="#5D4B55" strokeWidth="6" />
            <rect x="85" y="60" width="30" height="110" fill={ribbonColor} />
            
            {/* Pequeño detalle (corazón) en el centro */}
            <path
              d="M100 115 c -3 -5 -10 -4 -10 2 c 0 4 6 7 10 10 c 4 -3 10 -6 10 -10 c 0 -6 -7 -7 -10 -2 z"
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
