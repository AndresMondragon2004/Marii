import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import RevealText from '../../../components/ui/RevealText.jsx'
import CozyButton from '../../../components/ui/CozyButton.jsx'
import GiftBoxVisual from '../../../components/birthday/GiftBoxVisual.jsx'
import SparkleBurst from '../../../components/fx/SparkleBurst.jsx'
import { useLocalPref } from '../../../hooks/useLocalPref.js'
import { STORAGE_KEYS } from '../../../utils/storage.js'
import { GIFTS_DATA } from '../../../data/giftsData.js'
import Gift1 from './gifts/Gift1.jsx'
import Gift2 from './gifts/Gift2.jsx'
import Gift3 from './gifts/Gift3.jsx'

export default function GiftsStep({ onNext }) {
  const [gift1, setGift1] = useLocalPref(STORAGE_KEYS.gift1Opened, false)
  const [gift2, setGift2] = useLocalPref(STORAGE_KEYS.gift2Opened, false)
  const [gift3, setGift3] = useLocalPref(STORAGE_KEYS.gift3Opened, false)

  const [activeGift, setActiveGift] = useState(null) // 1, 2, 3 or null

  const allOpened = Boolean(gift1 && gift2 && gift3)

  return (
    <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <AnimatePresence mode="wait">
        {activeGift === 1 && (
          <Gift1
            key="gift-view-1"
            onComplete={() => {
              setGift1(true)
              setActiveGift(null)
            }}
            onBack={() => setActiveGift(null)}
          />
        )}

        {activeGift === 2 && (
          <Gift2
            key="gift-view-2"
            onComplete={() => {
              setGift2(true)
              setActiveGift(null)
            }}
            onBack={() => setActiveGift(null)}
          />
        )}

        {activeGift === 3 && (
          <Gift3
            key="gift-view-3"
            onComplete={() => {
              setGift3(true)
              setActiveGift(null)
            }}
            onBack={() => setActiveGift(null)}
          />
        )}

        {activeGift === null && (
          <motion.div
            key="gifts-hub"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              maxWidth: '460px',
              margin: '0 auto'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <RevealText as="h2" className="message-line" style={{ fontSize: '1.4rem' }}>
                esto lo hice pensando en ti
              </RevealText>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 0.5 }}
                style={{ color: '#5D4B55', fontSize: '0.9rem', marginTop: '0.35rem' }}
              >
                toca cada regalito para descubrirlo ♡
              </motion.p>
            </div>

            {/* Disposición armónica de los 3 regalos */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                width: '100%',
                justifyItems: 'center',
                maxWidth: '340px'
              }}
            >
              {/* Regalo 1: Apapacho */}
              <GiftBoxVisual
                opened={gift1}
                onTap={() => setActiveGift(1)}
                tag={GIFTS_DATA[0].tag}
                bodyColor={GIFTS_DATA[0].boxColor}
                lidColor={GIFTS_DATA[0].lidColor}
                ribbonColor={GIFTS_DATA[0].ribbonColor}
                width={112}
              />

              {/* Regalo 2: Lo bonita que eres */}
              <GiftBoxVisual
                opened={gift2}
                onTap={() => setActiveGift(2)}
                tag={GIFTS_DATA[1].tag}
                bodyColor={GIFTS_DATA[1].boxColor}
                lidColor={GIFTS_DATA[1].lidColor}
                ribbonColor={GIFTS_DATA[1].ribbonColor}
                width={112}
              />

              {/* Regalo 3: Noche tranquila (Centrado abajo ocupando las 2 columnas) */}
              <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'center' }}>
                <GiftBoxVisual
                  opened={gift3}
                  onTap={() => setActiveGift(3)}
                  tag={GIFTS_DATA[2].tag}
                  bodyColor={GIFTS_DATA[2].boxColor}
                  lidColor={GIFTS_DATA[2].lidColor}
                  ribbonColor={GIFTS_DATA[2].ribbonColor}
                  width={118}
                />
              </div>
            </div>

            {/* Desbloqueo de la carta cuando se han abierto los 3 */}
            <AnimatePresence>
              {allOpened && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  style={{ marginTop: '2.2rem', textAlign: 'center' }}
                >
                  <SparkleBurst count={6} color="#E889AD" />
                  <CozyButton onClick={onNext} ariaLabel="Ver la última cosita">
                    ver la última cosita 💌
                  </CozyButton>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
