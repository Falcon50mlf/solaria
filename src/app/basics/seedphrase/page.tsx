'use client';

import dynamic from 'next/dynamic';

const SeedPhraseContent = dynamic(() => import('./SeedPhraseContent'), { ssr: false });

export default function SeedPhrasePage() {
  return <SeedPhraseContent />;
}
