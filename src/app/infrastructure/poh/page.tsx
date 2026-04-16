'use client';
import dynamic from 'next/dynamic';
const PohContent = dynamic(() => import('./PohContent'), { ssr: false });
export default function PohPage() { return <PohContent />; }
