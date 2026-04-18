'use client';
import dynamic from 'next/dynamic';
const DefiContent = dynamic(() => import('./DefiContent'), { ssr: false });
export default function DefiPage() { return <DefiContent />; }
