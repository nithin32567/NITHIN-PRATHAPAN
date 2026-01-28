import React from 'react'
import { House, FolderKanban, BriefcaseBusiness, Wrench, Brain } from 'lucide-react'
import Tooltip from '../global/Tooltip'

const Navbar = () => {
  return (
    <div className='flex justify-center mx-auto w-full gap-12 py-12'>
      <Tooltip text="Home">
        <House className='cursor-pointer' size={22} />
      </Tooltip>
      <Tooltip text="Projects">
        <FolderKanban className='cursor-pointer' size={22} />
      </Tooltip>
      <Tooltip text="Experiance">
        <BriefcaseBusiness className='cursor-pointer' size={22} />
      </Tooltip>
      <Tooltip text="Tools">
        <Wrench className='cursor-pointer' size={22} />
      </Tooltip>
      <Tooltip text="Thoughts">
        <Brain className='cursor-pointer' size={22} />
      </Tooltip>
    </div>
  )
}

export default Navbar