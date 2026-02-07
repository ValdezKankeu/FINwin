'use client';

import { useRouter } from 'next/navigation';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { GoalsSelection } from '@/components/GoalsSelection';
import { SavingsGoal } from '@/types';

export default function GoalsPage() {
  const router = useRouter();
  const { name, setGoal } = useOnboarding();

  const handleGoalSelect = (goal: SavingsGoal) => {
    setGoal(goal);
    router.push('/onboarding/parent');
  };

  return <GoalsSelection name={name || 'there'} onNext={handleGoalSelect} />;
}
