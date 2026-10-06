/**
 * Genera los iconos PWA a partir del SVG maestro (scripts/assets/icon.svg).
 * Uso: npm run icons
 */
import sharp from 'sharp'
import { mkdir, writeFile, copyFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const src = resolve(root, 'scripts/assets/icon.svg')
const outDir = resolve(root, 'public/icons')
const publicDir = resolve(root, 'public')

// Fondo de respaldo para las zonas transparentes (paleta del proyecto).
const BG = '#FFF8FC'

async function renderSquare(size, name) {
  const buf = await sharp(src, { density: 512 })
    .resize(size, size, { fit: 'contain', background: BG })
    .png()
    .toBuffer()
  await writeFile(resolve(outDir, name), buf)
  console.log(`  ✓ ${name} (${size}×${size})`)
}

async function renderMaskable(size, name) {
  // Para maskable, el icono vive en el área segura (~78%) sobre fondo lleno.
  const safe = Math.round(size * 0.78)
  const inner = await sharp(src, { density: 512 })
    .resize(safe, safe, { fit: 'contain', background: BG })
    .png()
    .toBuffer()
  const buf = await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: BG,
    },
  })
    .composite([{ input: inner, top: Math.round((size - safe) / 2), left: Math.round((size - safe) / 2) }])
    .png()
    .toBuffer()
  await writeFile(resolve(outDir, name), buf)
  console.log(`  ✓ ${name} (${size}×${size}, maskable)`)
}

async function main() {
  await mkdir(outDir, { recursive: true })
  console.log('Generando iconos PWA…')
  await renderSquare(192, 'pwa-192.png')
  await renderSquare(512, 'pwa-512.png')
  await renderMaskable(512, 'maskable-512.png')

  // apple-touch-icon: 180×180, fondo opaco (iOS no soporta transparencia).
  const apple = await sharp(src, { density: 512 })
    .resize(180, 180, { fit: 'contain', background: BG })
    .flatten({ background: BG })
    .png()
    .toBuffer()
  await writeFile(resolve(outDir, 'apple-touch-icon.png'), apple)
  console.log('  ✓ apple-touch-icon.png (180×180)')

  await copyFile(src, resolve(publicDir, 'favicon.svg'))
  console.log('  ✓ favicon.svg (copia del maestro)')
  console.log('Listo ♡')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
