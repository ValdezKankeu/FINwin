'use client';
import { defaultBudget } from '@/data/budgetData';
import type { LifePath } from '@/types';
import { useState } from 'react';
import ActionPlan from '@/components/Dashboard/ActionPlan';
import LifePathHeader from '@/components/Dashboard/LifePathHeader';
import BudgetSnapshot from '@/components/Dashboard/BudgetSnapshot';
import InsightEngine from '@/components/Dashboard/InsightEngine';
import CompoundCostVisualizer from '@/components/Dashboard/CompoundCostVisualizer';
import WhatIfSimulator from '@/components/Dashboard/WhatIfSimulator';

export default function Dashboard() {
  const [lifePath, setLifePath] = useState<LifePath>('american-dream');

  return (
    <div className="min-h-screen bg-gray-50">
      <LifePathHeader currentPath={lifePath} onPathChange={setLifePath} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <BudgetSnapshot budget={defaultBudget} />
          <InsightEngine lifePath={lifePath} budget={defaultBudget} />
          <CompoundCostVisualizer subscriptions={defaultBudget.subscriptions} />
          <ActionPlan lifePath={lifePath} />
          <WhatIfSimulator lifePath={lifePath} initialBudget={defaultBudget} />
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            FINwin - Your Intelligent Budget Planner | Built for CMU Hackathon 2026
          </p>
        </div>
      </footer>
    </div>
  );
}