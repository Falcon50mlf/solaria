'use client';
import dynamic from 'next/dynamic';
const FakedappContent = dynamic(() => import('./FakedappContent'), { ssr: false });
export default function FakedappPage() { return <FakedappContent />; }
