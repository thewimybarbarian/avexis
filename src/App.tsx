import { useState } from 'react'
import Intro from './components/Intro'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import MagneticCursor from './components/MagneticCursor'
import SmoothScroll from './components/SmoothScroll'
import './index.css'

export default function App() {
  const [introVisible, setIntroVisible] = useState(true)
  const [siteReady, setSiteReady] = useState(false)

  function handleIntroComplete() {
    setIntroVisible(false)
    setTimeout(() => setSiteReady(true), 400)
  }

  return (
    <SmoothScroll>
      <div className="bg-dark min-h-screen cursor-none md:cursor-none">
        <MagneticCursor />
        <Intro visible={introVisible} onComplete={handleIntroComplete} />

        <div className={introVisible ? 'opacity-0' : 'opacity-100 transition-opacity duration-700'}>
          <Navbar />
          <Hero animate={siteReady} />
          <Services />
          <About />
          <Contact />
          <Footer />
        </div>
      </div>
    </SmoothScroll>
  )
}
