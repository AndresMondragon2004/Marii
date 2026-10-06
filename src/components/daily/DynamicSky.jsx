import { useReducedMotion } from 'framer-motion'

/**
 * Cielo dinámico visual y ultra-ligero para el Rinconcito Diario.
 * Cambia suavemente entre Amanecer, Día, Atardecer y Noche según la hora de CDMX.
 * 100% CSS + SVG estático (0% carga de JS en animaciones).
 */
export default function DynamicSky({ period = 'day' }) {
  const reduced = useReducedMotion()

  return (
    <div
      className={`dynamic-sky dynamic-sky--${period}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        transition: 'background 1.5s ease',
        transform: 'translateZ(0)'
      }}
      aria-hidden="true"
    >
      {/* ── AMANECER (05:00 - 07:00) ── */}
      {period === 'dawn' && (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <defs>
            <linearGradient id="dawnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#DDD2F3" />
              <stop offset="55%" stopColor="#F8C8DC" />
              <stop offset="100%" stopColor="#FFE5D4" />
            </linearGradient>
            <radialGradient id="sunDawnGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF1DC" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FFF1DC" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" fill="url(#dawnGrad)" />
          {/* Sol naciente suave */}
          <circle cx="50" cy="72" r="32" fill="url(#sunDawnGlow)" opacity="0.6" />
          <circle cx="50" cy="72" r="14" fill="#FFF1DC" opacity="0.85" />
        </svg>
      )}

      {/* ── DÍA (07:00 - 19:00) ── */}
      {period === 'day' && (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <defs>
            <linearGradient id="dayGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E4EEF8" />
              <stop offset="60%" stopColor="#FFF4FA" />
              <stop offset="100%" stopColor="#FFF8FC" />
            </linearGradient>
            <radialGradient id="sunDayGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF1DC" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#FFF1DC" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" fill="url(#dayGrad)" />
          {/* Sol cálido del día */}
          <circle cx="85" cy="18" r="28" fill="url(#sunDayGlow)" opacity="0.7" />
          <circle cx="85" cy="18" r="10" fill="#FFF8E7" opacity="0.9" />
        </svg>
      )}

      {/* ── ATARDECER (19:00 - 20:00) ── */}
      {period === 'sunset' && (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <defs>
            <linearGradient id="sunsetGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E889AD" />
              <stop offset="45%" stopColor="#F8C8DC" />
              <stop offset="85%" stopColor="#FFE0B2" />
              <stop offset="100%" stopColor="#FFCCBC" />
            </linearGradient>
            <radialGradient id="sunsetGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFE082" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#E889AD" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" fill="url(#sunsetGrad)" />
          {/* Sol dorado ocultándose */}
          <circle cx="30" cy="70" r="35" fill="url(#sunsetGlow)" opacity="0.8" />
          <circle cx="30" cy="70" r="15" fill="#FFE082" opacity="0.9" />
        </svg>
      )}

      {/* ── NOCHE (20:00 - 05:00) ── */}
      {period === 'night' && (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <defs>
            <linearGradient id="nightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E1728" />
              <stop offset="60%" stopColor="#2D233C" />
              <stop offset="100%" stopColor="#3C2F50" />
            </linearGradient>
            <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF1DC" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FFF1DC" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" fill="url(#nightGrad)" />
          {/* Resplandor y Luna Creciente */}
          <circle cx="80" cy="20" r="22" fill="url(#moonGlow)" />
          <g transform="translate(80, 20) scale(0.18)">
            <path d="M-15 -35 A35 35 0 1 0 25 15 A28 28 0 1 1 -15 -35 Z" fill="#FFF1DC" />
          </g>
        </svg>
      )}

      {/* Estrellitas para la noche optimizadas con CSS */}
      {period === 'night' && !reduced && (
        <div style={{ position: 'absolute', inset: 0 }}>
          {[
            { top: '15%', left: '20%', s: 3, d: '3.5s' },
            { top: '25%', left: '60%', s: 4, d: '4.2s' },
            { top: '10%', left: '45%', s: 2.5, d: '2.8s' },
            { top: '35%', left: '12%', s: 3.5, d: '4.8s' },
            { top: '40%', left: '85%', s: 3, d: '3.2s' },
            { top: '65%', left: '30%', s: 3, d: '5.0s' },
            { top: '75%', left: '75%', s: 3.5, d: '3.8s' }
          ].map((st, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: st.top,
                left: st.left,
                width: st.s,
                height: st.s,
                backgroundColor: '#FFF1DC',
                borderRadius: '50%',
                boxShadow: '0 0 4px #FFF1DC',
                animation: `pulse-gentle ${st.d} ease-in-out infinite`,
                transform: 'translateZ(0)',
                willChange: 'transform, opacity'
              }}
            />
          ))}
        </div>
      )}

      {/* Nubes flotantes suaves para Amanecer/Día/Atardecer con CSS */}
      {period !== 'night' && !reduced && (
        <div style={{ position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none' }}>
          <svg
            viewBox="0 0 120 60"
            width="120"
            style={{
              position: 'absolute',
              top: '14%',
              left: '8%',
              animation: 'float-gentle 14s ease-in-out infinite',
              transform: 'translateZ(0)',
              willChange: 'transform'
            }}
          >
            <path
              d="M20,45 a15,15 0 0,1 0,-30 a20,20 0 0,1 35,-5 a25,25 0 0,1 40,10 a18,18 0 0,1 0,25 z"
              fill="#FFFFFF"
              opacity="0.8"
            />
          </svg>
        </div>
      )}
    </div>
  )
}
