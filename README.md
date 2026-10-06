# Tu Rinconcito ♡

Un pequeño refugio digital, hecho con cariño. PWA de regalo: un modo
cumpleaños especial el 6 de octubre de 2026 y, a partir del día siguiente,
un refugio diario para volver cuando quieras.

## Stack

React + Vite + JavaScript + CSS (sin frameworks de UI), react-router,
Framer Motion y PWA vía `vite-plugin-pwa`.
Fuentes auto-hospedadas con Fontsource. Sin backend: todo vive en el
dispositivo (localStorage, namespace `rinc:`).

## Scripts

```bash
npm install        # instalar dependencias
npm run dev        # desarrollo (con barra dev para alternar modos)
npm run build      # build de producción (genera el service worker)
npm run preview    # servir el build (así se prueba la PWA)
npm run icons      # regenerar iconos desde scripts/assets/icon.svg
```

## Probar los modos en desarrollo

En `npm run dev` aparece una barrita flotante con tres opciones:

- `real` — usa la fecha real de la CDMX
- `cumple` — fuerza el Modo Cumpleaños
- `diario` — fuerza el Modo Diario

También vale usar la query `?modo=cumple` o `?modo=diario`.
Nada de esto existe en el build de producción.

## Notas

- La fecha se calcula siempre en `America/Mexico_City` (ver `src/utils/dates.js`).
- El Modo Diario se desbloquea el 7-oct-2026 y queda permanente; nunca
  vuelve al modo cumpleaños.
- No se almacena ningún dato sensible, solo preferencias simples.
