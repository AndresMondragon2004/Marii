/**
 * Prueba E2E sin dependencias: maneja Chrome headless vía CDP
 * (Chrome DevTools Protocol) con el WebSocket nativo de Node 22+.
 *
 * Uso: node scripts/e2e-smoke.mjs
 * Requiere: `npm run preview` (4173) y `npm run dev` (5173) corriendo.
 */
import { spawn } from 'node:child_process'
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const PORT = 9223
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PROD = 'http://localhost:4173'
const DEV = 'http://localhost:5173'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/* ── CDP mínimo sobre WebSocket nativo ─────────────────────── */
let nextId = 1
const pending = new Map()
const eventHandlers = []

function wire(ws) {
  ws.addEventListener('message', ({ data }) => {
    const msg = JSON.parse(data)
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id)
      pending.delete(msg.id)
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result)
    } else if (msg.method) {
      eventHandlers.forEach((h) => h(msg))
    }
  })
}

function send(ws, method, params = {}, sessionId) {
  const id = nextId++
  const message = { id, method, params }
  if (sessionId) message.sessionId = sessionId
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject })
    ws.send(JSON.stringify(message))
  })
}

async function connect() {
  let wsUrl = null
  for (let i = 0; i < 40 && !wsUrl; i += 1) {
    try {
      const res = await fetch(`http://localhost:${PORT}/json/version`)
      wsUrl = (await res.json()).webSocketDebuggerUrl
    } catch {
      await sleep(250)
    }
  }
  if (!wsUrl) throw new Error('Chrome no expuso el puerto CDP')
  const ws = new WebSocket(wsUrl)
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true })
    ws.addEventListener('error', reject, { once: true })
  })
  wire(ws)
  return ws
}

/* ── Runner ────────────────────────────────────────────────── */
const results = []
function check(name, ok) {
  results.push({ name, ok: Boolean(ok) })
  console.log(`${ok ? '✓' : '✗'} ${name}`)
}

