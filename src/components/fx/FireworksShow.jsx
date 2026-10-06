import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * Sistema de fuegos artificiales optimizado para móvil + nombre "Mari ♡" en el cielo nocturno.
 * Eliminadas operaciones costosas de canvas como shadowBlur para garantizar 60fps sólidos en celular.
 */
export default function FireworksShow({ onReady }) {
  const canvasRef = useRef(null)
  const [showName, setShowName] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const t = setTimeout(() => {
      setShowName(true)
      if (onReady) onReady()
    }, 2000)
    return () => clearTimeout(t)
  }, [onReady])

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = (canvas.width = canvas.offsetWidth || 340)
    let height = (canvas.height = canvas.offsetHeight || 190)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth || 340
      height = canvas.height = canvas.offsetHeight || 190
    }
    window.addEventListener('resize', handleResize)

    const colors = ['#E889AD', '#F4AFC8', '#DDD2F3', '#FFF1DC', '#FFD166', '#CDE8D0', '#FFFFFF']
    const particles = []
    const rockets = []

    class Rocket {
      constructor(targetX, targetY) {
        this.x = targetX ?? width * (0.25 + Math.random() * 0.5)
        this.y = height + 8
        this.targetY = targetY ?? height * (0.18 + Math.random() * 0.32)
        this.vy = -(4.2 + Math.random() * 2.2)
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
        c.lineWidth = 2
        c.beginPath()
        c.moveTo(this.x, this.y)
        c.lineTo(this.x, this.y + 10)
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
        const speed = 1.0 + Math.random() * 2.8
        this.vx = Math.cos(angle) * speed
        this.vy = Math.sin(angle) * speed
        this.alpha = 1
        this.decay = 0.02 + Math.random() * 0.02
        this.size = 1.8 + Math.random() * 1.5
        this.gravity = 0.04
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
        c.beginPath()
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        c.fill()
        c.restore()
      }
    }

    function explode(x, y, baseColor) {
      const count = 16 + Math.floor(Math.random() * 8)
      for (let i = 0; i < count; i++) {
        const color = Math.random() > 0.3 ? baseColor : colors[Math.floor(Math.random() * colors.length)]
        particles.push(new Particle(x, y, color))
      }
    }

    // Fuegos iniciales suaves
    rockets.push(new Rocket(width * 0.35, height * 0.3))
    setTimeout(() => rockets.push(new Rocket(width * 0.65, height * 0.25)), 500)

    let lastAutoRocket = Date.now()

    const loop = () => {
      ctx.clearRect(0, 0, width, height)

      if (Date.now() - lastAutoRocket > 3600 && rockets.length < 2) {
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
        height: '160px',
        borderRadius: '18px',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #161224 0%, #241A33 100%)',
        border: '2px solid rgba(221, 210, 243, 0.35)',
        boxShadow: '0 4px 16px rgba(18, 14, 26, 0.35)',
        cursor: 'pointer',
        transform: 'translateZ(0)'
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

      {/* Nombre "✨ Mari ♡ ✨" escrito en el cielo */}
      {showName && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: [1, 1.03, 1] }}
          transition={{
            opacity: { duration: 1.0, ease: 'easeOut' },
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
              fontSize: '2.1rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #FFFDF9 0%, #FFF1DC 30%, #F4AFC8 70%, #E889AD 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.06em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <span>✨</span>
            <span>Mari ♡</span>
            <span>✨</span>
          </div>
          <span
            style={{
              fontSize: '0.74rem',
              color: '#DDD2F3',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              opacity: 0.85,
              marginTop: '-2px'
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
          bottom: '5px',
          right: '8px',
          fontSize: '0.66rem',
          color: 'rgba(255, 241, 220, 0.6)',
          fontStyle: 'italic',
          pointerEvents: 'none'
        }}
      >
        toca el cielo ✨
      </div>
    </div>
  )
}
