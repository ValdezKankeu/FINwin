'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { User, SavingsGoal, Reward } from '@/types';
import { apiGet } from '@/lib/api';

interface UserState {
  user: User | null;
  goal: SavingsGoal | null;
  completedLessons: string[];
  unlockedRewards: Reward[];
  loading: boolean;
  setUser: (user: User) => void;
  setGoal: (goal: SavingsGoal) => void;
  setCompletedLessons: (lessons: string[]) => void;
  setUnlockedRewards: (rewards: Reward[]) => void;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserState | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [goal, setGoal] = useState<SavingsGoal | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [unlockedRewards, setUnlockedRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const data = await apiGet<{
        name: string;
        age: number;
        totalSaved: number;
        totalXP: number;
        currentLevel: number;
        streakDays: number;
        lastSaveDate: string | null;
        goal: SavingsGoal | null;
        completedLessons: { lessonId: string }[];
        rewards: Reward[];
      }>('/users');

      if (data) {
        setUser({
          name: data.name,
          age: data.age,
          totalSaved: data.totalSaved,
          totalXP: data.totalXP,
          currentLevel: data.currentLevel,
          streakDays: data.streakDays,
          lastSaveDate: data.lastSaveDate || undefined,
        });
        setGoal(data.goal);
        setCompletedLessons(data.completedLessons?.map((l) => l.lessonId) || []);
        setUnlockedRewards(data.rewards || []);
      }
    } catch {
      // User not logged in yet
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return (
    <UserContext.Provider
      value={{
        user,
        goal,
        completedLessons,
        unlockedRewards,
        loading,
        setUser,
        setGoal,
        setCompletedLessons,
        setUnlockedRewards,
        refreshUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
}
