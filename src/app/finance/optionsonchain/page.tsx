'use client';
import dynamic from 'next/dynamic';
const OptionsonchainContent = dynamic(() => import('./OptionsonchainContent'), { ssr: false });
export default function OptionsonchainPage() { return <OptionsonchainContent />; }
