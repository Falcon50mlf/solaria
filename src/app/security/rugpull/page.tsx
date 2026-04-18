'use client';
import dynamic from 'next/dynamic';
const RugpullContent = dynamic(() => import('./RugpullContent'), { ssr: false });
export default function RugpullPage() { return <RugpullContent />; }
