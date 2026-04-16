'use client';
import dynamic from 'next/dynamic';
const TpsContent = dynamic(() => import('./TpsContent'), { ssr: false });
export default function TpsPage() { return <TpsContent />; }
