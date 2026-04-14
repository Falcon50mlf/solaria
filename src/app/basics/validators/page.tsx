'use client';
import dynamic from 'next/dynamic';
const ValidatorsContent = dynamic(() => import('./ValidatorsContent'), { ssr: false });
export default function ValidatorsPage() { return <ValidatorsContent />; }
