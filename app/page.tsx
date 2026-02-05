import React from 'react'
import Hero from './components/home/hero'
import dynamic from 'next/dynamic'

const SelectedWorks = dynamic(() => import('./components/home/SelectedWorks'))
const About = dynamic(() => import('./components/home/About'))
const Skills = dynamic(() => import('./components/home/Skills'))
const Services = dynamic(() => import('./components/home/Services'))
const Experience = dynamic(() => import('./components/Experience'))
const Contact = dynamic(() => import('./components/home/Contact'))

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