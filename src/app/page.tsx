'use client';

import { useState } from 'react';
import { defaultBudget } from '@/data/budgetData';
import type { Budget } from '@/data/budgetData';
import type { LifePath } from '@/types';
import type { UserFinances } from '@/components/ExpenseInput';
import type { GameResult } from '@/components/AmericanDreamGame';
import LandingPage from '@/components/LandingPage';
import ExpenseInput from '@/components/ExpenseInput';
import InsightsScreen from '@/components/InsightsScreen';
import FinancialQuiz from '@/components/FinancialQuiz';
import CareerRecommendation from '@/components/CareerRecommendation';
import LifePathSelect from '@/components/LifePathSelect';
import AmericanDreamGame from '@/components/AmericanDreamGame';
import FlashyGame from '@/components/FlashyGame';
import GameEnd from '@/components/GameEnd';
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

type Step = 'landing' | 'input' | 'insights' | 'quiz' | 'career' | 'paths' | 'game' | 'end' | 'dashboard';

function buildBudget(finances: UserFinances): Budget {
  return {
    monthlyIncome: finances.income,
    subscriptions: finances.subscriptions.map(s => ({ name: s.name, cost: s.cost, category: 'subscription' })),
    recurring: [
      { name: 'Housing', cost: finances.rent },
      { name: 'Groceries', cost: finances.groceries },
      { name: 'Transport', cost: finances.transport },
      { name: 'Debt', cost: finances.debt },
      { name: 'Utilities', cost: finances.utilities || 0 },
      { name: 'Other', cost: finances.other },
    ].filter(r => r.cost > 0),
    dailyExpenses: 0,
  };
}

function getTotalExpenses(fin: UserFinances): number {
  return fin.rent + fin.groceries + fin.transport + fin.debt + (fin.utilities || 0) + fin.other +
    fin.subscriptions.reduce((a, s) => a + s.cost, 0);
}

export default function Home() {
  const [step, setStep] = useState<Step>('landing');
  const [finances, setFinances] = useState<UserFinances | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [lifePath, setLifePath] = useState<LifePath>('american-dream');
  const [gameResult, setGameResult] = useState<GameResult | null>(null);

  // Landing
  if (step === 'landing') {
    return <LandingPage onStart={() => setStep('input')} />;
  }

  // Phase 1: Expense input
  if (step === 'input') {
    return (
      <ExpenseInput
        onNext={(data) => {
          setFinances(data);
          setStep('insights');
        }}
      />
    );
  }

  // Phase 1: Insights
  if (step === 'insights' && finances) {
    return (
      <InsightsScreen
        finances={finances}
        onContinue={() => setStep('quiz')}
      />
    );
  }

  // Phase 2: Financial Quiz
  if (step === 'quiz') {
    return (
      <FinancialQuiz
        onFinish={(score) => {
          setQuizScore(score);
          // If income < $3,500, show career recommendations
          if (finances && finances.income < 3500) {
            setStep('career');
          } else {
            setStep('paths');
          }
        }}
      />
    );
  }

  // Phase 3: Career Recommendation (only if income < $3,500)
  if (step === 'career' && finances) {
    return (
      <CareerRecommendation
        income={finances.income}
        onContinue={() => setStep('paths')}
      />
    );
  }

  // Phase 4: Life path selection
  if (step === 'paths') {
    return (
      <LifePathSelect
        onSelect={(path) => {
          setLifePath(path);
          setStep('game');
        }}
      />
    );
  }

  // Life path games
  if (step === 'game' && finances) {
    const income = finances.income;
    const leftover = income - getTotalExpenses(finances);

    const handleGameFinish = (result: GameResult) => {
      setGameResult(result);
      setStep('end');
    };

    if (lifePath === 'flashy-lifestyle') {
      return <FlashyGame income={income} onFinish={handleGameFinish} />;
    }

    // American Dream, Safe Investor, and Global Life use the American Dream game engine for MVP
    return (
      <AmericanDreamGame
        income={income}
        debt={finances.debt}
        leftover={leftover}
        onFinish={handleGameFinish}
      />
    );
  }

  // Game end screen
  if (step === 'end' && gameResult) {
    return (
      <GameEnd
        result={gameResult}
        onDashboard={() => setStep('dashboard')}
        onReplay={() => {
          setGameResult(null);
          setStep('paths');
        }}
      />
    );
  }

  // Dashboard
  const fin = finances || { income: 0, subscriptions: [], rent: 0, groceries: 0, transport: 0, debt: 0, utilities: 0, other: 0 };
  const budget = buildBudget(fin);
  const totalExp = getTotalExpenses(fin);
  const leftover = fin.income - totalExp;
  const showExchangeRates = lifePath === 'foreign-life' || lifePath === 'flashy-lifestyle';

  const profile = {
    age: 25,
    hasCareer: true,
    careerPath: null,
    income: fin.income,
    expenses: totalExp,
    lifePath,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <LifePathHeader currentPath={lifePath} onPathChange={setLifePath} xp={0} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Game result summary */}
        {gameResult && (
          <div className="mb-6 bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Your Financial Personality</p>
                <h3 className="text-2xl font-bold">{gameResult.personality}</h3>
                <p className="text-sm text-gray-500 italic mt-1">"{gameResult.lesson}"</p>
              </div>
              <div className="text-right space-y-1">
                <div>
                  <p className="text-sm text-gray-500">Final Net Worth</p>
                  <p className={`text-2xl font-bold ${gameResult.finalNetWorth >= 0 ? 'text-[#00D632]' : 'text-red-500'}`}>
                    ${Math.abs(Math.round(gameResult.finalNetWorth)).toLocaleString()}
                  </p>
                </div>
                <p className="text-xs text-gray-400">Quiz Score: {quizScore}/20</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <BudgetSnapshot budget={budget} />

            {showExchangeRates && (
              <ExchangeRateChart lifePath={lifePath} monthlyIncome={fin.income} />
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
            FINwin — Your Intelligent Budget Planner | Powered bY
          </p>
        </div>
      </footer>
    </div>
  );
}
