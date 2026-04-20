"use client"

import React, { useRef } from 'react'
import Link from 'next/link'
import { useGsapTimeline } from '@/app/context/gsapContext'
import StaggeredMenu from './StaggeredMenu'

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

  const menuItems = [
    { label: 'Services', link: '#services', ariaLabel: 'Go to Services' },
    { label: 'Works', link: '#works', ariaLabel: 'Go to Works' },
    { label: 'About', link: '#about', ariaLabel: 'Go to About' },
    { label: 'Contact', link: '#contact', ariaLabel: 'Go to Contact' }
  ];

  const socialItems = [
    { label: 'GitHub', link: 'https://github.com/nithin32567' },
    { label: 'LinkedIn', link: 'https://www.linkedin.com/in/nithin-prathapan' }
  ];

  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect

  useIsomorphicLayoutEffect(() => {
    if (!tl.current) return
    if (navbarRef.current) {
      tl.current.fromTo(
        navbarRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, ease: "power4.out" },
        0.2
      )
    }
  }, [tl])

  return (
    <>
      <nav
        ref={navbarRef}
        style={{ opacity: 0 }}
        className='hidden md:flex justify-between items-center px-6 md:px-12 py-8 w-full uppercase text-[10px] md:text-xs font-mono tracking-[0.2em]'
      >
        <div className="font-semibold text-black">
          Full Stack Developer
        </div>

        <div className='flex gap-4 md:gap-10'>
          <NavLink href="#services" label="Services" />
          <NavLink href="#works" label="Works" />
          <NavLink href="#about" label="About" />
          <NavLink href="#contact" label="Contact" />
        </div>
      </nav>

      <div className="md:hidden">
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#000000"
          openMenuButtonColor="#000000"
          changeMenuColorOnOpen={true}
          colors={['#000000', '#000000']}
          accentColor="#000000"
          isFixed={true}
          logoContent={<div className="font-mono text-[10px] tracking-[0.2em] font-semibold text-black uppercase pt-1">Full Stack Developer</div>}
        />
      </div>
    </>
  )
}

export default Navbar