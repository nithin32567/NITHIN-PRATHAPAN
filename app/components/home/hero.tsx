"use client"

import React, { useRef } from 'react'
import { Github, Linkedin, Mail, Download, Eye } from 'lucide-react'

import Navbar from '../layout/Navbar'
import ProfileCard from './ProfileCard'
import gsap from 'gsap'
import { useGsapTimeline } from '@/app/context/gsapContext'

const Hero = () => {
    const tl = useGsapTimeline()
    const containerRef = useRef<HTMLDivElement | null>(null)
    const headingRef = useRef<HTMLHeadingElement | null>(null)
    const contentRef = useRef<HTMLDivElement | null>(null)
    const footerRef = useRef<HTMLDivElement | null>(null)
    const imageRef = useRef<HTMLDivElement | null>(null)
    const buttonRef = useRef<HTMLButtonElement | null>(null)
    const resumeRef = useRef<HTMLDivElement | null>(null)

    const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect

    useIsomorphicLayoutEffect(() => {
        if (!tl.current) return

        const words = containerRef.current?.querySelectorAll(".h-word")
        if (!words || words.length === 0) return

        // Kill any existing animations on these specific elements to prevent overlaps during re-renders
        gsap.killTweensOf([containerRef.current, words, contentRef.current, imageRef.current, footerRef.current, buttonRef.current, resumeRef.current])

        tl.current
            .fromTo(containerRef.current,
                { opacity: 0, y: 100, borderRadius: "50%" },
                { opacity: 1, y: 0, duration: 1.5, borderRadius: "0", ease: "expo.out" },
                0
            )
            .fromTo(words,
                { y: "110%", opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out" },
                0.4
            )
            .fromTo(contentRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
                0.8
            )
            .fromTo([imageRef.current, footerRef.current],
                { y: 40, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 1.2, stagger: 0.2, ease: "expo.out" },
                1.0
            )
            .fromTo([buttonRef.current, resumeRef.current],
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" },
                1.2
            )

        tl.current.play()

        return () => {
            tl.current?.kill()
        }
    }, [tl])

    return (
        <section 
            ref={containerRef} 
            className="relative min-h-screen flex flex-col bg-brand-bg text-brand-text overflow-hidden"
            style={{ opacity: 0 }}
        >
            <Navbar />

            <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 md:px-12 pt-20 pb-12 md:pb-20">
                <div className="relative">
                    <h1
                        ref={headingRef}
                        data-cursor="big"
                        className="text-[15vw] md:text-[10vw] font-bold leading-[0.85] tracking-tighter uppercase whitespace-nowrap flex flex-col md:flex-row"
                    >
                        <div className="overflow-hidden">
                            <span className="block h-word">Nithin</span>
                        </div>
                        <div className="overflow-hidden md:ml-[0.3em]">
                            <span className="block h-word">Prathapan</span>
                        </div>
                    </h1>
                </div>

                <div ref={contentRef} className="mt-8 md:mt-16 flex flex-col md:flex-row md:items-end gap-6 md:gap-24">
                    <div className="max-w-md">
                        <p className="text-sm md:text-base leading-relaxed font-medium">
                            From idea to interface, I build products that people actually enjoy using.
                            Full-stack MERN Developer obsessed with performance, clarity, and impact.
                        </p>
                        <button
                            ref={buttonRef}
                            className="group relative mt-6 md:mt-8 px-8 md:px-10 py-3 md:py-4 bg-brand-text text-brand-light rounded-full text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase overflow-hidden"
                        >
                            <span className="relative z-10 transition-colors duration-500 group-hover:text-brand-text italic font-bold cursor-pointer">Contact ↗</span>
                            <div className="absolute top-full left-[-10%] w-[120%] h-[300%] bg-brand-light rounded-[100%] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-top-full" />
                        </button>

                        <div ref={resumeRef} className="flex items-center gap-4 mt-4">
                            <a
                                href="/resume/Nithin_Prathapan_CV.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-[10px] md:text-xs font-mono font-medium uppercase tracking-widest text-brand-text/60 hover:text-brand-text transition-colors group"
                            >
                                <Eye size={14} className="group-hover:scale-110 transition-transform duration-300" />
                                <span>View CV</span>
                            </a>
                            <span className="text-brand-text/30">|</span>
                            <a
                                href="/resume/Nithin_Prathapan_CV.pdf"
                                download="Nithin_Prathapan_Resume.pdf"
                                className="flex items-center gap-2 text-[10px] md:text-xs font-mono font-medium uppercase tracking-widest text-brand-text/60 hover:text-brand-text transition-colors group"
                            >
                                <Download size={14} className="group-hover:translate-y-0.5 transition-transform duration-300" />
                                <span>Download</span>
                            </a>
                        </div>

                        <div className="flex items-center gap-6 mt-8">
                            <a
                                href="https://github.com/nithin32567"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-800 hover:text-black transition-colors animate-float"
                                style={{ animationDelay: '0s' }}
                                aria-label="GitHub"
                            >
                                <Github size={28} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/nithin-prathapan"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#0077b5] hover:opacity-80 transition-opacity animate-float"
                                style={{ animationDelay: '0.2s' }}
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={28} />
                            </a>
                            <a
                                href="mailto:nithinprathapan32567@gmail.com"
                                className="text-[#EA4335] hover:opacity-80 transition-opacity animate-float"
                                style={{ animationDelay: '0.4s' }}
                                aria-label="Email"
                            >
                                <Mail size={28} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="grid grid-cols-1 md:grid-cols-3 items-center md:items-end px-4 sm:px-6 md:px-12 pb-8 md:pb-12 w-full gap-8 md:gap-0"
            >
                <div className="hidden md:block"></div>

                <div ref={imageRef} className="flex justify-center w-full">
                    <ProfileCard
                        avatarUrl="/imgprog.jpeg"
                        name=""
                        title=""
                        handle="nithin_prathapan"
                        className="max-w-[280px] md:max-w-[360px] h-[400px] md:h-[540px] aspect-[0.718]"
                    />
                </div>

                <div ref={footerRef} className="text-center md:text-right">
                    <div className="flex items-center justify-center md:justify-end gap-2 mb-1">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest opacity-60">Status</span>
                    </div>
                    <div className="text-base md:text-2xl font-bold uppercase tracking-tight">
                        Available for work
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero