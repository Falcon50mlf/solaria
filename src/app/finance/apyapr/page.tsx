'use client';
import dynamic from 'next/dynamic';
const ApyaprContent = dynamic(() => import('./ApyaprContent'), { ssr: false });
export default function ApyaprPage() { return <ApyaprContent />; }
