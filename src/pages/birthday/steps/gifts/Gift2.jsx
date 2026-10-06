import { motion, useReducedMotion } from 'framer-motion'
import CozyButton from '../../../../components/ui/CozyButton.jsx'
import RevealText from '../../../../components/ui/RevealText.jsx'
import Bunny from '../../../../components/Bunny.jsx'
import SparkleBurst from '../../../../components/fx/SparkleBurst.jsx'
import { GIFTS_DATA } from '../../../../data/giftsData.js'

function WarmPetals() {
  const reduced = useReducedMotion()
  if (reduced) return null

  const items = [
    { left: '12%', delay: 0.2, duration: 7, size: 16 },
    { left: '28%', delay: 2.1, duration: 8.5, size: 14 },
    { left: '62%', delay: 1.2, duration: 6.5, size: 18 },
    { left: '84%', delay: 3.0, duration: 7.8, size: 15 },
    { left: '46%', delay: 4.5, duration: 9, size: 13 }
  ]

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      {items.map((it, idx) => (
        <motion.svg
          key={idx}
          viewBox="0 0 24 24"
          width={it.size}
          style={{ position: 'absolute', left: it.left, top: '-20px' }}
          initial={{ y: -20, rotate: 0, opacity: 0 }}
          animate={{
            y: ['0vh', '90vh'],
            rotate: [0, 180, 360],
            x: ['-12px', '12px', '-8px', '8px'],
            opacity: [0, 0.75, 0.75, 0]
          }}
          transition={{
            duration: it.duration,
            delay: it.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          {/* Pequeño pétalo / flor amarilla pastel */}
          <path d="M12 2 C 17 2 21 8 12 22 C 3 8 7 2 12 2 Z" fill="#FFE599" stroke="#E8C36A" strokeWidth="1" />
        </motion.svg>
      ))}
    </div>
  )
}

export default function Gift2({ onComplete, onBack }) {
  const data = GIFTS_DATA[1] // bonita

  return (
    <motion.div
      className="gift-modal-screen"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 'min(92vw, 440px)',
        margin: '0 auto',
        backgroundColor: '#FFFDF9',
        borderRadius: '24px',
        border: '3px solid #5D4B55',
        boxShadow: '0 16px 36px rgba(93, 75, 85, 0.12), 0 4px 16px rgba(205, 232, 208, 0.45)',
        padding: '1.4rem 1.1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '1.1rem',
        maxHeight: '86dvh',
        overflowY: 'auto',
        boxSizing: 'border-box'
      }}
    >
      <WarmPetals />
      <SparkleBurst count={8} color="#F4AFC8" />

      {/* Encabezado */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', zIndex: 1 }}>
        <span style={{ fontSize: '1.1rem' }}>🌷</span>
        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#E889AD', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          lo bonita que eres
        </span>
        <span style={{ fontSize: '1.1rem' }}>🌷</span>
      </div>

      <RevealText as="h2" delay={0.2} style={{ fontSize: '1.32rem', color: '#5D4B55', fontWeight: 700, lineHeight: 1.35, zIndex: 1 }}>
        {data.lines[0]}
      </RevealText>

      {/* Conejita con flor */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        style={{ margin: '0.4rem 0', zIndex: 1 }}
      >
        <Bunny width={110} holding="flower" happy />
      </motion.div>

      {/* Mensaje */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', width: '100%', zIndex: 1 }}>
        <RevealText delay={1.4} style={{ fontSize: '1.02rem', color: '#5D4B55', opacity: 0.9, lineHeight: 1.6 }}>
          {data.lines[1]}
        </RevealText>

        <RevealText delay={2.6} style={{ fontSize: '1.02rem', color: '#5D4B55', opacity: 0.9, lineHeight: 1.6 }}>
          {data.lines[2]}
        </RevealText>

        <RevealText delay={3.8} style={{ fontSize: '1.02rem', color: '#5D4B55', opacity: 0.9, lineHeight: 1.6 }}>
          {data.lines[3]}
        </RevealText>

        <RevealText delay={4.8} style={{ fontSize: '1rem', color: '#5D4B55', fontStyle: 'italic', opacity: 0.9, lineHeight: 1.5 }}>
          {data.lines[4]}
        </RevealText>

        <RevealText
          delay={5.8}
          as="h3"
          style={{
            fontSize: '1.25rem',
            color: '#E889AD',
            fontWeight: 700,
            lineHeight: 1.4,
            marginTop: '0.3rem'
          }}
        >
          {data.lines[5]}
        </RevealText>
      </div>

      {/* Botones */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 6.2, duration: 0.5 }}
        style={{ display: 'flex', gap: '0.8rem', marginTop: '0.8rem', flexWrap: 'wrap', justifyContent: 'center', zIndex: 1 }}
      >
        <CozyButton
          onClick={onBack}
          ariaLabel="Volver a los regalitos"
          style={{ background: '#FFF1DC', color: '#5D4B55', borderColor: '#5D4B55' }}
        >
          volver
        </CozyButton>

        <CozyButton onClick={onComplete} ariaLabel="Guardar este regalito en el corazón">
          guardar en mi corazón ♡
        </CozyButton>
      </motion.div>
    </motion.div>
  )
}
