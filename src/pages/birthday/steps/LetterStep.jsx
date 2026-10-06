import EnvelopeLetter from '../../../components/birthday/EnvelopeLetter.jsx'
import { save, STORAGE_KEYS } from '../../../utils/storage.js'

export default function LetterStep({ onNext }) {
  const handleComplete = () => {
    save(STORAGE_KEYS.letterRead, true)
    onNext()
  }

  return (
    <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <EnvelopeLetter onComplete={handleComplete} />
    </div>
  )
}
