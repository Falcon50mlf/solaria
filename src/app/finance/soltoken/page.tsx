'use client';
import dynamic from 'next/dynamic';
const SoltokenContent = dynamic(() => import('./SoltokenContent'), { ssr: false });
export default function SoltokenPage() { return <SoltokenContent />; }
