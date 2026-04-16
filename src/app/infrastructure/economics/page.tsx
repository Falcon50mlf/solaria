'use client';
import dynamic from 'next/dynamic';
const EconomicsContent = dynamic(() => import('./EconomicsContent'), { ssr: false });
export default function EconomicsPage() { return <EconomicsContent />; }
