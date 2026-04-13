'use client';

import dynamic from 'next/dynamic';

const BlockchainContent = dynamic(() => import('./BlockchainContent'), { ssr: false });

export default function BlockchainPage() {
  return <BlockchainContent />;
}
