/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useRef, useState, useMemo, type RefObject } from 'react';
import { Canvas, extend, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, type RapierRigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

// ASSET IMPORTS
import lanyardTexture from '../assets/lanyard/lanyard.png';

extend({ MeshLineGeometry, MeshLineMaterial });

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            meshLineGeometry: {
                points?: THREE.Vector3[] | Float32Array | number[];
                ref?: RefObject<any>;
            };
            meshLineMaterial: {
                transparent?: boolean;
                opacity?: number;
                color?: string | THREE.Color;
                depthTest?: boolean;
                resolution?: [number, number];
                useMap?: boolean;
                map?: THREE.Texture;
                repeat?: [number, number];
                lineWidth?: number;
                ref?: RefObject<any>;
            };
        }
    }
}

interface LanyardProps {
    position?: [number, number, number];
    gravity?: [number, number, number];
    fov?: number;
    transparent?: boolean;
}

export default function Lanyard({
    position = [0, 0, 20],
    gravity = [0, -40, 0],
    fov = 25,
    transparent = true
}: LanyardProps) {
    const [, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="absolute inset-0 z-10 w-full h-[600px] pointer-events-none">
            <Canvas
                className="pointer-events-auto"
                shadows
                camera={{ position: [position[0], position[1], position[2]], fov: fov }}
                gl={{ alpha: transparent, antialias: true }}
                onCreated={({ gl }) => {
                    gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1);
                }}
            >
                <ambientLight intensity={1.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
                <Physics gravity={[gravity[0], gravity[1], gravity[2]]} timeStep={1 / 60}>
                    <Band />
                </Physics>
                <Environment blur={0.75}>
                    <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
                    <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
                    <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
                </Environment>
            </Canvas>
        </div>
    );
}

interface BandProps {
    maxSpeed?: number;
    minSpeed?: number;
}

function Band({ maxSpeed = 50, minSpeed = 0 }: BandProps) {
    const band = useRef<THREE.Mesh<any, any>>(null);
    const fixed = useRef<RapierRigidBody>(null!);
    const j1 = useRef<RapierRigidBody>(null!);
    const j2 = useRef<RapierRigidBody>(null!);
    const j3 = useRef<RapierRigidBody>(null!);
    const card = useRef<RapierRigidBody>(null!);

    const vec = useMemo(() => new THREE.Vector3(), []);
    const ang = useMemo(() => new THREE.Vector3(), []);
    const rot = useMemo(() => new THREE.Euler(), []);

    // Store lerped values outside the rigid body objects
    const lerped1 = useMemo(() => new THREE.Vector3(), []);
    const lerped2 = useMemo(() => new THREE.Vector3(), []);

    const { width, height } = useThree((state) => state.size);

    const segmentProps = { type: 'dynamic' as const, canSleep: true, colliders: false as const, angularDamping: 4, linearDamping: 4 };

    const texture = useTexture(
        typeof lanyardTexture === 'string' ? lanyardTexture : (lanyardTexture as { src: string }).src,
        (t) => {
            if (t instanceof THREE.Texture) {
                t.wrapS = t.wrapT = THREE.RepeatWrapping;
            }
        }
    );

    const curve = useMemo(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()], false, 'chordal'), []);
    const [dragged, drag] = useState<THREE.Vector3 | false>(false);
    const [hovered, hover] = useState(false);

    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
    useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

    useEffect(() => {
        if (hovered) {
            document.body.style.cursor = dragged ? 'grabbing' : 'grab';
            return () => void (document.body.style.cursor = 'auto');
        }
    }, [hovered, dragged]);

    useFrame((state, delta) => {
        if (dragged && card.current) {
            vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
            const dir = new THREE.Vector3().copy(vec).sub(state.camera.position).normalize();
            vec.add(dir.multiplyScalar(state.camera.position.length()));
            [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
            card.current.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
        }

        if (fixed.current && j1.current && j2.current && j3.current && card.current) {
            const t1 = j1.current.translation();
            const t2 = j2.current.translation();

            const dist1 = Math.max(0.1, Math.min(1, lerped1.distanceTo(t1)));
            lerped1.lerp(t1, delta * (minSpeed + dist1 * (maxSpeed - minSpeed)));

            const dist2 = Math.max(0.1, Math.min(1, lerped2.distanceTo(t2)));
            lerped2.lerp(t2, delta * (minSpeed + dist2 * (maxSpeed - minSpeed)));

            curve.points[0].copy(j3.current.translation());
            curve.points[1].copy(lerped2);
            curve.points[2].copy(lerped1);
            curve.points[3].copy(fixed.current.translation());

            if (band.current) {
                band.current.geometry.setPoints(curve.getPoints(32));
            }

            const currentAngvel = card.current.angvel();
            const currentRot = card.current.rotation();
            const quat = new THREE.Quaternion(currentRot.x, currentRot.y, currentRot.z, currentRot.w);
            rot.setFromQuaternion(quat);
            ang.copy(currentAngvel);
            card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true);
        }
    });

    const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
        drag(false);
    };

    const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        if (card.current) {
            const trans = card.current.translation();
            drag(new THREE.Vector3().copy(e.point).sub(vec.copy(trans)));
        }
    };

    return (
        <>
            <group position={[0, 4, 0]}>
                <RigidBody ref={fixed} {...segmentProps} type="fixed" />
                <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
                <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
                <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
                <RigidBody
                    position={[2, 0, 0]}
                    ref={card}
                    {...segmentProps}
                    type={dragged ? 'kinematicPosition' : 'dynamic'}
                >
                    <CuboidCollider args={[0.8, 1.125, 0.01]} />
                    <group
                        scale={1.5}
                        position={[0, -1.2, -0.05]}
                        onPointerOver={() => hover(true)}
                        onPointerOut={() => hover(false)}
                        onPointerUp={handlePointerUp}
                        onPointerDown={handlePointerDown}
                    >
                        {/* Card Front */}
                        <mesh receiveShadow castShadow>
                            <boxGeometry args={[1, 1.4, 0.02]} />
                            <meshPhysicalMaterial
                                color="#ffffff"
                                metalness={0.15}
                                roughness={0.4}
                                clearcoat={1}
                                clearcoatRoughness={0.1}
                            />
                        </mesh>
                        {/* Magnetic Strip/Clip Detail */}
                        <mesh position={[0, 0.7, 0.01]}>
                            <boxGeometry args={[0.2, 0.05, 0.02]} />
                            <meshStandardMaterial color="#111" roughness={0.05} metalness={1} />
                        </mesh>
                    </group>
                </RigidBody>
            </group>
            <mesh ref={band}>
                {/* @ts-ignore */}
                <meshLineGeometry />
                {/* @ts-ignore */}
                <meshLineMaterial
                    transparent
                    opacity={1}
                    color="white"
                    depthTest={false}
                    resolution={[width, height]}
                    useMap
                    map={texture}
                    repeat={[-1, 1]}
                    lineWidth={0.1}
                />
            </mesh>
        </>
    );
}
