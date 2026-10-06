import { motion, useReducedMotion } from 'framer-motion'
import Bunny from '../../../components/Bunny.jsx'
import CozyButton from '../../../components/ui/CozyButton.jsx'
import RevealText from '../../../components/ui/RevealText.jsx'

/**
 * Cierre de la Fase 1: transición tranquila hacia la siguiente fase.
 * Muestra a la conejita contenta y prepara el terreno (regalos, carta…).
 */
export default function EndStep({ onNext }) {
  const reduced = useReducedMotion()

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: reduced ? 1 : 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Bunny width={140} happy />
      </motion.div>

      <RevealText delay={0.3} className="message-line" as="h2">
        y esto solo es el comienzo...
      </RevealText>
      <RevealText delay={0.9} className="message-line subtitle">
        todavía hay unas cositas más para ti ♡
      </RevealText>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.5 }}
      >
        <CozyButton onClick={onNext} ariaLabel="ver qué sigue">
          ver qué hay más ♡
        </CozyButton>
      </motion.div>
    </>
  )
}
