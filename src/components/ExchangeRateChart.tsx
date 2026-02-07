'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { LifePath } from '@/types';

// Full country names + approximate monthly cost of living (USD) for comparison
// These are rough averages for a single person in the capital/major city
const COUNTRY_INFO: Record<string, { name: string; monthlyCost: number }> = {
  MXN: { name: 'Mexico', monthlyCost: 950 },
  COP: { name: 'Colombia', monthlyCost: 750 },
  DOP: { name: 'Dominican Republic', monthlyCost: 850 },
  CRC: { name: 'Costa Rica', monthlyCost: 1100 },
  GTQ: { name: 'Guatemala', monthlyCost: 700 },
  PEN: { name: 'Peru', monthlyCost: 720 },
  ARS: { name: 'Argentina', monthlyCost: 650 },
  EUR: { name: 'Spain', monthlyCost: 1600 },
  GBP: { name: 'United Kingdom', monthlyCost: 2200 },
  JPY: { name: 'Japan', monthlyCost: 1400 },
  THB: { name: 'Thailand', monthlyCost: 800 },
  PHP: { name: 'Philippines', monthlyCost: 600 },
  BRL: { name: 'Brazil', monthlyCost: 850 },
  CAD: { name: 'Canada', monthlyCost: 1900 },
  INR: { name: 'India', monthlyCost: 500 },
};

interface ChartEntry {
  country: string;
  currency: string;
  purchasingPower: number; // how many months your $1000 covers
  monthlyCost: number;
}

export default function ExchangeRateChart({ lifePath, monthlyIncome }: { lifePath: LifePath; monthlyIncome: number }) {
  const [data, setData] = useState<ChartEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/exchange-rates')
      .then(r => r.json())
      .then(apiData => {
        if (apiData.rates) {
          const entries: ChartEntry[] = Object.entries(apiData.rates)
            .filter(([code]) => COUNTRY_INFO[code])
            .map(([code]) => {
              const info = COUNTRY_INFO[code];
              // How many months does $1,000 USD cover in this country?
              const purchasingPower = Math.round((1000 / info.monthlyCost) * 10) / 10;
              return {
                country: info.name,
                currency: code,
                purchasingPower,
                monthlyCost: info.monthlyCost,
              };
            })
            .sort((a, b) => b.purchasingPower - a.purchasingPower);
          setData(entries);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6">
        <p className="text-gray-400">Loading exchange rates...</p>
      </div>
    );
  }

  if (!data.length) return null;

  const fxFeePercent = 2.1;
  const monthlySendAmount = Math.round(monthlyIncome * 0.2);
  const fxCost = Math.round(monthlySendAmount * (fxFeePercent / 100));
  const yearlyCost = fxCost * 12;

  const title = lifePath === 'foreign-life'
    ? 'Your Money Across Borders'
    : 'How Far $1,000/mo Stretches Abroad';

  const subtitle = lifePath === 'foreign-life'
    ? `Sending $${monthlySendAmount}/mo abroad costs ~$${fxCost}/mo in FX fees ($${yearlyCost}/yr)`
    : 'Months of living expenses covered by $1,000 USD';

  // Color based on purchasing power
  const getBarColor = (months: number) => {
    if (months >= 1.5) return '#00D632';
    if (months >= 1.0) return '#10b981';
    if (months >= 0.6) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6">
      <h3 className="text-gray-900 font-semibold text-lg mb-1">{title}</h3>
      <p className="text-gray-500 text-sm mb-6">{subtitle}</p>

      <div className="h-[420px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 10, right: 30 }}>
            <XAxis
              type="number"
              tick={{ fill: '#6b7280', fontSize: 11 }}
              domain={[0, 'auto']}
              tickFormatter={(v: number) => `${v} mo`}
            />
            <YAxis
              type="category"
              dataKey="country"
              tick={{ fill: '#374151', fontSize: 12 }}
              width={120}
            />
            <Tooltip
              contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8 }}
              labelStyle={{ color: '#111', fontWeight: 600 }}
              formatter={(value: number, _name: string, props: { payload: ChartEntry }) => {
                const entry = props.payload;
                return [
                  `${value} months (~$${entry.monthlyCost}/mo cost of living)`,
                  '$1,000 USD covers',
                ];
              }}
            />
            <Bar dataKey="purchasingPower" radius={[0, 6, 6, 0]}>
              {data.map((entry, i) => (
                <Cell key={i} fill={getBarColor(entry.purchasingPower)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* US baseline reference */}
      <div className="mt-3 text-center">
        <p className="text-xs text-gray-400">
          For reference: $1,000 covers ~0.4 months in the US ($2,500/mo avg cost of living)
        </p>
      </div>

      {lifePath === 'foreign-life' && (
        <div className="mt-4 p-3 bg-[#00D632]/10 border border-[#00D632]/30 rounded-xl">
          <p className="text-[#00D632] text-sm font-medium">
            Tip: Switch to Wise or Revolut to cut FX fees from {fxFeePercent}% to ~0.5% — save ~${Math.round(yearlyCost * 0.75)}/yr
          </p>
        </div>
      )}
    </div>
  );
}
