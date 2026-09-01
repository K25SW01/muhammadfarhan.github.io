import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { services } from '../data/services'
import { personal, whatsappMessages } from '../data/siteData'
import './Services.css'

export default function Services() {
  return (
    <section id="services" className="section-dark-2">
      <div className="container">
        <SectionHeading eyebrow="What I bring" title="WHAT I CAN CONTRIBUTE" id="services-heading" />

        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = Icons[service.icon] || Icons.Globe
            return (
              <motion.article
                key={service.id}
                className="service-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
              >
                <div className="service-icon">
                  <Icon size={26} aria-hidden="true" />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </motion.article>
            )
          })}
        </div>

        <div className="services-cta">
          <a
            href={`${personal.whatsappLink}?text=${whatsappMessages.opportunityDiscussion}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Discuss an Opportunity
          </a>
        </div>
      </div>
    </section>
  )
}
