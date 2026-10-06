import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import BirthdayCake from '../../../components/birthday/BirthdayCake.jsx'
import SparkleBurst from '../../../components/fx/SparkleBurst.jsx'
import ConfettiCelebration from '../../../components/fx/ConfettiCelebration.jsx'
import CozyButton from '../../../components/ui/CozyButton.jsx'
import RevealText from '../../../components/ui/RevealText.jsx'
import { triggerHaptic } from '../../../utils/haptics.js'

/**
 * Secuencia posterior al apagado: calma → confeti masivo → textos → botón.
 */
const buildAfterTimeline = ({ setShowGlow, setShowSparks, setLines, setShowButton, setShowConfetti }) => [
  { at: 100, run: () => setShowConfetti(true) },
  { at: 400, run: () => setShowGlow(false) },
  { at: 800, run: () => setShowSparks(true) },
  { at: 1000, run: () => setLines((n) => Math.max(n, 1)) },
  { at: 2400, run: () => setLines((n) => Math.max(n, 2)) },
  { at: 3800, run: () => setShowButton(true) },
]

export default function CandleStep({ onNext }) {
  const [lit, setLit] = useState(true)
  const [taps, setTaps] = useState(0)
  const [showGlow, setShowGlow] = useState(false)
  const [showSparks, setShowSparks] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [lines, setLines] = useState(0)
  const [showButton, setShowButton] = useState(false)
  const [burst, setBurst] = useState(0)

  const reduced = useReducedMotion()
  const timersRef = useRef([])

  const scheduleAfter = () => {
    const timeline = buildAfterTimeline({ setShowGlow, setShowSparks, setLines, setShowButton, setShowConfetti })
    timeline.forEach(({ at, run }) => timersRef.current.push(setTimeout(run, at)))
  }

  const extinguish = () => {
    if (!lit) return
    triggerHaptic('celebration')
    setLit(false)
    setShowGlow(true)
    setBurst((n) => n + 1)
    scheduleAfter()
  }

  /* ── 3 toquecitos al pastel ── */
  const tapCandle = () => {
    if (!lit) return
    triggerHaptic('tap')
    setTaps((n) => n + 1)
  }

  useEffect(() => {
    if (lit && taps >= 3) extinguish()
  }, [taps, lit])

  useEffect(() => () => timersRef.current.forEach(clearTimeout), [])

  return (
    <>
      <ConfettiCelebration active={showConfetti} count={64} />

      <motion.button
        type="button"
        className="cake-zone"
        onClick={tapCandle}
        disabled={!lit}
        aria-label="la velita: presiona tres veces el pastel para apagarla"
        whileTap={lit && !reduced ? { scale: 0.96 } : undefined}
      >
        <BirthdayCake lit={lit} blow={0} />
        <SparkleBurst trigger={burst} origin={{ x: '50%', y: '25%' }} />
        {lit && taps > 0 && (
          <span className="taps-hint" aria-live="polite">
            {'♡'.repeat(taps)}
          </span>
        )}
        {showGlow && <div className="candle-glow" aria-hidden="true" />}
      </motion.button>

      <div className="welcome-lines" style={{ maxWidth: '380px', margin: '0 auto' }}>
        {lit && (
          <>
            <RevealText as="h2" className="message-line" style={{ fontSize: '1.3rem', color: '#E889AD', fontWeight: 700 }}>
              Esto es para ti, ojalá que te guste, pide un deseo 🕯️
            </RevealText>
            <RevealText delay={0.8} className="message-line subtitle" style={{ fontSize: '0.92rem', color: '#5D4B55', marginTop: '0.5rem' }}>
              presiona tres veces el pastel para apagar la velita ♡
            </RevealText>
          </>
        )}

        {!lit && lines >= 1 && (
          <RevealText as="h2" className="message-line" style={{ fontSize: '1.35rem', color: '#E889AD', fontWeight: 700 }}>
            deseo concedido ✨
          </RevealText>
        )}
        {!lit && lines >= 2 && (
          <RevealText delay={0.2} className="message-line" style={{ fontSize: '1.12rem', color: '#5D4B55', fontWeight: 600 }}>
            Tengo algo más para ti mi corazoncito de melón ♡
          </RevealText>
        )}
      </div>

      {showSparks && !reduced && (
        <div className="gentle-particles" aria-hidden="true">
          {['♡', '✦', '✧', '♡', '✨'].map((char, i) => (
            <motion.span
              key={char + i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0, 0.9, 0], y: -46 - i * 9 }}
              transition={{ duration: 2.6, delay: i * 0.35, repeat: Infinity, repeatDelay: 1.4 }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      )}

      {showButton && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <CozyButton onClick={onNext} ariaLabel="continuar">
            continuar ♡
          </CozyButton>
        </motion.div>
      )}
    </>
  )
}
