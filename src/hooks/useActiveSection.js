import { useEffect, useState } from 'react'

/**
 * Tracks which section id is currently most visible in the viewport
 * so the header nav can highlight the active link.
 */
export function useActiveSection(sectionIds, headerOffset = 90) {
  const [activeId, setActiveId] = useState(sectionIds[0])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + headerOffset + 10

      let current = sectionIds[0]
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.offsetTop <= scrollPos) {
          current = id
        }
      }
      setActiveId(current)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [sectionIds, headerOffset])

  return activeId
}
