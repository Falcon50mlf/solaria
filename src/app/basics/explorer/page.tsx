'use client';
import dynamic from 'next/dynamic';
const ExplorerContent = dynamic(() => import('./ExplorerContent'), { ssr: false });
export default function ExplorerPage() { return <ExplorerContent />; }
