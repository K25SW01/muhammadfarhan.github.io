import { useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Info } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import ProjectThumbnail from '../components/ProjectThumbnail'
import ProjectModal from '../components/ProjectModal'
import { filterCategories, projects } from '../data/projects'
import './Projects.css'

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [activeProject, setActiveProject] = useState(null)
  const triggerRef = useRef(null)

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects
    return projects.filter((p) => p.category === activeFilter)
  }, [activeFilter])

  const openDetails = (project, e) => {
    triggerRef.current = e.currentTarget
    setActiveProject(project)
  }

  return (
    <section id="projects" className="section-dark">
      <div className="container">
        <SectionHeading eyebrow="Selected work" title="FEATURED PROJECTS" id="projects-heading" />

        <div className="project-filters" role="group" aria-label="Filter projects by category">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-chip ${activeFilter === cat ? 'filter-chip-active' : ''}`}
              onClick={() => setActiveFilter(cat)}
              aria-pressed={activeFilter === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="project-grid">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
            >
              <div className="project-thumb">
                <ProjectThumbnail variant={project.thumbnail} />
                {project.statusBadge && (
                  <span className="project-status-badge">{project.statusBadge}</span>
                )}
              </div>

              <div className="project-body">
                <span className="project-category">{project.category}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <ul className="project-tech-list">
                  {project.technologies.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>

                <div className="project-actions">
                  {project.demoStatus === 'coming-soon' && (
                    <button type="button" className="btn btn-secondary project-btn" disabled>
                      Demo Coming Soon
                    </button>
                  )}
                  {project.demoStatus === 'current-website' && (
                    <a href="/" className="btn btn-secondary project-btn">
                      <ExternalLink size={16} aria-hidden="true" /> Current Website
                    </a>
                  )}
                  {project.demoStatus === 'github' && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary project-btn"
                    >
                      <Github size={16} aria-hidden="true" /> View on GitHub
                    </a>
                  )}

                  <button
                    type="button"
                    className="btn btn-primary project-btn"
                    onClick={(e) => openDetails(project, e)}
                  >
                    <Info size={16} aria-hidden="true" /> Details
                  </button>
                </div>

                {project.repoName && (
                  <p className="project-repo-note">Repository: {project.repoName}</p>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
            triggerRef={triggerRef}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
