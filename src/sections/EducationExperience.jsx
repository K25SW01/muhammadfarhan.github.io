import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { timeline } from '../data/timeline'
import './EducationExperience.css'

export default function EducationExperience() {
  return (
    <section id="journey" className="section-dark-2">
      <div className="container">
        <SectionHeading eyebrow="Where I&rsquo;ve been" title="MY JOURNEY" id="journey-heading" />

        <div className="timeline">
          <span className="timeline-line" aria-hidden="true" />
          {timeline.map((item, index) => (
            <motion.div
              key={item.id}
              className={`timeline-item ${index % 2 === 0 ? 'timeline-item-left' : 'timeline-item-right'}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
            >
              <div className="timeline-dot" aria-hidden="true" />
              <div className="timeline-card">
                <span className="timeline-year">{item.year}</span>
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-place">{item.place}</p>
                <p className="timeline-description">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
