import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DynamicSky from '../../components/daily/DynamicSky.jsx'
import DailyHeader from '../../components/daily/DailyHeader.jsx'
import DailyNav from '../../components/daily/DailyNav.jsx'
import Bunny from '../../components/Bunny.jsx'
import ClickSparkles from '../../components/fx/ClickSparkles.jsx'
import { useSkyTime } from '../../hooks/useSkyTime.js'
import { triggerHaptic } from '../../utils/haptics.js'

// Modales del Rinconcito
import ApapachoModal from './modules/ApapachoModal.jsx'
import CalmModeModal from './modules/CalmModeModal.jsx'
import DailySurpriseModal from './modules/DailySurpriseModal.jsx'
import FortuneCookieModal from './modules/FortuneCookieModal.jsx'
import LeavingModeModal from './modules/LeavingModeModal.jsx'
import VipPassViewModal from './modules/VipPassViewModal.jsx'
import MemoriesModal from './modules/MemoriesModal.jsx'
import MinigamesModal from './modules/MinigamesModal.jsx'
import SettingsModal from '../../components/settings/SettingsModal.jsx'
import InstallModal from '../../components/daily/InstallModal.jsx'

export default function DailyHome() {
  const { period, skyName, greeting, subtitle } = useSkyTime()
  const [activeModal, setActiveModal] = useState(null)
  const [bunnyMessage, setBunnyMessage] = useState(null)
  const bunnyTimerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (bunnyTimerRef.current) clearTimeout(bunnyTimerRef.current)
    }
  }, [])

  const handlePetBunny = () => {
    triggerHaptic('purr')
    if (bunnyTimerRef.current) {
      clearTimeout(bunnyTimerRef.current)
    }

    const petQuotes = [
      '¡Te quelo mucho! ♡',
      'Qué rico que estés aquí, bonita ♡',
      'Aquí siempre tienes un lugarcito seguro.',
      '*abrazo esponjoso* 🌸',
      '¡Patitas suaves para ti! 🐾',
      'Hoy estás más hermosa que nunca ♡',
      'La conejita ronronea de felicidad ✨',
      'Pofis, no te olvides de sonreír hoy.',
      'Chi, te mereces todo lo bonito del mundo.',
      'Un besito en la frente con mucho cariño ♡',
      'Qué lindo tenerte de vuelta por aquí 🌷',
      'Eres mi humana favorita en todo el universo ♡',
      '¡Brillitos mágicos para alegrar tu día! ✨',
      'Te mando un apapacho calientito y suave.',
      'Gracias por venir a visitarme hoy ♡',
      'La conejita te regala una fresita invisible 🍓',
      'Descansa tus hombros... todo está bien ♡',
      'Siempre voy a estar esperándote aquí 🐇',
      '¡Qué bonito es tu corazón! ♡',
      'Te quelo con todo mi corazoncito de melón 🍉'
    ]

    let chosen = petQuotes[Math.floor(Math.random() * petQuotes.length)]
    if (chosen === bunnyMessage && petQuotes.length > 1) {
      chosen = petQuotes[(petQuotes.indexOf(chosen) + 1) % petQuotes.length]
    }

    setBunnyMessage(chosen)
    bunnyTimerRef.current = setTimeout(() => {
      setBunnyMessage(null)
    }, 4500)
  }

  const openModule = (mod) => {
    triggerHaptic('tap')
    setActiveModal(mod)
  }

  return (
    <main className="daily-home-screen" aria-live="polite">
      <ClickSparkles />
      <DynamicSky period={period} />

      {/* Cabecera con selector de música, instalar, memorias y ajustes */}
      <DailyHeader
        skyName={skyName}
        onOpenMemories={() => openModule('memories')}
        onOpenSettings={() => openModule('settings')}
        onOpenInstall={() => openModule('install')}
      />

      {/* Zona Central: Conejita y Saludo */}
      <section className="daily-center-zone">
        {/* Contenedor fijo de la conejita con globo de diálogo estable */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          {/* Globo de diálogo flotante con colita hacia la conejita */}
          <div style={{ minHeight: '48px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', width: '100%', maxWidth: '320px', padding: '0 8px', boxSizing: 'border-box' }}>
            <AnimatePresence mode="wait">
              {bunnyMessage && (
                <motion.div
                  key={bunnyMessage}
                  initial={{ opacity: 0, y: 6, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.92 }}
                  transition={{ duration: 0.22 }}
                  style={{
                    position: 'relative',
                    backgroundColor: 'rgba(255, 255, 255, 0.96)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    border: '2px solid var(--pink-soft)',
                    borderRadius: '16px',
                    padding: '7px 14px',
                    boxShadow: '0 6px 18px rgba(232, 137, 173, 0.22)',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    color: '#5D4B55',
                    textAlign: 'center',
                    lineHeight: 1.35,
                    zIndex: 10
                  }}
                >
                  <span>{bunnyMessage}</span>
                  {/* Colita hacia abajo apuntando a la conejita */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-7px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 0,
                      height: 0,
                      borderLeft: '7px solid transparent',
                      borderRight: '7px solid transparent',
                      borderTop: '7px solid var(--pink-soft)'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-5px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 0,
                      height: 0,
                      borderLeft: '5px solid transparent',
                      borderRight: '5px solid transparent',
                      borderTop: '5px solid #fff'
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Conejita interactiva (se puede acariciar) */}
          <div
            style={{ cursor: 'pointer', margin: '0.15rem 0', userSelect: 'none', WebkitUserSelect: 'none' }}
            title="Toca a la conejita para saludarla y recibir amor"
          >
            <Bunny width={120} happy onPet={handlePetBunny} />
          </div>
        </div>

        {/* Título y Saludo fijo y permanente */}
        <div style={{ width: '100%', textAlign: 'center' }}>
          <h1 className="daily-greeting-title" style={{ fontSize: '1.65rem', color: '#5D4B55', margin: '0 0 0.2rem' }}>
            Tu Rinconcito ♡
          </h1>
          <p style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--pink-strong)', margin: '0.2rem 0' }}>
            {greeting}
          </p>
          <p className="daily-greeting-sub" style={{ margin: '0 auto' }}>
            {subtitle}
          </p>
        </div>

        {/* Botonera de Acciones Rápidas */}
        <div className="daily-quick-grid">
          <motion.button
            type="button"
            className="quick-action-card"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => openModule('apapacho')}
          >
            <span style={{ fontSize: '1.25rem' }}>🌷</span>
            <span>un apapacho</span>
          </motion.button>

          <motion.button
            type="button"
            className="quick-action-card"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => openModule('calm')}
          >
            <span style={{ fontSize: '1.25rem' }}>🌙</span>
            <span>hoy no puedo</span>
          </motion.button>

          <motion.button
            type="button"
            className="quick-action-card"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => openModule('surprise')}
          >
            <span style={{ fontSize: '1.25rem' }}>🎁</span>
            <span>sorpresa de hoy</span>
          </motion.button>

          <motion.button
            type="button"
            className="quick-action-card"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => openModule('cookie')}
          >
            <span style={{ fontSize: '1.25rem' }}>🍪</span>
            <span>una cosita</span>
          </motion.button>

          <motion.button
            type="button"
            className="quick-action-card"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => openModule('leaving')}
          >
            <span style={{ fontSize: '1.25rem' }}>🌤️</span>
            <span>ya terminé por hoy</span>
          </motion.button>

          <motion.button
            type="button"
            className="quick-action-card"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => openModule('vip')}
          >
            <span style={{ fontSize: '1.25rem' }}>🎟️</span>
            <span>mi pase VIP</span>
          </motion.button>
        </div>
      </section>

      {/* Dock de Navegación Flotante */}
      <DailyNav onSelectModule={(mod) => openModule(mod)} />

      {/* Modales Emergentes */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            key="modal-overlay"
            className="daily-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveModal(null)
            }}
          >
            {activeModal === 'apapacho' && <ApapachoModal onClose={() => setActiveModal(null)} />}
            {activeModal === 'calm' && <CalmModeModal onClose={() => setActiveModal(null)} />}
            {activeModal === 'surprise' && <DailySurpriseModal onClose={() => setActiveModal(null)} />}
            {activeModal === 'cookie' && <FortuneCookieModal onClose={() => setActiveModal(null)} />}
            {activeModal === 'leaving' && <LeavingModeModal onClose={() => setActiveModal(null)} />}
            {activeModal === 'vip' && <VipPassViewModal onClose={() => setActiveModal(null)} />}
            {activeModal === 'memories' && <MemoriesModal onClose={() => setActiveModal(null)} />}
            {activeModal === 'games' && <MinigamesModal onClose={() => setActiveModal(null)} />}
            {activeModal === 'settings' && <SettingsModal onClose={() => setActiveModal(null)} />}
            {activeModal === 'install' && <InstallModal onClose={() => setActiveModal(null)} />}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
