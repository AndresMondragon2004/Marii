import { motion, useReducedMotion } from 'framer-motion'

/**
 * Puerta de madera pastel estilo cuento de hadas para el puente hacia el Rinconcito diario.
 * Incluye farolito con luz cálida, enredadera de flores y animación de apertura.
 */
export default function CozyDoor({ isOpen = true, width = 170 }) {
  const reduced = useReducedMotion()

  return (
    <div
      style={{
        position: 'relative',
        width,
        filter: 'drop-shadow(0 12px 24px rgba(93, 75, 85, 0.15))',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <svg
        viewBox="0 0 200 280"
        width="100%"
        style={{ overflow: 'visible', display: 'block' }}
        aria-hidden="true"
      >
        <defs>
          {/* Luz cálida del interior */}
          <radialGradient id="doorLightGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF1DC" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#F8C8DC" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#DDD2F3" stopOpacity="0" />
          </radialGradient>

          {/* Gradiente de la puerta */}
          <linearGradient id="woodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF8FC" />
            <stop offset="100%" stopColor="#F8C8DC" />
          </linearGradient>

          {/* Luz del farol */}
          <radialGradient id="lanternGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF1DC" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFF1DC" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Marco exterior de piedra/madera */}
        <path
          d="M 25 270 V 100 A 75 75 0 0 1 175 100 V 270 Z"
          fill="#DDD2F3"
          stroke="#5D4B55"
          strokeWidth="6"
        />

        {/* Resplandor interior cuando la puerta se abre */}
        <rect x="35" y="45" width="130" height="225" rx="65" fill="url(#doorLightGrad)" />

        {/* Hoja de la puerta que se abre hacia adentro */}
        <motion.g
          animate={
            isOpen
              ? { scaleX: 0.28, skewY: -12, opacity: 0.95 }
              : { scaleX: 1, skewY: 0, opacity: 1 }
          }
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: '35px 150px' }}
        >
          {/* Base de la puerta */}
          <path
            d="M 35 270 V 105 A 65 65 0 0 1 165 105 V 270 Z"
            fill="url(#woodGrad)"
            stroke="#5D4B55"
            strokeWidth="5"
          />

          {/* Tablones de madera */}
          <line x1="78" y1="50" x2="78" y2="270" stroke="#5D4B55" strokeWidth="3" opacity="0.4" />
          <line x1="122" y1="50" x2="122" y2="270" stroke="#5D4B55" strokeWidth="3" opacity="0.4" />

          {/* Ventanita de corazón */}
          <g transform="translate(100, 110)">
            <circle cx="0" cy="0" r="22" fill="#FFF1DC" stroke="#5D4B55" strokeWidth="4" />
            <path
              d="M0 -4 c -3 -5 -9 -4 -9 2 c 0 4 6 7 9 10 c 3 -3 9 -6 9 -10 c 0 -6 -6 -7 -9 -2 z"
              fill="#E889AD"
              stroke="#5D4B55"
              strokeWidth="2.5"
            />
          </g>

          {/* Pomo de latón dorado */}
          <circle cx="145" cy="180" r="7" fill="#FFF1DC" stroke="#5D4B55" strokeWidth="3.5" />
        </motion.g>

        {/* Farolito colgante al lado */}
        <g transform="translate(182, 115)">
          {/* Cadena */}
          <line x1="0" y1="-30" x2="0" y2="0" stroke="#5D4B55" strokeWidth="2.5" />
          {/* Halo de luz */}
          <circle cx="0" cy="12" r="24" fill="url(#lanternGlow)" />
          {/* Farol */}
          <path d="M -8 0 L 8 0 L 6 22 L -6 22 Z" fill="#FFF1DC" stroke="#5D4B55" strokeWidth="2.5" />
          <polygon points="-10,0 10,0 0,-7" fill="#5D4B55" />
          {/* Llama interior */}
          <circle cx="0" cy="11" r="3.5" fill="#E889AD" />
        </g>

        {/* Enredadera de flores pastel */}
        <g id="vines">
          <path
            d="M 18 270 Q 12 180 26 120 Q 32 70 65 42"
            fill="none"
            stroke="#CDE8D0"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          {/* Florecitas */}
          <circle cx="20" cy="200" r="4.5" fill="#F4AFC8" stroke="#5D4B55" strokeWidth="2" />
          <circle cx="22" cy="140" r="5" fill="#FFF1DC" stroke="#5D4B55" strokeWidth="2" />
          <circle cx="45" cy="65" r="5" fill="#F4AFC8" stroke="#5D4B55" strokeWidth="2" />
        </g>
      </svg>
    </div>
  )
}
