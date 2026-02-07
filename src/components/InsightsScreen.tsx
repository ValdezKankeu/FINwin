'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import type { UserFinances } from './ExpenseInput';

interface Props {
  finances: UserFinances;
  onContinue: () => void;
}

const COLORS = ['#00D632', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#ef4444', '#6b7280'];

export default function InsightsScreen({ finances, onContinue }: Props) {
  const subTotal = finances.subscriptions.reduce((a, s) => a + s.cost, 0);
  const { income, rent, groceries, transport, debt, other } = finances;
  const totalExpenses = subTotal + rent + groceries + transport + debt + other;
  const leftover = income - totalExpenses;
  const savingsRate = income > 0 ? Math.round((leftover / income) * 100) : 0;

  const categories = [
    { name: 'Subscriptions', value: subTotal },
    { name: 'Housing', value: rent },
    { name: 'Groceries', value: groceries },
    { name: 'Transport', value: transport },
    { name: 'Debt', value: debt },
    { name: 'Other', value: other },
    ...(leftover > 0 ? [{ name: 'Unspent', value: leftover }] : []),
  ].filter(c => c.value > 0);

  // Generate insights
  const insights: string[] = [];
  const subPercent = income > 0 ? Math.round((subTotal / income) * 100) : 0;
  if (subTotal > 0) insights.push(`${subPercent}% of your income goes to subscriptions — that's $${(subTotal * 12).toFixed(0)}/year.`);
  if (debt > 0) {
    const payoffYears = leftover > 0 ? (debt * 12 / leftover / 12).toFixed(1) : '∞';
    insights.push(`At your current rate, debt payoff takes ~${payoffYears} years.`);
  }
  if (savingsRate <= 0) {
    insights.push(`Current savings rate: ${savingsRate}%. At this rate, you'll have $0 in 10 years.`);
  } else {
    const tenYearSaved = leftover * 12 * 10;
    const tenYearInvested = Math.round(leftover * ((Math.pow(1 + 0.07 / 12, 120) - 1) / (0.07 / 12)));
    insights.push(`If you save everything: $${tenYearSaved.toLocaleString()} in 10 years. Invested at 7%: $${tenYearInvested.toLocaleString()}.`);
  }
  if (rent > 0 && income > 0) {
    const rentPercent = Math.round((rent / income) * 100);
    insights.push(`Housing is ${rentPercent}% of income. ${rentPercent > 30 ? 'Above the 30% guideline — worth watching.' : 'Within the 30% guideline — solid.'}`);
  }
  if (leftover > 0) {
    insights.push(`You have $${leftover.toFixed(0)}/mo to work with. That's your superpower.`);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-2">
          <p className="text-sm font-medium text-[#00D632]">Phase 1: Your Financial Reality</p>
          <h2 className="text-4xl font-bold">Here's what your money is doing.</h2>
          <p className="text-gray-500">No shame. Just facts you can act on.</p>
        </div>

        {/* Donut chart + legend */}
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <div className="w-56 h-56 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="value"
                  strokeWidth={2}
                  stroke="#fff"
                >
                  {categories.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 flex-1">
            {categories.map((c, i) => (
              <div key={c.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                  <span className="text-sm text-gray-700">{c.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold">${c.value.toFixed(0)}</span>
                  <span className="text-xs text-gray-400 ml-1">{Math.round((c.value / income) * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-50 rounded-2xl p-4 text-center">
            <p className="text-xs text-gray-500">Savings Rate</p>
            <p className={`text-3xl font-bold ${savingsRate >= 20 ? 'text-[#00D632]' : savingsRate > 0 ? 'text-yellow-500' : 'text-red-500'}`}>
              {savingsRate}%
            </p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 text-center">
            <p className="text-xs text-gray-500">Monthly Left</p>
            <p className={`text-3xl font-bold ${leftover >= 0 ? 'text-[#00D632]' : 'text-red-500'}`}>
              ${Math.abs(leftover).toFixed(0)}
            </p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 text-center">
            <p className="text-xs text-gray-500">Yearly Subs</p>
            <p className="text-3xl font-bold text-gray-900">${(subTotal * 12).toFixed(0)}</p>
          </div>
        </div>

        {/* Insights */}
        <div className="space-y-3">
          {insights.map((insight, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <span className="text-[#00D632] mt-0.5">●</span>
              <p className="text-sm text-gray-700 leading-relaxed">{insight}</p>
            </div>
          ))}
        </div>

        {/* CTA to Phase 2 */}
        <div className="text-center space-y-3 pt-4">
          <p className="text-gray-500">Now you know the facts. Ready to see what's possible?</p>
          <button
            onClick={onContinue}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-semibold text-lg rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95"
          >
            Enter Life Path Mode
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
