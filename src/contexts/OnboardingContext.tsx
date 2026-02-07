'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { SavingsGoal } from '@/types';

interface OnboardingState {
  name: string;
  age: number;
  goal: SavingsGoal | null;
  setName: (name: string) => void;
  setAge: (age: number) => void;
  setGoal: (goal: SavingsGoal) => void;
}

const OnboardingContext = createContext<OnboardingState | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [goal, setGoal] = useState<SavingsGoal | null>(null);

  return (
    <OnboardingContext.Provider value={{ name, age, goal, setName, setAge, setGoal }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) throw new Error('useOnboarding must be used within OnboardingProvider');
  return context;
}
