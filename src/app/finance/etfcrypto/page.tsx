'use client';
import dynamic from 'next/dynamic';
const EtfcryptoContent = dynamic(() => import('./EtfcryptoContent'), { ssr: false });
export default function EtfcryptoPage() { return <EtfcryptoContent />; }
