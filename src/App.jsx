import { Navigate, Route, Routes } from 'react-router-dom'
import { useAppMode } from './hooks/useAppMode.js'
import BirthdayFlow from './pages/birthday/BirthdayFlow.jsx'
import DailyHome from './pages/daily/DailyHome.jsx'

/**
 * Conmutador de modos. La fecha manda: el 6-oct-2026 el flujo de cumpleaños
 * se muestra y el refugio queda bloqueado; del 7-oct en adelante es al revés,
 * de forma permanente. Las URLs de cada modo están protegidas entre sí.
 */
export default function App() {
  const mode = useAppMode()
  const isBirthday = mode === 'BIRTHDAY'

  return (
    <>
      <div className="cozy-bg" aria-hidden="true" />

      <Routes>
        <Route
          path="/"
          element={<Navigate to={isBirthday ? '/cumple' : '/rinconcito'} replace />}
        />
        <Route
          path="/cumple"
          element={<BirthdayFlow />}
        />
        <Route
          path="/rinconcito"
          element={<DailyHome />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

