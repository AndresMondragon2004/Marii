/**
 * Motor de música ambiental / cajita musical suave usando Web Audio API.
 * 100% autónomo, no requiere internet ni archivos externos.
 */

class MusicBoxEngine {
  constructor() {
    this.ctx = null
    this.isPlaying = false
    this.timer = null
    this.gainNode = null
    this.melodyIndex = 0

    // Notas de una melodía calmada, tierna y nostálgica (C Major / Lofi Music Box)
    // Frecuencias en Hz (C4 a C6)
    this.notes = [
      // Frase 1
      { f: 523.25, d: 0.8 }, // C5
      { f: 659.25, d: 0.8 }, // E5
      { f: 783.99, d: 1.2 }, // G5
      { f: 659.25, d: 0.6 }, // E5
      { f: 587.33, d: 0.8 }, // D5
      { f: 659.25, d: 0.8 }, // E5
      { f: 523.25, d: 1.6 }, // C5

      // Frase 2 (Suave respuesta)
      { f: 440.00, d: 0.8 }, // A4
      { f: 523.25, d: 0.8 }, // C5
      { f: 659.25, d: 1.2 }, // E5
      { f: 587.33, d: 0.8 }, // D5
      { f: 392.00, d: 1.6 }, // G4

      // Frase 3 (Subida dulce)
      { f: 523.25, d: 0.8 }, // C5
      { f: 587.33, d: 0.8 }, // D5
      { f: 659.25, d: 0.8 }, // E5
      { f: 783.99, d: 0.8 }, // G5
      { f: 880.00, d: 1.4 }, // A5
      { f: 783.99, d: 1.2 }, // G5
      { f: 659.25, d: 1.6 }, // E5

      // Frase 4 (Descanso de cuna)
      { f: 587.33, d: 0.8 }, // D5
      { f: 523.25, d: 0.8 }, // C5
      { f: 440.00, d: 1.0 }, // A4
      { f: 493.88, d: 1.0 }, // B4
      { f: 523.25, d: 2.2 }  // C5 (sostenida)
    ]
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  playNote(freq, duration = 1.0) {
    if (!this.ctx || !this.isPlaying) return

    const now = this.ctx.currentTime

    // Oscilador principal (campana suave de cajita musical)
    const osc = this.ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, now)

    // Armónico suave para dar brillo de cajita musical
    const osc2 = this.ctx.createOscillator()
    osc2.type = 'sine'
    osc2.frequency.setValueAtTime(freq * 2.005, now)

    // Filtro pasa bajos cálido
    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(2200, now)

    // Envolvente de volumen (ataque rápido y caída de campana)
    const noteGain = this.ctx.createGain()
    noteGain.gain.setValueAtTime(0.001, now)
    noteGain.gain.exponentialRampToValueAtTime(0.12, now + 0.02)
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 1.8)

    const noteGain2 = this.ctx.createGain()
    noteGain2.gain.setValueAtTime(0.001, now)
    noteGain2.gain.exponentialRampToValueAtTime(0.03, now + 0.015)
    noteGain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 1.2)

    // Conexiones
    osc.connect(noteGain)
    osc2.connect(noteGain2)
    noteGain.connect(filter)
    noteGain2.connect(filter)
    filter.connect(this.ctx.destination)

    osc.start(now)
    osc2.start(now)

    osc.stop(now + duration * 2.0)
    osc2.stop(now + duration * 2.0)
  }

  scheduleNext() {
    if (!this.isPlaying) return

    const item = this.notes[this.melodyIndex]
    this.playNote(item.f, item.d)

    this.melodyIndex = (this.melodyIndex + 1) % this.notes.length

    // Tiempo entre notas (ritmo lento y relajante)
    const delayMs = (item.d * 900) + 180

    this.timer = setTimeout(() => {
      this.scheduleNext()
    }, delayMs)
  }

  toggle() {
    if (this.isPlaying) {
      this.stop()
      return false
    } else {
      this.play()
      return true
    }
  }

  play() {
    this.init()
    if (!this.ctx) return
    this.isPlaying = true
    this.melodyIndex = 0
    this.scheduleNext()
  }

  stop() {
    this.isPlaying = false
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }
}

export const musicBox = new MusicBoxEngine()
