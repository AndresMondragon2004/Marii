import { useEffect, useState } from 'react'
import { getAppMode } from '../utils/dates.js'
import { onStorageChange, STORAGE_KEYS } from '../utils/storage.js'

/**
 * Modo actual de la app ('BIRTHDAY' | 'DAILY').
 * - Producción: se recalcula en foco/visibilitychange, por si la app
 *   queda abierta a medianoche del 6 al 7 de octubre.
 * - Desarrollo: además reacciona al instante cuando la DevBar guarda
 *   el override de modo (pub/sub local de storage.js).
 */
export function useAppMode() {
  const [mode, setMode] = useState(() => getAppMode())

  useEffect(() => {
    const recheck = () => setMode(getAppMode())

    const unsubscribe =
      import.meta.env.DEV
        ? onStorageChange((key) => {
            if (key === STORAGE_KEYS.devMode) recheck()
          })
        : null

    window.addEventListener('focus', recheck)
    document.addEventListener('visibilitychange', recheck)
    return () => {
      unsubscribe?.()
      window.removeEventListener('focus', recheck)
      document.removeEventListener('visibilitychange', recheck)
    }
  }, [])

  return mode
}
