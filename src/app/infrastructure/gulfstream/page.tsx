'use client';
import dynamic from 'next/dynamic';
const GulfstreamContent = dynamic(() => import('./GulfstreamContent'), { ssr: false });
export default function GulfstreamPage() { return <GulfstreamContent />; }
