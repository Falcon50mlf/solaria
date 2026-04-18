'use client';
import dynamic from 'next/dynamic';
const YieldfarmingContent = dynamic(() => import('./YieldfarmingContent'), { ssr: false });
export default function YieldfarmingPage() { return <YieldfarmingContent />; }
