import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import './ProjectModal.css'

export default function ProjectModal({ project, onClose, triggerRef }) {
  const modalRef = useRef(null)
  const closeBtnRef = useRef(null)

  useEffect(() => {
    document.body.classList.add('menu-open')
    closeBtnRef.current?.focus()
    return () => {
      document.body.classList.remove('menu-open')
      triggerRef?.current?.focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll(
          'a[href], button:not([disabled])'
        )
        if (focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="project-modal-overlay"
      onMouseDown={handleOverlayClick}
      role="presentation"
    >
      <div
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        ref={modalRef}
      >
        <button
          type="button"
          className="project-modal-close"
          aria-label="Close project details"
          onClick={onClose}
          ref={closeBtnRef}
        >
          <X size={22} aria-hidden="true" />
        </button>

        <span className="project-modal-category">{project.category}</span>
        <h3 id="project-modal-title" className="project-modal-title">
          {project.title}
        </h3>

        <p className="project-modal-overview">{project.details.overview}</p>

        <h4 className="project-modal-subheading">My role</h4>
        <p className="project-modal-role">{project.details.role}</p>

        <h4 className="project-modal-subheading">Key features</h4>
        <ul className="project-modal-features">
          {project.details.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>

        <h4 className="project-modal-subheading">Technologies</h4>
        <ul className="project-modal-tech">
          {project.technologies.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
