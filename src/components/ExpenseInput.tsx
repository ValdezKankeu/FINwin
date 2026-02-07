'use client';

import { useState } from 'react';

const SUBS = [
  { name: 'Netflix', cost: 15.49, icon: '📺' },
  { name: 'Spotify', cost: 10.99, icon: '🎵' },
  { name: 'Apple Music', cost: 10.99, icon: '🍎' },
  { name: 'Amazon Prime', cost: 14.99, icon: '📦' },
  { name: 'Disney+', cost: 13.99, icon: '🏰' },
  { name: 'Hulu', cost: 17.99, icon: '📺' },
  { name: 'YouTube Premium', cost: 13.99, icon: '▶️' },
  { name: 'ChatGPT Plus', cost: 20.0, icon: '🤖' },
  { name: 'iCloud+', cost: 2.99, icon: '☁️' },
  { name: 'Xbox/PS+', cost: 16.99, icon: '🎮' },
  { name: 'Gym', cost: 30.0, icon: '💪' },
  { name: 'Adobe CC', cost: 54.99, icon: '🎨' },
];

export interface UserFinances {
  income: number;
  subscriptions: { name: string; cost: number }[];
  rent: number;
  groceries: number;
  transport: number;
  debt: number;
  utilities: number;
  other: number;
}

interface Props {
  onNext: (data: UserFinances) => void;
}

