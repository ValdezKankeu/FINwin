export type LifePath = 
  | 'american-dream'
  | 'flashy-lifestyle'
  | 'low-risk-investor'
  | 'foreign-life';

export interface Subscription {
  name: string;
  cost: number;
  category: string;
}

export interface RecurringExpense {
  name: string;
  cost: number;
}

export interface Budget {
  monthlyIncome: number;
  subscriptions: Subscription[];
  recurring: RecurringExpense[];
  dailyExpenses: number;
}

export interface LifePathConfig {
  id: LifePath;
  name: string;
  tagline: string;
  icon: string;
  insights: string[];
  actions: string[];
}

export interface CompoundProjection {
  years: number;
  value: number;
}