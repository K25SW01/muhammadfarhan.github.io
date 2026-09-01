import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { navLinks, personal } from '../data/siteData'
import Logo from './Logo'
import SocialIcons from './SocialIcons'
import './MobileMenu.css'

export default function MobileMenu({ open, onClose, activeId, onNavigate }) {
  const panelRef = useRef(null)
  const closeBtnRef = useRef(null)

  useEffect(() => {
    if (open) {
      document.body.classList.add('menu-open')
      closeBtnRef.current?.focus()
    } else {
      document.body.classList.remove('menu-open')
    }
    return () => document.body.classList.remove('menu-open')
  }, [open])

  useEffect(() => {
    if (!open) return undefined

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll(
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
  }, [open, onClose])

  const handleLinkClick = (e, href) => {
    onNavigate(e, href)
    onClose()
  }

  return (
    <div
      id="mobile-menu"
      className={`mobile-menu-overlay ${open ? 'mobile-menu-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
      aria-hidden={!open}
    >
      <div className="mobile-menu-panel" ref={panelRef}>
        <div className="mobile-menu-top">
          <Logo showSubtitle={false} />
          <button
            type="button"
            ref={closeBtnRef}
            className="mobile-menu-close"
            aria-label="Close navigation menu"
            onClick={onClose}
          >
            <X size={26} aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile primary navigation">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => {
              const id = link.href.replace('#', '')
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={activeId === id ? 'mobile-nav-link active' : 'mobile-nav-link'}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <a
          href={personal.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary mobile-menu-cta"
        >
          Let&rsquo;s Talk
        </a>

        <SocialIcons align="center" />
      </div>
    </div>
  )
}
