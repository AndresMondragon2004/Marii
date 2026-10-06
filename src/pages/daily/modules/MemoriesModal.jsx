import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CozyButton from '../../../components/ui/CozyButton.jsx'
import EnvelopeLetter from '../../../components/birthday/EnvelopeLetter.jsx'
import VipPassCard from '../../../components/birthday/VipPassCard.jsx'
import { MEMORIES_DATA } from '../../../data/memoriesData.js'

export default function MemoriesModal({ onClose }) {
  const [activeMemory, setActiveMemory] = useState(null) // null | 'letter' | 'vip'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      className="gift-modal-screen"
      style={{
        width: '100%',
        maxWidth: 'min(92vw, 420px)',
        backgroundColor: '#FFFDF9',
        borderRadius: '24px',
        border: '3px solid #5D4B55',
        boxShadow: '0 16px 36px rgba(93, 75, 85, 0.14)',
        padding: '1.4rem 1.1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '1rem',
        maxHeight: '85dvh',
        overflowY: 'auto',
        boxSizing: 'border-box'
      }}
    >
      <AnimatePresence mode="wait">
        {activeMemory === 'letter' ? (
          <motion.div
            key="letter-memory-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ width: '100%' }}
          >
            <EnvelopeLetter onComplete={() => setActiveMemory(null)} />
          </motion.div>
        ) : activeMemory === 'vip' ? (
          <motion.div
            key="vip-memory-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
          >
            <VipPassCard width={300} />
            <CozyButton onClick={() => setActiveMemory(null)} ariaLabel="Volver a los recuerdos">
              volver a la cajita ♡
            </CozyButton>
          </motion.div>
        ) : (
          <motion.div
            key="memories-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            {/* Encabezado */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
              <span style={{ fontSize: '1.2rem' }}>📦</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#E889AD', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                cajita de recuerdos
              </span>
              <span style={{ fontSize: '1.2rem' }}>📦</span>
            </div>

            <p style={{ color: 'var(--ink-soft)', fontSize: '0.9rem', margin: 0 }}>
              Aquí guardamos los detallitos especiales que preparamos para ti.
            </p>

            {/* Lista de recuerdos */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.4rem' }}>
              {MEMORIES_DATA.map((mem) => (
                <motion.div
                  key={mem.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (mem.type === 'letter') setActiveMemory('letter')
                    if (mem.type === 'vip_pass') setActiveMemory('vip')
                  }}
                  style={{
                    backgroundColor: '#FFF8FC',
                    border: '2px solid var(--pink-soft)',
                    borderRadius: '16px',
                    padding: '0.9rem 1rem',
                    textAlign: 'left',
                    cursor: mem.type === 'letter' || mem.type === 'vip_pass' ? 'pointer' : 'default',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.2rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.78rem', color: '#E889AD', fontWeight: 700 }}>
                      {mem.date}
                    </span>
                    {(mem.type === 'letter' || mem.type === 'vip_pass') && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--ink-soft)' }}>
                        toca para ver →
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#5D4B55' }}>
                    {mem.title}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', lineHeight: 1.4 }}>
                    {mem.description}
                  </div>
                </motion.div>
              ))}
            </div>

            <div style={{ marginTop: '0.6rem', display: 'flex', justifyContent: 'center' }}>
              <CozyButton onClick={onClose} ariaLabel="Cerrar cajita de recuerdos">
                cerrar ♡
              </CozyButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
