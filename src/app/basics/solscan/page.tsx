'use client';
import dynamic from 'next/dynamic';
const SolscanContent = dynamic(() => import('./SolscanContent'), { ssr: false });
export default function SolscanPage() { return <SolscanContent />; }
