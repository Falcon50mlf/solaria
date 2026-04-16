'use client';
import dynamic from 'next/dynamic';
const SlotContent = dynamic(() => import('./SlotContent'), { ssr: false });
export default function SlotPage() { return <SlotContent />; }
