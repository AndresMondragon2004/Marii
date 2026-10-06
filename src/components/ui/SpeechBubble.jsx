import { motion, useReducedMotion } from 'framer-motion'

/**
 * Burbuja de diálogo tierna (speech bubble) que conecta visualmente
 * a la conejita con sus mensajes.
 */
export default function SpeechBubble({ children, className = '' }) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={`speech-bubble ${className}`}
      initial={{ opacity: 0, y: reduced ? 0 : 12, scale: reduced ? 1 : 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Colita de la burbuja que apunta a la conejita */}
      <div className="speech-bubble__tail" aria-hidden="true" />
      
      {/* Detalle decorativo en la esquina */}
      <span className="speech-bubble__badge" aria-hidden="true">🎀</span>

      <div className="speech-bubble__content">
        {children}
      </div>
    </motion.div>
  )
}
