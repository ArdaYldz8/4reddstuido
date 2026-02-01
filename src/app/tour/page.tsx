/**
 * REDD Studio 360° Tour Page
 */

import { MarzipanoViewer } from '@/components/tour';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '360° Sanal Tur | REDD Studio',
    description: 'REDD Studio Beşiktaş\'ın 360° sanal turunu keşfedin. Stüdyo alanlarımızı gezintiye çıkın.',
    openGraph: {
        title: '360° Sanal Tur | REDD Studio',
        description: 'REDD Studio Beşiktaş\'ın 360° sanal turunu keşfedin.',
        images: ['/tour/thumbnails/node1.jpg'],
    },
};

export default function TourPage() {
    return (
        <main className="relative w-screen h-screen bg-neutral-900 overflow-hidden">
            {/* Panorama Viewer */}
            <MarzipanoViewer
                initialNode="node1"
                className="w-full h-full"
            />

            {/* Back to Home Link */}
            <a
                href="/"
                className="absolute top-8 left-8 z-30 flex items-center gap-2 text-white hover:text-[#FF3333] transition-colors"
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                </svg>
                <span className="font-medium">Ana Sayfa</span>
            </a>
        </main>
    );
}
