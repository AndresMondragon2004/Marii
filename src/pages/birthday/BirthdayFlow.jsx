import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import FloatingDecor from '../../components/fx/FloatingDecor.jsx'
import SavePoint from './SavePoint.jsx'
import WelcomeStep from './steps/WelcomeStep.jsx'
import GiftBoxStep from './steps/GiftBoxStep.jsx'
import CandleStep from './steps/CandleStep.jsx'
import EndStep from './steps/EndStep.jsx'
import GiftsStep from './steps/GiftsStep.jsx'
import LetterStep from './steps/LetterStep.jsx'
import VipPassStep from './steps/VipPassStep.jsx'
import BridgeStep from './steps/BridgeStep.jsx'
import { load, save, STORAGE_KEYS } from '../../utils/storage.js'

/**
 * Orden de la historia. El progreso solo avanza hacia adelante:
 * si ya vio una escena, vuelve a empezar en la siguiente (nunca se salta pasos).
 */
const STEPS = [
  { id: 'welcome', Component: WelcomeStep },
  { id: 'giftbox', Component: GiftBoxStep },
  { id: 'candle', Component: CandleStep },
  { id: 'end', Component: EndStep },
  { id: 'gifts', Component: GiftsStep },
  { id: 'letter', Component: LetterStep },
  { id: 'vippass', Component: VipPassStep },
  { id: 'bridge', Component: BridgeStep },
]

const transition = { duration: 0.45, ease: 'easeOut' }
const variants = {
  enter: { opacity: 0, y: 14 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

/**
 * Flujo del Modo Cumpleaños. Persiste la escena actual en localStorage
 * para reanudar si cierra la app a mitad, y marca `birthdayDone` al final.
 */
export default function BirthdayFlow() {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const [flowKey, setFlowKey] = useState(0)

  const goNext = () => {
    setIndex((i) => {
      const next = Math.min(i + 1, STEPS.length - 1)
      return next
    })
  }

  const handleStepComplete = () => {
    if (index >= STEPS.length - 1) {
      save(STORAGE_KEYS.birthdayDone, true)
      navigate('/rinconcito')
    } else {
      goNext()
    }
  }

  // Marca el flujo como completado al llegar a las escenas finales
  useEffect(() => {
    if (STEPS[index].id === 'end' || STEPS[index].id === 'bridge') {
      save(STORAGE_KEYS.birthdayDone, true)
    }
  }, [index])

  const restartFlow = () => {
    setIndex(0)
    save(STORAGE_KEYS.birthdayProgress, 'welcome')
    setFlowKey((k) => k + 1)
  }

  const { Component } = STEPS[index]

  return (
    <main className="screen birthday-screen" aria-live="polite">
      <FloatingDecor />
      <AnimatePresence mode="wait">
        <motion.div
          key={`${STEPS[index].id}-${flowKey}`}
          className="scene"
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
        >
          <Component onNext={handleStepComplete} />
        </motion.div>
      </AnimatePresence>
      <SavePoint onRevive={restartFlow} />
    </main>
  )
}
