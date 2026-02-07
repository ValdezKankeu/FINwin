'use client';

import { useState } from 'react';
import type { GameResult } from './AmericanDreamGame';

interface Props {
  income: number;
  onFinish: (result: GameResult) => void;
}

interface State {
  month: number;
  happiness: number;
  baselineHappy: number; // lifestyle inflation raises this
  netWorth: number;
  hiddenDebt: number;
  socialScore: number;
  salary: number;
  minSpend: number; // lifestyle inflation
  retired: number;
  log: { month: number; choice: string; impact: string }[];
  crashed: boolean;
}

const LUXURY_CHOICES = [
  [
    { label: 'Lease a BMW ($580/mo)', happiness: 40, cost: 580, social: 15, debt: 580, feedback: '🚗 Heads turn. Payments don\'t.' },
    { label: 'Designer shopping spree ($800)', happiness: 35, cost: 800, social: 10, debt: 800, feedback: '🛍️ Looking good. Feeling broke.' },
    { label: 'Stay in & cook', happiness: -5, cost: 0, social: -5, debt: 0, feedback: '🏠 FOMO hits. But your wallet thanks you.' },
  ],
  [
    { label: 'VIP table at the club ($500)', happiness: 30, cost: 500, social: 20, debt: 500, feedback: '🎉 Everyone knows your name. Your bank doesn\'t care.' },
    { label: 'Weekend in Miami ($1,500)', happiness: 45, cost: 1500, social: 25, debt: 1500, feedback: '✈️ The pics were worth it. The bill? Less so.' },
    { label: 'Netflix & budget review', happiness: -10, cost: 0, social: -8, debt: 0, feedback: '📊 Responsible. Boring. Effective.' },
  ],
  [
    { label: 'Upgrade to luxury apartment (+$600/mo)', happiness: 35, cost: 600, social: 15, debt: 600, feedback: '🏢 Granite countertops. Paper-thin savings.' },
    { label: 'New iPhone Pro Max ($1,200)', happiness: 25, cost: 1200, social: 10, debt: 1200, feedback: '📱 128MP camera. $0 in savings.' },
    { label: 'Keep current setup', happiness: -8, cost: 0, social: -3, debt: 0, feedback: '📱 Old phone still works. Pride takes a hit.' },
  ],
  [
    { label: 'Rolex watch ($8,000)', happiness: 50, cost: 8000, social: 30, debt: 8000, feedback: '⌚ Time is money. You just spent a lot of it.' },
    { label: 'Crypto YOLO ($2,000)', happiness: 20, cost: 2000, social: 5, debt: 2000, feedback: '📉 It went down 40%. As they do.' },
    { label: 'Index fund ($500)', happiness: -5, cost: 500, social: 0, debt: 0, feedback: '📈 Boring but brilliant. Nobody posts this on Instagram.' },
  ],
  [
    { label: 'Bottle service birthday ($2,000)', happiness: 40, cost: 2000, social: 25, debt: 2000, feedback: '🍾 Best night ever. Worst morning ever (financially).' },
    { label: 'First class to Europe ($4,000)', happiness: 55, cost: 4000, social: 30, debt: 4000, feedback: '✈️ Champagne at 35,000 feet. Debt at ground level.' },
    { label: 'Picnic in the park ($20)', happiness: -3, cost: 20, social: -10, debt: 0, feedback: '🌳 Wholesome. Instagram-unfriendly.' },
  ],
];

