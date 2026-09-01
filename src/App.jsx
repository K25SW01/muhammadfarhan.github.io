import Header from './components/Header'
import BackToTop from './components/BackToTop'
import CustomCursorGlow from './components/CustomCursorGlow'
import LoadingScreen from './components/LoadingScreen'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import EducationExperience from './sections/EducationExperience'
import Achievements from './sections/Achievements'
import CallToAction from './sections/CallToAction'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

export default function App() {
  return (
    <>
      <LoadingScreen />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <CustomCursorGlow />
      <Header />

      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <Skills />
        <Projects />
        <EducationExperience />
        <Achievements />
        <CallToAction />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  )
}
