'use client';
import dynamic from 'next/dynamic';
const JitoContent = dynamic(() => import('./JitoContent'), { ssr: false });
export default function JitoPage() { return <JitoContent />; }
