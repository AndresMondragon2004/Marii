import { motion } from 'framer-motion'
import CozyButton from '../../../components/ui/CozyButton.jsx'
import Bunny from '../../../components/Bunny.jsx'
import SparkleBurst from '../../../components/fx/SparkleBurst.jsx'

export default function LeavingModeModal({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      className="gift-modal-screen"
      style={{
        width: '100%',
        maxWidth: 'min(92vw, 420px)',
        backgroundColor: '#FFFDF9',
        borderRadius: '24px',
        border: '3px solid #5D4B55',
        boxShadow: '0 16px 36px rgba(93, 75, 85, 0.14)',
        padding: '1.4rem 1.1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '1rem',
        maxHeight: '85dvh',
        overflowY: 'auto',
        boxSizing: 'border-box'
      }}
    >
      <SparkleBurst count={6} color="#FFF1DC" />

      {/* Encabezado */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <span style={{ fontSize: '1.2rem' }}>🌤️</span>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#E889AD', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          ya terminé por hoy
        </span>
        <span style={{ fontSize: '1.2rem' }}>🌤️</span>
      </div>

      {/* Conejita con mochilita */}
      <div style={{ position: 'relative', margin: '0.3rem 0' }}>
        <Bunny width={110} happy />
        {/* Pequeña mochila ilustrada */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '-6px',
            backgroundColor: '#F8C8DC',
            border: '2px solid #5D4B55',
            borderRadius: '10px',
            padding: '4px 8px',
            fontSize: '0.85rem',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}
        >
          🎒
        </motion.div>
      </div>

      <div>
        <h2 style={{ fontSize: '1.3rem', color: '#5D4B55', fontWeight: 700, margin: '0 0 0.4rem' }}>
          Lo hiciste.
        </h2>
        <p style={{ color: 'var(--ink)', fontSize: '1.05rem', lineHeight: 1.6, margin: 0 }}>
          Fuiste muy valiente hoy con todo lo que tuviste que hacer.
        </p>
        <p style={{ color: '#E889AD', fontSize: '1.12rem', fontWeight: 700, marginTop: '0.6rem' }}>
          Ahora sí... a descansar un poquito. ♡
        </p>
      </div>

      <div style={{ marginTop: '0.6rem', display: 'flex', justifyContent: 'center' }}>
        <CozyButton onClick={onClose} ariaLabel="A descansar">
          a descansar ♡
        </CozyButton>
      </div>
    </motion.div>
  )
}
