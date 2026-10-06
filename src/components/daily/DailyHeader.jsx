import { useState } from 'react'
import { motion } from 'framer-motion'
import { musicBox } from '../../utils/musicEngine.js'
import { triggerHaptic } from '../../utils/haptics.js'

export default function DailyHeader({ skyName, onOpenMemories, onOpenSettings, onOpenInstall }) {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false)

  const handleToggleMusic = () => {
    triggerHaptic('tap')
    const active = musicBox.toggle()
    setIsPlayingMusic(active)
  }

  return (
    <header
      style={{
        width: '100%',
        maxWidth: '480px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.4rem 0.6rem',
        zIndex: 2,
        boxSizing: 'border-box'
      }}
    >
      {/* Insignia de Momento del Día */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          backgroundColor: 'rgba(255, 255, 255, 0.78)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          border: '1.5px solid var(--pink-soft)',
          padding: '0.3rem 0.65rem',
          borderRadius: '999px',
          fontSize: 'clamp(0.74rem, 2.8vw, 0.8rem)',
          fontWeight: 600,
          color: 'var(--ink)'
        }}
      >
        <span>🌸</span>
        <span>Tu Rinconcito</span>
        <span style={{ opacity: 0.5 }}>·</span>
        <span style={{ color: 'var(--pink-strong)' }}>{skyName}</span>
      </motion.div>

      {/* Botones de Cabecera: Música, Instalar, Recuerdos y Ajustes */}
      <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
        {/* Botón Música Lo-fi / Cajita musical */}
        <motion.button
          type="button"
          onClick={handleToggleMusic}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={isPlayingMusic ? 'Pausar melodía' : 'Reproducir melodía relajante'}
          title={isPlayingMusic ? 'Música: activa ♡' : 'Música: pausada'}
          style={{
            backgroundColor: isPlayingMusic ? '#F8C8DC' : 'rgba(255, 255, 255, 0.78)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            border: `1.5px solid ${isPlayingMusic ? '#E889AD' : 'var(--pink-soft)'}`,
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.92rem',
            cursor: 'pointer',
            boxShadow: isPlayingMusic ? '0 0 10px rgba(232, 137, 173, 0.4)' : 'none'
          }}
        >
          <motion.span animate={isPlayingMusic ? { rotate: [0, -10, 10, 0] } : {}} transition={{ duration: 1.5, repeat: Infinity }}>
            {isPlayingMusic ? '🎵' : '🔇'}
          </motion.span>
        </motion.button>

        {/* Botón Instalar PWA */}
        <motion.button
          type="button"
          onClick={() => {
            triggerHaptic('tap')
            onOpenInstall?.()
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Guardar app en celular"
          title="Guardar como app en celular 📲"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.78)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            border: '1.5px solid var(--pink-soft)',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.92rem',
            cursor: 'pointer'
          }}
        >
          📲
        </motion.button>

        {/* Botón Recuerdos */}
        <motion.button
          type="button"
          onClick={() => {
            triggerHaptic('tap')
            onOpenMemories?.()
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Ver recuerdos"
          title="Cajita de recuerdos 📦"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.78)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            border: '1.5px solid var(--pink-soft)',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.92rem',
            cursor: 'pointer'
          }}
        >
          📦
        </motion.button>

        {/* Botón Configuración */}
        <motion.button
          type="button"
          onClick={() => {
            triggerHaptic('tap')
            onOpenSettings?.()
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Configuración"
          title="Configuración ⚙️"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.78)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            border: '1.5px solid var(--pink-soft)',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.92rem',
            cursor: 'pointer'
          }}
        >
          ⚙️
        </motion.button>
      </div>
    </header>
  )
}
