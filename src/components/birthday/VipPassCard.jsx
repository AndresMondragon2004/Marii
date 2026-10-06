import { motion, useReducedMotion } from 'framer-motion'

/**
 * Tarjeta / Boleto Pase VIP coleccionable de “Tu Rinconcito ♡”.
 * Con bordes troquelados, textura aperlada, tipografía elegante y brillo suave.
 */
export default function VipPassCard({ width = 340 }) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      style={{
        width,
        maxWidth: '100%',
        aspectRatio: '1.65 / 1',
        position: 'relative',
        filter: 'drop-shadow(0 14px 28px rgba(232, 137, 173, 0.35))',
      }}
      animate={
        reduced
          ? undefined
          : {
              y: [0, -6, 0],
              rotate: [0, -0.8, 0.8, 0]
            }
      }
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg
        viewBox="0 0 420 255"
        width="100%"
        height="100%"
        aria-hidden="true"
        style={{ overflow: 'visible', display: 'block' }}
      >
        <defs>
          <linearGradient id="ticketBaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF9" />
            <stop offset="50%" stopColor="#FFF1DC" />
            <stop offset="100%" stopColor="#F8C8DC" />
          </linearGradient>

          <linearGradient id="goldRibbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F4AFC8" />
            <stop offset="50%" stopColor="#E889AD" />
            <stop offset="100%" stopColor="#F4AFC8" />
          </linearGradient>

          <filter id="ticketShine">
            <feGaussianBlur stdDeviation="2" result="glow" />
            <feComposite in="SourceGraphic" in2="glow" operator="over" />
          </filter>
        </defs>

        {/* Silueta con muescas perforadas clásicas de ticket */}
        <path
          d="
            M 28 10
            H 392
            Q 410 10 410 28
            V 102
            A 24 24 0 0 1 410 152
            V 226
            Q 410 244 392 244
            H 28
            Q 10 244 10 226
            V 152
            A 24 24 0 0 1 10 102
            V 28
            Q 10 10 28 10 Z
          "
          fill="url(#ticketBaseGrad)"
          stroke="#5D4B55"
          strokeWidth="5"
        />

        {/* Línea punteada de desprendimiento */}
        <line
          x1="88"
          y1="22"
          x2="88"
          y2="232"
          stroke="#E889AD"
          strokeWidth="3.5"
          strokeDasharray="7 7"
          opacity="0.75"
        />

        {/* Número de serie rotado en la pestaña lateral */}
        <g transform="translate(48, 127) rotate(-90)">
          <text
            x="0"
            y="0"
            fill="#5D4B55"
            fontSize="14"
            fontFamily="monospace"
            fontWeight="bold"
            textAnchor="middle"
            letterSpacing="3"
            opacity="0.8"
          >
            ★ Nº 00001 ★
          </text>
        </g>

        {/* Decoración de encabezado */}
        <rect x="135" y="24" width="225" height="34" rx="17" fill="url(#goldRibbonGrad)" stroke="#5D4B55" strokeWidth="3" />
        <text
          x="248"
          y="47"
          fill="#FFFDF9"
          fontSize="17"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
          textAnchor="middle"
          letterSpacing="2.5"
        >
          ✨ PASE VIP ✨
        </text>

        {/* Campos del pase */}
        <g transform="translate(110, 92)" fontFamily="system-ui, sans-serif">
          {/* Titular */}
          <text x="0" y="0" fill="#5D4B55" fontSize="13" fontWeight="bold" opacity="0.85">
            Titular:
          </text>
          <text x="65" y="0" fill="#E889AD" fontSize="15" fontWeight="bold">
            La cumpleañera más bonita
          </text>

          {/* Lugar */}
          <text x="0" y="32" fill="#5D4B55" fontSize="13" fontWeight="bold" opacity="0.85">
            Lugar:
          </text>
          <text x="65" y="32" fill="#5D4B55" fontSize="14" fontWeight="600">
            Tu Rinconcito ♡
          </text>

          {/* Validez */}
          <text x="0" y="64" fill="#5D4B55" fontSize="13" fontWeight="bold" opacity="0.85">
            Validez:
          </text>
          <text x="65" y="64" fill="#5D4B55" fontSize="14" fontStyle="italic">
            Para siempre
          </text>

          {/* Acceso */}
          <text x="0" y="94" fill="#5D4B55" fontSize="11" opacity="0.75">
            Acceso libre cuando necesites un poquito de cariño.
          </text>
        </g>

        {/* Estrellitas decorativas doradas/rosadas - ubicadas en esquinas libres */}
        <g transform="translate(382, 218)">
          <path
            d="M 0 -8 L 2.5 -2.5 L 8 0 L 2.5 2.5 L 0 8 L -2.5 2.5 L -8 0 L -2.5 -2.5 Z"
            fill="#E889AD"
            opacity="0.85"
          />
        </g>
        <g transform="translate(385, 75)">
          <path
            d="M 0 -7 L 2 -2 L 7 0 L 2 2 L 0 7 L -2 2 L -7 0 L -2 -2 Z"
            fill="#FFF1DC"
            stroke="#5D4B55"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    </motion.div>
  )
}
