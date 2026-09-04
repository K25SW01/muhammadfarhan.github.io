import { useState } from 'react'
import { motion } from 'framer-motion'
import { personal, whatsappMessages } from '../data/siteData'
import { useTypewriter } from '../hooks/useTypewriter'
import { scrollToId } from '../hooks/useScrollTop'
import SocialIcons from '../components/SocialIcons'
import profilePlaceholder from '../assets/profile-placeholder.svg'
import portraitImage from '../assets/muhammad-farhan-profile.png'
import './Hero.css'

const badgeSkills = ['C++', 'Java', 'Python', 'GitHub']

export default function Hero() {
  const typedTitle = useTypewriter(personal.rotatingTitles)
  const [portraitSrc, setPortraitSrc] = useState(portraitImage)

  const handleViewWork = (e) => {
    e.preventDefault()
    scrollToId('projects')
  }

  return (
    <section id="home" className="hero">
      <div className="hero-bg" aria-hidden="true">
        <span className="hero-glow hero-glow-1 drift" />
        <span className="hero-glow hero-glow-2 drift" />
        <span className="hero-dots" />
        <span className="hero-curve" />
      </div>

      <div className="container hero-inner">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="eyebrow">HELLO, I&rsquo;M</span>
          <h1 className="hero-heading">
            {personal.firstName} <span className="gradient-text">{personal.lastName}</span>
          </h1>

          <p className="hero-role" aria-live="polite">
            I&rsquo;m an <span className="hero-typed">{typedTitle}</span>
            <span className="hero-cursor" aria-hidden="true">|</span>
          </p>

          <p className="hero-description">
            Motivated and enthusiastic Software Engineering undergraduate with a strong
            interest in software development and problem-solving. I enjoy learning modern
            programming technologies and building practical software solutions.
          </p>

          <div className="hero-buttons">
            <a
              href={personal.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Contact Me
            </a>
            <a href="#projects" onClick={handleViewWork} className="btn btn-secondary">
              View My Work
            </a>
          </div>

          <SocialIcons align="left" />

          <div className="hero-badge">
            <span className="hero-badge-dot" aria-hidden="true" />
            Available for internships, junior developer roles, freelance projects and
            remote opportunities
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
        >
          <div className="hero-portrait-frame">
            <span className="hero-portrait-poly hero-portrait-poly-1" aria-hidden="true" />
            <span className="hero-portrait-poly hero-portrait-poly-2" aria-hidden="true" />
            <img
              src={portraitSrc}
              alt="Portrait of Muhammad Farhan"
              className="hero-portrait-img"
              width="420"
              height="480"
              onError={() => setPortraitSrc(profilePlaceholder)}
            />
          </div>

          {badgeSkills.map((skill, i) => (
            <span key={skill} className={`hero-float-badge hero-float-badge-${i + 1} float`}>
              {skill}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
