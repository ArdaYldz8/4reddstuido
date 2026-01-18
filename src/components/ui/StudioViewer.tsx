"use client";

import { Suspense, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { useGLTF, useProgress, Html } from '@react-three/drei';
import * as THREE from 'three';

const Loader = () => {
    const { progress } = useProgress();
    return (
        <Html center>
            <div style={{
                color: '#fff',
                fontSize: '14px',
                fontWeight: '500',
                letterSpacing: '1px',
                textAlign: 'center',
                background: 'rgba(0,0,0,0.6)',
                padding: '12px 24px',
                borderRadius: '30px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)'
            }}>
                LOADING {Math.round(progress)}%
            </div>
        </Html>
    );
};

const CameraController = () => {
    const { camera, mouse } = useThree();
    const vec = new THREE.Vector3();

    // CONFIGURATION
    // ----------------------------------------------------------------
    // FIXED Position - User Approved (X=30)
    const position = new THREE.Vector3(30, 2.0, -10);

    // LookAt Target
    // X=38 maintains the rotation angle relative to the new position
    // Z=-20 is the depth of the studio
    const baseLookAt = new THREE.Vector3(38, 1.6, -20);
    // ----------------------------------------------------------------

    useEffect(() => {
        camera.position.copy(position);
        camera.lookAt(baseLookAt);
    }, [camera]);

    useFrame(() => {
        // SMOOTH MOUSE PARALLAX
        // Adjust the lookAt target slightly based on mouse position
        // This creates a "premium" interactive depth feel

        // High sensitivity to allow looking around the room
        const mouseX = mouse.x * 15; // Horizontal sensitivity (covers wide angle)
        const mouseY = mouse.y * 5;  // Vertical sensitivity

        const targetX = baseLookAt.x + mouseX;
        const targetY = baseLookAt.y + mouseY;

        // Apply rotation
        vec.set(targetX, targetY, baseLookAt.z);
        camera.lookAt(vec);
    });

    return null;
};

interface ModelProps {
    url: string;
}

const Model = ({ url }: ModelProps) => {
    const { scene } = useGLTF(url);

    useEffect(() => {
        if (scene) {
            scene.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    const mesh = child as THREE.Mesh;
                    const name = mesh.name.toLowerCase();

                    // Heuristic to find the floor/parquet
                    // Common names: Floor, Plane, Zemin, Parke
                    // EXCLUDE: mirrors or other props that might utilize 'floor' in name
                    if (name.match(/floor|plane|zemin|parke|ground/) && !name.includes('mirror')) {
                        // console.log('Found floor mesh:', mesh.name); // debug
                        const material = mesh.material as THREE.MeshStandardMaterial;
                        if (material) {
                            // User request: "Increase texture" (it was too white/washed out)
                            // 1. Darken deeper to #888888 (mid-gray) to reveal texture against bright lights
                            //    White (0xffffff) washes out all texture details in high light.
                            material.color.setHex(0x888888);

                            // 2. Adjust contrast/roughness
                            // Increase roughness to make it more matte/concrete-like or matte wood
                            // keeping it from being a mirror
                            material.roughness = 0.8;
                            material.metalness = 0.1;

                            // 3. Reduce environment reflection washing it out
                            material.envMapIntensity = 0.2;

                            material.needsUpdate = true;
                        }
                    }
                }
            });
        }
    }, [scene]);

    return <primitive object={scene} />;
};

interface StudioViewerProps {
    url: string;
    width?: number | string;
    height?: number | string;
}

const StudioViewer = ({
    url,
    width = '100%',
    height = '100%'
}: StudioViewerProps) => {

    return (
        <div style={{
            width,
            height,
            position: 'absolute',
            inset: 0,
            zIndex: 0
        }}>
            <Canvas
                gl={{
                    antialias: true,
                    powerPreference: 'high-performance',
                    failIfMajorPerformanceCaveat: false
                }}
                camera={{ fov: 70, near: 0.1, far: 1000 }}
                onCreated={({ gl }) => {
                    gl.toneMapping = THREE.ACESFilmicToneMapping;
                    gl.outputColorSpace = THREE.SRGBColorSpace;
                }}
            >
                <color attach="background" args={['#0a0a0a']} />

                {/* Camera Controller handles position and parallax */}
                <CameraController />

                {/* Lighting Setup */}
                <ambientLight intensity={2} />
                <directionalLight position={[5, 5, 5]} intensity={4} />
                <directionalLight position={[-5, 2, 5]} intensity={2} />
                <directionalLight position={[0, 4, -5]} intensity={2} />

                <Suspense fallback={<Loader />}>
                    <Model url={url} />
                    {/* Environment removed - causes React 18 setState warning */}
                </Suspense>
            </Canvas>
        </div>
    );
};

export default StudioViewer;
