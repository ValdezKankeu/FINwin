'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import { RewardsScreen } from '@/components/RewardsScreen';

export default function RewardsPage() {
  const router = useRouter();
  const { user, unlockedRewards } = useUser();

  return (
    <RewardsScreen
      unlockedRewards={unlockedRewards}
      totalXP={user?.totalXP ?? 0}
      currentLevel={user?.currentLevel ?? 1}
      onBack={() => router.push('/dashboard')}
    />
  );
}
