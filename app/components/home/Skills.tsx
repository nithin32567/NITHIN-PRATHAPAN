'use client';

import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
    Float,
    Html,
    PerspectiveCamera,
    ContactShadows
} from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Server, Workflow, Rocket, Shield, Database, Repeat, Globe, Kanban, Users } from 'lucide-react';
import DotGrid from '../react-bits/DotGrid';

import java from '@/public/java.png'
import vscode from "@/public/vscode.png"

const skills = [
    { name: 'React.js', color: '#61dafb', icon: 'react' },
    { name: 'Next.js', color: '#ffffff', icon: 'nextdotjs' },
    { name: 'Node.js', color: '#68a063', icon: 'nodedotjs' },
    { name: 'Express.js', color: '#ffffff', icon: 'express' },
    { name: 'Angular', color: '#dd0031', icon: 'angular' },
    { name: 'JavaScript', color: '#f7df1e', icon: 'javascript' },
    { name: 'HTML', color: '#E34F26', icon: 'html5' },
    { name: 'CSS', color: '#1572B6', icon: 'CSS' },
    { name: 'Tailwind', color: '#06B6D4', icon: 'tailwindcss' },
    { name: 'Python', color: '#3776ab', icon: 'python' },
    { name: 'C', color: '#00599c', icon: 'c' },
    { name: 'C++', color: '#00599c', icon: 'cplusplus' },

    { name: 'Docker', color: '#2496ed', icon: 'docker' },

    { name: 'Linux', color: '#FCC624', icon: 'linux' },
    { name: 'Ubuntu', color: '#E95420', icon: 'ubuntu' },
    { name: "VS CODE", color: "#00C7B7", icon: vscode },
    { name: "AGILE", color: "#00C7B7", icon: Kanban },
    { name: "SCRUM", color: "#00C7B7", icon: Users },
    { name: "SHADCN", color: "#00C7B7", icon: "shadcnui" },
    { name: 'Material UI', color: '#00C7B7', icon: 'mui' },
    { name: 'GOLANG', color: '#00C7B7', icon: 'go' },
    // { name: 'AWS', color: '#FF9900', icon: 'aws' },
    { name: 'GSAP', color: '#00C7B7', icon: 'gsap' },
    { name: 'Framer Motion', color: '#00C7B7', icon: 'framer' },
    { name: 'Bootstrap', color: '#00C7B7', icon: 'bootstrap' },
    { name: 'JQuery', color: '#00C7B7', icon: 'jquery' },
    { name: 'Vite', color: '#00C7B7', icon: 'vite' },
    { name: 'Webpack', color: '#00C7B7', icon: 'webpack' },
    { name: 'Vercel', color: '#ffffff', icon: 'vercel' },
    { name: 'Netlify', color: '#00C7B7', icon: 'netlify' },
    { name: 'Firebase', color: '#00C7B7', icon: 'firebase' },

    { name: 'Git', color: '#F05032', icon: 'git' },
    { name: 'GitHub', color: '#ffffff', icon: 'github' },
    { name: 'Bitbucket', color: '#0052CC', icon: 'bitbucket' },
    { name: 'CI/CD', color: '#3b82f6', icon: Workflow },
    { name: 'API Dev', color: '#ff6c37', icon: Server },
    { name: 'Postman', color: '#ff6c37', icon: 'postman' },

    // { name: 'ChatGPT', color: '#74AA9C', icon: 'chatgpt' },
    { name: 'Antigravity', color: '#8B5CF6', icon: Rocket },
    { name: 'Redux', color: '#764ABC', icon: 'redux' },

    { name: 'TypeScript', color: '#3178C6', icon: 'typescript' },

    { name: 'Jest', color: '#C21325', icon: 'jest' },
    { name: 'JWT', color: '#D63AFF', icon: Shield },
    { name: 'NPM', color: '#CB3837', icon: 'npm' },
    { name: 'MongoDB', color: '#47A248', icon: 'mongodb' },
    { name: 'SQL', color: '#4479A1', icon: Database },
    { name: 'MySQL', color: '#4479A1', icon: 'mysql' },
    { name: 'PostgreSQL', color: '#4169E1', icon: 'postgresql' },
    { name: 'Redis', color: '#DC382D', icon: 'redis' },
    { name: 'Nginx', color: '#009639', icon: 'nginx' },
    { name: 'Jira', color: '#0052CC', icon: 'jirasoftware' },
    { name: 'SDLC', color: '#FF9900', icon: Repeat },
    { name: 'Java', color: '#007396', icon: java },

    // { name: 'Java', color: '#007396', icon: 'java' },
    { name: 'REST', color: '#61dafb', icon: Globe },
];

// ... (imports remain)

