import { useEffect, useRef, useState } from 'react'

/**
 * Simple typewriter effect that rotates through a list of words.
 * Respects prefers-reduced-motion by freezing on the first word.
 */
export function useTypewriter(words, { typingSpeed = 70, deletingSpeed = 40, pause = 1600 } = {}) {
  const [text, setText] = useState('')
  const [reducedMotion, setReducedMotion] = useState(false)
  const indexRef = useRef(0)
  const charRef = useRef(0)
  const deletingRef = useRef(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const listener = (e) => setReducedMotion(e.matches)
    mq.addEventListener?.('change', listener)
    return () => mq.removeEventListener?.('change', listener)
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      setText(words[0] || '')
      return undefined
    }

    let timeoutId

    const tick = () => {
      const currentWord = words[indexRef.current % words.length]

      if (!deletingRef.current) {
        charRef.current += 1
        setText(currentWord.slice(0, charRef.current))

        if (charRef.current === currentWord.length) {
          deletingRef.current = true
          timeoutId = setTimeout(tick, pause)
          return
        }
        timeoutId = setTimeout(tick, typingSpeed)
      } else {
        charRef.current -= 1
        setText(currentWord.slice(0, charRef.current))

        if (charRef.current === 0) {
          deletingRef.current = false
          indexRef.current += 1
          timeoutId = setTimeout(tick, 300)
          return
        }
        timeoutId = setTimeout(tick, deletingSpeed)
      }
    }

    timeoutId = setTimeout(tick, typingSpeed)
    return () => clearTimeout(timeoutId)
  }, [words, typingSpeed, deletingSpeed, pause, reducedMotion])

  return text
}
