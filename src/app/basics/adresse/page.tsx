'use client';
import dynamic from 'next/dynamic';
const AdresseContent = dynamic(() => import('./AdresseContent'), { ssr: false });
export default function AdressePage() { return <AdresseContent />; }
