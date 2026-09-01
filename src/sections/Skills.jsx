import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { skillCategories } from '../data/skills'
import './Skills.css'

export default function Skills() {
  return (
    <section id="skills" className="section-light">
      <div className="container">
        <SectionHeading eyebrow="What I know" title="TECHNICAL SKILLS" id="skills-heading" />

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.id}
              className="skill-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
            >
              <div className="skill-card-top">
                <h3 className="skill-category-title">{category.title}</h3>
                <span className="skill-level-label">{category.level}</span>
              </div>

              <div className="skill-bar-track">
                <motion.div
                  className="skill-bar-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${category.levelValue}%` }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                />
              </div>

              <ul className="skill-chip-list">
                {category.skills.map((skill) => (
                  <li key={skill} className="skill-chip">
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
