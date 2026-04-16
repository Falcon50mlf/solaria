'use client';
import dynamic from 'next/dynamic';
const NetworksContent = dynamic(() => import('./NetworksContent'), { ssr: false });
export default function NetworksPage() { return <NetworksContent />; }
