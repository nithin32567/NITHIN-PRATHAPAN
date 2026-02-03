
"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import Orb from '../Orb';
import Link from 'next/link';

const Contact = () => {
    const circleTextRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (circleTextRef.current) {
            gsap.to(circleTextRef.current, {
                rotation: 360,
                duration: 20,
                repeat: -1,
                ease: "linear",
                transformOrigin: "center center"
            });
        }
    }, []);

    return (
        <section className="relative min-h-[60vh] md:min-h-[80vh] flex flex-col items-center justify-center bg-black overflow-hidden py-12 md:py-24">
            {/* Background Orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[300px] md:h-[600px] pointer-events-none opacity-60 z-0">
                <Orb
                    hoverIntensity={0.79}
                    rotateOnHover
                    hue={166}
                    forceHoverState
                    backgroundColor="#000000"
                />
            </div>

            <div className="container mx-auto px-4 z-10 relative flex flex-col items-center text-center">

                {/* Open to Work Badge */}
                {/* On mobile: displayed in flow. On tablet+: absolute positioned */}
                <div className="relative mb-8 md:mb-0 md:absolute md:right-20 md:-top-12 lg:right-32 flex items-center justify-center">
                    <div className="relative w-24 h-24 md:w-40 md:h-40 flex items-center justify-center">
                        <svg
                            ref={circleTextRef}
                            className="w-full h-full absolute inset-0"
                            viewBox="0 0 200 200"
                        >
                            <defs>
                                <path id="circlePath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
                            </defs>
                            <text fill="white" fontSize="24" fontWeight="bold" letterSpacing="4">
                                <textPath xlinkHref="#circlePath" startOffset="0%">
                                    • OPEN TO WORK • OPEN TO WORK • OPEN TO WORK
                                </textPath>
                            </text>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-white fill-white" />
                        </div>
                    </div>
                </div>


                {/* Logo or Brand Icon (Optional based on image, using placeholder/icon if not available) */}
                {/* <div className="mb-12">
           <span className="text-white text-4xl font-bold font-serif italic">PS</span>
        </div> */}

                {/* Main Heading */}
                <h2 className="text-3xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-4 max-w-5xl">
                    FROM IDEA TO EXECUTION
                </h2>
                <h2 className="text-3xl md:text-6xl lg:text-7xl font-bold text-white/90 tracking-tight mb-12 md:mb-16 max-w-5xl">
                    LET&apos;S BUILD SOMETHING REAL!
                </h2>

                {/* CTA Button */}
                <div className="relative group">
                    <Link
                        href="mailto:nithinprathapan32567@gmail.com"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-white transition-all duration-300 group-hover:px-8 md:group-hover:px-10"
                    >
                        <span className="font-medium text-base md:text-lg">Get in touch</span>
                        <span className="bg-white text-black p-1 rounded-full group-hover:rotate-45 transition-transform duration-300">
                            <ArrowUpRight size={16} />
                        </span>
                    </Link>
                </div>

                {/* Footer Text */}
                <div className="mt-16 md:mt-24 text-center space-y-2">
                    <p className="text-white font-medium text-base md:text-lg">Available for full-time roles and selective freelance projects.</p>
                    <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
                        I focus on shipping clean, scalable web solutions that support real users and growing products.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default Contact;
