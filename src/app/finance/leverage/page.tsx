'use client';
import dynamic from 'next/dynamic';
const LeverageContent = dynamic(() => import('./LeverageContent'), { ssr: false });
export default function LeveragePage() { return <LeverageContent />; }
