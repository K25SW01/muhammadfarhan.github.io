import { useEffect, useRef, useState } from 'react'
import './CustomCursorGlow.css'

export default function CustomCursorGlow() {
  const glowRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 1025px) and (pointer: fine)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(isDesktop && !reducedMotion)
  }, [])

  useEffect(() => {
    if (!enabled) return undefined

    const handleMove = (e) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [enabled])

  if (!enabled) return null

  return <div className="cursor-glow" ref={glowRef} aria-hidden="true" />
}
