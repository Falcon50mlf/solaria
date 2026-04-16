'use client';
import dynamic from 'next/dynamic';
const TowerContent = dynamic(() => import('./TowerContent'), { ssr: false });
export default function TowerPage() { return <TowerContent />; }
