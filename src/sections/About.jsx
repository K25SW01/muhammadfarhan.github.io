import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { personal } from '../data/siteData'
import profilePlaceholder from '../assets/profile-placeholder.svg'
import './About.css'

const infoRows = [
  { label: 'Name', value: personal.name },
  { label: 'Degree', value: 'B.E. Software Engineering' },
  { label: 'Current Status', value: personal.status },
  { label: 'Availability', value: 'Internships, junior roles, freelance projects and remote opportunities' },
]

export default function About() {
  const [imgSrc, setImgSrc] = useState('/assets/muhammad-farhan-profile.png')

  return (
    <section id="about" className="section-light">
      <div className="container">
        <SectionHeading eyebrow="Get to know me" title="ABOUT ME" id="about-heading" />

        <div className="about-grid">
          <motion.div
            className="about-visual"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="about-frame">
              <img
                src={imgSrc}
                alt="Muhammad Farhan"
                width="380"
                height="420"
                onError={() => setImgSrc(profilePlaceholder)}
              />
            </div>
            <span className="about-badge">Software Engineering Undergraduate</span>
          </motion.div>

          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          >
            <h3 className="about-title">
              Building practical software skills and solving real problems.
            </h3>
            <p className="about-paragraph">
              My name is Muhammad Farhan. I am a B.E. Software Engineering undergraduate at
              Mehran University of Engineering and Technology with a strong interest in
              software development and problem-solving. I am passionate about learning
              modern programming technologies and building practical software solutions.
            </p>
            <p className="about-paragraph">
              My goal is to begin my professional journey as a Software Developer by
              contributing to innovative projects, continuously improving my technical
              skills and delivering high-quality software solutions. I am eager to learn
              from experienced professionals while building a successful career in software
              engineering and freelancing.
            </p>

            <dl className="about-info-grid">
              {infoRows.map((row) => (
                <div className="about-info-row" key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>

            <div className="about-buttons">
              <a href="/resume.html" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                View Resume
              </a>
              <a href="#contact" className="btn btn-secondary on-light">
                Contact Me
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
