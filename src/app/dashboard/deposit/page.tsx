'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import { DepositFlow } from '@/components/DepositFlow';
import { calculateLevel } from '@/lib/calculations';
import { toast } from 'sonner';

export default function DepositPage() {
  const router = useRouter();
  const { user, goal, completedLessons, setUser, setGoal, refreshUser } = useUser();

  const hasCompletedCurrentLesson = completedLessons.includes('needs-vs-wants');

  const handleDeposit = (amount: number) => {
    if (!goal || !user) return;

    const xpMultiplier = hasCompletedCurrentLesson ? 2 : 1;
    const xpEarned = amount * xpMultiplier;

    setGoal({
      ...goal,
      currentAmount: goal.currentAmount + amount,
    });

    const newXP = user.totalXP + xpEarned;
    setUser({
      ...user,
      totalSaved: user.totalSaved + amount,
      totalXP: newXP,
      currentLevel: calculateLevel(newXP),
      streakDays: user.streakDays + 1,
      lastSaveDate: new Date().toISOString(),
    });

    toast.success(`$${amount} deposited!`, {
      description: `+${xpEarned} XP earned${xpMultiplier > 1 ? ' (2x bonus!)' : ''}`,
    });

    router.push('/dashboard');
  };

  const defaultGoal = goal || {
    id: 'default',
    name: 'My Goal',
    targetAmount: 100,
    currentAmount: 0,
    category: 'custom' as const,
  };

  return (
    <DepositFlow
      goal={defaultGoal}
      hasCompletedLesson={hasCompletedCurrentLesson}
      onDeposit={handleDeposit}
      onBack={() => router.push('/dashboard')}
    />
  );
}
