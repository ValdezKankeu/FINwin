'use client';

import { useState } from 'react';

const GOALS = [
  { name: 'Emergency Fund', icon: '🛟', suggested: 500 },
  { name: 'Down Payment', icon: '🏡', suggested: 1000 },
  { name: 'Travel Fund', icon: '✈️', suggested: 300 },
  { name: 'Invest', icon: '📈', suggested: 200 },
];

export default function SavingsGoal({ leftover }: { leftover: number }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!selected || !amount) return;
    setLoading(true);
    try {
      const res = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseInt(amount), goalName: selected }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 space-y-5">
      <div>
        <h3 className="text-gray-900 font-semibold text-lg">Auto-Save with Stripe</h3>
        <p className="text-gray-500 text-sm mt-1">
          Commit to a savings goal — you have ${leftover}/mo available
        </p>
      </div>

      {/* Goal selection */}
      <div className="grid grid-cols-2 gap-2">
        {GOALS.map(g => (
          <button
            key={g.name}
            onClick={() => {
              setSelected(g.name);
              setAmount(String(Math.min(g.suggested, Math.max(leftover, 50))));
            }}
            className={`p-3 rounded-xl border text-left transition-all group ${
              selected === g.name
                ? 'border-[#00D632] bg-[#00D632]/10'
                : 'border-gray-200 bg-gray-50 hover:border-[#00D632]'
            }`}
          >
            <span className="text-xl">{g.icon}</span>
            <p className={`text-sm font-medium mt-1 ${
              selected === g.name ? 'text-[#00D632]' : 'text-gray-900 group-hover:text-[#00D632]'
            } transition-colors`}>
              {g.name}
            </p>
            <p className="text-gray-400 text-xs">${g.suggested}/mo suggested</p>
          </button>
        ))}
      </div>

      {/* Amount + action */}
      {selected && (
        <div className="space-y-3">
          <div>
            <label className="text-gray-500 text-sm">Amount (USD)</label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full h-11 mt-1 bg-gray-100 text-gray-900 rounded-xl px-4 outline-none focus:ring-1 focus:ring-[#00D632] border-0 text-sm"
            />
          </div>
          <button
            onClick={handleSave}
            disabled={loading || !amount || parseInt(amount) <= 0}
            className="w-full h-11 bg-[#00D632] text-black font-semibold rounded-xl hover:bg-[#00D632]/80 transition-all disabled:opacity-30 text-sm"
          >
            {loading ? 'Redirecting to Stripe...' : `Save $${amount} → ${selected}`}
          </button>
          <p className="text-gray-400 text-xs text-center">
            Test mode — use card 4242 4242 4242 4242
          </p>
        </div>
      )}
    </div>
  );
}
