'use client';
import dynamic from 'next/dynamic';
const TurbineContent = dynamic(() => import('./TurbineContent'), { ssr: false });
export default function TurbinePage() { return <TurbineContent />; }
