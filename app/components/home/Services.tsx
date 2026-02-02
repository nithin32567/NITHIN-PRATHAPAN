'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Code2,
    Server,
    Database,
    Cloud
} from 'lucide-react';
import StarBorder from '../StarBorder';

const services = [
    {
        id: 1,
        title: "Full-Stack Web Development",
        description: "I build high-performance, SEO-friendly web applications using the latest JavaScript frameworks. Whether it's a dynamic React.js SPA or a server-side rendered Next.js site, I focus on scalability and speed.",
        icon: Code2,
        details: [
            { label: "Frontend", value: "React.js, Next.js, Angular, Redux, TypeScript" },
            { label: "Styling", value: "Modern, responsive layouts with Tailwind CSS" },
            { label: "Optimization", value: "Core Web Vitals and SEO best practices" }
        ]
    },
    {
        id: 2,
        title: "Robust Backend & API Architecture",
        description: "I design and implement secure server-side logic and database structures. From simple CRUD operations to complex RESTful APIs, I ensure your data is handled safely and efficiently.",
        icon: Server,
        details: [
            { label: "Runtime", value: "Node.js & Express.js" },
            { label: "API Excellence", value: "REST & API Development validated with Postman" },
            { label: "Security", value: "Authentication and authorization using JWT" }
        ]
    },
    {
        id: 3,
        title: "Database Design & Management",
        description: "I work with both SQL and NoSQL environments to ensure your application's data is structured for performance and reliability.",
        icon: Database,
        details: [
            { label: "NoSQL", value: "MongoDB & Redis for high-speed, flexible data" },
            { label: "SQL", value: "PostgreSQL & MySQL for structured, relational data integrity" }
        ]
    },
    {
        id: 4,
        title: "DevOps & Cloud Deployment",
        description: "I don’t just write code; I ensure it’s delivered. I use industry-standard tools to automate workflows and maintain high availability in production environments.",
        icon: Cloud,
        details: [
            { label: "Containerization", value: "Packaging apps with Docker for consistency" },
            { label: "CI/CD", value: "Automated pipelines for seamless updates" },
            { label: "Infrastructure", value: "Nginx, Linux/Ubuntu, and deployment via Vercel or Netlify" },
            { label: "Version Control", value: "Git, GitHub, and Bitbucket" }
        ]
    }
];

export default function Services() {
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
        <section ref={containerRef} className="relative w-full min-h-screen bg-black text-white py-24 z-20 border-t border-white/10">

            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-blue-600/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] bg-purple-600/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="mb-20">
                    <h2 ref={titleRef} className="text-6xl md:text-[8rem] font-bold leading-none tracking-tighter mb-4 opacity-0">
                        MY <br />
                        <span className="text-gray-500">SERVICES</span>
                    </h2>
                    <div className="h-px w-full bg-white/20 mt-8"></div>
                    <div className="flex justify-between text-sm uppercase tracking-widest mt-4 text-gray-400">
                        <span>(What I Offer)</span>
                        <span>Solutions — Deliverables</span>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <StarBorder
                            key={service.id}
                            ref={(el: HTMLElement | null) => { if (el) cardsRef.current[index] = el as HTMLDivElement; }}
                            as="div"
                            className="w-full h-full"
                            color="#00ffff"
                            speed="6s"
                            thickness={1}
                        >
                            <div className="text-left w-full h-full">
                                <div className="mb-6 flex items-center justify-center sm:justify-start">
                                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-all duration-300">
                                        <service.icon className="w-8 h-8 text-gray-300 group-hover:text-white transition-colors" />
                                    </div>
                                </div>

                                <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                                    {service.title}
                                </h3>

                                <p className="text-gray-400 mb-8 leading-relaxed">
                                    {service.description}
                                </p>

                                <div className="space-y-4">
                                    {service.details.map((detail, idx) => (
                                        <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline border-b border-white/5 pb-2 last:border-0 last:pb-0">
                                            <span className="text-blue-400 text-sm font-mono uppercase tracking-wider min-w-[120px] mb-1 sm:mb-0">
                                                {detail.label}
                                            </span>
                                            <span className="text-gray-400 text-sm">
                                                {detail.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </StarBorder>
                    ))}
                </div>
            </div>
        </section>
    );
}
