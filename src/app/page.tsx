'use client';

import { useState } from 'react';
import { defaultBudget } from '@/data/budgetData';
import type { Budget } from '@/data/budgetData';
import type { LifePath } from '@/types';
import LandingPage from '@/components/LandingPage';
import IncomeSetup from '@/components/IncomeSetup';
import LifePathSelect from '@/components/LifePathSelect';
import RealityCheck from '@/components/RealityCheck';
import MoneyGame from '@/components/MoneyGame';
import LifePathHeader from '@/components/Dashboard/LifePathHeader';
import BudgetSnapshot from '@/components/Dashboard/BudgetSnapshot';
import InsightEngine from '@/components/Dashboard/InsightEngine';
import CompoundCostVisualizer from '@/components/Dashboard/CompoundCostVisualizer';
import WhatIfSimulator from '@/components/Dashboard/WhatIfSimulator';
import ActionPlan from '@/components/Dashboard/ActionPlan';
import InvestmentCards from '@/components/InvestmentCards';
import ChatPanel from '@/components/ChatPanel';
import BankConnect from '@/components/BankConnect';
import SavingsGoal from '@/components/SavingsGoal';
import ExchangeRateChart from '@/components/ExchangeRateChart';

type Step = 'landing' | 'input' | 'paths' | 'reality' | 'game' | 'dashboard';

function buildBudget(income: number, expenses: number): Budget {
  const subTotal = defaultBudget.subscriptions.reduce((s, x) => s + x.cost, 0);
  const recTotal = defaultBudget.recurring.reduce((s, x) => s + x.cost, 0);
  const remaining = Math.max(0, expenses - subTotal - recTotal);
  return {
    monthlyIncome: income,
    subscriptions: defaultBudget.subscriptions,
    recurring: defaultBudget.recurring,
    dailyExpenses: remaining,
  };
}

export default function Home() {
  const [step, setStep] = useState<Step>('landing');
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [lifePath, setLifePath] = useState<LifePath>('american-dream');
  const [xp, setXp] = useState(0);

  // Landing
  if (step === 'landing') {
    return <LandingPage onStart={() => setStep('input')} />;
  }

  // Income input
  if (step === 'input') {
    return (
      <IncomeSetup
        onNext={(data) => {
          setIncome(data.income);
          setExpenses(data.expenses);
          setStep('paths');
        }}
      />
    );
  }

  // Life path selection
  if (step === 'paths') {
    return (
      <LifePathSelect
        onSelect={(path) => {
          setLifePath(path);
          setStep('reality');
        }}
      />
    );
  }

  // Reality check
  if (step === 'reality') {
    return (
      <RealityCheck
        income={income}
        expenses={expenses}
        lifePath={lifePath}
        onContinue={() => setStep('game')}
      />
    );
  }

  // Mini-game
  if (step === 'game') {
    return (
      <MoneyGame
        leftover={income - expenses}
        onFinish={(earnedXp) => {
          setXp(earnedXp);
          setStep('dashboard');
        }}
      />
    );
  }

  // Dashboard
  const budget = buildBudget(income, expenses);
  const leftover = income - expenses;
  const showExchangeRates = lifePath === 'foreign-life' || lifePath === 'flashy-lifestyle';

  // Build a profile object for the chat panel
  const profile = {
    age: 25,
    hasCareer: true,
    careerPath: null,
    income,
    expenses,
    lifePath,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <LifePathHeader currentPath={lifePath} onPathChange={setLifePath} xp={xp} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <BudgetSnapshot budget={budget} />

            {showExchangeRates && (
              <ExchangeRateChart lifePath={lifePath} monthlyIncome={income} />
            )}

            <InvestmentCards />
            <CompoundCostVisualizer subscriptions={budget.subscriptions} />
            <WhatIfSimulator lifePath={lifePath} initialBudget={budget} />
            <ActionPlan lifePath={lifePath} />
            <InsightEngine lifePath={lifePath} budget={budget} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-24 space-y-6">
              <BankConnect />
              <SavingsGoal leftover={leftover} />
              <ChatPanel profile={profile} />
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 mt-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-400 text-sm">
            FINwin — Your Intelligent Budget Planner | CMU Hackathon 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
