// Core types for FINwin app

export interface User {
  name: string;
  age: number;
  totalSaved: number;
  totalXP: number;
  currentLevel: number;
  streakDays: number;
  lastSaveDate?: string;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  category: 'phone' | 'shoes' | 'college' | 'emergency' | 'custom';
}

export interface Level {
  id: number;
  title: string;
  requiredSavings: number;
  requiredXP: number;
  lessonId: string;
  challengeDescription: string;
  unlocked: boolean;
  completed: boolean;
  reward?: Reward;
}

export interface Lesson {
  id: string;
  title: string;
  topic: string;
  duration: number; // minutes
  completed: boolean;
  xpReward: number;
  content: LessonContent;
}

export interface LessonContent {
  introduction: string;
  keyPoints: string[];
  scenario?: {
    question: string;
    options: { text: string; correct: boolean; feedback: string }[];
  };
  quiz?: {
    question: string;
    options: { text: string; correct: boolean }[];
  };
}

export interface Reward {
  id: string;
  type: 'badge' | 'title' | 'cosmetic';
  name: string;
  description: string;
  imageUrl?: string;
  unlocked: boolean;
  dateUnlocked?: string;
}

export interface Streak {
  current: number;
  longest: number;
  lastActivityDate: string;
}

export interface Deposit {
  id: string;
  amount: number;
  date: string;
  source: 'manual' | 'parent' | 'allowance';
  approved: boolean;
}

export type Screen =
  | 'welcome'
  | 'name-input'
  | 'age-input'
  | 'goals-selection'
  | 'parent-link'
  | 'dashboard'
  | 'level-detail'
  | 'lesson'
  | 'deposit'
  | 'streaks'
  | 'rewards'
  | 'parent-dashboard';
