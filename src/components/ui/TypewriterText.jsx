import { useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * TypewriterText:
 * Renderiza texto letra por letra con ritmo suave.
 * Permite autocompletar la línea si se llama complete().
 */
export default function TypewriterText({
  text = '',
  speed = 32, // ms por caracter
  delay = 0, // ms antes de empezar
  onComplete,
  className = '',
  as = 'p',
  style = {}
}) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const reduced = useReducedMotion()
  const timerRef = useRef(null)
  const indexRef = useRef(0)

  useEffect(() => {
    if (reduced) {
      setDisplayedText(text)
      setIsTyping(false)
      if (onComplete) onComplete()
      return
    }

    setDisplayedText('')
    indexRef.current = 0
    setIsTyping(false)

    const startTimer = setTimeout(() => {
      setIsTyping(true)
      const tick = () => {
        if (indexRef.current < text.length) {
          indexRef.current += 1
          setDisplayedText(text.slice(0, indexRef.current))
          timerRef.current = setTimeout(tick, speed + (Math.random() * 12 - 6))
        } else {
          setIsTyping(false)
          if (onComplete) onComplete()
        }
      }
      tick()
    }, delay)

    return () => {
      clearTimeout(startTimer)
      clearTimeout(timerRef.current)
    }
  }, [text, speed, delay, reduced])

  const Tag = as

  return (
    <Tag className={className} style={{ ...style, position: 'relative' }}>
      {displayedText}
      {isTyping && !reduced && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          style={{ color: '#E889AD', fontWeight: 'bold', marginLeft: '2px' }}
        >
          |
        </motion.span>
      )}
    </Tag>
  )
}
