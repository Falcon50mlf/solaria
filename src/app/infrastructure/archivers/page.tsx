'use client';
import dynamic from 'next/dynamic';
const ArchiversContent = dynamic(() => import('./ArchiversContent'), { ssr: false });
export default function ArchiversPage() { return <ArchiversContent />; }
