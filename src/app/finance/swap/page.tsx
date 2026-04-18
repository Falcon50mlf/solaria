'use client';
import dynamic from 'next/dynamic';
const SwapContent = dynamic(() => import('./SwapContent'), { ssr: false });
export default function SwapPage() { return <SwapContent />; }
