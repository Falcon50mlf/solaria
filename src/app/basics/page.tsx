'use client';

import dynamic from 'next/dynamic';

const BasicsContent = dynamic(() => import('./BasicsContent'), { ssr: false });

export default function BasicsPage() {
  return <BasicsContent />;
}
