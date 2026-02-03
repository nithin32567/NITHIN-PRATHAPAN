import React from 'react';
import ScrollReveal from '../ScrollReveal';

const About = () => {
    return (
        <div>
            <div className="max-w-7xl px-4">
                <h2 className="text-5xl md:text-[8rem] font-bold leading-none tracking-tighter mb-4 text-white">
                    ABOUT <br />
                    <span className="text-gray-500">ME</span>
                </h2>
                {/* <div className="h-px w-full bg-white/20 mt-8"></div> */}
                <div className="flex justify-between text-xs md:text-sm uppercase tracking-widest mt-4 text-gray-400">
                    {/* <span>(Expertise)</span> */}
                    <span></span>
                </div>
            </div>
            <section className="w-full  bg-black text-white flex justify-center">

                <div className="max-w-7xl px-4">
                    <ScrollReveal
                        baseOpacity={0.1}
                        enableBlur={true}
                        baseRotation={3}
                        blurStrength={4}
                        textClassName="text-white/90 shiny-text leading-relaxed bg-clip-text text-transparent bg-gradient-to-br from-white via-neutral-200 to-neutral-400"
                    >
                        I’m a full-stack developer passionate about building scalable, user-friendly web applications. I work across the stack using React, Next.js, Angular, Node.js, and TypeScript to create clean interfaces and reliable APIs. I focus on writing maintainable code, designing responsive UIs with modern styling tools, and delivering smooth user experiences. On the backend, I build secure RESTful services and work with both SQL and NoSQL databases. I’m comfortable with modern tooling, deployment workflows, and collaborative Agile environments. I enjoy continuous learning and turning ideas into well-engineered, production-ready products.
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
};

export default About;
