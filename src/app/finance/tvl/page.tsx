'use client';
import dynamic from 'next/dynamic';
const TvlContent = dynamic(() => import('./TvlContent'), { ssr: false });
export default function TvlPage() { return <TvlContent />; }
