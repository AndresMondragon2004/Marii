import { motion } from 'framer-motion'
import CozyButton from '../ui/CozyButton.jsx'
import { useLocalPref } from '../../hooks/useLocalPref.js'
import { STORAGE_KEYS } from '../../utils/storage.js'

export default function SettingsModal({ onClose }) {
  const [motionPref, setMotionPref] = useLocalPref(STORAGE_KEYS.motion, false)
  const [soundPref, setSoundPref] = useLocalPref(STORAGE_KEYS.sound, false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      style={{
        width: '100%',
        maxWidth: 'min(92vw, 380px)',
        backgroundColor: '#FFFDF9',
        borderRadius: '24px',
        border: '3px solid #5D4B55',
        boxShadow: '0 16px 36px rgba(93, 75, 85, 0.15)',
        padding: '1.4rem 1.1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.1rem',
        textAlign: 'center',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
        <span style={{ fontSize: '1.1rem' }}>⚙️</span>
        <h2 style={{ fontSize: '1.2rem', color: '#5D4B55', fontWeight: 700, margin: 0 }}>
          Configuración
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', textAlign: 'left' }}>
        {/* Toggle Animaciones */}
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            backgroundColor: '#FFF8FC',
            borderRadius: '16px',
            border: '1.5px solid var(--pink-soft)',
            cursor: 'pointer'
          }}
        >
          <div>
            <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#5D4B55' }}>
              ✨ Reducir movimiento
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--ink-soft)' }}>
              Animaciones más suaves y calmadas
            </div>
          </div>
          <input
            type="checkbox"
            checked={motionPref}
            onChange={(e) => setMotionPref(e.target.checked)}
            style={{ width: '18px', height: '18px', accentColor: 'var(--pink-strong)' }}
          />
        </label>

        {/* Toggle Sonido */}
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            backgroundColor: '#FFF8FC',
            borderRadius: '16px',
            border: '1.5px solid var(--pink-soft)',
            cursor: 'pointer'
          }}
        >
          <div>
            <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#5D4B55' }}>
              🔊 Efectos de sonido
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--ink-soft)' }}>
              (Opcional, desactivado por defecto)
            </div>
          </div>
          <input
            type="checkbox"
            checked={soundPref}
            onChange={(e) => setSoundPref(e.target.checked)}
            style={{ width: '18px', height: '18px', accentColor: 'var(--pink-strong)' }}
          />
        </label>
      </div>

      <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'center' }}>
        <CozyButton onClick={onClose} ariaLabel="Guardar y cerrar configuración">
          cerrar ♡
        </CozyButton>
      </div>
    </motion.div>
  )
}
