import React from 'react';
import ScrollReveal from '../ScrollReveal';
import DotGrid from '../react-bits/DotGrid';

const About = () => {
    return (
        <section className="relative w-full bg-black text-white py-12 md:py-24 overflow-hidden">

            {/* Background Layer: DotGrid */}
            <div className="absolute inset-0 z-0 h-full w-full">
                <DotGrid
                    dotSize={2}
                    gap={10}
                    baseColor="#000000"
                    activeColor="#ffe53d"
                    proximity={150}
                    speedTrigger={100}
                    shockRadius={200}
                    shockStrength={1000}
                    maxSpeed={100}
                    resistance={800}
                    returnDuration={1}
                />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 max-w-7xl mx-auto px-4">
                <h2 className="text-5xl md:text-[8rem] font-bold leading-none tracking-tighter mb-4 text-white">
                    ABOUT <br />
                    <span className="text-gray-500">ME</span>
                </h2>

                <div className="flex justify-between text-xs md:text-sm uppercase tracking-widest mt-4 text-gray-400">
                    <span></span>
                </div>

                <div className="mt-12 md:mt-20">
                    <ScrollReveal
                        baseOpacity={0.1}
                        enableBlur={true}
                        baseRotation={24}
                        blurStrength={4}
                        textClassName="leading-relaxed"
                    >
                        I’m a full-stack developer passionate about building scalable, user-friendly web applications. I work across the stack using React, Next.js, Angular, Node.js, and TypeScript to create clean interfaces and reliable APIs. I focus on writing maintainable code, designing responsive UIs with modern styling tools, and delivering smooth user experiences. On the backend, I build secure RESTful services and work with both SQL and NoSQL databases. I’m comfortable with modern tooling, deployment workflows, and collaborative Agile environments. I enjoy continuous learning and turning ideas into well-engineered, production-ready products.
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

export default About;
