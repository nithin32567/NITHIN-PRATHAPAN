"use client";

import React from 'react'
import Hero from './components/home/hero'
import dynamic from 'next/dynamic'

const SelectedWorks = dynamic(() => import('./components/home/SelectedWorks').then(mod => mod.default), { ssr: false })
const About = dynamic(() => import('./components/home/About').then(mod => mod.default), { ssr: false })
const Skills = dynamic(() => import('./components/home/Skills').then(mod => mod.default), { ssr: false })
const Services = dynamic(() => import('./components/home/Services').then(mod => mod.default), { ssr: false })
const Experience = dynamic(() => import('./components/Experience').then(mod => mod.default), { ssr: false })
const Contact = dynamic(() => import('./components/home/Contact').then(mod => mod.default), { ssr: false })

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