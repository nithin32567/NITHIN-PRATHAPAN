/// <reference types="next" />
/// <reference types="next/image-types/global" />

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
    export const MeshLineGeometry: any;
    export const MeshLineMaterial: any;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            meshLineGeometry: any;
            meshLineMaterial: any;
        }
    }
}
