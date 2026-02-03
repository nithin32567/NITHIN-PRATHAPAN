import React from 'react'
import Hero from './components/home/hero'
import SelectedWorks from './components/home/SelectedWorks'
import About from './components/home/About'
import Skills from './components/home/Skills'
import Services from './components/home/Services'
import Experience from './components/Experience'
import Contact from './components/home/Contact'

const page = () => {

  return (

    <div className='bg-black'>
      <div>
        <Hero />
        <section id="works">
          <SelectedWorks />
        </section>
        <section id="about">
          <About />
          <Skills />
        </section>
        <section id="services">
          <Services />
        </section>
        <Experience />
        <section id="contact">
          <Contact />
        </section>
      </div>
    </div>
  )
}

export default page