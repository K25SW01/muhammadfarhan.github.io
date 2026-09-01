const iconPaths = {
  shop: 'M4 8h16l-1.5 10.5a2 2 0 01-2 1.5H7.5a2 2 0 01-2-1.5L4 8zM8 8V6a4 4 0 018 0v2',
  portfolio: 'M4 7h16v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7zM8 7V5a2 2 0 012-2h4a2 2 0 012 2v2',
  attendance: 'M4 5h16v4H4zM4 11h16v8H4zM8 15h3M8 18h6',
  records: 'M6 4h9l3 3v13H6zM12 10h4M12 14h4M8 10h1M8 14h1',
  java: 'M9 4c-2 3 2 4 0 7 M13 4c-2 3 2 4 0 7 M6 15c4 3 8 3 12 0 M7 19c4 2 8 2 10 0',
  database: 'M5 6c0-1.7 3.1-3 7-3s7 1.3 7 3-3.1 3-7 3-7-1.3-7-3zM5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3',
  quiz: 'M8 5a4 4 0 118 0c0 3-4 3-4 6 M12 17h.01 M4 4h16v16H4z',
  library: 'M4 19V6a2 2 0 012-2h3v15 M9 19V4h4a2 2 0 012 2v13 M15 19V7l3-1v13 M4 19h16',
}

export default function ProjectThumbnail({ variant = 'portfolio' }) {
  const path = iconPaths[variant] || iconPaths.portfolio

  return (
    <svg
      className="project-thumb-svg"
      viewBox="0 0 200 130"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`thumb-grad-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6C4CF1" />
          <stop offset="48%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" rx="14" fill={`url(#thumb-grad-${variant})`} opacity="0.18" />
      <circle cx="34" cy="26" r="16" fill="#22D3EE" opacity="0.18" />
      <circle cx="176" cy="108" r="22" fill="#FBBF24" opacity="0.14" />
      <g transform="translate(76,41)" fill="none" stroke="#F8FAFC" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d={path} />
      </g>
    </svg>
  )
}
