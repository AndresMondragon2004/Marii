/**
 * Sistema de fechas del regalo.
 * Toda la lógica vive en la zona horaria America/Mexico_City,
 * sin importar el reloj del dispositivo.
 *
 * Estados:
 *   BIRTHDAY → solo el 6 de octubre de 2026
 *   DAILY    → del 7 de octubre de 2026 en adelante (permanente)
 */

import { load, STORAGE_KEYS } from './storage.js'

const TZ = 'America/Mexico_City'
export const BIRTHDAY_DATE = '2026-10-06' // formato YYYY-MM-DD, comparable como string
const DEV_OVERRIDES = ['cumple', 'diario']

/** Fecha de hoy en CDMX como 'YYYY-MM-DD' (formato en-CA = ISO). */
export function getMexicoToday() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())
}

/**
 * Resuelve el modo a partir de un día ISO y un override de desarrollo
 * ya validado. Mapeo explícito:
 *   'cumple' → BIRTHDAY   'diario' → DAILY   null → regla real por fecha
 * Un valor inválido nunca fuerza el cumpleaños: cae a la fecha real.
 */
export function resolveAppMode(day, devOverride = null) {
  if (devOverride === 'cumple') return 'BIRTHDAY'
  if (devOverride === 'diario') return 'DAILY'
  return day === BIRTHDAY_DATE ? 'BIRTHDAY' : 'DAILY'
}

/**
 * Modo actual de la app. Se computa siempre, nunca se guarda:
 * al ser una fecha fija (2026), el modo diario no puede "reiniciarse".
 * El override de desarrollo solo aplica fuera de producción.
 */
export function getAppMode(today = getMexicoToday()) {
  const override = import.meta.env.DEV ? getDevOverride() : null
  return resolveAppMode(today, override)
}

/** Devuelve 'cumple' | 'diario' si hay override activo en dev; si no, null. */
function getDevOverride() {
  const fromUrl = new URLSearchParams(window.location.search).get('modo')
  if (DEV_OVERRIDES.includes(fromUrl)) return fromUrl

  // Leído vía storage.js para respetar el formato JSON ("null" ⇒ null).
  const stored = load(STORAGE_KEYS.devMode, null)
  return DEV_OVERRIDES.includes(stored) ? stored : null
}

export function isBirthdayMode(mode) {
  return mode === 'BIRTHDAY'
}

/** Hora actual en CDMX (0-23) */
export function getMexicoHour() {
  const str = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ,
    hour: 'numeric',
    hour12: false,
  }).format(new Date())
  return parseInt(str, 10) % 24
}

/**
 * Periodo del cielo dinámico:
 *   05:00 - 07:00 -> 'dawn' (Amanecer)
 *   07:00 - 19:00 -> 'day' (Día)
 *   19:00 - 20:00 -> 'sunset' (Atardecer)
 *   20:00 - 05:00 -> 'night' (Noche)
 */
export function getSkyPeriod(hour = getMexicoHour()) {
  if (hour >= 5 && hour < 7) return 'dawn'
  if (hour >= 7 && hour < 19) return 'day'
  if (hour >= 19 && hour < 20) return 'sunset'
  return 'night'
}

/** Obtiene un índice determinista para la sorpresa del día basado en la fecha */
export function getDailySurpriseIndex(dayString = getMexicoToday(), total = 7) {
  let hash = 0
  for (let i = 0; i < dayString.length; i++) {
    hash = (hash * 31 + dayString.charCodeAt(i)) % 1000000007
  }
  return Math.abs(hash) % total
}



