import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import CozyButton from '../ui/CozyButton.jsx'
import Bunny from '../Bunny.jsx'
import SparkleBurst from '../fx/SparkleBurst.jsx'

export default function InstallModal({ onClose }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [installed, setInstalled] = useState(false)
  const [platform, setPlatform] = useState('ios') // 'ios' | 'android' | 'other'

  useEffect(() => {
    // Detectar plataforma aproximada
    const userAgent = window.navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setPlatform('ios')
    } else if (/android/.test(userAgent)) {
      setPlatform('android')
    } else {
      setPlatform('other')
    }

    const handleBeforeInstall = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    const handleAppInstalled = () => {
      setInstalled(true)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleNativeInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setInstalled(true)
    }
    setDeferredPrompt(null)
  }

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
      <SparkleBurst count={6} color="#E889AD" />

      {/* Encabezado */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <span style={{ fontSize: '1.2rem' }}>📲</span>
        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#E889AD', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          guardar en tu pantalla de inicio
        </span>
        <span style={{ fontSize: '1.2rem' }}>📲</span>
      </div>

      <div style={{ margin: '0.2rem 0' }}>
        <Bunny width={100} happy />
      </div>

      <p style={{ color: 'var(--ink)', fontSize: '0.92rem', lineHeight: 1.45, margin: 0 }}>
        Para que entres a tu rinconcito como si fuera una <strong>app real</strong> en tu celular con su propio icono de conejita:
      </p>

      {/* Selector de instrucciones */}
      <div style={{ display: 'flex', gap: '6px', backgroundColor: '#FFF8FC', padding: '3px', borderRadius: '999px', border: '1.5px solid var(--pink-soft)' }}>
        <button
          type="button"
          onClick={() => setPlatform('ios')}
          style={{
            padding: '0.35rem 0.8rem',
            borderRadius: '999px',
            backgroundColor: platform === 'ios' ? '#F8C8DC' : 'transparent',
            color: '#5D4B55',
            fontSize: '0.78rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          🍎 iPhone / iPad
        </button>
        <button
          type="button"
          onClick={() => setPlatform('android')}
          style={{
            padding: '0.35rem 0.8rem',
            borderRadius: '999px',
            backgroundColor: platform === 'android' ? '#F8C8DC' : 'transparent',
            color: '#5D4B55',
            fontSize: '0.78rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          🤖 Android
        </button>
      </div>

      {/* Instrucciones según plataforma */}
      <div
        style={{
          width: '100%',
          backgroundColor: '#FFF8FC',
          border: '2px solid var(--pink-soft)',
          borderRadius: '16px',
          padding: '0.9rem 0.8rem',
          textAlign: 'left',
          fontSize: '0.84rem',
          color: '#5D4B55',
          lineHeight: 1.5,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          boxSizing: 'border-box'
        }}
      >
        {platform === 'ios' ? (
          <>
            <div><strong>1.</strong> Abre esta página en <strong>Safari</strong>.</div>
            <div><strong>2.</strong> Toca el botón <strong>Compartir</strong> <span style={{ fontSize: '1rem' }}>⎋</span> (el cuadrito con la flecha en la barra inferior).</div>
            <div><strong>3.</strong> Desliza hacia abajo y toca <strong>“Agregar a pantalla de inicio”</strong> 📲.</div>
            <div><strong>4.</strong> Toca <strong>“Agregar”</strong> arriba a la derecha... ¡y listo! ♡</div>
          </>
        ) : (
          <>
            <div><strong>1.</strong> Abre esta página en <strong>Chrome</strong>.</div>
            <div><strong>2.</strong> Toca los <strong>3 puntos (⋮)</strong> en la esquina superior derecha.</div>
            <div><strong>3.</strong> Elige <strong>“Instalar aplicación”</strong> o <strong>“Agregar a la pantalla principal”</strong> 📲.</div>
            {deferredPrompt && (
              <div style={{ marginTop: '6px', textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={handleNativeInstall}
                  style={{
                    backgroundColor: '#E889AD',
                    color: '#fff',
                    borderRadius: '999px',
                    padding: '0.5rem 1rem',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(232, 137, 173, 0.3)'
                  }}
                >
                  ✨ Instalar en 1 clic
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div style={{ marginTop: '0.2rem', display: 'flex', justifyContent: 'center' }}>
        <CozyButton onClick={onClose} ariaLabel="Cerrar instrucciones">
          ¡entendido! ♡
        </CozyButton>
      </div>
    </motion.div>
  )
}
