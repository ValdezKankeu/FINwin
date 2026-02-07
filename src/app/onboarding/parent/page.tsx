'use client';

import { useRouter } from 'next/navigation';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { ParentLink } from '@/components/ParentLink';
import { apiPost } from '@/lib/api';
import { toast } from 'sonner';

export default function ParentPage() {
  const router = useRouter();
  const { name, age, goal } = useOnboarding();

  const handleParentLink = async (parentEmail?: string) => {
    if (parentEmail) {
      toast.success('Parent invite sent!');
    }

    try {
      await apiPost('/users', {
        name,
        age,
        goal: goal
          ? {
              name: goal.name,
              targetAmount: goal.targetAmount,
              category: goal.category,
            }
          : null,
      });
    } catch {
      // Continue even if API fails - user data will be in context
    }

    router.push('/dashboard');
  };

  return <ParentLink onNext={handleParentLink} />;
}
