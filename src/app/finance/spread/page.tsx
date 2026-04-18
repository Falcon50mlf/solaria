'use client';
import dynamic from 'next/dynamic';
const SpreadContent = dynamic(() => import('./SpreadContent'), { ssr: false });
export default function SpreadPage() { return <SpreadContent />; }
