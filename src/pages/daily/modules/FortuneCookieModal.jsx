import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CozyButton from '../../../components/ui/CozyButton.jsx'
import FortuneCookieSVG from '../../../components/daily/FortuneCookieSVG.jsx'
import SparkleBurst from '../../../components/fx/SparkleBurst.jsx'
import { FORTUNE_COOKIES_DATA } from '../../../data/fortuneCookiesData.js'
import { triggerHaptic } from '../../../utils/haptics.js'

export default function FortuneCookieModal({ onClose }) {
  const [broken, setBroken] = useState(false)
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * FORTUNE_COOKIES_DATA.length))

  const handleCrack = () => {
    if (broken) return
    triggerHaptic('cookie')
    setBroken(true)
  }

  const handleReset = () => {
    triggerHaptic('tap')
    let next = Math.floor(Math.random() * FORTUNE_COOKIES_DATA.length)
    if (next === quoteIndex) next = (quoteIndex + 1) % FORTUNE_COOKIES_DATA.length
    setQuoteIndex(next)
    setBroken(false)
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
      {broken && <SparkleBurst count={8} color="#E6BA7A" />}

      {/* Encabezado */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <span style={{ fontSize: '1.2rem' }}>🍪</span>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#E889AD', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          una cosita para ti
        </span>
        <span style={{ fontSize: '1.2rem' }}>🍪</span>
      </div>

      <p style={{ color: 'var(--ink-soft)', fontSize: '0.95rem', margin: 0 }}>
        {broken ? 'Tu mensaje de la suerte:' : 'Toca la galletita para partirla y ver qué te tocó ♡'}
      </p>

      {/* Galleta interactiva */}
      <div style={{ margin: '0.8rem 0' }}>
        <FortuneCookieSVG isBroken={broken} onCrack={handleCrack} width={150} />
      </div>

      {/* Papelito desplegado */}
      <AnimatePresence>
        {broken && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: '100%',
              backgroundColor: '#FFF8E7',
              border: '2px dashed #D49E5A',
              borderRadius: '16px',
              padding: '1.2rem 1rem',
              boxShadow: '0 6px 16px rgba(212, 158, 90, 0.18)'
            }}
          >
            <p style={{ color: '#5D4B55', fontSize: '1.05rem', fontWeight: 600, lineHeight: 1.5, margin: 0 }}>
              “{FORTUNE_COOKIES_DATA[quoteIndex]}”
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botones */}
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {broken && (
          <button
            type="button"
            onClick={handleReset}
            style={{
              backgroundColor: '#FFF1DC',
              border: '2px solid #5D4B55',
              color: '#5D4B55',
              borderRadius: '999px',
              padding: '0.65rem 1.1rem',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            otra galletita ♡
          </button>
        )}

        <CozyButton onClick={onClose} ariaLabel="Cerrar galleta">
          cerrar ♡
        </CozyButton>
      </div>
    </motion.div>
  )
}
