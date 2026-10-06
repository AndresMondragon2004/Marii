import { motion } from 'framer-motion'
import BreathingCircle from '../../../components/daily/BreathingCircle.jsx'

export default function CalmModeModal({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      className="gift-modal-screen night-mode-card"
      style={{
        width: '100%',
        maxWidth: 'min(92vw, 420px)',
        backgroundColor: '#261E33',
        borderRadius: '24px',
        border: '3px solid #5D4B55',
        boxShadow: '0 16px 40px rgba(18, 14, 26, 0.5)',
        padding: '1.5rem 1.1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '0.9rem',
        maxHeight: '85dvh',
        overflowY: 'auto',
        color: '#FFF1DC',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <span style={{ fontSize: '1.2rem' }}>🌙</span>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#DDD2F3', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          hoy no puedo
        </span>
        <span style={{ fontSize: '1.2rem' }}>🌙</span>
      </div>

      <div style={{ margin: '0.4rem 0' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 600, color: '#FFF1DC', margin: 0, lineHeight: 1.35 }}>
          Está bien.
        </h2>
        <p style={{ color: '#DDD2F3', fontSize: '0.98rem', marginTop: '0.4rem', lineHeight: 1.5 }}>
          Hoy no tienes que resolverlo todo.<br />
          Solo quédate aquí un ratito.
        </p>
      </div>

      <BreathingCircle />

      <div style={{ marginTop: '0.6rem' }}>
        <button
          type="button"
          onClick={onClose}
          style={{
            backgroundColor: 'transparent',
            border: '2px solid rgba(221, 210, 243, 0.4)',
            color: '#DDD2F3',
            borderRadius: '999px',
            padding: '0.7rem 1.4rem',
            fontSize: '0.92rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          terminar cuando quieras ♡
        </button>
      </div>
    </motion.div>
  )
}
