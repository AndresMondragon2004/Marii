import { motion } from 'framer-motion'

/**
 * Botón cozy con microinteracción de presión:
 * scale(1) → scale(.95) al presionar → rebote con overshoot (~1.02) al soltar.
 */
export default function CozyButton({ children, onClick, ariaLabel, disabled = false, className = '', ...rest }) {
  return (
    <motion.button
      type="button"
      className={`cozy-btn ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 380, damping: 13 }}
      {...rest}
    >
      {children}
    </motion.button>
  )
}
