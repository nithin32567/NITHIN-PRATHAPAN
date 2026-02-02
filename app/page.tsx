import React from 'react'
import Hero from './components/home/hero'
import SelectedWorks from './components/home/SelectedWorks'
import Skills from './components/home/Skills'
import Services from './components/home/Services'

const page = () => {

  return (

    <div className='bg-black'>
      <div>
        <Hero />
        <SelectedWorks />
        <Skills />
        <Services />
      </div>
    </div>
  )
}

export default page