/**
 * Wrapper mínimo y seguro de localStorage.
 * Namespace 'rinc:' para no chocar con nada más en el dispositivo.
 * Si el almacenamiento falla (iOS privado, purga de Safari), la app
 * simplemente vive sin memoria: nada crítico depende de aquí.
 */

const NAMESPACE = 'rinc:'

export const STORAGE_KEYS = {
  birthdayProgress: 'birthdayProgress', // paso actual del flujo de cumpleaños
  birthdayDone: 'birthdayDone', // flujo completado alguna vez
  vipPass: 'vipPass', // pase VIP ganado
  gift1Opened: 'gift1Opened', // regalo 1 de fase 2 abierto
  gift2Opened: 'gift2Opened', // regalo 2 de fase 2 abierto
  gift3Opened: 'gift3Opened', // regalo 3 de fase 2 abierto
  letterRead: 'letterRead', // carta leída
  sound: 'sound', // sonido activado
  motion: 'motion', // animaciones reducidas
  lastVisit: 'lastVisit', // última visita al refugio
  lastMessageDate: 'lastMessageDate', // si el mensaje de hoy ya se vio
  lastCookie: 'lastCookie', // última galletita de la suerte
  lastSurprise: 'lastSurprise', // última sorpresa de la cajita
  eggs: 'eggs', // easter eggs encontrados
  devMode: 'devMode', // override de modo (solo dev)
}

export function load(key, fallback = null) {
  try {
    const raw = window.localStorage.getItem(NAMESPACE + key)
    if (raw === null) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

/*
 * Pub/sub local (misma ventana) para que varios componentes reaccionen
 * a cambios de preferencias sin gestores de estado globales.
 */
const listeners = new Set()

/** Suscribe un callback; devuelve la función de desuscripción. */
export function onStorageChange(callback) {
  listeners.add(callback)
  return () => listeners.delete(callback)
}

function notifyAll(key) {
  // Microtask: evita disparar setState de otros componentes durante el
  // render/dispatch de quien guardó (React lo reportaría como error).
  queueMicrotask(() => listeners.forEach((callback) => callback(key)))
}

export function save(key, value) {
  try {
    window.localStorage.setItem(NAMESPACE + key, JSON.stringify(value))
  } catch {
    /* almacenamiento no disponible: se ignora en silencio */
  }
  notifyAll(key)
}

export function remove(key) {
  try {
    window.localStorage.removeItem(NAMESPACE + key)
  } catch {
    /* idem */
  }
}
