'use client';
import dynamic from 'next/dynamic';
const LiquidationContent = dynamic(() => import('./LiquidationContent'), { ssr: false });
export default function LiquidationPage() { return <LiquidationContent />; }
