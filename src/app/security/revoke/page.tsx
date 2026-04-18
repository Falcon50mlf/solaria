'use client';
import dynamic from 'next/dynamic';
const RevokeContent = dynamic(() => import('./RevokeContent'), { ssr: false });
export default function RevokePage() { return <RevokeContent />; }
