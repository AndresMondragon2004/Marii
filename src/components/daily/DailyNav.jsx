import { motion } from 'framer-motion'

/**
 * Barra flotante inferior tipo dock pastel para navegación rápida entre módulos.
 */
export default function DailyNav({ onSelectModule }) {
  const items = [
    { id: 'apapacho', label: 'Apapacho', icon: '🌷' },
    { id: 'calm', label: 'Calma', icon: '🌙' },
    { id: 'surprise', label: 'Sorpresa', icon: '🎁' },
    { id: 'cookie', label: 'Galleta', icon: '🍪' },
    { id: 'games', label: 'Juegos', icon: '✨' }
  ]

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 'calc(var(--safe-bottom) + 12px)',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 5,
        width: 'calc(100% - 28px)',
        maxWidth: '380px'
      }}
      aria-label="Navegación del Rinconcito"
    >
      <motion.div
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '2px solid var(--pink-soft)',
          borderRadius: '999px',
          padding: '0.45rem 0.6rem',
          boxShadow: '0 8px 24px rgba(232, 137, 173, 0.25)'
        }}
      >
        {items.map((it) => (
          <motion.button
            key={it.id}
            type="button"
            onClick={() => onSelectModule(it.id)}
            whileHover={{ scale: 1.12, y: -2 }}
            whileTap={{ scale: 0.92 }}
            aria-label={`Abrir ${it.label}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.15rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.25rem 0.45rem',
              outline: 'none',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>{it.icon}</span>
            <span style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--ink-soft)' }}>
              {it.label}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </nav>
  )
}
