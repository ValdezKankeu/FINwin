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

export const defaultBudget: Budget = {
  monthlyIncome: 4500,
  subscriptions: [
    { name: 'Netflix', cost: 15.49, category: 'Entertainment' },
    { name: 'Spotify', cost: 10.99, category: 'Entertainment' },
    { name: 'ChatGPT Plus', cost: 20, category: 'Productivity' },
    { name: 'Adobe Creative Cloud', cost: 54.99, category: 'Tools' },
    { name: 'Planet Fitness', cost: 24.99, category: 'Health' },
    { name: 'Amazon Prime', cost: 14.99, category: 'Shopping' },
  ],
  recurring: [
    { name: 'Rent', cost: 1400 },
    { name: 'Utilities', cost: 180 },
    { name: 'Internet', cost: 80 },
    { name: 'Phone', cost: 65 },
    { name: 'Car Insurance', cost: 120 },
    { name: 'Health Insurance', cost: 85 },
  ],
  dailyExpenses: 980,
};

