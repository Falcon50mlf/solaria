'use client';
import dynamic from 'next/dynamic';
const CexdexContent = dynamic(() => import('./CexdexContent'), { ssr: false });
export default function CexdexPage() { return <CexdexContent />; }
