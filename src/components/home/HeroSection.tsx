"use client";

import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with Three.js
const StudioViewer = dynamic(() => import("@/components/ui/StudioViewer"), {
    ssr: false,
});

export default function HeroSection() {
    return (
        <section className="relative min-h-screen overflow-hidden bg-[#0a0a0a]">
            {/* 3D Studio Scene */}
            <StudioViewer url="/models/studio-optimized.glb" />

            {/* Simple Logo - Bottom Left Corner */}
            <div
                className="fixed z-50"
                style={{ bottom: '28px', left: '28px' }}
            >
                <h1 style={{ fontSize: '32px', fontWeight: 600, letterSpacing: '0.05em' }}>
                    <span style={{ color: '#ef4444' }}>REDD</span>
                    <span style={{ color: '#ffffff' }}> STUDIO</span>
                </h1>
            </div>
        </section>
    );
}
