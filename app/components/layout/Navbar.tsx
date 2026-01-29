"use client"

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useGsapTimeline } from '@/app/context/gsapContext'

const NavLink = ({ href, label }: { href: string; label: string }) => {
  return (
    <Link href={href} className="group relative overflow-hidden h-[1.2em] inline-block">
      <div className="transition-transform duration-500 ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:-translate-y-full">
        <span className="block">{label}</span>
        <span className="block absolute left-0 top-full">{label}</span>
      </div>
    </Link>
  )
}

const Navbar = () => {
  const tl = useGsapTimeline()
  const navbarRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!tl.current) return
    tl.current.fromTo(
      navbarRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: "power4.out" },
      0.5
    )
  }, [tl])

  return (
    <nav
      ref={navbarRef}
      className='flex justify-between items-center px-6 md:px-12 py-8 w-full uppercase text-[10px] md:text-xs font-mono tracking-[0.2em]'
    >
      <div className="font-semibold">
        Web Developer & Designer
      </div>

      <div className='flex gap-4 md:gap-10'>
        <NavLink href="#services" label="Services" />
        <NavLink href="#works" label="Works" />
        <NavLink href="#about" label="About" />
        <NavLink href="#contact" label="Contact" />
      </div>
    </nav>
  )
}

export default Navbar