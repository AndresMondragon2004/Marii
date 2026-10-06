import { motion, useReducedMotion } from 'framer-motion'

/**
 * Tarta con una sola velita, 100% SVG.
 * - `lit`: llama encendida/apagada (al apagarse, sale humito).
 * - `blow` (0–1): cuánto "viento" recibe la llama → se inclina y se estira.
 * El flicker en reposo es muy sutil y con movimiento reducido se elimina.
 */
export default function BirthdayCake({ lit = true, blow = 0, width = 230 }) {
  const reduced = useReducedMotion()

  return (
    <svg viewBox="0 0 240 240" width={width} aria-hidden="true">
      {/* platito */}
      <ellipse cx="120" cy="216" rx="94" ry="13" fill="#FFF8FC" stroke="#5D4B55" strokeWidth="5" />

      {/* tarta: dos pisos */}
      <rect x="44" y="154" width="152" height="52" rx="16" fill="#FFF1DC" stroke="#5D4B55" strokeWidth="5" />
      <rect x="64" y="114" width="112" height="46" rx="14" fill="#F8C8DC" stroke="#5D4B55" strokeWidth="5" />

      {/* chispitas */}
      <g strokeLinecap="round" strokeWidth="5">
        <line x1="86" y1="172" x2="92" y2="166" stroke="#DDD2F3" />
        <line x1="132" y1="178" x2="138" y2="172" stroke="#CDE8D0" />
        <line x1="166" y1="170" x2="172" y2="176" stroke="#F4AFC8" />
        <line x1="92" y1="132" x2="98" y2="126" stroke="#CDE8D0" />
        <line x1="140" y1="128" x2="146" y2="134" stroke="#FFF8FC" />
      </g>

      {/* corazoncito decorativo */}
      <path
        d="M120 141 c -3 -5 -10 -4 -10 2 c 0 4 6 8 10 11 c 4 -3 10 -7 10 -11 c 0 -6 -7 -7 -10 -2 z"
        fill="#FFF8FC"
        stroke="#5D4B55"
        strokeWidth="3.5"
      />

      {/* velita - bajada para descansar sobre el piso superior (y = 114) */}
      <rect x="114" y="68" width="12" height="46" rx="4" fill="#FFF8FC" stroke="#5D4B55" strokeWidth="4" />
      <line x1="116" y1="78" x2="124" y2="72" stroke="#F4AFC8" strokeWidth="3" strokeLinecap="round" />
      <line x1="116" y1="94" x2="124" y2="88" stroke="#F4AFC8" strokeWidth="3" strokeLinecap="round" />
      <line x1="120" y1="70" x2="120" y2="60" stroke="#5D4B55" strokeWidth="3.5" strokeLinecap="round" />

      {/* halo cálido cuando sopla/vibra */}
      {lit && blow > 0.05 && (
        <motion.circle
          cx="120"
          cy="50"
          r="16"
          fill="#FFF1DC"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 * blow, scale: 1 + blow * 0.4 }}
          transition={{ duration: 0.2 }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />
      )}

      {/* llama */}
      <motion.g
        style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
        animate={
          !lit
            ? { opacity: 0, scale: 0.7, rotate: 0 }
            : reduced
              ? { rotate: -18 * blow, scaleX: 1 + 0.08 * blow, opacity: 1, scale: 1 }
              : {
                  rotate: -18 * blow,
                  scaleX: [1, 0.96, 1.05, 0.98].map((k) => k * (1 + 0.08 * blow)),
                  scaleY: [1, 1.08, 0.96, 1.04],
                  opacity: 1,
                  scale: 1,
                }
        }
        transition={
          !lit
            ? { duration: 0.3 }
            : blow > 0.05
              ? { duration: 0.25, ease: 'easeOut' }
              : { duration: 1.7, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        <path d="M120 28 C 133 46 133 60 120 67 C 107 60 107 46 120 28 z" fill="#F4AFC8" opacity="0.6" />
        <path d="M120 40 C 127 51 127 60 120 65 C 113 60 113 51 120 40 z" fill="#FFF1DC" stroke="#E889AD" strokeWidth="2.5" />
      </motion.g>

      {/* humito al apagarse */}
      {!lit && (
        <motion.g fill="#B9AAB3" initial={{ opacity: 0.55, y: 0 }} animate={{ opacity: 0, y: -26 }} transition={{ duration: 1.6, ease: 'easeOut' }}>
          <circle cx="117" cy="54" r="4" />
          <circle cx="124" cy="47" r="5.5" />
          <circle cx="118" cy="39" r="3.5" />
        </motion.g>
      )}
    </svg>
  )
}
