'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar } from 'lucide-react';
import Lanyard from './Lanyard';
import StarBorder from './StarBorder';

const experienceData = [
    {
        id: 1,
        year: '2025-2026',
        title: 'MERN Stack Developer',
        company: 'Novavi Pvt. Ltd',
        description: 'Spearheaded full-stack development using MongoDB, Express, React, and Node.js. Delivered scalable solutions for enterprise clients.',
        icon: Briefcase,
        worktype: 'Full-time - onsite',
        location: "Kochi, Kerala"
    },
    {
        id: 2,
        year: '2024-2025',
        title: 'MERN Stack Intern',
        company: 'Softroniics',
        description: 'Assisted in developing RESTful APIs and responsive frontend interfaces. Collaborated with senior developers to optimize database queries.',
        icon: Calendar,
        worktype: 'Intern - Full-time - onsite',
        location: "Calicut, Kerala"
    }
];

const Experience = () => {
    const containerRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (titleRef.current) {
            gsap.fromTo(titleRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 70%",
                    }
                }
            );
        }

        cardsRef.current.forEach((card, index) => {
            if (card) {
                gsap.fromTo(card,
                    { opacity: 0, y: 100 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        delay: index * 0.1,
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                        }
                    }
                );
            }
        });
    }, []);

    return (
        <section id="experience" ref={containerRef} className="relative w-full min-h-screen bg-gray-950 text-white py-24 overflow-hidden z-20 border-t border-white/10">

            {/* Background Gradients from Services.tsx style */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-blue-600/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] bg-purple-600/10 rounded-full blur-[100px]"></div>
            </div>



            {/* 2. Experience Details Section */}
            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header matching Services.tsx */}
                <div className="mb-20">
                    <h2 ref={titleRef} className="text-6xl md:text-[8rem] font-bold leading-none tracking-tighter mb-4 opacity-0">
                        MY <br />
                        <span className="text-gray-500">EXPERIENCE</span>
                    </h2>
                    <div className="h-px w-full bg-white/20 mt-8"></div>
                    <div className="flex justify-between text-sm uppercase tracking-widest mt-4 text-gray-400">
                        <span>(Professional Journey)</span>
                        <span>Roles — Achievements</span>
                    </div>
                </div>

                {/* Experience Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {experienceData.map((exp, index) => (
                        <StarBorder
                            key={exp.id}
                            ref={(el: HTMLElement | null) => { if (el) cardsRef.current[index] = el as HTMLDivElement; }}
                            as="div"
                            className="w-full h-full"
                            color="magenta"
                            speed="4s"
                            thickness={1}
                        >
                            <div className="text-left w-full h-full">
                                <div className="mb-6 flex items-center justify-center sm:justify-start">
                                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-all duration-300">
                                        <exp.icon className="w-8 h-8 text-gray-300 group-hover:text-white transition-colors" />
                                    </div>
                                </div>

                                <h3 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                                    {exp.title}
                                </h3>
                                <p className="text-blue-400 font-mono text-sm uppercase tracking-wider mb-4">
                                    {exp.company}
                                </p>

                                <p className="text-gray-400 mb-8 leading-relaxed">
                                    {exp.description}
                                </p>

                                <div className="space-y-4">
                                    <div className="flex flex-col sm:flex-row sm:items-baseline border-b border-white/5 pb-2 last:border-0 last:pb-0">
                                        <span className="text-blue-400 text-sm font-mono uppercase tracking-wider min-w-[120px] mb-1 sm:mb-0">
                                            Period
                                        </span>
                                        <span className="text-gray-400 text-sm">
                                            {exp.year}
                                        </span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-baseline border-b border-white/5 pb-2 last:border-0 last:pb-0">
                                        <span className="text-blue-400 mr-2 text-sm font-mono uppercase tracking-wider min-w-[120px] mb-1 sm:mb-0">
                                            {exp.location } 
                                        </span>
                                        <span className="text-gray-400 text-sm">
                                            {exp.worktype}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </StarBorder>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
