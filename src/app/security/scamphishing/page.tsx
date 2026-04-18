'use client';
import dynamic from 'next/dynamic';
const ScamphishingContent = dynamic(() => import('./ScamphishingContent'), { ssr: false });
export default function ScamphishingPage() { return <ScamphishingContent />; }
