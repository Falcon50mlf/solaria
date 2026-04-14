'use client';
import dynamic from 'next/dynamic';
const TransactionsContent = dynamic(() => import('./TransactionsContent'), { ssr: false });
export default function TransactionsPage() { return <TransactionsContent />; }
