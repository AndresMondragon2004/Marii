import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Bunny from '../../../components/Bunny.jsx'
import ClickSparkles from '../../../components/fx/ClickSparkles.jsx'
import CozyButton from '../../../components/ui/CozyButton.jsx'
import TypewriterDialogue from '../../../components/ui/TypewriterDialogue.jsx'

const LINES = [
  'Holaaaaa, hola bonita 🥺, ¿cómo tash? Además de bonita, linda, y muy muy muy pechocha',
  'Tengo algo para la cumpleañera maaaas linda de todas',
  '¿Me dejas mostrarte? 🥺',
]

/**
 * Escena de bienvenida:
 * - La conejita entra caminando a saltitos llevando su cajita.
 * - Sigue la mirada hacia donde hagas clic/toque en la pantalla.
 * - Los mensajes se escriben letra por letra (efecto máquina de escribir).
 * - Ella puede presionar/tocar para completar la frase o avanzar de inmediato.
 */
export default function WelcomeStep({ onNext }) {
  const [showDialogue, setShowDialogue] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [lookTarget, setLookTarget] = useState(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    // La burbuja y el texto empiezan a escribirse tras la caminata inicial
    const timer = setTimeout(() => setShowDialogue(true), reduced ? 300 : 2000)
    return () => clearTimeout(timer)
  }, [reduced])

  return (
    <>
      <ClickSparkles onGlobalClick={setLookTarget} />

      <div className="welcome-pair" aria-hidden="false">
        {/* Contenedor con animación de entrada a saltitos */}
        <motion.div
          initial={
            reduced
              ? { opacity: 0, scale: 0.95 }
              : { x: -140, opacity: 0, scale: 0.88 }
          }
          animate={
            reduced
              ? { opacity: 1, scale: 1 }
              : {
                  x: [-140, -105, -70, -35, 0],
                  opacity: [0, 1, 1, 1, 1],
                  scale: [0.88, 0.92, 0.96, 1, 1],
                }
          }
          transition={{
            duration: reduced ? 0.7 : 2.2,
            times: reduced ? undefined : [0, 0.25, 0.5, 0.75, 1],
            ease: 'easeOut',
          }}
        >
          {/* Saltitos verticales coordinados con squash & stretch elástico */}
          <motion.div
            animate={
              reduced
                ? undefined
                : {
                    y: [0, -20, 0, -20, 0, -18, 0, -12, 0],
                    rotate: [-6, 5, -6, 5, -4, 3, 0],
                    scaleY: [1, 1.1, 0.9, 1.1, 0.9, 1.08, 0.92, 1.04, 1],
                  }
            }
            transition={{
              duration: 2.2,
              ease: 'easeInOut',
            }}
          >
            <Bunny
              width={140}
              holding="box"
              lookTarget={lookTarget}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Diálogo con efecto máquina de escribir e interactividad tap-to-advance */}
      <div className="welcome-lines" style={{ width: '100%', maxWidth: '380px', margin: '0 auto' }}>
        {showDialogue && (
          <TypewriterDialogue
            lines={LINES}
            speed={95}
            autoAdvanceDelay={3500}
            onFinished={() => setShowButton(true)}
          />
        )}
      </div>

      {showButton && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          style={{ marginTop: '0.8rem' }}
        >
          <CozyButton onClick={onNext} ariaLabel="Chi ❤️">
            Chi ❤️
          </CozyButton>
        </motion.div>
      )}
    </>
  )
}
