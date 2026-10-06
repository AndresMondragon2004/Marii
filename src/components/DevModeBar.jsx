import { useLocalPref } from '../hooks/useLocalPref.js'
import { STORAGE_KEYS } from '../utils/storage.js'

const OPTIONS = [
  { value: null, label: 'real' },
  { value: 'cumple', label: 'cumple' },
  { value: 'diario', label: 'diario' },
]

/**
 * Barra de desarrollo para probar ambos modos antes del 6 de octubre.
 * Solo existe en `npm run dev`; en el build de producción desaparece.
 * El override se guarda en localStorage y se limpia con "real".
 */
export default function DevModeBar() {
  const [devMode, setDevMode] = useLocalPref(STORAGE_KEYS.devMode, null)

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'calc(var(--safe-bottom) + 8px)',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 6,
        padding: '6px 8px',
        background: 'rgba(255,255,255,0.92)',
        borderRadius: 999,
        boxShadow: 'var(--shadow-soft)',
        fontSize: 12,
        zIndex: 50,
      }}
    >
      <span style={{ color: 'var(--ink-faint)', alignSelf: 'center', paddingRight: 2 }}>dev:</span>
      {OPTIONS.map(({ value, label }) => (
        <button
          key={label}
          onClick={() => setDevMode(value)}
          style={{
            padding: '4px 10px',
            borderRadius: 999,
            fontWeight: 700,
            background: devMode === value ? 'var(--pink-strong)' : 'transparent',
            color: devMode === value ? '#fff' : 'var(--ink-soft)',
          }}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
