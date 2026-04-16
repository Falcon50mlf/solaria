'use client';
import dynamic from 'next/dynamic';
const CongestionContent = dynamic(() => import('./CongestionContent'), { ssr: false });
export default function CongestionPage() { return <CongestionContent />; }
