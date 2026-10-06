import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CozyButton from '../../../components/ui/CozyButton.jsx'
import Bunny from '../../../components/Bunny.jsx'
import SparkleBurst from '../../../components/fx/SparkleBurst.jsx'
import { APAPACHOS_DATA } from '../../../data/apapachosData.js'

export default function ApapachoModal({ onClose }) {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * APAPACHOS_DATA.length))
  const [key, setKey] = useState(0)

  const handleNext = () => {
    let next = Math.floor(Math.random() * APAPACHOS_DATA.length)
    if (next === index) next = (index + 1) % APAPACHOS_DATA.length
    setIndex(next)
    setKey((k) => k + 1)
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
      <SparkleBurst count={6} color="#E889AD" />

      {/* Encabezado */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <span style={{ fontSize: '1.2rem' }}>🌷</span>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#E889AD', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          un apapacho para ti
        </span>
        <span style={{ fontSize: '1.2rem' }}>🌷</span>
      </div>

      {/* Conejita abrazando corazón */}
      <div style={{ margin: '0.2rem 0' }}>
        <Bunny width={105} holding="heart" happy />
      </div>

      {/* Frase animada */}
      <div style={{ minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <AnimatePresence mode="wait">
          <motion.p
            key={key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            style={{
              fontSize: '1.12rem',
              color: '#5D4B55',
              lineHeight: 1.6,
              fontWeight: 600,
              margin: 0
            }}
          >
            {APAPACHOS_DATA[index]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Botones */}
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          type="button"
          onClick={handleNext}
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
          otro apapacho ♡
        </button>

        <CozyButton onClick={onClose} ariaLabel="Cerrar apapacho">
          gracias ♡
        </CozyButton>
      </div>
    </motion.div>
  )
}
