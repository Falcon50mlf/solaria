'use client';
import dynamic from 'next/dynamic';
const ReentrancyContent = dynamic(() => import('./ReentrancyContent'), { ssr: false });
export default function ReentrancyPage() { return <ReentrancyContent />; }
