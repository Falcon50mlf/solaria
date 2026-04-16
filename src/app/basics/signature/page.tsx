'use client';
import dynamic from 'next/dynamic';
const SignatureContent = dynamic(() => import('./SignatureContent'), { ssr: false });
export default function SignaturePage() { return <SignatureContent />; }
