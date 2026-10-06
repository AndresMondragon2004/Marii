import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CozyButton from '../../../components/ui/CozyButton.jsx'
import GiftBoxVisual from '../../../components/birthday/GiftBoxVisual.jsx'
import SparkleBurst from '../../../components/fx/SparkleBurst.jsx'
import { getMexicoToday, getDailySurpriseIndex } from '../../../utils/dates.js'
import { load, save, STORAGE_KEYS } from '../../../utils/storage.js'
import { DAILY_SURPRISES_DATA } from '../../../data/surprisesData.js'
import { triggerHaptic } from '../../../utils/haptics.js'

export default function DailySurpriseModal({ onClose }) {
  const today = getMexicoToday()
  const surpriseIdx = getDailySurpriseIndex(today, DAILY_SURPRISES_DATA.length)
  const surprise = DAILY_SURPRISES_DATA[surpriseIdx]

  const [openedToday, setOpenedToday] = useState(() => {
    const savedDate = load(STORAGE_KEYS.lastSurprise, null)
    return savedDate === today
  })

  const handleOpenGift = () => {
    triggerHaptic('celebration')
    save(STORAGE_KEYS.lastSurprise, today)
    setOpenedToday(true)
  }

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
      {openedToday && <SparkleBurst count={8} color="#F4AFC8" />}

      {/* Encabezado */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <span style={{ fontSize: '1.2rem' }}>🎁</span>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#E889AD', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          te dejé algo hoy
        </span>
        <span style={{ fontSize: '1.2rem' }}>🎁</span>
      </div>

      <AnimatePresence mode="wait">
        {!openedToday ? (
          <motion.div
            key="unopened"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
          >
            <p style={{ color: 'var(--ink-soft)', fontSize: '0.95rem', margin: 0 }}>
              Hay un pequeño regalito esperando por ti hoy. Toca para abrirlo ♡
            </p>

            <div style={{ margin: '0.6rem 0' }}>
              <GiftBoxVisual
                opened={false}
                onTap={handleOpenGift}
                tag="abrir de hoy ♡"
                bodyColor="#FFF1DC"
                lidColor="#F4AFC8"
                ribbonColor="#E889AD"
                width={120}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="opened"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              width: '100%'
            }}
          >
            <div
              style={{
                width: '75px',
                height: '75px',
                borderRadius: '50%',
                backgroundColor: surprise.accent || '#FFF1DC',
                border: '3px solid #5D4B55',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.2rem',
                boxShadow: '0 8px 18px rgba(93, 75, 85, 0.15)'
              }}
            >
              {surprise.icon}
            </div>

            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#5D4B55', fontWeight: 700, margin: '0 0 0.4rem' }}>
                {surprise.title}
              </h3>
              <p style={{ color: 'var(--ink)', fontSize: '1.02rem', lineHeight: 1.55, margin: 0 }}>
                {surprise.text}
              </p>
            </div>

            <p style={{ color: 'var(--ink-faint)', fontSize: '0.78rem', margin: '0.4rem 0 0' }}>
              (Ya abriste tu regalito de hoy, pero puedes mirarlo cuantas veces quieras ♡)
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ marginTop: '0.6rem', display: 'flex', justifyContent: 'center' }}>
        <CozyButton onClick={onClose} ariaLabel="Cerrar sorpresa">
          cerrar ♡
        </CozyButton>
      </div>
    </motion.div>
  )
}
