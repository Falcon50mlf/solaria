'use client';

import dynamic from 'next/dynamic';

const WalletContent = dynamic(() => import('./WalletContent'), { ssr: false });

export default function WalletPage() {
  return <WalletContent />;
}
