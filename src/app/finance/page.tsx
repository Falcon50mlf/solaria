'use client';
import dynamic from 'next/dynamic';
const FinanceContent = dynamic(() => import('./FinanceContent'), { ssr: false });
export default function FinancePage() { return <FinanceContent />; }
