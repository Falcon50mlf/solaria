'use client';
import dynamic from 'next/dynamic';
const LiquiditypoolContent = dynamic(() => import('./LiquiditypoolContent'), { ssr: false });
export default function LiquiditypoolPage() { return <LiquiditypoolContent />; }
