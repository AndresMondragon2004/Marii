import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * Sistema de fuegos artificiales suaves + escritura mágica de "Mari ♡" en el cielo nocturno.
 * Permite interactuar tocando el cielo para lanzar chispitas y fuegos adicionales.
 */
export default function FireworksShow({ onReady }) {
  const canvasRef = useRef(null)
  const [showName, setShowName] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    // El nombre "Mari ♡" aparece mágicamente en el cielo tras unos fuegos iniciales
    const t = setTimeout(() => {
      setShowName(true)
      if (onReady) onReady()
    }, 2400)
    return () => clearTimeout(t)
  }, [onReady])

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = (canvas.width = canvas.offsetWidth || 360)
    let height = (canvas.height = canvas.offsetHeight || 220)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth || 360
      height = canvas.height = canvas.offsetHeight || 220
    }
    window.addEventListener('resize', handleResize)

    const colors = ['#E889AD', '#F4AFC8', '#DDD2F3', '#FFF1DC', '#FFD166', '#CDE8D0', '#FFF']
    const particles = []
    const rockets = []

    class Rocket {
      constructor(targetX, targetY) {
        this.x = targetX ?? width * (0.25 + Math.random() * 0.5)
        this.y = height + 10
        this.targetY = targetY ?? height * (0.18 + Math.random() * 0.32)
        this.vy = -(4.5 + Math.random() * 2.5)
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.alive = true
      }
      update() {
        this.y += this.vy
        if (this.y <= this.targetY) {
          this.alive = false
          explode(this.x, this.y, this.color)
        }
      }
      draw(c) {
        c.save()
        c.strokeStyle = this.color
        c.lineWidth = 2.5
        c.beginPath()
        c.moveTo(this.x, this.y)
        c.lineTo(this.x, this.y + 12)
        c.stroke()
        c.restore()
      }
    }

    class Particle {
      constructor(x, y, color) {
        this.x = x
        this.y = y
        this.color = color
        const angle = Math.random() * Math.PI * 2
        const speed = 1.2 + Math.random() * 3.8
        this.vx = Math.cos(angle) * speed
        this.vy = Math.sin(angle) * speed
        this.alpha = 1
        this.decay = 0.015 + Math.random() * 0.02
        this.size = 2 + Math.random() * 2.5
        this.gravity = 0.045
      }
      update() {
        this.x += this.vx
        this.y += this.vy
        this.vy += this.gravity
        this.vx *= 0.98
        this.alpha -= this.decay
      }
      draw(c) {
        c.save()
        c.globalAlpha = Math.max(0, this.alpha)
        c.fillStyle = this.color
        c.shadowColor = this.color
        c.shadowBlur = 6
        c.beginPath()
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        c.fill()
        c.restore()
      }
    }

    function explode(x, y, baseColor) {
      const count = 32 + Math.floor(Math.random() * 18)
      for (let i = 0; i < count; i++) {
        const color = Math.random() > 0.3 ? baseColor : colors[Math.floor(Math.random() * colors.length)]
        particles.push(new Particle(x, y, color))
      }
    }

    // Fuegos iniciales
    rockets.push(new Rocket(width * 0.35, height * 0.3))
    setTimeout(() => rockets.push(new Rocket(width * 0.68, height * 0.25)), 600)
    setTimeout(() => rockets.push(new Rocket(width * 0.5, height * 0.38)), 1400)

    let lastAutoRocket = Date.now()

    const loop = () => {
      ctx.clearRect(0, 0, width, height)

      // Lanzar cohetes periódicos suaves
      if (Date.now() - lastAutoRocket > 3400 && rockets.length < 2) {
        rockets.push(new Rocket())
        lastAutoRocket = Date.now()
      }

      for (let i = rockets.length - 1; i >= 0; i--) {
        rockets[i].update()
        rockets[i].draw(ctx)
        if (!rockets[i].alive) rockets.splice(i, 1)
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update()
        particles[i].draw(ctx)
        if (particles[i].alpha <= 0) particles.splice(i, 1)
      }

      animationFrameId = requestAnimationFrame(loop)
    }

    loop()

    const handleCanvasClick = (e) => {
      const rect = canvas.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const clickY = e.clientY - rect.top
      rockets.push(new Rocket(clickX, clickY))
    }
    canvas.addEventListener('pointerdown', handleCanvasClick)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      if (canvas) canvas.removeEventListener('pointerdown', handleCanvasClick)
    }
  }, [reduced])

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '170px',
        borderRadius: '20px',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #161224 0%, #241A33 100%)',
        border: '2px solid rgba(221, 210, 243, 0.35)',
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.4), 0 4px 16px rgba(221, 210, 243, 0.2)',
        cursor: 'pointer'
      }}
      title="Toca el cielo para encender más fuegos artificiales ✨"
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />

      {/* Nombre "✨ Mari ♡ ✨" escrito en el cielo con chispitas doradas/rosadas */}
      {showName && (
        <motion.div
          initial={{ opacity: 0, scale: 0.75, filter: 'blur(4px)' }}
          animate={{
            opacity: 1,
            scale: [1, 1.04, 1],
            filter: 'blur(0px)'
          }}
          transition={{
            opacity: { duration: 1.4, ease: 'easeOut' },
            scale: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
          }}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 3
          }}
        >
          <div
            style={{
              fontFamily: "'Quicksand', 'Nunito', system-ui, sans-serif",
              fontSize: '2.3rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #FFFDF9 0%, #FFF1DC 30%, #F4AFC8 70%, #E889AD 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 12px rgba(232, 137, 173, 0.85)) drop-shadow(0 0 24px rgba(255, 241, 220, 0.7))',
              letterSpacing: '0.08em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <span>✨</span>
            <span>Mari ♡</span>
            <span>✨</span>
          </div>
          <span
            style={{
              fontSize: '0.75rem',
              color: '#DDD2F3',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              opacity: 0.85,
              marginTop: '-2px',
              textShadow: '0 0 8px rgba(221, 210, 243, 0.6)'
            }}
          >
            brillas más que todo el cielo
          </span>
        </motion.div>
      )}

      {/* Pista sutil para tocar el cielo */}
      <div
        style={{
          position: 'absolute',
          bottom: '6px',
          right: '10px',
          fontSize: '0.68rem',
          color: 'rgba(255, 241, 220, 0.65)',
          fontStyle: 'italic',
          pointerEvents: 'none'
        }}
      >
        toca el cielo ✨
      </div>
    </div>
  )
}
