import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import CozyButton from '../ui/CozyButton.jsx'
import { LETTER_CONTENT } from '../../data/letterContent.js'

/**
 * Sobre interactivo y Carta desplegable física.
 * Toca el sobre para romper el sello de corazón y desplegar la carta con textura acogedora.
 */
export default function EnvelopeLetter({ onComplete }) {
  const [opened, setOpened] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const reduced = useReducedMotion()

  const handleOpen = () => {
    if (opened) return
    setOpened(true)
    setTimeout(() => {
      setRevealed(true)
    }, reduced ? 200 : 850)
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '480px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '65dvh'
      }}
    >
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="envelope-interactive"
            initial={{ opacity: 0, scale: 0.88, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', width: '100%' }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{ color: '#5D4B55', fontSize: '1.05rem', fontWeight: 500, textAlign: 'center' }}
            >
              Bueno... queda una última cosita.
            </motion.p>

            {/* El Sobre SVG */}
            <motion.button
              type="button"
              onClick={handleOpen}
              aria-label="Abrir sobre con la carta"
              whileHover={reduced || opened ? undefined : { scale: 1.04, y: -4 }}
              whileTap={reduced || opened ? undefined : { scale: 0.96 }}
              style={{
                background: 'none',
                border: 'none',
                cursor: opened ? 'default' : 'pointer',
                padding: 0,
                width: 'min(300px, 85vw)',
                filter: 'drop-shadow(0 12px 24px rgba(232, 137, 173, 0.3))',
                outline: 'none',
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              <svg viewBox="0 0 320 220" width="100%" style={{ overflow: 'visible', display: 'block' }}>
                <defs>
                  <linearGradient id="envBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFF8FC" />
                    <stop offset="100%" stopColor="#F8C8DC" />
                  </linearGradient>
                  <linearGradient id="envFlapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F4AFC8" />
                    <stop offset="100%" stopColor="#E889AD" />
                  </linearGradient>
                </defs>

                {/* Fondo del sobre (interior) */}
                <rect x="20" y="30" width="280" height="170" rx="12" fill="#FFF1DC" stroke="#5D4B55" strokeWidth="5" />

                {/* Hoja de carta asomándose */}
                <motion.rect
                  x="35"
                  y="40"
                  width="250"
                  height="140"
                  rx="6"
                  fill="#FFFDF9"
                  stroke="#DDD2F3"
                  strokeWidth="3"
                  animate={opened ? { y: -30 } : { y: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                />

                {/* Líneas de texto simuladas en la hoja */}
                <motion.g animate={opened ? { y: -30 } : { y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
                  <line x1="55" y1="65" x2="160" y2="65" stroke="#E889AD" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
                  <line x1="55" y1="85" x2="265" y2="85" stroke="#DDD2F3" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="55" y1="105" x2="245" y2="105" stroke="#DDD2F3" strokeWidth="2.5" strokeLinecap="round" />
                </motion.g>

                {/* Cuerpo exterior del sobre (laterales e inferior) */}
                <path
                  d="M 20 200 L 160 110 L 300 200 Z"
                  fill="url(#envBodyGrad)"
                  stroke="#5D4B55"
                  strokeWidth="5"
                  strokeLinejoin="round"
                />
                <path
                  d="M 20 30 L 160 130 L 20 200 Z"
                  fill="#F8C8DC"
                  stroke="#5D4B55"
                  strokeWidth="5"
                  strokeLinejoin="round"
                  opacity="0.9"
                />
                <path
                  d="M 300 30 L 160 130 L 300 200 Z"
                  fill="#F8C8DC"
                  stroke="#5D4B55"
                  strokeWidth="5"
                  strokeLinejoin="round"
                  opacity="0.9"
                />

                {/* Solapa superior que desaparece suavemente al abrir */}
                <motion.g
                  animate={{ opacity: opened ? 0 : 1, scale: opened ? 0.96 : 1 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  style={{ transformOrigin: '160px 30px' }}
                >
                  <path
                    d="M 20 30 L 160 130 L 300 30 Z"
                    fill="url(#envFlapGrad)"
                    stroke="#5D4B55"
                    strokeWidth="5"
                    strokeLinejoin="round"
                  />

                  {/* Sello de cera en forma de corazón */}
                  <g transform="translate(160, 115)">
                    <circle cx="0" cy="0" r="22" fill="#E889AD" stroke="#5D4B55" strokeWidth="4" />
                    <circle cx="0" cy="0" r="17" fill="#F4AFC8" opacity="0.6" />
                    <path
                      d="M0 -5 c -3 -5 -9 -4 -9 2 c 0 4 6 7 9 10 c 3 -3 9 -6 9 -10 c 0 -6 -6 -7 -9 -2 z"
                      fill="#FFF8FC"
                      stroke="#5D4B55"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />
                  </g>
                </motion.g>
              </svg>
            </motion.button>

            <motion.p
              animate={{ opacity: opened ? 0 : [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ color: '#E889AD', fontSize: '0.88rem', fontWeight: 600, marginTop: '0.2rem' }}
            >
              {opened ? 'abriendo...' : 'toca el sello para abrir ♡'}
            </motion.p>
          </motion.div>
        ) : (
          /* Carta Desplegada */
          <motion.div
            key="letter-expanded"
            initial={{ opacity: 0, scale: 0.92, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: '100%',
              maxWidth: '440px',
              backgroundColor: '#FFFDF9',
              borderRadius: '24px',
              border: '3px solid #5D4B55',
              boxShadow: '0 16px 32px rgba(93, 75, 85, 0.12), 0 4px 12px rgba(232, 137, 173, 0.25)',
              padding: '2rem 1.6rem',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
              maxHeight: '82dvh'
            }}
          >
            {/* Cabecera floral decorativa */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <span style={{ color: '#F4AFC8', fontSize: '1.1rem' }}>🌸</span>
              <span style={{ fontSize: '0.9rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E889AD', fontWeight: 700 }}>
                para ti
              </span>
              <span style={{ color: '#F4AFC8', fontSize: '1.1rem' }}>🌸</span>
            </div>

            {/* Contenedor escroleable suave para no romper el viewport */}
            <div
              className="letter-scroll-area"
              style={{
                overflowY: 'auto',
                paddingRight: '0.4rem',
                color: '#5D4B55',
                fontSize: '1.02rem',
                lineHeight: '1.75',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.1rem',
                fontFamily: 'inherit'
              }}
            >
              <p style={{ fontWeight: 600, color: '#5D4B55' }}>
                {LETTER_CONTENT.header}
              </p>

              {LETTER_CONTENT.paragraphs.map((p, idx) => (
                <p key={idx} style={{ margin: 0, opacity: 0.95 }}>
                  {p}
                </p>
              ))}

              <p style={{ marginTop: '0.8rem', fontWeight: 700, color: '#E889AD', fontSize: '1.12rem' }}>
                {LETTER_CONTENT.closing}
              </p>

              <div style={{ marginTop: '1.2rem', display: 'flex', justifyContent: 'center' }}>
                <CozyButton onClick={onComplete} ariaLabel="Guardar la carta y continuar">
                  {LETTER_CONTENT.buttonText}
                </CozyButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
