'use client';
import dynamic from 'next/dynamic';
const DyorContent = dynamic(() => import('./DyorContent'), { ssr: false });
export default function DyorPage() { return <DyorContent />; }
