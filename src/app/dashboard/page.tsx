'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import { Dashboard } from '@/components/Dashboard';
import { Level } from '@/types';

export default function DashboardPage() {
  const router = useRouter();
  const { user, goal, loading } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user || !goal) {
    // Provide default values for demo/first-time users
    const defaultUser = user || {
      name: '',
      age: 0,
      totalSaved: 0,
      totalXP: 0,
      currentLevel: 1,
      streakDays: 0,
    };
    const defaultGoal = goal || {
      id: 'default',
      name: 'My Goal',
      targetAmount: 100,
      currentAmount: 0,
      category: 'custom' as const,
    };

    return (
      <Dashboard
        user={defaultUser}
        goal={defaultGoal}
        onDeposit={() => router.push('/dashboard/deposit')}
        onLevelClick={(level: Level) => router.push(`/dashboard/lesson/${level.lessonId}`)}
        onStreaksClick={() => router.push('/dashboard/streaks')}
        onRewardsClick={() => router.push('/dashboard/rewards')}
      />
    );
  }

  return (
    <Dashboard
      user={user}
      goal={goal}
      onDeposit={() => router.push('/dashboard/deposit')}
      onLevelClick={(level: Level) => router.push(`/dashboard/lesson/${level.lessonId}`)}
      onStreaksClick={() => router.push('/dashboard/streaks')}
      onRewardsClick={() => router.push('/dashboard/rewards')}
    />
  );
}
