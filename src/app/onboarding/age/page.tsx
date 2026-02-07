'use client';

import { useRouter } from 'next/navigation';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { AgeInput } from '@/components/AgeInput';

export default function AgePage() {
  const router = useRouter();
  const { name, setAge } = useOnboarding();

  const handleAgeSubmit = (age: number) => {
    setAge(age);
    router.push('/onboarding/goals');
  };

  return <AgeInput name={name || 'there'} onNext={handleAgeSubmit} />;
}
