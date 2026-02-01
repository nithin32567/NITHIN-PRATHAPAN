import React from 'react'
import Hero from './components/home/hero'
import SelectedWorks from './components/home/SelectedWorks'

const page = () => {

  return (

    <div className='bg-black'>
      <div>
        <Hero />
        <SelectedWorks />
      </div>
    </div>
  )
}

export default page