import { useReducedMotion } from 'framer-motion'

const HEART = 'M12 21s-7.5-4.7-9.7-9C0.6 8 2.6 4 6.5 4c2.3 0 3.9 1.3 5.5 3.4C13.6 5.3 15.2 4 17.5 4 21.4 4 23.4 8 21.7 12c-2.2 4.3-9.7 9-9.7 9z'

const ITEMS = [
  { kind: 'cloud', x: '6%', y: '10%', size: 56, dur: '28s', delay: '0s' },
  { kind: 'cloud', x: '72%', y: '18%', size: 44, dur: '34s', delay: '4s' },
  { kind: 'star', x: '10%', y: '30%', size: 13, dur: '4.5s', delay: '0.4s' },
  { kind: 'star', x: '87%', y: '42%', size: 11, dur: '5.2s', delay: '1.6s' },
  { kind: 'heart', x: '85%', y: '74%', size: 14, dur: '4.8s', delay: '0.9s' },
  { kind: 'heart', x: '78%', y: '8%', size: 12, dur: '5.5s', delay: '2s' },
]

/**
 * Decoración flotante ultra-ligera basada en CSS GPU.
 * 0% de uso de CPU de JavaScript durante la navegación.
 */
export default function FloatingDecor() {
  const reduced = useReducedMotion()

  return (
    <div className="floating-decor" aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {ITEMS.map((item, i) => {
        let shape = null
        if (item.kind === 'cloud') {
          shape = (
            <svg viewBox="0 0 64 40" width={item.size} style={{ opacity: 0.65 }}>
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
          <div
            key={i}
            className="floating-decor__item"
            style={{
              position: 'absolute',
              left: item.x,
              top: item.y,
              transform: 'translateZ(0)',
              willChange: 'transform, opacity',
              animation: reduced ? 'none' : `float-gentle ${item.dur} ease-in-out infinite`,
              animationDelay: item.delay,
              opacity: 0.75
            }}
          >
            {shape}
          </div>
        )
      })}
    </div>
  )
}
