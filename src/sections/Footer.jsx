import Logo from '../components/Logo'
import SocialIcons from '../components/SocialIcons'
import { navLinks, personal } from '../data/siteData'
import { services } from '../data/services'
import './Footer.css'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo showSubtitle={false} />
          <p className="footer-tagline">
            Software Engineering undergraduate and aspiring software developer building
            practical projects in C++, Java and Python.
          </p>
          <SocialIcons align="left" />
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Quick Links</h4>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Capabilities</h4>
          <ul>
            {services.slice(0, 5).map((service) => (
              <li key={service.id}>{service.title}</li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Contact</h4>
          <ul>
            <li>
              <a href={`mailto:${personal.email}`}>{personal.email}</a>
            </li>
            <li>
              <a href={personal.whatsappLink} target="_blank" rel="noopener noreferrer">
                {personal.phoneDisplay}
              </a>
            </li>
            <li>{personal.university}</li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>&copy; {year} Muhammad Farhan. All rights reserved.</p>
        <p>Designed and developed for Muhammad Farhan. Built with React and deployed on Netlify.</p>
      </div>
    </footer>
  )
}
