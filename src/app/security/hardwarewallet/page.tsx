'use client';
import dynamic from 'next/dynamic';
const HardwarewalletContent = dynamic(() => import('./HardwarewalletContent'), { ssr: false });
export default function HardwarewalletPage() { return <HardwarewalletContent />; }
