import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import CozyButton from '../../../../components/ui/CozyButton.jsx'
import RevealText from '../../../../components/ui/RevealText.jsx'
import Bunny from '../../../../components/Bunny.jsx'
import FireworksShow from '../../../../components/fx/FireworksShow.jsx'
import { GIFTS_DATA } from '../../../../data/giftsData.js'

function NightAtmosphere() {
  const reduced = useReducedMotion()

  const stars = [
    { x: '10%', y: '12%', s: 3, d: 3 },
    { x: '85%', y: '14%', s: 4, d: 4.2 },
    { x: '92%', y: '42%', s: 2.5, d: 2.8 },
    { x: '8%', y: '62%', s: 3.5, d: 3.5 },
  ]

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {/* Estrellitas */}
      {stars.map((st, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: st.x,
            top: st.y,
            width: st.s,
            height: st.s,
            backgroundColor: '#FFF1DC',
            borderRadius: '50%',
            boxShadow: '0 0 8px #FFF1DC'
          }}
          animate={reduced ? undefined : { opacity: [0.25, 0.9, 0.25], scale: [0.9, 1.3, 0.9] }}
          transition={{ duration: st.d, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

export default function Gift3({ onComplete, onBack }) {
  const [phase, setPhase] = useState(0) // 0: no tienes que hacer nada, 1: pausa tranquila, 2: ya pasó un poquito
  const data = GIFTS_DATA[2] // noche

  useEffect(() => {
    let t1, t2
    if (phase === 0) {
      t1 = setTimeout(() => setPhase(1), 3500)
    } else if (phase === 1) {
      t2 = setTimeout(() => setPhase(2), 7000)
    }
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [phase])

  const handleRestart = () => {
    setPhase(0)
  }

  return (
    <motion.div
      className="gift-modal-screen night-mode-card"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 'min(92vw, 440px)',
        margin: '0 auto',
        backgroundColor: '#241D2E',
        borderRadius: '24px',
        border: '3px solid #5D4B55',
        boxShadow: '0 16px 40px rgba(18, 14, 26, 0.45), 0 4px 16px rgba(221, 210, 243, 0.25)',
        padding: '1.4rem 1.1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '1rem',
        maxHeight: '88dvh',
        overflowY: 'auto',
        color: '#FFF1DC',
        boxSizing: 'border-box'
      }}
    >
      <NightAtmosphere />

      {/* Encabezado */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', zIndex: 1 }}>
        <span style={{ fontSize: '1.1rem' }}>🌙</span>
        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#DDD2F3', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          un respiro bajo las estrellas
        </span>
        <span style={{ fontSize: '1.1rem' }}>🌙</span>
      </div>

      {/* Ventana de cielo con fuegos artificiales y Mari ♡ */}
      <div style={{ width: '100%', zIndex: 1 }}>
        <FireworksShow />
      </div>

      <div style={{ minHeight: '56px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
        <AnimatePresence mode="wait">
          {phase === 0 && (
            <motion.div
              key="night-t1"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6 }}
            >
              <RevealText as="h2" style={{ fontSize: '1.25rem', color: '#FFF1DC', fontWeight: 600 }}>
                {data.lines[0]}
              </RevealText>
            </motion.div>
          )}

          {phase >= 1 && (
            <motion.div
              key="night-t2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <RevealText as="h3" style={{ fontSize: '1.12rem', color: '#DDD2F3', fontWeight: 500 }}>
                {data.lines[1]}
              </RevealText>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Conejita descansando pacíficamente */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        style={{ margin: '0.2rem 0', zIndex: 1 }}
      >
        <div style={{ filter: 'drop-shadow(0 4px 16px rgba(255, 241, 220, 0.2))' }}>
          <Bunny width={105} happy />
        </div>
      </motion.div>

      {/* Fase final de calma */}
      <div style={{ minHeight: '90px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', zIndex: 1 }}>
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center', width: '100%' }}
            >
              <RevealText style={{ fontSize: '1.05rem', color: '#FFF1DC', fontWeight: 600 }}>
                {data.lines[2]}
              </RevealText>
              <RevealText delay={0.6} style={{ fontSize: '0.95rem', color: '#DDD2F3', opacity: 0.9 }}>
                {data.lines[3]}
              </RevealText>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                style={{ display: 'flex', gap: '0.75rem', marginTop: '0.8rem', flexWrap: 'wrap', justifyContent: 'center' }}
              >
                <button
                  type="button"
                  onClick={handleRestart}
                  style={{
                    background: 'transparent',
                    border: '2px solid rgba(221, 210, 243, 0.4)',
                    color: '#DDD2F3',
                    padding: '0.65rem 1.1rem',
                    borderRadius: '999px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  quedarme un ratito más ♡
                </button>

                <CozyButton onClick={onComplete} ariaLabel="Guardar este respiro y salir">
                  guardar y salir ♡
                </CozyButton>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
