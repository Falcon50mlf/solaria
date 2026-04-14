'use client';
import dynamic from 'next/dynamic';
const ConsensusContent = dynamic(() => import('./ConsensusContent'), { ssr: false });
export default function ConsensusPage() { return <ConsensusContent />; }
