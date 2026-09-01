import { useState } from 'react'
import Logo from './Logo'
import MobileMenu from './MobileMenu'
import { navLinks, personal } from '../data/siteData'
import { useScrollPast } from '../hooks/useScrollTop'
import { useActiveSection } from '../hooks/useActiveSection'
import { scrollToId } from '../hooks/useScrollTop'
import { Menu } from 'lucide-react'
import './Header.css'

const sectionIds = navLinks.map((l) => l.href.replace('#', ''))

export default function Header() {
  const scrolled = useScrollPast(30)
  const activeId = useActiveSection(sectionIds)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNavClick = (e, href) => {
    e.preventDefault()
    scrollToId(href.replace('#', ''))
  }

  return (
    <>
      <header className={`site-header ${scrolled ? 'site-header-scrolled' : ''}`}>
        <div className="container header-inner">
          <Logo showSubtitle={false} />

          <nav className="desktop-nav" aria-label="Primary navigation">
            <ul>
              {navLinks.map((link) => {
                const id = link.href.replace('#', '')
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={activeId === id ? 'nav-link nav-link-active' : 'nav-link'}
                      aria-current={activeId === id ? 'true' : undefined}
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
            className="btn btn-primary header-cta"
          >
            Let&rsquo;s Talk
          </a>

          <button
            type="button"
            className="mobile-menu-trigger"
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={26} aria-hidden="true" />
          </button>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeId={activeId}
        onNavigate={handleNavClick}
      />
    </>
  )
}
