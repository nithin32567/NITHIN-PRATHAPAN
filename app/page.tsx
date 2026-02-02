import React from 'react'
import Hero from './components/home/hero'
import SelectedWorks from './components/home/SelectedWorks'
import Skills from './components/home/Skills'

const page = () => {

  return (

    <div className='bg-black'>
      <div>
        <Hero />
        <SelectedWorks />
        <Skills />
      </div>
    </div>
  )
}

export default page