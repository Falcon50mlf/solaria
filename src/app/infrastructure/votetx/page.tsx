'use client';
import dynamic from 'next/dynamic';
const VoteTxContent = dynamic(() => import('./VoteTxContent'), { ssr: false });
export default function VoteTxPage() { return <VoteTxContent />; }
