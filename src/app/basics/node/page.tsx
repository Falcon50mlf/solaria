'use client';
import dynamic from 'next/dynamic';
const NodeContent = dynamic(() => import('./NodeContent'), { ssr: false });
export default function NodePage() { return <NodeContent />; }
