'use client';
import dynamic from 'next/dynamic';
const ApprovetxContent = dynamic(() => import('./ApprovetxContent'), { ssr: false });
export default function ApprovetxPage() { return <ApprovetxContent />; }