export default function FlashyGame({ income, onFinish }: Props) {
  const salary = Math.max(income, 5000); // Flashy path = high earner
  const [state, setState] = useState<State>({
    month: 1,
    happiness: 50,
    baselineHappy: 50,
    netWorth: 2000,
    hiddenDebt: 0,
    socialScore: 10,
    salary,
    minSpend: Math.round(salary * 0.4),
    retired: 0,
    log: [],
    crashed: false,
  });
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleChoice = (choice: typeof LUXURY_CHOICES[0][0]) => {
    setState(prev => {
      const newDebt = prev.hiddenDebt + choice.debt;
      const interestThisMonth = Math.round(newDebt * 0.02); // 24% APR / 12
      const totalDebt = newDebt + interestThisMonth;

      // Happiness spike then crash: happiness rises, but baseline rises too (treadmill)
      const newHappy = Math.min(100, prev.happiness + choice.happiness);
      const newBaseline = prev.baselineHappy + (choice.cost > 0 ? 3 : 0); // lifestyle inflation
      const afterCrash = Math.max(10, newHappy - 15); // happiness always decays

      // Lifestyle inflation: min spend creeps up
      const newMinSpend = prev.minSpend + (choice.cost > 0 ? Math.round(choice.cost * 0.1) : 0);

      const newNet = prev.netWorth - choice.cost - interestThisMonth + prev.salary - newMinSpend;

      // Job loss at month 8
      const jobLoss = prev.month === 7;
      const finalSalary = jobLoss ? 0 : prev.salary;

      return {
        ...prev,
        month: prev.month + 1,
        happiness: afterCrash,
        baselineHappy: newBaseline,
        netWorth: jobLoss ? newNet - prev.salary * 2 : newNet,
        hiddenDebt: totalDebt,
        socialScore: prev.socialScore + choice.social,
        minSpend: newMinSpend,
        salary: finalSalary,
        retired: 0,
        log: [...prev.log, { month: prev.month, choice: choice.label, impact: choice.feedback }],
        crashed: jobLoss,
      };
    });

    setFeedback(choice.feedback);
    setTimeout(() => setFeedback(null), 1800);
  };

  // End after 10 months
  if (state.month > 10 || (state.crashed && state.month > 8)) {
    onFinish({
      path: 'Flashy Lifestyle',
      months: state.month - 1,
      finalNetWorth: state.netWorth - state.hiddenDebt,
      finalDebt: state.hiddenDebt,
      finalSavings: Math.max(0, state.netWorth),
      finalStress: 95,
      decisions: state.log,
      personality: 'The Icarus',
      lesson: 'High income ≠ wealth. The game you think you\'re winning isn\'t the one that matters.',
    });
    return null;
  }

  const fmt = (n: number) => '$' + Math.abs(Math.round(n)).toLocaleString();
  const roundChoices = LUXURY_CHOICES[(state.month - 1) % LUXURY_CHOICES.length];

  // Happiness bar color: spikes green, but mostly red
  const happyColor = state.happiness > 70 ? 'bg-[#00D632]' : state.happiness > 40 ? 'bg-yellow-400' : 'bg-red-500';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8">
      <div className="max-w-lg w-full space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">🚀 Flashy Lifestyle</h2>
            <p className="text-sm text-gray-500">Month {state.month}</p>
          </div>
          <span className="text-xs bg-purple-100 px-3 py-1 rounded-full text-purple-600">
            Fast · Exciting · Unstable
          </span>
        </div>

        {/* Meters */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500 mb-1">Happiness</p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className={`${happyColor} h-3 rounded-full transition-all duration-500`} style={{ width: `${state.happiness}%` }} />
            </div>
            <p className="text-xs text-gray-400 mt-1">{state.happiness}/100 (baseline: {state.baselineHappy})</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500 mb-1">Social Score</p>
            <p className="text-lg font-bold text-purple-600">{state.socialScore} pts</p>
            <p className="text-xs text-gray-400">Validation meter</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500 mb-1">Visible Net Worth</p>
            <p className={`text-lg font-bold ${state.netWorth >= 0 ? 'text-gray-900' : 'text-red-500'}`}>
              {state.netWorth >= 0 ? fmt(state.netWorth) : `-${fmt(state.netWorth)}`}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500 mb-1">Hidden Debt</p>
            <p className="text-lg font-bold text-red-500">{fmt(state.hiddenDebt)}</p>
            <p className="text-xs text-red-400">+2%/mo interest</p>
          </div>
        </div>

        {/* Lifestyle inflation warning */}
        {state.minSpend > state.salary * 0.5 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
            <p className="text-sm text-red-600">
              Lifestyle inflation: your minimum monthly spend is now {fmt(state.minSpend)}
            </p>
          </div>
        )}

        {/* Job loss event */}
        {state.crashed && state.month <= 8 && (
          <div className="bg-red-100 border-2 border-red-400 rounded-xl p-4 text-center space-y-2">
            <p className="text-2xl">💥</p>
            <p className="font-bold text-red-700">You lost your job.</p>
            <p className="text-sm text-red-600">
              Salary: $0. Debt: {fmt(state.hiddenDebt)}. No emergency fund.
              <br />The lifestyle you built requires {fmt(state.minSpend)}/mo to maintain.
            </p>
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <div className="bg-gray-900 text-white rounded-xl p-4 text-center text-sm">
            {feedback}
          </div>
        )}

        {/* Retirement quietly draining */}
        <div className="text-center">
          <p className="text-xs text-gray-300">Retirement savings: $0 · Years to financial freedom: ∞</p>
        </div>

        {/* Choices */}
        {!feedback && (
          <div className="space-y-2">
            <p className="text-center text-gray-500 text-sm">What do you want this month?</p>
            {roundChoices.map((c, i) => {
              const isBoring = c.cost === 0 || c.cost < 100;
              return (
                <button
                  key={i}
                  onClick={() => handleChoice(c)}
                  className={`w-full text-left p-4 bg-white border-2 rounded-xl transition-all active:scale-[0.98] group ${
                    isBoring
                      ? 'border-gray-200 hover:border-gray-400 opacity-70'
                      : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50'
                  }`}
                >
                  <p className={`font-medium ${isBoring ? 'text-gray-400' : 'group-hover:text-purple-600'} transition-colors`}>
                    {c.label}
                  </p>
                  {!isBoring && <p className="text-xs text-purple-400 mt-0.5">+{c.happiness} happiness · +{c.social} social</p>}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
