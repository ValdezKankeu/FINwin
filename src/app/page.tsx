'use client';

import { useRouter } from 'next/navigation';
import { Welcome } from '@/components/Welcome';

export default function HomePage() {
  const router = useRouter();

  return <Welcome onGetStarted={() => router.push('/onboarding/name')} />;
}
