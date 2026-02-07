'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import { StreaksScreen } from '@/components/StreaksScreen';

export default function StreaksPage() {
  const router = useRouter();
  const { user } = useUser();

  return (
    <StreaksScreen
      currentStreak={user?.streakDays ?? 0}
      longestStreak={user?.streakDays ?? 0}
      onBack={() => router.push('/dashboard')}
    />
  );
}
