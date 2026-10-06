import { useCallback, useEffect, useState } from 'react'
import { load, onStorageChange, save } from '../utils/storage.js'

/**
 * Preferencia persistente en localStorage, con estado de React.
 * Úsala para claves simples (sound, motion, vipPass…).
 * Si otro componente guarda la misma clave, esta instancia se
 * actualiza al momento (pub/sub local de storage.js, sin recargar).
 */
export function useLocalPref(key, initial) {
  const [value, setValue] = useState(() => load(key, initial))

  const update = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? next(prev) : next
        save(key, resolved)
        return resolved
      })
    },
    [key],
  )

  useEffect(() => {
    const unsubscribe = onStorageChange((changedKey) => {
      if (changedKey !== key) return
      setValue(load(key, initial))
    })
    return unsubscribe
    // `initial` es literal en todos los callers, estable entre renders.
  }, [key, initial])

  return [value, update]
}
