'use client';
import dynamic from 'next/dynamic';
const SecurityContent = dynamic(() => import('./SecurityContent'), { ssr: false });
export default function SecurityPage() { return <SecurityContent />; }
