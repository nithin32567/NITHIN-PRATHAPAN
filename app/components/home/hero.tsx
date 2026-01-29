"use client"

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import Navbar from '../layout/Navbar'
import { useGsapTimeline } from '@/app/context/gsapContext'

const Hero = () => {
    const tl = useGsapTimeline()
    const containerRef = useRef<HTMLDivElement | null>(null)
    const headingRef = useRef<HTMLHeadingElement | null>(null)
    const contentRef = useRef<HTMLDivElement | null>(null)
    const footerRef = useRef<HTMLDivElement | null>(null)
    const imageRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!tl.current) return

        const words = containerRef.current?.querySelectorAll(".h-word")
        if (!words || words.length === 0) return

        tl.current
            .fromTo(words,
                { y: "100%", opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out" },
                0.2
            )
            .fromTo(contentRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
                "-=0.8"
            )
            .fromTo([imageRef.current, footerRef.current],
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" },
                "-=0.5"
            )

        tl.current.play()
    }, [tl])

    return (
        <section ref={containerRef} className="relative min-h-screen flex flex-col bg-brand-bg text-brand-text overflow-hidden">
            <Navbar />

            <div className="flex-1 flex flex-col justify-center px-6 md:px-12 pt-10 pb-20">
                <div className="relative">
                    <h1
                        ref={headingRef}
                        className="text-[13vw] md:text-[10vw] font-bold leading-[0.85] tracking-tighter uppercase whitespace-nowrap flex flex-col md:flex-row"
                    >
                        <div className="overflow-hidden">
                            <span className="block h-word">Nithin</span>
                        </div>
                        <div className="overflow-hidden md:ml-[0.3em]">
                            <span className="block h-word">Prathapan</span>
                        </div>
                    </h1>
                </div>

                <div ref={contentRef} className="mt-12 md:mt-16 flex flex-col md:flex-row md:items-end gap-8 md:gap-24">
                    <div className="max-w-md">
                        <p className="text-sm md:text-base leading-relaxed font-medium">
                            Open to job opportunities worldwide. Passionate about building polished, intuitive, and thoughtful digital experiences that leave a mark.
                        </p>
                        <button className="group mt-8 px-10 py-4 bg-brand-accent text-brand-light rounded-full text-xs font-mono tracking-[0.2em] uppercase transition-all hover:scale-105 active:scale-95">
                            Contact ↗
                        </button>
                    </div>
                </div>
            </div>

            <div
                className="grid grid-cols-1 md:grid-cols-3 items-end px-6 md:px-12 pb-12 w-full gap-8 md:gap-0"
            >
                <div className="hidden md:block"></div>

                <div ref={imageRef} className="flex justify-center">
                    <div className="relative w-32 h-32 md:w-44 md:h-44 grayscale hover:grayscale-0 transition-all duration-500 rounded-2xl overflow-hidden border border-brand-text/10 shadow-xl">
                        <Image
                            src="/imgprof.jpeg"
                            alt="Nithin Prathapan"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                <div ref={footerRef} className="text-center md:text-right">
                    <div className="flex items-center justify-center md:justify-end gap-2 mb-1">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest opacity-60">Status</span>
                    </div>
                    <div className="text-lg md:text-2xl font-bold uppercase tracking-tight">
                        Available for work
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero