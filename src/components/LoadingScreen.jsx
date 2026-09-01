import { useEffect, useState } from 'react'
import './LoadingScreen.css'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 450)
    const removeTimer = setTimeout(() => setVisible(false), 700)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div className={`loading-screen ${fading ? 'loading-screen-fade' : ''}`} aria-hidden="true">
      <span className="loading-mark">
        MF<span className="loading-dot">.</span>
      </span>
    </div>
  )
}
