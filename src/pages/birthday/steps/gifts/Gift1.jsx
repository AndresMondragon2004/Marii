import { motion, useReducedMotion } from 'framer-motion'
import CozyButton from '../../../../components/ui/CozyButton.jsx'
import RevealText from '../../../../components/ui/RevealText.jsx'
import Bunny from '../../../../components/Bunny.jsx'
import SparkleBurst from '../../../../components/fx/SparkleBurst.jsx'
import { GIFTS_DATA } from '../../../../data/giftsData.js'

export default function Gift1({ onComplete, onBack }) {
  const reduced = useReducedMotion()
  const data = GIFTS_DATA[0] // apapacho

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
        boxShadow: '0 16px 36px rgba(93, 75, 85, 0.12), 0 4px 16px rgba(221, 210, 243, 0.35)',
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
      <SparkleBurst count={8} color="#E889AD" />

      {/* Título de la cajita */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <span style={{ fontSize: '1.1rem' }}>🎀</span>
        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#E889AD', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          un apapacho
        </span>
        <span style={{ fontSize: '1.1rem' }}>🎀</span>
      </div>

      <RevealText as="h2" delay={0.2} style={{ fontSize: '1.35rem', color: '#5D4B55', fontWeight: 700, lineHeight: 1.35 }}>
        {data.lines[0]}
      </RevealText>

      {/* Conejita abrazando un corazón suave */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        style={{ margin: '0.5rem 0' }}
      >
        <Bunny width={110} holding="heart" happy />
      </motion.div>

      {/* Líneas reflexivas */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', width: '100%' }}>
        <RevealText delay={1.4} style={{ fontSize: '1.02rem', color: '#5D4B55', opacity: 0.9, lineHeight: 1.6 }}>
          {data.lines[1]}
        </RevealText>

        <RevealText delay={2.6} style={{ fontSize: '1.02rem', color: '#5D4B55', opacity: 0.9, lineHeight: 1.6 }}>
          {data.lines[2]}
        </RevealText>

        <RevealText delay={3.8} style={{ fontSize: '1.02rem', color: '#5D4B55', opacity: 0.9, lineHeight: 1.6 }}>
          {data.lines[3]}
        </RevealText>

        <RevealText
          delay={4.8}
          as="h3"
          style={{
            fontSize: '1.25rem',
            color: '#E889AD',
            fontWeight: 700,
            lineHeight: 1.4,
            marginTop: '0.3rem'
          }}
        >
          {data.lines[4]}
        </RevealText>

        <RevealText delay={5.8} style={{ fontSize: '1rem', color: '#5D4B55', fontStyle: 'italic', opacity: 0.85 }}>
          {data.lines[5]}
        </RevealText>
      </div>

      {/* Botones de acción */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 6.2, duration: 0.5 }}
        style={{ display: 'flex', gap: '0.8rem', marginTop: '0.8rem', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        <CozyButton
          onClick={onBack}
          ariaLabel="Volver a los regalitos"
          style={{ background: '#FFF1DC', color: '#5D4B55', borderColor: '#5D4B55' }}
        >
          volver
        </CozyButton>

        <CozyButton onClick={onComplete} ariaLabel="Guardar este apapacho en el corazón">
          guardar en mi corazón ♡
        </CozyButton>
      </motion.div>
    </motion.div>
  )
}
