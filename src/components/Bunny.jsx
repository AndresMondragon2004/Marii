import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * Conejita mascotita del regalo:
 * - Parpadea y mueve las orejitas de vez en cuando.
 * - Sigue con la mirada el punto de toque/clic en la pantalla (`lookTarget`).
 * - Reacciona alegremente al hacerle tap/clic directo (saltito feliz + ojitos sonrientes).
 * - `holding`: 'box' | 'letter' para abrazar su regalo o carta.
 */
export default function Bunny({
  width = 130,
  happy = false,
  holding = null,
  lookTarget = null,
  onPet = null,
  className = '',
}) {
  const reduced = useReducedMotion()
  const [blink, setBlink] = useState(false)
  const [wiggle, setWiggle] = useState(false)
  const [petted, setPetted] = useState(false)
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 })
  const bunnyRef = useRef(null)

  const petTimerRef = useRef(null)
  const wiggleTimerRef = useRef(null)

  // Limpieza de temporizadores
  useEffect(() => {
    return () => {
      clearTimeout(petTimerRef.current)
      clearTimeout(wiggleTimerRef.current)
    }
  }, [])

  // Ciclo natural de parpadeo y movimiento de orejitas
  useEffect(() => {
    if (reduced) return undefined
    const timers = new Set()
    const later = (fn, ms) => {
      const t = setTimeout(fn, ms)
      timers.add(t)
      return t
    }
    const blinkCycle = () => {
      setBlink(true)
      later(() => {
        setBlink(false)
        later(blinkCycle, 2600 + Math.random() * 2600)
      }, 150)
    }
    const wiggleCycle = () => {
      setWiggle(true)
      later(() => {
        setWiggle(false)
        later(wiggleCycle, 3800 + Math.random() * 3200)
      }, 700)
    }
    later(blinkCycle, 1800)
    later(wiggleCycle, 2600)
    return () => timers.forEach(clearTimeout)
  }, [reduced])

  // Seguimiento de mirada hacia el punto de toque
  useEffect(() => {
    if (reduced || !lookTarget || !bunnyRef.current) return undefined

    const rect = bunnyRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height * 0.45 // nivel de los ojitos

    const dx = lookTarget.x - centerX
    const dy = lookTarget.y - centerY

    // Calculamos el desplazamiento proporcional acotado a las cuencas oculares
    const maxShiftX = 4.5
    const maxShiftY = 3.5
    const distance = Math.hypot(dx, dy) || 1
    const factor = Math.min(1, distance / 220)

    const targetX = (dx / distance) * maxShiftX * factor
    const targetY = (dy / distance) * maxShiftY * factor

    setEyeOffset({ x: targetX, y: targetY })

    // Regresa suavemente la mirada al centro tras unos instantes
    const timer = setTimeout(() => {
      setEyeOffset({ x: 0, y: 0 })
    }, 2200)

    return () => clearTimeout(timer)
  }, [lookTarget, reduced])

  // Interacción al tocar la conejita
  const handlePet = () => {
    if (reduced) return
    clearTimeout(petTimerRef.current)
    clearTimeout(wiggleTimerRef.current)
    setPetted(true)
    setWiggle(true)
    onPet?.()
    petTimerRef.current = setTimeout(() => setPetted(false), 1200)
    wiggleTimerRef.current = setTimeout(() => setWiggle(false), 800)
  }

  const isHappy = happy || petted

  return (
    <motion.div
      ref={bunnyRef}
      className={`bunny-interactive ${className}`}
      onClick={handlePet}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault()
          handlePet()
        }
      }}
      aria-label="conejita: haz clic para acariciarla"
      animate={
        reduced
          ? undefined
          : petted
            ? { y: [0, -10, 0, -3, 0], scale: [1, 1.05, 0.98, 1.01, 1] }
            : { y: [0, -3, 0] }
      }
      transition={
        petted
          ? { duration: 0.6, ease: 'easeOut' }
          : { duration: 3.4, repeat: Infinity, ease: 'easeInOut' }
      }
      style={{ lineHeight: 0, cursor: 'pointer', display: 'inline-block', transform: 'translateZ(0)', willChange: 'transform' }}
    >
      <svg viewBox="0 0 200 210" width={width} role="img" aria-label="conejita">
        {/* oreja izquierda (se menea sola de vez en cuando o al acariciar) */}
        <motion.g
          animate={wiggle ? { rotate: [0, -7, 6, 0] } : { rotate: 0 }}
          transition={{ duration: 0.6 }}
          style={{ transformBox: 'fill-box', transformOrigin: '50% 95%' }}
        >
          <ellipse cx="74" cy="56" rx="17" ry="42" fill="#F8C8DC" stroke="#5D4B55" strokeWidth="6" transform="rotate(-10 74 56)" />
          <ellipse cx="74" cy="62" rx="8" ry="26" fill="#F4AFC8" transform="rotate(-10 74 62)" />
        </motion.g>

        {/* oreja derecha + moñito */}
        <motion.g
          animate={wiggle ? { rotate: [0, 7, -6, 0] } : { rotate: 0 }}
          transition={{ duration: 0.6 }}
          style={{ transformBox: 'fill-box', transformOrigin: '50% 95%' }}
        >
          <ellipse cx="126" cy="56" rx="17" ry="42" fill="#F8C8DC" stroke="#5D4B55" strokeWidth="6" transform="rotate(10 126 56)" />
          <ellipse cx="126" cy="62" rx="8" ry="26" fill="#F4AFC8" transform="rotate(10 126 62)" />
          <path d="M131 90 C 119 78 105 82 111 92 C 105 102 119 106 131 90 Z" fill="#E889AD" stroke="#5D4B55" strokeWidth="4.5" strokeLinejoin="round" />
          <path d="M131 90 C 143 78 157 82 151 92 C 157 102 143 106 131 90 Z" fill="#E889AD" stroke="#5D4B55" strokeWidth="4.5" strokeLinejoin="round" />
          <circle cx="131" cy="90" r="6" fill="#FFF1DC" stroke="#5D4B55" strokeWidth="4" />
        </motion.g>

        {/* carita y cuerpo */}
        <ellipse cx="100" cy="176" rx="42" ry="26" fill="#F8C8DC" stroke="#5D4B55" strokeWidth="6" />
        <circle cx="100" cy="112" r="48" fill="#F8C8DC" stroke="#5D4B55" strokeWidth="6" />
        <ellipse cx="82" cy="192" rx="10" ry="7" fill="#F4AFC8" />
        <ellipse cx="118" cy="192" rx="10" ry="7" fill="#F4AFC8" />
        
        {/* Mejillas sonrojadas (brillan más si está feliz) */}
        <circle cx="66" cy="126" r={isHappy ? 9.5 : 8} fill={isHappy ? '#E889AD' : '#F4AFC8'} opacity={isHappy ? 0.95 : 0.85} />
        <circle cx="134" cy="126" r={isHappy ? 9.5 : 8} fill={isHappy ? '#E889AD' : '#F4AFC8'} opacity={isHappy ? 0.95 : 0.85} />

        {/* ojitos (parpadean o siguen la mirada hacia los toques) */}
        {isHappy ? (
          <g stroke="#5D4B55" strokeWidth="5" fill="none" strokeLinecap="round">
            <path d="M74 106 q 8 -9 16 0" />
            <path d="M110 106 q 8 -9 16 0" />
          </g>
        ) : (
          <motion.g
            animate={{ scaleY: blink ? 0.12 : 1 }}
            transition={{ duration: 0.1 }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          >
            {/* Ojo izquierdo interactivo */}
            <g transform={`translate(${eyeOffset.x}, ${eyeOffset.y})`}>
              <circle cx="82" cy="106" r="6.5" fill="#5D4B55" />
              <circle cx="84.5" cy="103.5" r="2.2" fill="#FFF8FC" />
            </g>
            {/* Ojo derecho interactivo */}
            <g transform={`translate(${eyeOffset.x}, ${eyeOffset.y})`}>
              <circle cx="118" cy="106" r="6.5" fill="#5D4B55" />
              <circle cx="120.5" cy="103.5" r="2.2" fill="#FFF8FC" />
            </g>
          </motion.g>
        )}

        {/* naricita y boquita */}
        <path d="M96 118 h 8 l -4 6 z" fill="#E889AD" />
        <path d="M100 124 q 0 6 -6 8 M100 124 q 0 6 6 8" stroke="#5D4B55" strokeWidth="4" fill="none" strokeLinecap="round" />

        {/* Objeto sostenido entre las patitas */}
        {holding === 'box' && (
          <g>
            {/* cajita mini en el pechito */}
            <rect x="74" y="148" width="52" height="34" rx="8" fill="#FFF1DC" stroke="#5D4B55" strokeWidth="4.5" />
            <rect x="71" y="140" width="58" height="12" rx="5" fill="#F4AFC8" stroke="#5D4B55" strokeWidth="4.5" />
            <rect x="94" y="140" width="12" height="42" fill="#E889AD" />
            {/* moñito */}
            <path d="M100 139 C 90 127 78 131 84 139 C 78 147 90 151 100 139 Z" fill="#E889AD" stroke="#5D4B55" strokeWidth="3.5" strokeLinejoin="round" />
            <path d="M100 139 C 110 127 122 131 116 139 C 122 147 110 151 100 139 Z" fill="#E889AD" stroke="#5D4B55" strokeWidth="3.5" strokeLinejoin="round" />
            <circle cx="100" cy="139" r="4" fill="#FFF1DC" stroke="#5D4B55" strokeWidth="3" />
            {/* patitas abrazando la cajita */}
            <ellipse cx="73" cy="162" rx="9" ry="7" fill="#F8C8DC" stroke="#5D4B55" strokeWidth="4.5" transform="rotate(12 73 162)" />
            <ellipse cx="127" cy="162" rx="9" ry="7" fill="#F8C8DC" stroke="#5D4B55" strokeWidth="4.5" transform="rotate(-12 127 162)" />
          </g>
        )}

        {holding === 'letter' && (
          <g>
            {/* sobrecito mini en el pechito */}
            <rect x="72" y="146" width="56" height="36" rx="6" fill="#FFF8FC" stroke="#5D4B55" strokeWidth="4" />
            <path d="M72 146 L100 166 L128 146" fill="#FFF1DC" stroke="#5D4B55" strokeWidth="3.5" strokeLinejoin="round" />
            <path d="M100 165 c -3 -4 -8 -3 -8 2 c 0 3 5 6 8 8 c 3 -2 8 -5 8 -8 c 0 -5 -5 -6 -8 -2 z" fill="#E889AD" />
            {/* patitas */}
            <ellipse cx="72" cy="162" rx="9" ry="7" fill="#F8C8DC" stroke="#5D4B55" strokeWidth="4.5" transform="rotate(12 72 162)" />
            <ellipse cx="128" cy="162" rx="9" ry="7" fill="#F8C8DC" stroke="#5D4B55" strokeWidth="4.5" transform="rotate(-12 128 162)" />
          </g>
        )}

        {holding === 'heart' && (
          <g>
            {/* corazón grande en el pechito */}
            <path
              d="M100 178 c -10 -15 -28 -12 -28 4 c 0 12 18 22 28 30 c 10 -8 28 -18 28 -30 c 0 -16 -18 -19 -28 -4 z"
              fill="#E889AD"
              stroke="#5D4B55"
              strokeWidth="5"
              strokeLinejoin="round"
              transform="translate(0, -30)"
            />
            {/* patitas */}
            <ellipse cx="68" cy="158" rx="9" ry="7" fill="#F8C8DC" stroke="#5D4B55" strokeWidth="4.5" transform="rotate(16 68 158)" />
            <ellipse cx="132" cy="158" rx="9" ry="7" fill="#F8C8DC" stroke="#5D4B55" strokeWidth="4.5" transform="rotate(-16 132 158)" />
          </g>
        )}
      </svg>
    </motion.div>
  )
}
