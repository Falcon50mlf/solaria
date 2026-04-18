'use client';
import dynamic from 'next/dynamic';
const SocialengContent = dynamic(() => import('./SocialengContent'), { ssr: false });
export default function SocialengPage() { return <SocialengContent />; }
