import { motion } from 'framer-motion'
import { personal, whatsappMessages } from '../data/siteData'
import './CallToAction.css'

export default function CallToAction() {
  return (
    <section className="cta-section">
      <div className="cta-bg" aria-hidden="true">
        <span className="cta-shape cta-shape-1 drift" />
        <span className="cta-shape cta-shape-2 drift" />
      </div>

      <div className="container">
        <motion.div
          className="cta-inner"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h2 className="cta-heading">Have a software opportunity or project in mind?</h2>
          <p className="cta-text">
            Let&rsquo;s discuss an internship, junior developer role, freelance software
            project, academic collaboration or remote opportunity.
          </p>
          <div className="cta-buttons">
            <a
              href={`${personal.whatsappLink}?text=${whatsappMessages.opportunityDiscussion}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn cta-btn-white"
            >
              Start a Conversation
            </a>
            <a
              href={`mailto:${personal.email}?subject=Software Development Opportunity`}
              className="btn cta-btn-outline"
            >
              Send an Email
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
