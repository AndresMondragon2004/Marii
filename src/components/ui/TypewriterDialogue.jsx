import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import SpeechBubble from './SpeechBubble.jsx'

/**
 * TypewriterDialogue:
 * - Escribe los textos letra por letra a un ritmo pausado y realista (~55ms por letra).
 * - MANTIENE todas las frases visibles en pantalla (se van acumulando una debajo de otra).
 * - Al tocar/hacer clic en el cuadro:
 *    * Si una línea se está escribiendo: la completa de inmediato.
 *    * Si ya terminó: inicia de inmediato la siguiente línea.
 * - Si no se toca nada, la siguiente línea comienza sola tras una pausa tranquila.
 */
export default function TypewriterDialogue({
  lines = [],
  speed = 95, // ms por letra (mucho más lento, pausado y tranquilo)
  autoAdvanceDelay = 3500, // ms de espera antes de empezar la siguiente línea automáticamente
  onFinished,
  className = '',
  bubble = true
}) {
  // activeLineIndex: índice de la línea que se está escribiendo actualmente
  const [activeLineIndex, setActiveLineIndex] = useState(0)
  // typedLines: array con el texto acumulado/actual de cada línea
  const [typedLines, setTypedLines] = useState(() => lines.map(() => ''))
  const [isTyping, setIsTyping] = useState(true)
  const [isAllDone, setIsAllDone] = useState(false)
  const reduced = useReducedMotion()

  const typingTimerRef = useRef(null)
  const autoAdvanceTimerRef = useRef(null)
  const charIndexRef = useRef(0)

  const currentFullLine = lines[activeLineIndex] || ''

  useEffect(() => {
    if (!currentFullLine) return

    clearTimeout(typingTimerRef.current)
    clearTimeout(autoAdvanceTimerRef.current)

    if (reduced) {
      setTypedLines([...lines])
      setIsTyping(false)
      setIsAllDone(true)
      if (onFinished) onFinished()
      return
    }

    charIndexRef.current = 0
    setIsTyping(true)

    const tick = () => {
      if (charIndexRef.current < currentFullLine.length) {
        charIndexRef.current += 1
        const partial = currentFullLine.slice(0, charIndexRef.current)
        setTypedLines((prev) => {
          const updated = [...prev]
          updated[activeLineIndex] = partial
          return updated
        })
        // Pausas naturales y notorias en puntuación y espacios
        const char = currentFullLine[charIndexRef.current - 1]
        const extraPause = char === ' ' ? 40 : char === ',' ? 320 : char === '.' || char === '?' || char === '!' || char === '♡' || char === '🥺' ? 450 : 0
        typingTimerRef.current = setTimeout(tick, speed + extraPause + (Math.random() * 14 - 7))
      } else {
        setIsTyping(false)
        if (activeLineIndex < lines.length - 1) {
          autoAdvanceTimerRef.current = setTimeout(() => {
            setActiveLineIndex((prev) => prev + 1)
          }, autoAdvanceDelay)
        } else {
          setIsAllDone(true)
          if (onFinished) onFinished()
        }
      }
    }

    typingTimerRef.current = setTimeout(tick, 250)

    return () => {
      clearTimeout(typingTimerRef.current)
      clearTimeout(autoAdvanceTimerRef.current)
    }
  }, [activeLineIndex, lines, speed, autoAdvanceDelay, reduced])

  // Manejar toque/clic
  const handleInteraction = () => {
    if (isTyping) {
      // Completar de inmediato la línea activa
      clearTimeout(typingTimerRef.current)
      setTypedLines((prev) => {
        const updated = [...prev]
        updated[activeLineIndex] = currentFullLine
        return updated
      })
      setIsTyping(false)

      if (activeLineIndex < lines.length - 1) {
        clearTimeout(autoAdvanceTimerRef.current)
        autoAdvanceTimerRef.current = setTimeout(() => {
          setActiveLineIndex((prev) => prev + 1)
        }, autoAdvanceDelay)
      } else {
        setIsAllDone(true)
        if (onFinished) onFinished()
      }
    } else {
      // Iniciar de inmediato la siguiente línea si aún quedan
      clearTimeout(autoAdvanceTimerRef.current)
      if (activeLineIndex < lines.length - 1) {
        setActiveLineIndex((prev) => prev + 1)
      } else {
        setIsAllDone(true)
        if (onFinished) onFinished()
      }
    }
  }

  const content = (
    <div
      onClick={handleInteraction}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault()
          handleInteraction()
        }
      }}
      aria-label="Toca para continuar el texto"
      style={{
        cursor: 'pointer',
        userSelect: 'none',
        outline: 'none',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.65rem'
      }}
    >
      {lines.map((_, i) => {
        if (i > activeLineIndex && !typedLines[i]) return null

        const text = typedLines[i]
        const isCurrentActive = i === activeLineIndex && isTyping

        return (
          <p
            key={i}
            className="welcome-line"
            style={{
              margin: 0,
              textAlign: 'center',
              lineHeight: 1.5,
              opacity: text ? 1 : 0,
              transition: 'opacity 0.25s ease'
            }}
          >
            <span>{text}</span>
            {isCurrentActive && !reduced && (
              <span
                style={{
                  display: 'inline-block',
                  color: '#E889AD',
                  fontWeight: 700,
                  marginLeft: '2px',
                  animation: 'pulse 0.8s infinite'
                }}
              >
                |
              </span>
            )}
          </p>
        )
      })}

      {/* Indicador suave de toque al final */}
      <AnimatePresence>
        {!isAllDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            exit={{ opacity: 0 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              fontSize: '0.74rem',
              color: '#E889AD',
              marginTop: '4px',
              fontWeight: 600
            }}
          >
            <span>{isTyping ? 'toca para completar' : 'toca para continuar'}</span>
            <motion.span
              animate={reduced ? undefined : { y: [0, 2, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              ♡ ▾
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  if (bubble) {
    return <SpeechBubble className={className}>{content}</SpeechBubble>
  }

  return <div className={className}>{content}</div>
}

