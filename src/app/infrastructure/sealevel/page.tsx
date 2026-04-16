'use client';
import dynamic from 'next/dynamic';
const SealevelContent = dynamic(() => import('./SealevelContent'), { ssr: false });
export default function SealevelPage() { return <SealevelContent />; }
