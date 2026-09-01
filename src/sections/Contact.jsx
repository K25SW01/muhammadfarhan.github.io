import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, GraduationCap, Linkedin } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { personal } from '../data/siteData'
import './Contact.css'

const opportunityOptions = [
  'Software Engineering Internship',
  'Junior Developer Role',
  'Freelance Software Project',
  'Academic Collaboration',
  'Remote Opportunity',
  'Other',
]

const initialForm = {
  name: '',
  email: '',
  phone: '',
  opportunity: opportunityOptions[0],
  subject: '',
  message: '',
  consent: false,
  'bot-field': '',
}

function encodeFormData(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const validate = () => {
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Please enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Please enter a valid email address.'
    }
    if (!form.subject.trim()) nextErrors.subject = 'Please enter a subject.'
    if (form.message.trim().length < 20) {
      nextErrors.message = 'Message must be at least 20 characters.'
    }
    if (!form.consent) nextErrors.consent = 'Please confirm you agree to be contacted.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('submitting')
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeFormData({ 'form-name': 'portfolio-contact', ...form }),
      })
      setStatus('success')
      setForm(initialForm)
      setErrors({})
    } catch (_err) {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section-dark">
      <div className="container">
        <SectionHeading eyebrow="Let&rsquo;s connect" title="GET IN TOUCH" id="contact-heading" />

        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <h3 className="contact-heading-text">Let&rsquo;s connect and build something useful.</h3>
            <p className="contact-description">
              Contact me for software-development internships, junior developer roles,
              freelance projects, academic collaboration or remote opportunities.
            </p>

            <ul className="contact-cards">
              <li>
                <a href={`mailto:${personal.email}`} className="contact-card">
                  <Mail size={20} aria-hidden="true" />
                  <div>
                    <span className="contact-card-label">Email</span>
                    <span className="contact-card-value">{personal.email}</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={personal.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-card"
                >
                  <Phone size={20} aria-hidden="true" />
                  <div>
                    <span className="contact-card-label">Phone / WhatsApp</span>
                    <span className="contact-card-value">{personal.phoneDisplay}</span>
                  </div>
                </a>
              </li>
              <li>
                <div className="contact-card contact-card-static">
                  <GraduationCap size={20} aria-hidden="true" />
                  <div>
                    <span className="contact-card-label">University</span>
                    <span className="contact-card-value">{personal.university}</span>
                  </div>
                </div>
              </li>
              <li>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-card"
                >
                  <Linkedin size={20} aria-hidden="true" />
                  <div>
                    <span className="contact-card-label">LinkedIn</span>
                    <span className="contact-card-value">Muhammad Farhan</span>
                  </div>
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.form
            name="portfolio-contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="contact-form"
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          >
            <input type="hidden" name="form-name" value="portfolio-contact" />
            <p className="visually-hidden">
              <label>
                Don&rsquo;t fill this out if you&rsquo;re human:
                <input name="bot-field" value={form['bot-field']} onChange={handleChange} tabIndex="-1" autoComplete="off" />
              </label>
            </p>

            <div className="form-row">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <span className="form-error" id="name-error">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="form-row">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <span className="form-error" id="email-error">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="form-row">
              <label htmlFor="phone">Phone or WhatsApp (optional)</label>
              <input id="phone" name="phone" type="text" value={form.phone} onChange={handleChange} />
            </div>

            <div className="form-row">
              <label htmlFor="opportunity">Opportunity Type</label>
              <select id="opportunity" name="opportunity" value={form.opportunity} onChange={handleChange}>
                {opportunityOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={handleChange}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? 'subject-error' : undefined}
              />
              {errors.subject && (
                <span className="form-error" id="subject-error">
                  {errors.subject}
                </span>
              )}
            </div>

            <div className="form-row">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <span className="form-error" id="message-error">
                  {errors.message}
                </span>
              )}
            </div>

            <div className="form-row form-row-checkbox">
              <label htmlFor="consent" className="checkbox-label">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  checked={form.consent}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.consent)}
                  aria-describedby={errors.consent ? 'consent-error' : undefined}
                />
                I agree to be contacted about my inquiry.
              </label>
              {errors.consent && (
                <span className="form-error" id="consent-error">
                  {errors.consent}
                </span>
              )}
            </div>

            <button type="submit" className="btn btn-primary contact-submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>

            <div aria-live="polite" className="form-status">
              {status === 'success' && (
                <p className="form-status-success">
                  Thank you! Your message has been sent successfully.
                </p>
              )}
              {status === 'error' && (
                <p className="form-status-error">
                  Something went wrong. Please try again or email me directly.
                </p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
