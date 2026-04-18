'use client';
import dynamic from 'next/dynamic';
const AmmContent = dynamic(() => import('./AmmContent'), { ssr: false });
export default function AmmPage() { return <AmmContent />; }
