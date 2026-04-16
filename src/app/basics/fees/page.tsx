'use client';
import dynamic from 'next/dynamic';
const FeesContent = dynamic(() => import('./FeesContent'), { ssr: false });
export default function FeesPage() { return <FeesContent />; }
