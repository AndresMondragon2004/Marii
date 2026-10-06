import { motion } from 'framer-motion'

export default function Envelope({ opened, onTap, width = 200 }) {
  // Animación suave de "respiración" para el sobre cerrado
  const idle = opened ? undefined : { y: [0, -3, 0], scale: [1, 1.01, 1] }
  const idleTransition = { duration: 3, repeat: Infinity, ease: 'easeInOut' }

  return (
    <motion.button
      type="button"
      className="envelope"
      style={{ 
        lineHeight: 0, 
        padding: 0, 
        border: 'none', 
        background: 'transparent', 
        cursor: opened ? 'default' : 'pointer' 
      }}
      onClick={onTap}
      disabled={opened}
      aria-label={opened ? 'Carta abierta' : 'Abrir carta'}
      animate={opened ? undefined : idle}
      transition={opened ? undefined : idleTransition}
      whileTap={opened ? undefined : { scale: 0.95 }}
      initial={false}
    >
      <svg viewBox="0 0 300 220" width={width} aria-hidden="true" style={{ overflow: 'visible' }}>
        <g overflow="visible">
          {/* Cuerpo del sobre (Atrás) */}
          <rect x="10" y="50" width="280" height="160" rx="8" fill="#FFF1DC" stroke="#5D4B55" strokeWidth="6" />

          {/* Solapa superior (Se abre hacia arriba) */}
          <motion.path
            d="M 10 50 L 150 140 L 290 50 Z"
            fill="#F8C8DC"
            stroke="#5D4B55"
            strokeWidth="6"
            strokeLinejoin="round"
            initial={false}
            animate={opened ? { rotateX: 180, y: -20, opacity: 0 } : { rotateX: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top center' }}
          />

          {/* Solapas laterales e inferior (Frente del sobre) */}
          <path d="M 10 50 L 120 120 L 10 210 Z" fill="#FFF8FC" stroke="#5D4B55" strokeWidth="6" strokeLinejoin="round" />
          <path d="M 290 50 L 180 120 L 290 210 Z" fill="#FFF8FC" stroke="#5D4B55" strokeWidth="6" strokeLinejoin="round" />
          <path d="M 10 210 L 150 135 L 290 210 Z" fill="#F4AFC8" stroke="#5D4B55" strokeWidth="6" strokeLinejoin="round" />

          {/* Papel de la carta (Asoma y sube al abrirse) */}
          {opened && (
            <motion.rect
              x="30"
              y="60"
              width="240"
              height="140"
              rx="4"
              fill="#FFFFFF"
              stroke="#DDD2F3"
              strokeWidth="2"
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -80, opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
            />
          )}

          {/* Corazoncito de sello en el centro (Desaparece al abrir) */}
          <motion.path
            d="M 150 145 c -6 -8 -18 -6 -18 3 c 0 6 10 12 18 18 c 8 -6 18 -12 18 -18 c 0 -9 -12 -11 -18 -3 z"
            fill="#E889AD"
            stroke="#5D4B55"
            strokeWidth="4"
            strokeLinejoin="round"
            initial={false}
            animate={opened ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </g>
      </svg>
    </motion.button>
  )
}
