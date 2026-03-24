'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

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

const ProjectCard = React.memo(({ project, index }: { project: typeof projects[0], index: number }) => {
    return (
        <div
            className="project-card sticky top-0 w-full h-screen flex flex-col border-t border-white/20 overflow-hidden bg-black transition-all duration-500"
            style={{
                backgroundColor: project.color,
                top: `${index * 150}px`,
                zIndex: index + 1
            }}
        >
            <div className="container mx-auto px-4 md:px-6 h-full relative flex flex-col pt-10">
                <div className="flex flex-row items-center gap-8 md:gap-16 mb-12 select-none">
                    <span className="text-6xl md:text-8xl font-bold leading-none text-white/40">
                        0{index + 1}
                    </span>
                    <h3 className="text-4xl md:text-7xl font-bold leading-none tracking-tight uppercase">
                        {project.title}
                    </h3>
                </div>

                <div className="flex flex-col md:flex-row gap-8 md:gap-20 flex-1 overflow-hidden pb-10">
                    <div className="flex-1 flex flex-col justify-start pt-4">
                        <div>
                            <p className="text-lg md:text-2xl text-gray-300 leading-relaxed max-w-xl">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-3 mt-8 md:mt-12">
                                <span className="px-4 py-2 border border-white/20 rounded-full text-sm uppercase tracking-wider bg-white/5 backdrop-blur-sm">
                                    {project.category}
                                </span>
                                <span className="px-4 py-2 border border-white/20 rounded-full text-sm uppercase tracking-wider bg-white/5 backdrop-blur-sm">
                                    {project.year}
                                </span>
                            </div>
                        </div>
                        <div className="mt-12">
                            <button
                                onClick={() => window.open(project.link, '_blank')}
                                className="group inline-flex items-center gap-3 text-xl font-medium hover:text-white transition-colors"
                            >
                                View Project
                                <div className="bg-white text-black rounded-full p-2 group-hover:scale-110 transition-transform duration-300">
                                    <ArrowUpRight size={20} />
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 relative w-full h-[40vh] md:h-auto md:max-h-[60vh] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent pointer-events-none"></div>
                    </div>
                </div>
            </div>
        </div>
    );
});
ProjectCard.displayName = 'ProjectCard';

export default function SelectedWorks() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = containerRef.current?.querySelectorAll('.project-card');
        if (!cards) return;

        cards.forEach((card, index) => {
            if (index === projects.length - 1) return;

            gsap.to(card, {
                scale: 0.9,
                opacity: 0.5,
                scrollTrigger: {
                    trigger: card,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                }
            });
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative w-full bg-black text-white pt-20 pb-10">
            <div className="container mx-auto px-4 mb-20">
                <h2 className="text-5xl md:text-[8rem] font-bold leading-none tracking-tighter mb-4">
                    SELECTED <br />
                    <span className="text-gray-500">WORKS</span>
                </h2>
                <div className="h-[1px] w-full bg-white/20 mt-8"></div>
                <div className="flex justify-between text-sm uppercase tracking-widest mt-4 text-gray-400">
                    <span>(Projects)</span>
                    <span>2023 — 2025</span>
                </div>
            </div>

            <div className="w-full flex flex-col items-center">
                {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} index={index} />
                ))}
            </div>
        </section>
    );
}
