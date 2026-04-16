'use client';
import dynamic from 'next/dynamic';
const CloudbreakContent = dynamic(() => import('./CloudbreakContent'), { ssr: false });
export default function CloudbreakPage() { return <CloudbreakContent />; }
