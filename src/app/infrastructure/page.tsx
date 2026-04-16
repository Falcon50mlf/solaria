'use client';
import dynamic from 'next/dynamic';
const InfrastructureContent = dynamic(() => import('./InfrastructureContent'), { ssr: false });
export default function InfrastructurePage() { return <InfrastructureContent />; }
