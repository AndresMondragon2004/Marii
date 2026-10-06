import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RevealText from '../../../components/ui/RevealText.jsx'
import CozyButton from '../../../components/ui/CozyButton.jsx'
import Bunny from '../../../components/Bunny.jsx'
import VipPassCard from '../../../components/birthday/VipPassCard.jsx'
import SparkleBurst from '../../../components/fx/SparkleBurst.jsx'
import { save, STORAGE_KEYS } from '../../../utils/storage.js'

export default function VipPassStep({ onNext }) {
  const [phase, setPhase] = useState(0)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    let t1, t2
    if (phase === 0) {
      t1 = setTimeout(() => setPhase(1), 2200) // "Ah... espera." -> "Casi olvido darte esto."
    } else if (phase === 1) {
      t2 = setTimeout(() => setPhase(2), 2400) // Muestra el Pase VIP
    }
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [phase])

  const handleSavePass = () => {
    setSaved(true)
    save(STORAGE_KEYS.vipPass, true)
    setTimeout(() => {
      onNext()
    }, 700)
  }

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '440px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '65dvh',
        textAlign: 'center',
        gap: '1.2rem'
      }}
    >
      {saved && <SparkleBurst count={12} color="#E889AD" />}

      {/* Frases iniciales con la conejita */}
      <div style={{ minHeight: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AnimatePresence mode="wait">
          {phase === 0 && (
            <motion.div key="text-wait" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
              <RevealText as="h2" className="message-line" style={{ fontSize: '1.3rem' }}>
                Ah... espera.
              </RevealText>
            </motion.div>
          )}

          {phase >= 1 && (
            <motion.div key="text-almost" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <RevealText as="h2" className="message-line" style={{ fontSize: '1.3rem' }}>
                Casi olvido darte esto.
              </RevealText>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pase VIP */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: phase >= 2 ? 1 : 0, scale: phase >= 2 ? 1 : 0.85, y: phase >= 2 ? 0 : 20 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '0.4rem 0' }}
      >
        <VipPassCard width={330} />
      </motion.div>

      {/* Conejita y Botón de guardar */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem', marginTop: '0.6rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Bunny width={75} happy />
              <CozyButton onClick={handleSavePass} ariaLabel="Guardar mi pase VIP en mi dispositivo">
                {saved ? '¡pase guardado! ♡' : 'guardar mi pase ♡'}
              </CozyButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
