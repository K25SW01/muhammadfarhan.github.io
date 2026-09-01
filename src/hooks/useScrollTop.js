import { useEffect, useState } from 'react'

/** Returns true once the page has scrolled past the given threshold. */
export function useScrollPast(threshold = 40) {
  const [past, setPast] = useState(false)

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return past
}

export function scrollToId(id, offset = 88) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
}
