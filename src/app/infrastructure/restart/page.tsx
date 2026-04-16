'use client';
import dynamic from 'next/dynamic';
const RestartContent = dynamic(() => import('./RestartContent'), { ssr: false });
export default function RestartPage() { return <RestartContent />; }
