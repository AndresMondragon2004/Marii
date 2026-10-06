import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CozyButton from '../../../components/ui/CozyButton.jsx'
import Bunny from '../../../components/Bunny.jsx'
import SparkleBurst from '../../../components/fx/SparkleBurst.jsx'
import { triggerHaptic } from '../../../utils/haptics.js'

function GardenGame() {
  const [bloomed, setBloomed] = useState([false, false, false, false, false, false])
  const flowers = ['🌷', '🌼', '🌸', '🌻', '🌺', '🌷']

  const toggleBloom = (idx) => {
    triggerHaptic('light')
    setBloomed((prev) => {
      const copy = [...prev]
      copy[idx] = true
      return copy
    })
  }

  const allBloomed = bloomed.every(Boolean)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem', width: '100%' }}>
      <p style={{ color: 'var(--ink-soft)', fontSize: '0.88rem', margin: 0, lineHeight: 1.4 }}>
        Toca cada brote de tierra para hacer florecer el jardincito ♡
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem', margin: '0.4rem auto', maxWidth: '220px' }}>
        {bloomed.map((isBloom, idx) => (
          <motion.button
            key={idx}
            type="button"
            onClick={() => toggleBloom(idx)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            style={{
              width: '56px',
              height: '56px',
              backgroundColor: isBloom ? '#FFF1DC' : '#EAE4D9',
              border: '2px solid #5D4B55',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isBloom ? '1.6rem' : '1rem',
              cursor: isBloom ? 'default' : 'pointer',
              boxShadow: '0 3px 8px rgba(0,0,0,0.06)'
            }}
          >
            {isBloom ? flowers[idx] : '🌱'}
          </motion.button>
        ))}
      </div>

      {allBloomed && (
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
          <SparkleBurst count={8} color="#E889AD" />
          <p style={{ color: '#E889AD', fontWeight: 700, fontSize: '0.92rem', margin: 0 }}>
            ¡Qué bonito floreció todo! 🌸
          </p>
        </motion.div>
      )}
    </div>
  )
}

function StarCatchGame() {
  const [tapped, setTapped] = useState(0)
  const [eggTriggered, setEggTriggered] = useState(false)

  const handleStarTap = () => {
    const next = tapped + 1
    triggerHaptic(next === 3 ? 'celebration' : 'sparkle')
    setTapped(next)
    if (next === 3) setEggTriggered(true)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem', width: '100%' }}>
      <p style={{ color: 'var(--ink-soft)', fontSize: '0.88rem', margin: 0, lineHeight: 1.4 }}>
        Toca la estrellita para pedir un deseo suave ♡
      </p>

      <motion.button
        type="button"
        onClick={handleStarTap}
        whileHover={{ scale: 1.12, rotate: 12 }}
        whileTap={{ scale: 0.88, rotate: -12 }}
        style={{
          width: '74px',
          height: '74px',
          backgroundColor: '#FFF8E7',
          border: '2.5px solid #E6C280',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.2rem',
          cursor: 'pointer',
          boxShadow: '0 6px 18px rgba(230, 194, 128, 0.35)',
          margin: '0.5rem 0'
        }}
      >
        ⭐
      </motion.button>

      <p style={{ color: 'var(--ink-soft)', fontSize: '0.84rem', margin: 0 }}>
        Deseos pedidos: {tapped} ✨
      </p>

      {/* Easter Egg discreto */}
      {eggTriggered && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            backgroundColor: '#FFF8FC',
            border: '2px solid #E889AD',
            borderRadius: '14px',
            padding: '0.5rem 0.8rem',
            fontSize: '0.82rem',
            color: '#5D4B55',
            fontWeight: 600,
            maxWidth: '300px',
            lineHeight: 1.35
          }}
        >
          🍳 “Un sartén dorado protegiendo tus sueños... ¡Booyah! ♡”
        </motion.div>
      )}
    </div>
  )
}