export default function ExpenseInput({ onNext }: Props) {
  const [step, setStep] = useState(0);
  const [income, setIncome] = useState('');
  const [activeSubs, setActiveSubs] = useState<Set<string>>(new Set());
  const [otherSub, setOtherSub] = useState('');
  const [rent, setRent] = useState('');
  const [groceries, setGroceries] = useState('');
  const [transport, setTransport] = useState('');
  const [debt, setDebt] = useState('');
  const [utilities, setUtilities] = useState('');
  const [other, setOther] = useState('');

  const toggleSub = (name: string) => {
    const s = new Set(activeSubs);
    s.has(name) ? s.delete(name) : s.add(name);
    setActiveSubs(s);
  };

  const subTotal = SUBS.filter(s => activeSubs.has(s.name)).reduce((a, s) => a + s.cost, 0) + (parseFloat(otherSub) || 0);
  const fixedTotal = (parseFloat(rent) || 0) + (parseFloat(groceries) || 0) + (parseFloat(transport) || 0) + (parseFloat(debt) || 0) + (parseFloat(utilities) || 0) + (parseFloat(other) || 0);
  const totalExpenses = subTotal + fixedTotal;
  const inc = parseFloat(income) || 0;
  const leftover = inc - totalExpenses;

  const handleFinish = () => {
    onNext({
      income: inc,
      subscriptions: SUBS.filter(s => activeSubs.has(s.name)).map(s => ({ name: s.name, cost: s.cost })),
      rent: parseFloat(rent) || 0,
      groceries: parseFloat(groceries) || 0,
      transport: parseFloat(transport) || 0,
      debt: parseFloat(debt) || 0,
      utilities: parseFloat(utilities) || 0,
      other: parseFloat(other) || 0,
    });
  };

  const steps = [
    // Step 0: Income
    <div key="income" className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-sm font-medium text-[#00D632]">Step 1 of 3</p>
        <h2 className="text-4xl font-bold">What do you earn each month?</h2>
        <p className="text-gray-500">After taxes. No judgment here.</p>
      </div>
      <div className="relative max-w-xs mx-auto">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl font-medium">$</span>
        <input
          type="number"
          value={income}
          onChange={e => setIncome(e.target.value)}
          placeholder="4,500"
          autoFocus
          className="w-full h-16 pl-10 pr-4 bg-gray-100 rounded-2xl text-2xl text-center font-semibold outline-none focus:ring-2 focus:ring-[#00D632] border-0"
        />
      </div>
      <button
        onClick={() => setStep(1)}
        disabled={!income || parseFloat(income) <= 0}
        className="w-full max-w-xs mx-auto block h-14 bg-[#00D632] text-white font-semibold text-lg rounded-full hover:shadow-lg hover:shadow-[#00D632]/25 hover:-translate-y-0.5 transition-all disabled:opacity-30 active:scale-95"
      >
        Continue
      </button>
    </div>,

    // Step 1: Subscriptions
    <div key="subs" className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-sm font-medium text-[#00D632]">Step 2 of 3</p>
        <h2 className="text-3xl font-bold">Which subscriptions do you pay for?</h2>
        <p className="text-gray-500">Tap to toggle. We'll count the cost.</p>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {SUBS.map(s => {
          const active = activeSubs.has(s.name);
          return (
            <button
              key={s.name}
              onClick={() => toggleSub(s.name)}
              className={`relative p-3 rounded-xl border-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95 text-center ${
                active
                  ? 'border-[#00D632] bg-[#00D632]/5'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              {active && (
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#00D632] rounded-full flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              )}
              <span className="text-2xl block">{s.icon}</span>
              <p className="text-xs font-medium text-gray-900 mt-1">{s.name}</p>
              <p className="text-xs text-gray-400">${s.cost}</p>
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-3 max-w-sm mx-auto">
        <span className="text-sm text-gray-500 whitespace-nowrap">Other subs: $</span>
        <input
          type="number"
          value={otherSub}
          onChange={e => setOtherSub(e.target.value)}
          placeholder="0"
          className="flex-1 h-10 bg-gray-100 rounded-lg px-3 text-sm outline-none focus:ring-1 focus:ring-[#00D632] border-0"
        />
      </div>
      {subTotal > 0 && (
        <div className="text-center">
          <p className="text-sm text-gray-500">Subscriptions total</p>
          <p className="text-2xl font-bold text-gray-900">${subTotal.toFixed(2)}<span className="text-sm text-gray-400 font-normal">/mo</span></p>
          <p className="text-xs text-red-500 mt-1">${(subTotal * 12).toFixed(0)}/year</p>
        </div>
      )}
      <button
        onClick={() => setStep(2)}
        className="w-full max-w-xs mx-auto block h-14 bg-[#00D632] text-white font-semibold text-lg rounded-full hover:shadow-lg hover:shadow-[#00D632]/25 hover:-translate-y-0.5 transition-all active:scale-95"
      >
        Continue
      </button>
    </div>,

    // Step 2: Fixed expenses
    <div key="fixed" className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-sm font-medium text-[#00D632]">Step 3 of 3</p>
        <h2 className="text-3xl font-bold">Your monthly fixed expenses</h2>
        <p className="text-gray-500">Best estimates are fine.</p>
      </div>
      <div className="space-y-3 max-w-sm mx-auto">
        {[
          { label: '🏠 Rent / Housing', value: rent, set: setRent },
          { label: '🛒 Groceries', value: groceries, set: setGroceries },
          { label: '🚗 Transportation', value: transport, set: setTransport },
          { label: '💳 Debt payments', value: debt, set: setDebt },
          { label: '💡 Utilities', value: utilities, set: setUtilities },
          { label: '📦 Other', value: other, set: setOther },
        ].map(f => (
          <div key={f.label} className="flex items-center gap-3">
            <span className="text-sm text-gray-700 w-40">{f.label}</span>
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input
                type="number"
                value={f.value}
                onChange={e => f.set(e.target.value)}
                placeholder="0"
                className="w-full h-11 pl-7 pr-3 bg-gray-100 rounded-xl text-sm outline-none focus:ring-1 focus:ring-[#00D632] border-0"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Live summary */}
      <div className="bg-gray-50 rounded-2xl p-5 max-w-sm mx-auto space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Income</span>
          <span className="font-medium">${inc.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Subscriptions</span>
          <span className="font-medium text-red-500">-${subTotal.toFixed(0)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Fixed expenses</span>
          <span className="font-medium text-red-500">-${fixedTotal.toFixed(0)}</span>
        </div>
        <div className="border-t border-gray-200 pt-2 flex justify-between">
          <span className="font-semibold">Left over</span>
          <span className={`text-xl font-bold ${leftover >= 0 ? 'text-[#00D632]' : 'text-red-500'}`}>
            ${leftover.toFixed(0)}
          </span>
        </div>
      </div>

      <button
        onClick={handleFinish}
        disabled={fixedTotal <= 0}
        className="w-full max-w-xs mx-auto block h-14 bg-[#00D632] text-white font-semibold text-lg rounded-full hover:shadow-lg hover:shadow-[#00D632]/25 hover:-translate-y-0.5 transition-all disabled:opacity-30 active:scale-95"
      >
        See My Financial Reality
      </button>
    </div>,
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-lg w-full">{steps[step]}</div>
    </div>
  );
}
