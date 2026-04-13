'use client';

import dynamic from 'next/dynamic';

const DecentralisationContent = dynamic(() => import('./DecentralisationContent'), { ssr: false });

export default function DecentralisationPage() {
  return <DecentralisationContent />;
}
