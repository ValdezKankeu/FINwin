'use client';

import type { LifePath } from '@/types';
import { lifePaths } from '@/data/lifePathsData';

interface Props {
  income: number;
  expenses: number;
  lifePath: LifePath;
  onContinue: () => void;
}

export default function RealityCheck({ income, expenses, lifePath, onContinue }: Props) {
  const leftover = income - expenses;
  const pathData = lifePaths[lifePath];

  const savingsIn1yr = leftover * 12;
  const investedIn5yr = Math.round(leftover * 12 * 5 * 1.07); // rough 7% compounded simply
  const investedIn10yr = Math.round(leftover * ((Math.pow(1 + 0.07 / 12, 120) - 1) / (0.07 / 12)));
  const doNothingCost = Math.round(leftover * 12 * 10); // just cash, no growth
  const opportunityCost = investedIn10yr - doNothingCost;

  const expensePercent = Math.round((expenses / income) * 100);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-3">
          <span className="text-4xl">{pathData.icon}</span>
          <h2 className="text-4xl font-bold">Here's your money story.</h2>
          <p className="text-lg text-gray-500">
            Based on your {pathData.name} path — here's what your choices unlock.
          </p>
        </div>

        {/* Income breakdown bar */}
        <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Every month, your ${ income.toLocaleString() } breaks down like this:</h3>
          <div className="flex h-8 rounded-full overflow-hidden">
            <div
              className="bg-red-400 flex items-center justify-center text-white text-xs font-medium"
              style={{ width: `${expensePercent}%` }}
            >
              {expensePercent}% spent
            </div>
            <div
              className="bg-[#00D632] flex items-center justify-center text-white text-xs font-medium"
              style={{ width: `${100 - expensePercent}%` }}
            >
              {100 - expensePercent}% free
            </div>
          </div>
          <p className="text-gray-500 text-sm">
            ${leftover.toLocaleString()}/mo is yours to play with. That's your power.
          </p>
        </div>

        {/* Future projections */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-2xl p-5 text-center">
            <p className="text-sm text-gray-500 mb-1">1 Year</p>
            <p className="text-2xl font-bold text-gray-900">${savingsIn1yr.toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-1">just saving</p>
          </div>
          <div className="bg-green-50 rounded-2xl p-5 text-center border-2 border-[#00D632]">
            <p className="text-sm text-[#00D632] mb-1 font-medium">5 Years (invested)</p>
            <p className="text-2xl font-bold text-gray-900">${investedIn5yr.toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-1">at 7% return</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-5 text-center">
            <p className="text-sm text-gray-500 mb-1">10 Years</p>
            <p className="text-2xl font-bold text-gray-900">${investedIn10yr.toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-1">compound magic</p>
          </div>
        </div>

        {/* Opportunity cost callout */}
        <div className="bg-gray-900 text-white rounded-2xl p-6">
          <p className="text-sm text-white/60 mb-1">The cost of doing nothing</p>
          <p className="text-3xl font-bold">
            ${opportunityCost.toLocaleString()}
          </p>
          <p className="text-sm text-white/60 mt-2">
            That's how much you'd miss out on in 10 years by keeping cash in a drawer vs investing it.
          </p>
        </div>

        {/* Path-specific insight */}
        <div className="bg-gray-50 rounded-2xl p-5">
          <p className="font-semibold text-gray-900 mb-2">{pathData.icon} {pathData.name} Insight</p>
          <p className="text-gray-600 text-sm">{pathData.insights[0]}</p>
        </div>

        <button
          onClick={onContinue}
          className="w-full h-14 bg-[#00D632] text-white font-semibold text-lg rounded-full hover:shadow-lg hover:shadow-[#00D632]/25 hover:-translate-y-0.5 transition-all active:scale-95"
        >
          See how to change this →
        </button>
      </div>
    </div>
  );
}
