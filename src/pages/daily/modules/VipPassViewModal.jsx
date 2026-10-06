import { motion } from 'framer-motion'
import CozyButton from '../../../components/ui/CozyButton.jsx'
import VipPassCard from '../../../components/birthday/VipPassCard.jsx'
import SparkleBurst from '../../../components/fx/SparkleBurst.jsx'

export default function VipPassViewModal({ onClose }) {
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
      <SparkleBurst count={6} color="#E889AD" />

      {/* Encabezado */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <span style={{ fontSize: '1.2rem' }}>🎟️</span>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#E889AD', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          tu pase vip
        </span>
        <span style={{ fontSize: '1.2rem' }}>🎟️</span>
      </div>

      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '0.4rem 0' }}>
        <VipPassCard width={310} />
      </div>

      <p style={{ color: 'var(--ink-soft)', fontSize: '0.92rem', lineHeight: 1.5, margin: 0 }}>
        Este pase no vence nunca. Puedes entrar aquí todos los días que quieras. ♡
      </p>

      <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'center' }}>
        <CozyButton onClick={onClose} ariaLabel="Cerrar pase VIP">
          guardar de nuevo ♡
        </CozyButton>
      </div>
    </motion.div>
  )
}
