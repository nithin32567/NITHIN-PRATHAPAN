/// <reference types="next" />
/// <reference types="next/image-types/global" />

import { BufferGeometry, ShaderMaterial, Vector2, Color, Texture, Vector3 } from 'three'
import { Object3DNode } from '@react-three/fiber'

declare module '*.glb' {
    const content: string;
    export default content;
}

declare module '*.gltf' {
    const content: string;
    export default content;
}

declare module '*.png';

declare module 'meshline' {
    export class MeshLineGeometry extends BufferGeometry {
        setPoints(points: ArrayLike<number> | Vector3[]): void
    }
    export class MeshLineMaterial extends ShaderMaterial {
        transparent: boolean
        opacity: number
        color: string | Color
        depthTest: boolean
        resolution: Vector2
        useMap: boolean
        map: Texture
        repeat: Vector2
        lineWidth: number
    }
}

declare module '@react-three/fiber' {
    interface ThreeElements {
        meshLineGeometry: Object3DNode<import('meshline').MeshLineGeometry, typeof import('meshline').MeshLineGeometry>
        meshLineMaterial: Object3DNode<import('meshline').MeshLineMaterial, typeof import('meshline').MeshLineMaterial>
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            meshLineGeometry: Object3DNode<import('meshline').MeshLineGeometry, typeof import('meshline').MeshLineGeometry>
            meshLineMaterial: Object3DNode<import('meshline').MeshLineMaterial, typeof import('meshline').MeshLineMaterial>
        }
    }
}
