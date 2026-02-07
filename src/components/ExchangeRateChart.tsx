'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { LifePath } from '@/types';

interface RateData {
  currency: string;
  rate: number;
  valueOf1000: number;
}

const CURRENCY_LABELS: Record<string, string> = {
  EUR: 'Euro',
  GBP: 'British Pound',
  JPY: 'Japanese Yen',
  MXN: 'Mexican Peso',
  INR: 'Indian Rupee',
  BRL: 'Brazilian Real',
  CAD: 'Canadian Dollar',
  AUD: 'Australian Dollar',
  KRW: 'South Korean Won',
  PHP: 'Philippine Peso',
};

export default function ExchangeRateChart({ lifePath, monthlyIncome }: { lifePath: LifePath; monthlyIncome: number }) {
  const [rates, setRates] = useState<RateData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/exchange-rates')
      .then(r => r.json())
      .then(data => {
        if (data.rates) {
          const parsed = Object.entries(data.rates).map(([currency, rate]) => ({
            currency,
            rate: rate as number,
            valueOf1000: Math.round((rate as number) * 1000),
          }));
          setRates(parsed);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6">
        <p className="text-white/50">Loading exchange rates...</p>
      </div>
    );
  }

  if (!rates.length) return null;

  const fxFeePercent = 2.1;
  const monthlySendAmount = Math.round(monthlyIncome * 0.2); // assume 20% sent abroad
  const fxCost = Math.round(monthlySendAmount * (fxFeePercent / 100));
  const yearlyCost = fxCost * 12;

  const title = lifePath === 'foreign-life'
    ? 'Your Money Across Borders'
    : 'Travel Money — What $1,000 USD Gets You';

  const subtitle = lifePath === 'foreign-life'
    ? `Sending $${monthlySendAmount}/mo abroad costs ~$${fxCost}/mo in FX fees ($${yearlyCost}/yr)`
    : 'See how far your dollar stretches in different countries';

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6">
      <h3 className="text-gray-900 font-semibold text-lg mb-1">{title}</h3>
      <p className="text-gray-500 text-sm mb-6">{subtitle}</p>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={rates} layout="vertical" margin={{ left: 40, right: 20 }}>
            <XAxis type="number" tick={{ fill: '#6b7280', fontSize: 12 }} />
            <YAxis
              type="category"
              dataKey="currency"
              tick={{ fill: '#374151', fontSize: 12 }}
              width={40}
            />
            <Tooltip
              contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8 }}
              labelStyle={{ color: '#111' }}
              formatter={(value: number, _name: string, props: any) => {
                const currency = props.payload.currency;
                return [`${value.toLocaleString()} ${currency}`, `$1,000 USD = `];
              }}
            />
            <Bar dataKey="valueOf1000" radius={[0, 6, 6, 0]}>
              {rates.map((_, i) => (
                <Cell key={i} fill={i % 2 === 0 ? '#00D632' : '#00D632aa'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
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
