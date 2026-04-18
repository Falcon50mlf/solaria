'use client';
import dynamic from 'next/dynamic';
const IndextokensContent = dynamic(() => import('./IndextokensContent'), { ssr: false });
export default function IndextokensPage() { return <IndextokensContent />; }