function SkillNode({ name, color, icon, position, index, total, ...props }: { name: string, color: string, icon: string | React.ComponentType<{ size: number; className?: string }> | { src: string }, position: [number, number, number], index: number, total: number }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    React.useEffect(() => {
        // Simple visibility check
        if (meshRef.current) {
            meshRef.current.scale.set(1, 1, 1);
        }
    }, [index, total]);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.2;
            meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.5 + position[1]) * 0.2;
        }
    });

    const isImageIcon = typeof icon === 'object' && icon !== null && 'src' in icon;
    const IconComp = typeof icon === 'function' ? icon : null;
    const iconUrl = typeof icon === 'string'
        ? `https://cdn.simpleicons.org/${icon}/${color.replace('#', '')}`
        : isImageIcon
            ? icon.src
            : null;

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <group position={position} {...props}>
                <mesh
                    ref={meshRef}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                >
                    <sphereGeometry args={[0.6, 32, 32]} />
                    <meshBasicMaterial visible={false} />
                </mesh>

                <Html
                    position={[0, 0, 0]}
                    center
                    distanceFactor={10}
                    style={{ pointerEvents: 'none' }}
                >
                    <div
                        className={`relative flex items-center justify-center w-16 h-16 md:w-24 md:h-24 transition-transform duration-300 ${hovered ? 'scale-125' : 'scale-100'}`}
                        style={{ color: color }}
                    >
                        {iconUrl ? (
                            <img src={iconUrl} alt={name} className="w-full h-full object-contain" />
                        ) : IconComp ? (
                            <IconComp size={96} className="w-12 h-12 md:w-24 md:h-24" />
                        ) : null}

                        <div className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900/80 px-2 py-1 rounded text-white text-[10px] md:text-xs font-mono tracking-widest uppercase transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
                            {name}
                        </div>
                    </div>
                </Html>
            </group>
        </Float>
    );
}

function Rig() {
    const { camera, mouse, size } = useThree();
    const vec = new THREE.Vector3();

    // Adjust camera distance based on screen width
    const isMobile = size.width < 768;
    const distance = isMobile ? 22 : 15;

    return useFrame(() => {
        camera.position.lerp(vec.set(mouse.x * 2, mouse.y * 2, distance), 0.05);
        camera.lookAt(0, 0, 0);
    });
}

function SkillCloud() {
    const radius = 6;
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Slow rotation of the entire cloud
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.09;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Debug Cube - If this shows, R3F is working */}
            <mesh position={[0, 0, 0]} visible={false}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="red" wireframe />
            </mesh>

            {skills.map((skill, i) => {
                const phi = Math.acos(-1 + (2 * i) / skills.length);
                const theta = Math.sqrt(skills.length * Math.PI) * phi;
                const x = radius * Math.cos(theta) * Math.sin(phi);
                const y = radius * Math.sin(theta) * Math.sin(phi);
                const z = radius * Math.cos(phi);

                return (
                    <SkillNode
                        key={i}
                        index={i}
                        total={skills.length}
                        name={skill.name}
                        color={skill.color}
                        icon={skill?.icon === 'java' ? java : skill?.icon === 'visualstudiocode' ? vscode : skill?.icon}
                        position={[x, y, z]}
                    />
                );
            })}
        </group>
    );
}

export default function Skills() {
    const containerRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const [fov, setFov] = useState(50);

    React.useEffect(() => {
        const handleResize = () => {
            setFov(window.innerWidth < 768 ? 65 : 50);
        };

        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    React.useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (titleRef.current) {
            gsap.from(titleRef.current, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 60%", // Trigger earlier
                }
            });
        }
    }, []);

    return (
        <section ref={containerRef} className="relative w-full min-h-screen bg-black overflow-hidden py-12 md:py-24 z-20 border-t border-white/10">
            {/* 1. Background Layer: DotGrid */}
            <div className="absolute inset-0 z-0">
                <DotGrid
                    dotSize={2}
                    gap={10}
                    baseColor="#"
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

            {/* 2. Content Layer: Text */}
            <div className="container mx-auto px-4 relative z-10 pointer-events-none">
                <h2 ref={titleRef} className="text-5xl md:text-[8rem] font-bold leading-none tracking-tighter mb-4 text-white">
                    TECH <br />
                    <span className="text-gray-500">SKILLS</span>
                </h2>
                {/* <div className="h-px w-full bg-white/20 mt-8"></div> */}
                <div className="flex justify-between text-xs md:text-sm uppercase tracking-widest mt-4 text-gray-400">
                    <span>(Expertise)</span>
                    <span>Tools — Technologies</span>
                </div>
            </div>

            {/* 3. Foreground Layer: 3D Canvas */}
            <div className="absolute inset-0 z-20">
                <Canvas shadows gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
                    <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={fov} />
                    {/* <ambientLight intensity={0.5} /> */}
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

                    <Suspense fallback={null}>
                        <SkillCloud />
                        <ContactShadows position={[0, -10, 0]} opacity={0.4} scale={20} blur={2.5} far={10} />
                        {/* Removed Environment to avoid network fetching issues for now */}
                    </Suspense>

                    <Rig />
                </Canvas>
            </div>

            {/* Decorative background gradients */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-[-1]">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]"></div>
            </div>
        </section>
    );
}
