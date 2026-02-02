'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import flyteasy from '@/public/assets/projects/flyteasy.jpg';
import smartspace from '@/public/assets/projects/smartspace.png';
import synnefo from '@/public/assets/projects/synnefowebsite.png';
import doublebarrel from '@/public/assets/projects/db.png';

const projects = [
    {
        title: 'FLYTEASY',
        category: 'Design / Development',
        year: '2025',
        description: 'FlytEasy is a responsive travel booking website designed to simplify the process of searching and booking flights and hotels. The platform allows users to explore multiple travel options, compare prices, and make bookings through an intuitive and user-friendly interface.',
        color: '#0e0e0e', // Dark
        textColor: '#ffffff',
        image: flyteasy,
        link: 'https://flyteasy.com'
    },
    {
        title: 'Smart-space',
        category: 'Web Application',
        year: '2024',
        description: 'SmartSpace enables users to run Linux Ubuntu systems and tackle various challenge-based sections using multiple virtual machines. The platform supports isolated VM environments for practicing real-world scenarios, making it ideal for technical training and skill development. SmartSpace also includes an integrated Learning Management System (LMS) to deliver structured content, track progress, and manage user learning journeys.',
        color: '#1c1c1c', // Slightly lighter dark
        textColor: '#ffffff',
        image: smartspace,
        link: 'https://lab.synnefo.in'
    },
    {
        title: 'Synnefo-website',
        category: 'Development / Design / SEO',
        year: '2024',
        description: 'Official corporate website of Synnefo Solutions, designed to represent the brand’s identity and showcase its services, products, and expertise. The site provides a professional and user-friendly experience, featuring clear navigation, service highlights, company information, and contact capabilities.',
        color: '#252525', // Even lighter
        textColor: '#ffffff',
        image: synnefo,
        link: 'https://synnefo.in'
    },
    {
        title: 'Double Barrel - Online Delivery Platform',
        category: 'Full Stack',
        year: '2025',
        description: 'Double Barrel is an online delivery platform similar to an e-commerce website, focused on fashion retail. The platform allows users to browse, select, and order dresses through a smooth and intuitive shopping experience.The project is currently under active development, with ongoing enhancements to improve performance, user experience, and feature depth',
        color: '#000000', // Black
        textColor: '#ffffff',
        image: doublebarrel,
        link: 'https://doublebarrel.in'
    }
];

export default function SelectedWorks() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Optional: Add a subtle scaling effect to cards as they leave
        // This part enhances the "stack" feeling by making the lower cards fade/scale slightly
        const cards = document.querySelectorAll('.project-card');

        cards.forEach((card, index) => {
            if (index === cards.length - 1) return; // Don't animate the last one away

            gsap.to(card, {
                scale: 0.9,
                opacity: 0.5,
                scrollTrigger: {
                    trigger: card,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                    // markers: true
                }
            });
        });

    }, []);

    return (
        <section ref={containerRef} className="relative w-full bg-black text-white py-20">

            {/* Section Header */}
            <div className="container mx-auto px-4 mb-20">
                <h2 className="text-6xl md:text-[8rem] font-bold leading-none tracking-tighter mb-4">
                    SELECTED <br />
                    <span className="text-gray-500">WORKS</span>
                </h2>
                <div className="h-[1px] w-full bg-white/20 mt-8"></div>
                <div className="flex justify-between text-sm uppercase tracking-widest mt-4 text-gray-400">
                    <span>(Projects)</span>
                    <span>2023 — 2025</span>
                </div>
            </div>

            {/* Stacked Cards Area */}
            <div className="w-full flex flex-col items-center">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="project-card sticky top-0 w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
                        data-cursor-text="Explore"
                        style={{
                            backgroundColor: project.color,
                            zIndex: index + 1
                        }}
                    >
                        {/* Card Content Container */}
                        <div className="container mx-auto px-4 h-full flex flex-col md:flex-row relative">

                            {/* Left Column: Index & Details */}
                            <div className="flex-1 flex flex-col justify-between py-12 md:py-24 z-10">
                                <div>
                                    <span className="block text-8xl md:text-[12rem] font-bold leading-none opacity-20 select-none">
                                        0{index + 1}
                                    </span>
                                    <h3 className="text-4xl md:text-6xl font-bold mt-4 md:mt-10 max-w-lg leading-tight">
                                        {project.title}
                                    </h3>
                                    <p className="mt-6 text-lg text-gray-400 max-w-md">
                                        {project.description}
                                    </p>

                                    <div className="flex gap-4 mt-8">
                                        <span className="px-4 py-2 border border-white/20 rounded-full text-xs uppercase tracking-wider">
                                            {project.category}
                                        </span>
                                        <span className="px-4 py-2 border border-white/20 rounded-full text-xs uppercase tracking-wider">
                                            {project.year}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-12 md:mt-0">
                                    <button
                                        onClick={() => window.open(project.link, '_blank')}
                                        className="group flex items-center gap-2 text-lg font-medium hover:text-gray-300 transition-colors"
                                        data-cursor-text="Visit"
                                    >
                                        View Project
                                        <div className="bg-white text-black rounded-full p-2 group-hover:scale-110 transition-transform duration-300">
                                            <ArrowUpRight size={20} />
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {/* Right Column: Visual */}
                            <div className="flex-1 h-[50vh] md:h-auto md:py-24 flex items-center justify-center relative">
                                <div className="relative w-full aspect-square md:aspect-[4/3] rounded-sm overflow-hidden border border-white/10 group shadow-2xl">
                                    {/* Placeholder for the image/video */}
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                                </div>
                            </div>

                        </div>

                        {/* Divider Line at bottom of card */}
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10"></div>
                    </div>
                ))}
            </div>

            {/* Spacer for bottom flow */}
            <div className="h-[20vh] bg-black"></div>
        </section>
    );
}
