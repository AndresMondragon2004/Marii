import { motion, useReducedMotion } from 'framer-motion'

export default function TicketVip({ width = 300 }) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      style={{
        width: width,
        maxWidth: '100%',
        aspectRatio: '1.6 / 1',
        position: 'relative',
        filter: 'drop-shadow(0 15px 25px rgba(232, 137, 173, 0.25))',
      }}
      animate={
        reduced
          ? undefined
          : { y: [0, -6, 0] }
      }
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 400 250" width="100%" height="100%" aria-hidden="true" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="ticketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF1DC" />
            <stop offset="100%" stopColor="#F8C8DC" />
          </linearGradient>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E889AD" />
            <stop offset="100%" stopColor="#F4AFC8" />
          </linearGradient>
        </defs>

        {/* Base del ticket con agujeritos a los lados */}
        <path 
          d="
            M 30 10 
            H 370 
            Q 390 10 390 30 
            V 100
            A 20 20 0 0 1 390 150
            V 220
            Q 390 240 370 240
            H 30
            Q 10 240 10 220
            V 150
            A 20 20 0 0 1 10 100
            V 30
            Q 10 10 30 10 Z
          " 
          fill="url(#ticketGrad)" 
          stroke="#5D4B55" 
          strokeWidth="6" 
        />

        {/* Línea punteada de corte */}
        <line x1="80" y1="20" x2="80" y2="230" stroke="#E889AD" strokeWidth="4" strokeDasharray="8 8" opacity="0.6" />

        {/* Textos del Ticket */}
        <text x="230" y="65" fill="#5D4B55" fontSize="28" fontWeight="bold" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="2">
          ✨ PASE VIP ✨
        </text>

        <text x="110" y="115" fill="#5D4B55" fontSize="16" fontFamily="system-ui, sans-serif" fontWeight="bold">
          Titular:
        </text>
        <text x="180" y="115" fill="#E889AD" fontSize="18" fontFamily="system-ui, sans-serif" fontWeight="bold">
          La cumpleañera más bonita
        </text>

        <text x="110" y="150" fill="#5D4B55" fontSize="16" fontFamily="system-ui, sans-serif" fontWeight="bold">
          Destino:
        </text>
        <text x="185" y="150" fill="#5D4B55" fontSize="18" fontFamily="system-ui, sans-serif">
          Tu Rinconcito ♡
        </text>

        <text x="110" y="185" fill="#5D4B55" fontSize="16" fontFamily="system-ui, sans-serif" fontWeight="bold">
          Validez:
        </text>
        <text x="185" y="185" fill="#5D4B55" fontSize="18" fontFamily="system-ui, sans-serif" fontStyle="italic">
          Para siempre
        </text>

        {/* Estrellitas decorativas */}
        <path d="M 320 180 L 325 190 L 335 192 L 327 200 L 330 210 L 320 205 L 310 210 L 313 200 L 305 192 L 315 190 Z" fill="url(#goldGrad)" opacity="0.8" />
        <path d="M 350 140 L 353 146 L 360 147 L 354 152 L 356 158 L 350 155 L 344 158 L 346 152 L 340 147 L 347 146 Z" fill="url(#goldGrad)" opacity="0.8" />

        {/* Número lateral (rotado) */}
        <g transform="translate(45, 125) rotate(-90)">
          <text x="0" y="0" fill="#E889AD" fontSize="18" fontFamily="monospace" fontWeight="bold" textAnchor="middle" letterSpacing="4">
            Nº 00001
          </text>
        </g>
      </svg>
    </motion.div>
  )
}
