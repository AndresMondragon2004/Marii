import { motion, useReducedMotion } from 'framer-motion'

/**
 * Componente visual para cada uno de los tres regalos de la Fase 2.
 * Cada regalo tiene su propia silueta, lazo, etiqueta artesanal y animación de apertura.
 */
export default function GiftBoxVisual({
  opened = false,
  onTap,
  width = 110,
  tag = 'para ti ♡',
  bodyColor = '#F8C8DC',
  lidColor = '#F4AFC8',
  ribbonColor = '#E889AD',
  tagBg = '#FFF1DC',
  type = 'standard' // 'round', 'tall', 'wide'
}) {
  const reduced = useReducedMotion()

  const idle = reduced
    ? undefined
    : {
        y: [0, -5, 0],
        rotate: [0, -1.5, 1.5, 0],
        transition: {
          duration: 3.5 + (width % 3),
          repeat: Infinity,
          ease: 'easeInOut'
        }
      }

  return (
    <motion.button
      type="button"
      className="gift-interactive-card"
      onClick={onTap}
      aria-label={opened ? `Regalo abierto: ${tag}` : `Abrir regalo: ${tag}`}
      animate={opened ? undefined : idle}
      whileHover={reduced ? undefined : { scale: 1.05, y: -4 }}
      whileTap={reduced ? undefined : { scale: 0.95 }}
      style={{
        background: 'none',
        border: 'none',
        padding: '0.5rem',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        outline: 'none',
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      <div style={{ position: 'relative', width, filter: 'drop-shadow(0 8px 16px rgba(232, 137, 173, 0.28))' }}>
        <svg
          viewBox="0 0 160 170"
          width="100%"
          style={{ overflow: 'visible', display: 'block' }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`grad-body-${tag.replace(/\s+/g, '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
              <stop offset="100%" stopColor={bodyColor} />
            </linearGradient>
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Aura suave de fondo si está abierto */}
          {opened && (
            <motion.circle
              cx="80"
              cy="95"
              r="40"
              fill={ribbonColor}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1, 1.35, 1], opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}

          {/* Cuerpo de la caja */}
          <g id="box-base">
            <rect
              x="25"
              y="55"
              width="110"
              height="85"
              rx="14"
              fill={bodyColor}
              stroke="#5D4B55"
              strokeWidth="5"
            />
            {/* Brillo interior sutil */}
            <rect
              x="28"
              y="58"
              width="104"
              height="40"
              rx="11"
              fill={`url(#grad-body-${tag.replace(/\s+/g, '')})`}
            />

            {/* Cinta vertical */}
            <rect x="68" y="55" width="24" height="85" fill={ribbonColor} />
            <line x1="68" y1="55" x2="68" y2="140" stroke="#5D4B55" strokeWidth="3" opacity="0.3" />
            <line x1="92" y1="55" x2="92" y2="140" stroke="#5D4B55" strokeWidth="3" opacity="0.3" />
          </g>

          {/* Tapa y Moño con animación según estado */}
          <motion.g
            id="box-lid"
            animate={
              opened
                ? { y: -38, x: -10, rotate: -18, opacity: 0.9 }
                : { y: 0, x: 0, rotate: 0, opacity: 1 }
            }
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: '20% 50%' }}
          >
            {/* Tapa */}
            <rect
              x="18"
              y="32"
              width="124"
              height="26"
              rx="9"
              fill={lidColor}
              stroke="#5D4B55"
              strokeWidth="5"
            />
            {/* Cinta horizontal en la tapa */}
            <rect x="68" y="32" width="24" height="26" fill={ribbonColor} />

            {/* Moño esponjoso */}
            <g transform="translate(80, 30)">
              {/* Lazo izquierdo */}
              <path
                d="M0 -3 C -18 -22 -38 -8 -20 0 C -36 8 -18 20 0 -2 Z"
                fill={ribbonColor}
                stroke="#5D4B55"
                strokeWidth="4.5"
                strokeLinejoin="round"
              />
              {/* Lazo derecho */}
              <path
                d="M0 -3 C 18 -22 38 -8 20 0 C 36 8 18 20 0 -2 Z"
                fill={ribbonColor}
                stroke="#5D4B55"
                strokeWidth="4.5"
                strokeLinejoin="round"
              />
              {/* Nudo central */}
              <circle cx="0" cy="-2" r="7" fill="#FFF1DC" stroke="#5D4B55" strokeWidth="4" />
            </g>
          </motion.g>

          {/* Destellos y corazoncito cuando está abierto */}
          {opened ? (
            <g transform="translate(80, 95)">
              <motion.path
                d="M0 5 c -4 -7 -14 -6 -14 3 c 0 6 8 10 14 14 c 6 -4 14 -8 14 -14 c 0 -9 -10 -10 -14 -3 z"
                fill="#FFF8FC"
                stroke="#5D4B55"
                strokeWidth="3.5"
                strokeLinejoin="round"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </g>
          ) : (
            /* Brillo de interrogación o destello en reposo */
            <g transform="translate(112, 105)">
              <circle cx="0" cy="0" r="3.5" fill="#FFF1DC" opacity="0.8" />
            </g>
          )}
        </svg>
      </div>

      {/* Etiqueta artesanal tipo tag */}
      <motion.div
        style={{
          marginTop: '0.4rem',
          padding: '0.25rem 0.75rem',
          borderRadius: '999px',
          backgroundColor: opened ? '#FFF8FC' : tagBg,
          color: '#5D4B55',
          fontSize: '0.78rem',
          fontWeight: 600,
          border: '1.5px solid #5D4B55',
          boxShadow: '0 2px 6px rgba(93, 75, 85, 0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          whiteSpace: 'nowrap'
        }}
      >
        <span>{tag}</span>
        {opened && <span style={{ color: ribbonColor, fontSize: '0.85rem' }}>✓</span>}
      </motion.div>
    </motion.button>
  )
}