async function main() {
  const profile = await mkdtemp(join(tmpdir(), 'pwa-e2e-'))
  const chrome = spawn(CHROME, [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    `--user-data-dir=${profile}`,
    `--remote-debugging-port=${PORT}`,
    'about:blank',
  ], { stdio: 'ignore' })

  try {
    const ws = await connect()
    const { targetId } = await send(ws, 'Target.createTarget', { url: 'about:blank' })
    const { sessionId } = await send(ws, 'Target.attachToTarget', { targetId, flatten: true })
    const s = (m, p) => send(ws, m, p, sessionId)

    await s('Page.enable')
    await s('Runtime.enable')
    await s('Log.enable')

    const pageErrors = []
    eventHandlers.push((msg) => {
      if (msg.method === 'Log.entryAdded' && msg.params.entry.level === 'error') {
        pageErrors.push(msg.params.entry.text)
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        pageErrors.push(msg.params.exceptionDetails?.exception?.description ?? 'exception')
      }
      if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
        pageErrors.push(msg.params.args?.map((a) => a.value ?? a.description).join(' '))
      }
    })

    const evalJS = async (expression) => {
      const r = await s('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
      if (r.exceptionDetails) {
        throw new Error(r.exceptionDetails.exception?.description ?? 'JS exception')
      }
      return r.result?.value
    }

    const nav = async (url) => {
      await s('Page.navigate', { url })
      await sleep(900)
    }

    const waitFor = async (expression, timeout = 15000) => {
      const start = Date.now()
      while (Date.now() - start < timeout) {
        if (await evalJS(expression)) return true
        await sleep(200)
      }
      return false
    }

    const clickButtonWithText = (text) =>
      evalJS(`(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.includes(${JSON.stringify(text)})); if (!b) return false; b.click(); return true })()`)

    /* ── A) PRODUCCIÓN: hoy es 6-oct → flujo completo real ── */
    await nav(`${PROD}/`)
    check('prod: bienvenida visible (hoy es cumpleaños real)',
      await waitFor(`document.body.innerText.includes('hola bonita')`))
    check('prod: SavePoint oculto antes de completar', !(await evalJS(`!!document.querySelector('.savepoint')`)))

    check('welcome: botón aparece tras la intro (BUG-001)',
      await waitFor(`!!document.querySelector('.cozy-btn')`))
    await evalJS(`document.querySelector('.cozy-btn').click()`)
    check('giftbox: escena alcanzada', await waitFor(`!!document.querySelector('.giftbox')`))
    await evalJS(`document.querySelector('.giftbox').click()`)
    check('giftbox: mensaje aparece tras abrir', await waitFor(`document.body.innerText.includes('Feliz cumpleaños')`))
    check('giftbox: botón continuar llega', await waitFor(`document.body.innerText.includes('continuar')`))
    await evalJS(`document.querySelector('.cozy-btn').click()`)

    check('candle: escena alcanzada', await waitFor(`!!document.querySelector('.cake-zone')`))
    check('candle: botón soplar presente',
      await waitFor(`[...document.querySelectorAll('button')].some(x => x.textContent.includes('soplar'))`, 6000))
    if (!(await evalJS(`[...document.querySelectorAll('button')].some(x => x.textContent.includes('soplar'))`))) {
      console.log('  DEBUG buttons:', await evalJS(`[...document.querySelectorAll('button')].map(b => b.textContent.slice(0, 30))`))
      console.log('  DEBUG innerText:', (await evalJS(`document.body.innerText.slice(0, 300)`)).replace(/\n/g, ' | '))
    }
    await evalJS(`(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.includes('soplar')); b.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })) })()`)
    await sleep(1700)
    check('candle: scaleX sin NaN (BUG-003)',
      await evalJS(`![...document.querySelectorAll('.cake-zone svg g')].some(g => String(g.style.transform).includes('NaN'))`))
    await evalJS(`(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.includes('soplar')); if (b) b.dispatchEvent(new PointerEvent('pointerup', { bubbles: true })) })()`)
    check('candle: hold ~1.4s apaga la vela', await waitFor(`document.body.innerText.includes('deseo concedido')`))
    check('candle: textos posteriores', await waitFor(`document.body.innerText.includes('Tengo algo más para ti')`))
    check('candle: botón continuar aparece', await waitFor(`!!document.querySelector('.cozy-btn')`, 10000))
    await evalJS(`document.querySelector('.cozy-btn').click()`)

    check('end: escena final', await waitFor(`document.body.innerText.includes('y esto solo es el comienzo')`))
    check('savepoint: aparece SIN recargar (BUG-005)', await waitFor(`!!document.querySelector('.savepoint')`, 6000))
    await evalJS(`document.querySelector('.savepoint').click()`)
    check('savepoint: revivir reinicia al inicio', await waitFor(`document.body.innerText.includes('hola bonita')`))

    /* ── B) 3 toquecitos (segunda vuelta, vía prod revivido) ── */
    check('welcome (2ª vuelta): botón vuelve a aparecer', await waitFor(`!!document.querySelector('.cozy-btn')`, 8000))
    await evalJS(`document.querySelector('.cozy-btn').click()`) // Chi ❤️
    check('welcome→giftbox (2ª vuelta)', (await waitFor(`!!document.querySelector('.giftbox')`)) && (await evalJS(`document.querySelector('.giftbox').click()`), true))
    await waitFor(`document.body.innerText.includes('continuar')`)
    await evalJS(`document.querySelector('.cozy-btn').click()`)
    check('candle (2ª vuelta) alcanzada', await waitFor(`!!document.querySelector('.cake-zone')`))
    await evalJS(`(() => { const z = document.querySelector('.cake-zone'); for (let i = 0; i < 3; i += 1) z.click() })()`)
    check('candle: 3 toquecitos apagan', await waitFor(`document.body.innerText.includes('deseo concedido')`))

    /* ── C) Overrides de dev (BUG-002 / BUG-006) ── */
    await nav(`${DEV}/?modo=diario`)
    check('dev ?modo=diario → refugio', await evalJS(`document.querySelector('main h1')?.textContent.includes('Tu Rinconcito')`))
    await nav(`${DEV}/?modo=cumple`)
    check('dev ?modo=cumple → cumpleaños (BUG-002)', await waitFor(`document.body.innerText.includes('hola bonita')`))

    check('devbar: click "diario" cambia al instante (BUG-006)',
      (await clickButtonWithText('diario')) && await waitFor(`document.querySelector('main h1')?.textContent.includes('Tu Rinconcito')`, 3000))
    await nav(`${DEV}/`)
    check('override persistido "diario" sigue activo', await evalJS(`document.querySelector('main h1')?.textContent.includes('Tu Rinconcito')`))
    check('devbar: click "real" vuelve a la fecha real (hoy = cumple)',
      (await clickButtonWithText('real')) && await waitFor(`document.body.innerText.includes('hola bonita')`, 3000))

    check('override inválido en URL no fuerza nada',
      await nav(`${DEV}/?modo=basura`) !== false && await waitFor(`document.body.innerText.includes('hola bonita')`))

    /* ── D) Regla de fechas pura, evaluada en la página de dev ── */
    await nav(`${DEV}/`)
    const table = await evalJS(`(async () => {
      const m = await import('/src/utils/dates.js')
      return ['2026-10-05','2026-10-06','2026-10-07','2026-10-08','2027-10-06'].map(d => m.resolveAppMode(d))
    })()`)
    check('fechas: 05 DAILY · 06 BIRTHDAY · 07/08 DAILY · 2027 DAILY',
      JSON.stringify(table) === JSON.stringify(['DAILY', 'BIRTHDAY', 'DAILY', 'DAILY', 'DAILY']))

    /* ── E) Reduced motion emulado: el flujo sigue funcionando ── */
    await s('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
    await nav(`${PROD}/`)
    await evalJS(`localStorage.removeItem('rinc:birthdayProgress')`)
    await nav(`${PROD}/`)
    check('reduced: bienvenida OK', await waitFor(`document.body.innerText.includes('hola bonita')`))
    await waitFor(`!!document.querySelector('.cozy-btn')`)
    await evalJS(`document.querySelector('.cozy-btn').click()`)
    check('reduced: giftbox navegable', await waitFor(`!!document.querySelector('.giftbox')`))
    await evalJS(`document.querySelector('.giftbox').click()`)
    check('reduced: apertura y mensaje OK', await waitFor(`document.body.innerText.includes('Feliz cumpleaños')`))
    await s('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: '' }] })

    /* ── F) Responsivo: sin overflow en 6 viewports ── */
    for (const [w, h] of [[360, 800], [375, 812], [390, 844], [412, 915], [1366, 768], [1920, 1080]]) {
      await s('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 2, mobile: w < 800 })
      await nav(`${PROD}/`)
      await waitFor(`!!document.querySelector('.cozy-btn')`)
      const fits = await evalJS(`document.documentElement.scrollWidth <= window.innerWidth && document.documentElement.scrollHeight <= window.innerHeight + 1`)
      check(`responsive ${w}×${h} sin overflow`, fits)
    }
    await s('Emulation.clearDeviceMetricsOverride')

    /* ── G) Consola limpia ── */
    check('sin errores de consola/consola de página en toda la prueba', pageErrors.length === 0)
    if (pageErrors.length) console.log('  errores:', pageErrors.slice(0, 5))

    const failed = results.filter((r) => !r.ok)
    console.log(`\n${results.length - failed.length}/${results.length} checks OK`)
    process.exitCode = failed.length ? 1 : 0
  } finally {
    chrome.kill()
  }
}

main().catch((err) => {
  console.error('E2E fatal:', err)
  process.exit(1)
})
