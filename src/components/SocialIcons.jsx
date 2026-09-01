import { Linkedin, Github, Mail, MessageCircle } from 'lucide-react'
import { personal } from '../data/siteData'
import './SocialIcons.css'

const links = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: personal.linkedin,
    Icon: Linkedin,
    external: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    href: personal.github,
    Icon: Github,
    external: true,
  },
  {
    id: 'email',
    label: 'Email',
    href: `mailto:${personal.email}`,
    Icon: Mail,
    external: false,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    href: personal.whatsappLink,
    Icon: MessageCircle,
    external: true,
  },
]

export default function SocialIcons({ align = 'left' }) {
  return (
    <ul className={`social-icons social-${align}`}>
      {links.map(({ id, label, href, Icon, external }) => (
        <li key={id} className="social-item">
          <a
            href={href}
            aria-label={label}
            title={label}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="social-link"
          >
            <Icon size={18} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  )
}
