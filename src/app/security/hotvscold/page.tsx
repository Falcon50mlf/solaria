'use client';
import dynamic from 'next/dynamic';
const HotvscoldContent = dynamic(() => import('./HotvscoldContent'), { ssr: false });
export default function HotvscoldPage() { return <HotvscoldContent />; }
