'use client';

import Card from '@/components/ui/Card';
import { Budget } from '@/data/budgetData';

interface Props {
  budget: Budget;
}

export default function BudgetSnapshot({ budget }: Props) {
  const subscriptionTotal = budget.subscriptions.reduce((sum, sub) => sum + sub.cost, 0);
  const recurringTotal = budget.recurring.reduce((sum, exp) => sum + exp.cost, 0);
  const totalSpend = subscriptionTotal + recurringTotal + budget.dailyExpenses;
  const leftover = budget.monthlyIncome - totalSpend;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Budget Snapshot</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-700 font-medium">Monthly Income</p>
          <p className="text-3xl font-bold text-green-900">{formatCurrency(budget.monthlyIncome)}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-red-700 font-medium">Total Spend</p>
          <p className="text-3xl font-bold text-red-900">{formatCurrency(totalSpend)}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
          <span className="text-gray-700 font-medium">💳 Subscriptions</span>
          <span className="text-gray-900 font-bold">{formatCurrency(subscriptionTotal)}/mo</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
          <span className="text-gray-700 font-medium">🏠 Recurring Bills</span>
          <span className="text-gray-900 font-bold">{formatCurrency(recurringTotal)}/mo</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
          <span className="text-gray-700 font-medium">🛒 Daily Expenses</span>
          <span className="text-gray-900 font-bold">{formatCurrency(budget.dailyExpenses)}/mo</span>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-gray-700">Left Over</span>
          <span className={`text-2xl font-bold ${leftover >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(leftover)}
          </span>
        </div>
      </div>
    </Card>
  );
}