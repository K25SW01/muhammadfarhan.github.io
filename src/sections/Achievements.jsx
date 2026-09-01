import { motion } from 'framer-motion'
import './Achievements.css'

const stats = [
  { id: 'academic-projects', value: '3+', label: 'Academic Software Projects' },
  { id: 'semester', value: '3rd', label: 'Current Semester' },
  { id: 'degree', value: 'B.E.', label: 'Software Engineering' },
  { id: 'growth', value: 'Growing', label: 'Programming and Problem-Solving Skills' },
]

export default function Achievements() {
  return (
    <section className="section-light achievements-section">
      <div className="container">
        <div className="achievements-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              className="achievement-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
            >
              <span className="achievement-value gradient-text">{stat.value}</span>
              <span className="achievement-label">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
