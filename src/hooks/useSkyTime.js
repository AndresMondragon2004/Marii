import { useState, useEffect } from 'react'
import { getMexicoHour, getSkyPeriod } from '../utils/dates.js'

const SKY_METADATA = {
  dawn: {
    greeting: 'Buenos días, bonita ♡',
    subtitle: 'El sol apenas despierta... que hoy sea un día muy tranquilo.',
    bunnyPose: 'happy',
    skyName: 'Amanecer'
  },
  day: {
    greeting: 'Hola, bonita ♡',
    subtitle: 'Espero que hoy te trate muy bonito el día.',
    bunnyPose: 'happy',
    skyName: 'Día'
  },
  sunset: {
    greeting: 'Ya casi termina el día ♡',
    subtitle: 'Hiciste un gran esfuerzo... la tarde ya se está pintando dorada.',
    bunnyPose: 'holding',
    skyName: 'Atardecer'
  },
  night: {
    greeting: 'Buenas noches, bonita 🌙',
    subtitle: 'Aquí no hay prisa. Puedes descansar y quedarte un ratito.',
    bunnyPose: 'happy',
    skyName: 'Noche'
  }
}

export function useSkyTime() {
  const [timeState, setTimeState] = useState(() => {
    const hour = getMexicoHour()
    const period = getSkyPeriod(hour)
    return { hour, period, ...SKY_METADATA[period] }
  })

  useEffect(() => {
    const checkTime = () => {
      const hour = getMexicoHour()
      const period = getSkyPeriod(hour)
      setTimeState((prev) => {
        if (prev.hour === hour && prev.period === period) return prev
        return { hour, period, ...SKY_METADATA[period] }
      })
    }

    const interval = setInterval(checkTime, 60000) // Revisa cada 60s
    return () => clearInterval(interval)
  }, [])

  return timeState
}
