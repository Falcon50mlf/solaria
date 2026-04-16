'use client';
import dynamic from 'next/dynamic';
const ClusterContent = dynamic(() => import('./ClusterContent'), { ssr: false });
export default function ClusterPage() { return <ClusterContent />; }
