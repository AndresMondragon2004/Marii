import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CozyButton from '../../../components/ui/CozyButton.jsx'
import Bunny from '../../../components/Bunny.jsx'
import CozyDoor from '../../../components/birthday/CozyDoor.jsx'
import SparkleBurst from '../../../components/fx/SparkleBurst.jsx'
import TypewriterDialogue from '../../../components/ui/TypewriterDialogue.jsx'
import { save, STORAGE_KEYS } from '../../../utils/storage.js'

const BRIDGE_LINES = [
  'Hoy es tu cumpleaños...',
  'pero cada día es una excelente oportunidad para recordarte lo mucho que te quiero ♡',
  'puedes entrar las veces que lo necesites ✨'
]

export default function BridgeStep({ onNext }) {
  const [doorOpen, setDoorOpen] = useState(false)

  const handleEnterRinconcito = () => {
    save(STORAGE_KEYS.birthdayDone, true)
    onNext()
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '460px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70dvh',
        textAlign: 'center',
        gap: '1.2rem'
      }}
    >
      <SparkleBurst count={6} color="#FFF1DC" />

      {/* Secuencia narrativa con efecto máquina de escribir y tap-to-advance */}
      <div style={{ minHeight: '90px', width: '100%', maxWidth: '380px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <TypewriterDialogue
          lines={BRIDGE_LINES}
          speed={95}
          autoAdvanceDelay={3500}
          onFinished={() => setDoorOpen(true)}
          bubble={false}
        />
      </div>

      {/* Puerta mágica y conejita */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: doorOpen ? 1 : 0.6, scale: doorOpen ? 1 : 0.92 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: '1rem',
          margin: '0.5rem 0'
        }}
      >
        <CozyDoor isOpen={doorOpen} width={150} />
        <div style={{ marginBottom: '10px' }}>
          <Bunny width={75} happy={doorOpen} />
        </div>
      </motion.div>

      {/* Invitación final y botón */}
      <AnimatePresence>
        {doorOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
          >
            <div style={{ maxWidth: '320px' }}>
              <p style={{ color: '#5D4B55', fontSize: '0.98rem', lineHeight: 1.5, margin: 0 }}>
                Cuando necesites escapar un ratito del mundo...
              </p>
              <p style={{ color: '#E889AD', fontSize: '1.05rem', fontWeight: 700, marginTop: '0.3rem' }}>
                ya sabes dónde encontrarme. ♡
              </p>
            </div>

            <div style={{ marginTop: '0.5rem' }}>
              <CozyButton onClick={handleEnterRinconcito} ariaLabel="Entrar a mi rinconcito">
                entrar a mi rinconcito →
              </CozyButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
