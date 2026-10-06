import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * Círculo de respiración consciente no clínica para "Hoy no puedo 🌙".
 * Ritmo suave: Inhala (4s), Mantén (2.5s), Suelta (4.5s).
 */
export default function BreathingCircle() {
  const [phase, setPhase] = useState('inhale') // 'inhale' | 'hold' | 'exhale'
  const reduced = useReducedMotion()

  useEffect(() => {
    let timer
    if (phase === 'inhale') {
      timer = setTimeout(() => setPhase('hold'), 4000)
    } else if (phase === 'hold') {
      timer = setTimeout(() => setPhase('exhale'), 2500)
    } else if (phase === 'exhale') {
      timer = setTimeout(() => setPhase('inhale'), 4500)
    }
    return () => clearTimeout(timer)
  }, [phase])

  const textMap = {
    inhale: 'Inhala suavemente...',
    hold: 'Siente la calma...',
    exhale: 'Suelta todo lo pesado...'
  }

  const scaleMap = {
    inhale: 1.35,
    hold: 1.35,
    exhale: 1
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.8rem',
        margin: '1.5rem 0'
      }}
    >
      <div style={{ position: 'relative', width: '180px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Aura exterior difusa */}
        <motion.div
          animate={reduced ? undefined : { scale: scaleMap[phase], opacity: phase === 'exhale' ? 0.35 : 0.75 }}
          transition={{ duration: phase === 'inhale' ? 4 : phase === 'hold' ? 2.5 : 4.5, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(221, 210, 243, 0.6) 0%, rgba(248, 200, 220, 0.2) 70%, transparent 100%)',
            filter: 'blur(10px)'
          }}
        />

        {/* Círculo central */}
        <motion.div
          animate={reduced ? undefined : { scale: scaleMap[phase] }}
          transition={{ duration: phase === 'inhale' ? 4 : phase === 'hold' ? 2.5 : 4.5, ease: 'easeInOut' }}
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFFDF9 0%, #DDD2F3 100%)',
            border: '3px solid #5D4B55',
            boxShadow: '0 8px 24px rgba(221, 210, 243, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <span style={{ fontSize: '1.8rem' }}>
            {phase === 'inhale' ? '🌸' : phase === 'hold' ? '✨' : '🌙'}
          </span>
        </motion.div>
      </div>

      <motion.p
        key={phase}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          color: '#DDD2F3',
          fontSize: '1.15rem',
          fontWeight: 600,
          letterSpacing: '0.02em',
          minHeight: '2rem',
          textAlign: 'center'
        }}
      >
        {textMap[phase]}
      </motion.p>
    </div>
  )
}
