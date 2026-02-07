'use client';

import { useRouter } from 'next/navigation';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { NameInput } from '@/components/NameInput';

export default function NamePage() {
  const router = useRouter();
  const { setName } = useOnboarding();

  const handleNameSubmit = (name: string) => {
    setName(name);
    router.push('/onboarding/age');
  };

  return <NameInput onNext={handleNameSubmit} />;
}
