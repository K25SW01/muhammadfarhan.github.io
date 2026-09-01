import { ArrowUp } from 'lucide-react'
import { useScrollPast } from '../hooks/useScrollTop'
import './BackToTop.css'

export default function BackToTop() {
  const visible = useScrollPast(500)

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      className={`back-to-top ${visible ? 'back-to-top-visible' : ''}`}
      aria-label="Back to top"
      onClick={handleClick}
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUp size={20} aria-hidden="true" />
    </button>
  )
}
