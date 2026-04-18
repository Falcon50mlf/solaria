'use client';
import dynamic from 'next/dynamic';
const PerpContent = dynamic(() => import('./PerpContent'), { ssr: false });
export default function PerpPage() { return <PerpContent />; }
