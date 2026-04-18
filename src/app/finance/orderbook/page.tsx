'use client';
import dynamic from 'next/dynamic';
const OrderbookContent = dynamic(() => import('./OrderbookContent'), { ssr: false });
export default function OrderbookPage() { return <OrderbookContent />; }
