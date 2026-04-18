'use client';
import dynamic from 'next/dynamic';
const FlashloanContent = dynamic(() => import('./FlashloanContent'), { ssr: false });
export default function FlashloanPage() { return <FlashloanContent />; }
