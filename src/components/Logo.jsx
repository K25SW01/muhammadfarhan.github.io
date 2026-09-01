import './Logo.css'

export default function Logo({ light = false, showSubtitle = true }) {
  return (
    <a href="#home" className={`logo ${light ? 'logo-light' : ''}`} aria-label="Muhammad Farhan logo, go to home">
      <span className="logo-mark">
        MF<span className="logo-dot" aria-hidden="true">.</span>
      </span>
      {showSubtitle && <span className="logo-subtitle">Muhammad Farhan</span>}
    </a>
  )
}
