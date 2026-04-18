'use client';
import dynamic from 'next/dynamic';
const AuditContent = dynamic(() => import('./AuditContent'), { ssr: false });
export default function AuditPage() { return <AuditContent />; }
