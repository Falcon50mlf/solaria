'use client';
import dynamic from 'next/dynamic';
const SlippageContent = dynamic(() => import('./SlippageContent'), { ssr: false });
export default function SlippagePage() { return <SlippageContent />; }
