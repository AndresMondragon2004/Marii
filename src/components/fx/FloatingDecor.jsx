import { motion, useReducedMotion } from 'framer-motion'

const HEART = 'M12 21s-7.5-4.7-9.7-9C0.6 8 2.6 4 6.5 4c2.3 0 3.9 1.3 5.5 3.4C13.6 5.3 15.2 4 17.5 4 21.4 4 23.4 8 21.7 12c-2.2 4.3-9.7 9-9.7 9z'

const ITEMS = [
  { kind: 'cloud', x: '6%', y: '10%', size: 64, dur: 34, delay: 0 },
  { kind: 'cloud', x: '72%', y: '20%', size: 48, dur: 42, delay: 6 },
  { kind: 'star', x: '10%', y: '30%', size: 14, dur: 4.6, delay: 0.4 },
  { kind: 'star', x: '87%', y: '42%', size: 11, dur: 5.4, delay: 1.6 },
  { kind: 'star', x: '16%', y: '72%', size: 12, dur: 5, delay: 2.4 },
  { kind: 'heart', x: '85%', y: '76%', size: 15, dur: 4.4, delay: 0.9 },
  { kind: 'heart', x: '78%', y: '8%', size: 13, dur: 5.2, delay: 2 },
]

/**
 * Decoración flotante muy sutil: nubecitas lentas de fondo y unos pocos
 * brillitos (máx. 5 elementos en movimiento). Con `prefers-reduced-motion`
 * quedan estáticos y semitransparentes. Puro CSS/SVG, cero imágenes.
 */
export default function FloatingDecor() {
  const reduced = useReducedMotion()

  return (
    <div className="floating-decor" aria-hidden="true">
      {ITEMS.map((item, i) => {
        const float = reduced
          ? undefined
          : { y: [0, -8, 0], opacity: [0.5, 0.85, 0.5] }
        const transition = reduced
          ? undefined
          : { duration: item.dur, delay: item.delay, repeat: Infinity, ease: 'easeInOut' }

        let shape = null
        if (item.kind === 'cloud') {
          shape = (
            <svg viewBox="0 0 64 40" width={item.size} style={{ opacity: 0.75 }}>
              <g fill="#DDD2F3">
                <circle cx="20" cy="24" r="12" />
                <circle cx="34" cy="18" r="14" />
                <circle cx="46" cy="26" r="10" />
                <rect x="12" y="24" width="42" height="12" rx="6" />
              </g>
            </svg>
          )
        } else if (item.kind === 'star') {
          shape = (
            <svg viewBox="0 0 24 24" width={item.size}>
              <path d="M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4L12 2z" fill="#F4AFC8" />
            </svg>
          )
        } else {
          shape = (
            <svg viewBox="0 0 24 24" width={item.size}>
              <path d={HEART} fill="#F4AFC8" />
            </svg>
          )
        }

        return (
          <motion.div
            key={i}
            className="floating-decor__item"
            style={{ left: item.x, top: item.y }}
            animate={float}
            transition={transition}
          >
            {shape}
          </motion.div>
        )
      })}
    </div>
  )
}
