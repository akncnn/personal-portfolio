import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { LanguageProvider } from './contexts/LanguageContext'
import Header from './components/header'
import IntroSection from './components/introsection'
import AboutSection from './components/aboutSection'
import PortSection from './components/portSection'
import ServicesSection from './components/servicesSection'
import ExperienceSection from './components/experienceSection'
import ContactSection from './components/contactSection'

function App() {
  return (
    <LanguageProvider>
      <Header />
      <IntroSection />
      <AboutSection />
      <PortSection />
      <ServicesSection />
      <ExperienceSection />
      <ContactSection />
    </LanguageProvider>
  )
}

export default App