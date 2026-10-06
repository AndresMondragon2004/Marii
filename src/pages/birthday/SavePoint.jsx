import { useLocalPref } from '../../hooks/useLocalPref.js'
import { STORAGE_KEYS } from '../../utils/storage.js'

/**
 * SavePoint del flujo: si ya completó el cumpleaños, permite revivirlo
 * desde el inicio (el Pase VIP ganado no se toca; eso llega en la Fase 2).
 */
export default function SavePoint({ onRevive }) {
  const [, setProgress] = useLocalPref(STORAGE_KEYS.birthdayProgress, 'welcome')
  const [done] = useLocalPref(STORAGE_KEYS.birthdayDone, false)

  if (!done) return null

  return (
    <button
      type="button"
      className="savepoint"
      onClick={() => {
        setProgress('welcome')
        onRevive?.()
      }}
      aria-label="revivir la experiencia desde el inicio"
    >
      ♡ revivir
    </button>
  )
}
