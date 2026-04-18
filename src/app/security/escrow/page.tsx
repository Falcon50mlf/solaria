'use client';
import dynamic from 'next/dynamic';
const EscrowContent = dynamic(() => import('./EscrowContent'), { ssr: false });
export default function EscrowPage() { return <EscrowContent />; }
