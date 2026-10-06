import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import GiftBox from '../../../components/birthday/GiftBox.jsx'
import SparkleBurst from '../../../components/fx/SparkleBurst.jsx'
import CozyButton from '../../../components/ui/CozyButton.jsx'
import RevealText from '../../../components/ui/RevealText.jsx'
import TypewriterDialogue from '../../../components/ui/TypewriterDialogue.jsx'

const MESSAGE_LINES = [
  '¡Felizzzzz cumpleaños bonita! 🎂',
  'Hoyyy es un día mucho muy especial ✨',
  'Espero que hoy puedas darte un ratito para que puedas descansar...',
  'Tú también mereces que te consientan poquito ♡',
]

/**
 * Escena de la cajita de regalo.
 * Al abrirla, los mensajes se escriben letra por letra y ella puede tocar para avanzar.
 */
export default function GiftBoxStep({ onNext }) {
  const [opened, setOpened] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [burst, setBurst] = useState(0)
  const reduced = useReducedMotion()

  const openBox = () => {
    if (opened) return
    setOpened(true)
    setBurst((n) => n + 1)
  }

  return (
    <>
      <motion.div
        className="giftbox-zone"
        animate={opened && !reduced ? { scale: 0.86, y: -4 } : { scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <GiftBox opened={opened} onTap={openBox} />
        <SparkleBurst trigger={burst} origin={{ x: '50%', y: '46%' }} />
      </motion.div>

      <div className="welcome-lines" style={{ width: '100%', maxWidth: '380px', margin: '0 auto' }}>
        {!opened && (
          <RevealText as="h2" className="message-line" style={{ fontSize: '1.25rem', color: '#5D4B55' }}>
            Presiona el regalo 🎁
          </RevealText>
        )}

        {opened && (
          <TypewriterDialogue
            lines={MESSAGE_LINES}
            speed={95}
            autoAdvanceDelay={3500}
            onFinished={() => setShowButton(true)}
            bubble={false}
          />
        )}
      </div>

      {showButton && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          style={{ marginTop: '0.8rem' }}
        >
          <CozyButton onClick={onNext} ariaLabel="continuar a la siguiente escena">
            continuar ♡
          </CozyButton>
        </motion.div>
      )}
    </>
  )
}
