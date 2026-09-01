import './SectionHeading.css'

export default function SectionHeading({ eyebrow, title, id, align = 'center' }) {
  return (
    <div className={`section-heading section-heading-${align}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 id={id} className="section-heading-title">
        <span className="heading-line" aria-hidden="true" />
        <span className="heading-text">{title}</span>
        <span className="heading-line" aria-hidden="true" />
      </h2>
    </div>
  )
}