function BunnyCareGame() {
  const [happiness, setHappiness] = useState(25)
  const [reaction, setReaction] = useState('¡Hola bonita! ¿Me das un mimo? ♡')
  const [munching, setMunching] = useState(false)

  const treats = [
    { id: 'berry', icon: '🍓', name: 'Fresita', msg: '¡Ñam ñam! Qué dulce, ¡gracias! 🍓♡' },
    { id: 'carrot', icon: '🥕', name: 'Zanahoria', msg: '¡Crujiente y rica! Eres la mejor 🥕✨' },
    { id: 'cake', icon: '🍰', name: 'Pastelito', msg: '¡Mmm pastelito esponjoso! ♡🍰' },
    { id: 'flower', icon: '🌸', name: 'Flor', msg: '¡Qué bonita flor! Huele deli 🌸' }
  ]

  const feedTreat = (treat) => {
    triggerHaptic('tap')
    setMunching(true)
    setReaction(treat.msg)
    setHappiness((prev) => Math.min(100, prev + 25))
    setTimeout(() => setMunching(false), 800)
  }

  const petBunny = () => {
    triggerHaptic('purr')
    setReaction('¡Ayyy qué rico mimo! *ronroneo suave* ♡')
    setHappiness((prev) => Math.min(100, prev + 15))
  }

  const isFull = happiness >= 100

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.7rem', width: '100%' }}>
      <p style={{ color: 'var(--ink-soft)', fontSize: '0.86rem', margin: 0, lineHeight: 1.35 }}>
        Alimenta y acaricia a la conejita para hacerla feliz ♡
      </p>

      {/* Barra de Felicidad */}
      <div style={{ width: '100%', maxWidth: '230px', display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.76rem', color: '#5D4B55', fontWeight: 600 }}>
          <span>Felicidad</span>
          <span>{happiness}% {isFull ? '💖' : '♡'}</span>
        </div>
        <div style={{ width: '100%', height: '8px', backgroundColor: '#F8E9EE', borderRadius: '999px', border: '1.5px solid #5D4B55', overflow: 'hidden' }}>
          <motion.div
            style={{ height: '100%', backgroundColor: '#E889AD', borderRadius: '999px' }}
            initial={{ width: '25%' }}
            animate={{ width: `${happiness}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Frase reactiva de la conejita con altura estable para evitar saltos */}
      <div style={{ minHeight: '40px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px', boxSizing: 'border-box' }}>
        <AnimatePresence mode="wait">
          <motion.p
            key={reaction}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.2 }}
            style={{ fontSize: 'clamp(0.8rem, 3.3vw, 0.88rem)', color: '#E889AD', fontWeight: 700, margin: 0, textAlign: 'center', lineHeight: 1.35 }}
          >
            {reaction}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Conejita interactiva */}
      <motion.div
        whileTap={{ scale: 0.94 }}
        animate={munching ? { scale: [1, 1.1, 1], rotate: [-3, 3, 0] } : { y: [0, -3, 0] }}
        transition={munching ? { duration: 0.5 } : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        onClick={petBunny}
        style={{ cursor: 'pointer', margin: '0.1rem 0' }}
        title="Toca a la conejita para acariciarla"
      >
        <Bunny width={100} happy />
      </motion.div>

      {/* Botones de comiditas en Grid de 4 columnas perfectamente responsiva */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', width: '100%', maxWidth: '300px', margin: '0 auto' }}>
        {treats.map((t) => (
          <motion.button
            key={t.id}
            type="button"
            onClick={() => feedTreat(t)}
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.92 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
              backgroundColor: '#FFF1DC',
              border: '2px solid #5D4B55',
              borderRadius: '14px',
              padding: '0.4rem 0.2rem',
              minWidth: 0,
              cursor: 'pointer',
              boxShadow: '0 3px 6px rgba(0,0,0,0.06)'
            }}
          >
            <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>{t.icon}</span>
            <span style={{ fontSize: 'clamp(0.64rem, 2.5vw, 0.72rem)', color: '#5D4B55', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>
              {t.name}
            </span>
          </motion.button>
        ))}
      </div>

      {isFull && (
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} style={{ marginTop: '0.2rem' }}>
          <SparkleBurst count={8} color="#E889AD" />
          <p style={{ color: '#E889AD', fontWeight: 800, fontSize: '0.88rem', margin: 0 }}>
            ✨ ¡Conejita 100% mimada y feliz! Te quelo mucho ♡ ✨
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default function MinigamesModal({ onClose }) {
  const [tab, setTab] = useState('bunny') // 'bunny' | 'garden' | 'stars'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      className="gift-modal-screen"
      style={{
        width: '100%',
        maxWidth: 'min(92vw, 420px)',
        backgroundColor: '#FFFDF9',
        borderRadius: '24px',
        border: '3px solid #5D4B55',
        boxShadow: '0 16px 36px rgba(93, 75, 85, 0.14)',
        padding: '1.4rem 1.1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '0.9rem',
        maxHeight: '85dvh',
        overflowY: 'auto',
        boxSizing: 'border-box'
      }}
    >
      {/* Encabezado */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <span style={{ fontSize: '1.1rem' }}>✨</span>
        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#E889AD', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          pequeños juegos
        </span>
        <span style={{ fontSize: '1.1rem' }}>✨</span>
      </div>

      {/* Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', width: '100%', maxWidth: '330px', backgroundColor: '#FFF8FC', padding: '3px', borderRadius: '999px', border: '1.5px solid var(--pink-soft)', boxSizing: 'border-box' }}>
        {[
          { id: 'bunny', label: '🐇 Conejita' },
          { id: 'garden', label: '🌸 Jardín' },
          { id: 'stars', label: '⭐ Estrellas' }
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            style={{
              padding: '0.35rem 0.2rem',
              borderRadius: '999px',
              border: 'none',
              backgroundColor: tab === t.id ? '#F8C8DC' : 'transparent',
              color: '#5D4B55',
              fontSize: 'clamp(0.72rem, 3.2vw, 0.82rem)',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'background 0.2s ease',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              minWidth: 0
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Contenido del juego */}
      <div style={{ minHeight: '160px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AnimatePresence mode="wait">
          {tab === 'bunny' && (
            <motion.div key="bunny" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ width: '100%' }}>
              <BunnyCareGame />
            </motion.div>
          )}
          {tab === 'garden' && (
            <motion.div key="garden" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ width: '100%' }}>
              <GardenGame />
            </motion.div>
          )}
          {tab === 'stars' && (
            <motion.div key="stars" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ width: '100%' }}>
              <StarCatchGame />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div style={{ marginTop: '0.2rem', display: 'flex', justifyContent: 'center' }}>
        <CozyButton onClick={onClose} ariaLabel="Cerrar juegos">
          cerrar ♡
        </CozyButton>
      </div>
    </motion.div>
  )
}
