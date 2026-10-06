import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { registerSW } from 'virtual:pwa-register'

// Fuentes auto-hospedadas, solo subconjuntos latinos (español completo).
// Funcionan offline gracias al service worker.
import '@fontsource/cherry-bomb-one/latin-400.css'
import '@fontsource/quicksand/latin-400.css'
import '@fontsource/quicksand/latin-500.css'
import '@fontsource/quicksand/latin-700.css'

import './styles/tokens.css'
import './styles/base.css'
import './styles/birthday.css'
import './styles/daily.css'
import App from './App.jsx'

registerSW({ immediate: true })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
