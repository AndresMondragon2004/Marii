/**
 * Utilidad para respuestas hápticas / vibración suave en dispositivos móviles.
 */
export function triggerHaptic(type = 'light') {
  if (typeof window === 'undefined' || !('vibrate' in navigator)) return

  try {
    switch (type) {
      case 'light':
      case 'tap':
        navigator.vibrate(12)
        break
      case 'medium':
        navigator.vibrate(25)
        break
      case 'heavy':
        navigator.vibrate(40)
        break
      case 'purr':
      case 'pet':
        // Doble pulsación suave como un ronroneo tierno
        navigator.vibrate([14, 45, 18])
        break
      case 'sparkle':
      case 'celebration':
        // Patrón alegre de confeti / estrellitas
        navigator.vibrate([18, 35, 14, 35, 20])
        break
      case 'cookie':
        // Crujido de la galleta
        navigator.vibrate([22, 40, 16])
        break
      default:
        navigator.vibrate(15)
        break
    }
  } catch {
    // Ignorar si el navegador bloquea la vibración
  }
}
