'use client';

import { useState } from 'react';

interface Result {
  income: number;
  expenses: number;
}

export default function IncomeSetup({ onNext }: { onNext: (data: Result) => void }) {
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');

  const inc = parseInt(income) || 0;
  const exp = parseInt(expenses) || 0;
  const leftover = inc - exp;
  const savingsRate = inc > 0 ? Math.round((leftover / inc) * 100) : 0;

  const encouragement =
    savingsRate >= 20 ? "You're ahead of most people your age. Let's make it grow."
    : savingsRate >= 10 ? "Solid start. Small moves from here = big results."
    : savingsRate > 0 ? "You've got room. That's all you need to start winning."
    : inc > 0 && exp > 0 ? "Tight right now — but that changes today."
    : '';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-bold">Let's see where you stand.</h2>
          <p className="text-lg text-gray-500">No judgment. Just facts.</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Monthly Income</label>
            <div className="relative mt-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
              <input
                type="number"
                value={income}
                onChange={e => setIncome(e.target.value)}
                placeholder="4,500"
                autoFocus
                className="w-full h-14 pl-8 pr-4 bg-gray-100 rounded-xl text-lg outline-none focus:ring-2 focus:ring-[#00D632] border-0"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Monthly Expenses</label>
            <div className="relative mt-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
              <input
                type="number"
                value={expenses}
                onChange={e => setExpenses(e.target.value)}
                placeholder="3,000"
                className="w-full h-14 pl-8 pr-4 bg-gray-100 rounded-xl text-lg outline-none focus:ring-2 focus:ring-[#00D632] border-0"
              />
            </div>
          </div>
        </div>

        {/* Live feedback */}
        {inc > 0 && exp > 0 && (
          <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Left over</span>
              <span className={`text-xl font-bold ${leftover >= 0 ? 'text-[#00D632]' : 'text-red-500'}`}>
                ${leftover.toLocaleString()}/mo
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-[#00D632] h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(Math.max(savingsRate, 0), 100)}%` }}
              />
            </div>
            <p className="text-sm text-gray-600">{encouragement}</p>
          </div>
        )}

        <button
          onClick={() => onNext({ income: inc, expenses: exp })}
          disabled={inc <= 0 || exp <= 0}
          className="w-full h-14 bg-[#00D632] text-white font-semibold text-lg rounded-full hover:shadow-lg hover:shadow-[#00D632]/25 hover:-translate-y-0.5 transition-all disabled:opacity-30 disabled:hover:transform-none disabled:hover:shadow-none active:scale-95"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
