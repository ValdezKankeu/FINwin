'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Slider from '@/components/ui/Slider';
import { Budget } from '@/data/budgetData';
import { LifePath } from '@/types';

interface Props {
  lifePath: LifePath;
  initialBudget: Budget;
}

export default function WhatIfSimulator({ lifePath, initialBudget }: Props) {
  const initialSubscriptionTotal = initialBudget.subscriptions.reduce(
    (sum, sub) => sum + sub.cost,
    0
  );

  const [subscriptionSpend, setSubscriptionSpend] = useState(initialSubscriptionTotal);
  const [monthlySavings, setMonthlySavings] = useState(300);
  const [investmentReturn, setInvestmentReturn] = useState(7);
  const [fxFees, setFxFees] = useState(2);

  const calculateProjection = (years: number) => {
    const effectiveReturn = lifePath === 'foreign-life' 
      ? investmentReturn - fxFees 
      : investmentReturn;
    
    const monthlyRate = effectiveReturn / 12 / 100;
    const months = years * 12;
    
    const futureValue = monthlySavings * 
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    
    return futureValue;
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(2)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}K`;
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const projections = [
    { years: 5, value: calculateProjection(5) },
    { years: 10, value: calculateProjection(10) },
    { years: 20, value: calculateProjection(20) },
  ];

  const maxProjection = projections[projections.length - 1].value;

  return (
    <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">What If? Simulator</h2>
      <p className="text-gray-600 mb-6">
        Adjust the sliders to see how your decisions impact your wealth over time
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Controls */}
        <div className="space-y-6">
          <Slider
            label="Monthly Subscription Spend"
            value={subscriptionSpend}
            min={0}
            max={500}
            step={10}
            onChange={setSubscriptionSpend}
            formatValue={formatCurrency}
          />

          <Slider
            label="Monthly Savings/Investment"
            value={monthlySavings}
            min={0}
            max={1000}
            step={50}
            onChange={setMonthlySavings}
            formatValue={formatCurrency}
          />

          <Slider
            label="Expected Annual Return"
            value={investmentReturn}
            min={0}
            max={12}
            step={0.5}
            onChange={setInvestmentReturn}
            formatValue={(v) => `${v.toFixed(1)}%`}
          />

          {lifePath === 'foreign-life' && (
            <Slider
              label="FX Fees (International Transfers)"
              value={fxFees}
              min={0}
              max={5}
              step={0.1}
              onChange={setFxFees}
              formatValue={(v) => `${v.toFixed(1)}%`}
            />
          )}

          <div className="bg-white p-4 rounded-lg border-2 border-amber-300">
            <p className="text-sm text-gray-600 mb-1">Effective Annual Return</p>
            <p className="text-2xl font-bold text-amber-600">
              {lifePath === 'foreign-life' 
                ? `${(investmentReturn - fxFees).toFixed(1)}%` 
                : `${investmentReturn.toFixed(1)}%`}
            </p>
            {lifePath === 'foreign-life' && (
              <p className="text-xs text-gray-500 mt-1">
                After {fxFees.toFixed(1)}% FX fees
              </p>
            )}
          </div>
        </div>

        {/* Right: Projection Graph */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Your Wealth Trajectory</h3>
          
          <div className="space-y-4">
            {projections.map((proj, index) => {
              const percentage = (proj.value / maxProjection) * 100;
              
              return (
                <div key={proj.years}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {proj.years} years
                    </span>
                    <span className="text-xl font-bold text-amber-600">
                      {formatCurrency(proj.value)}
                    </span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-8">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-orange-500 h-8 rounded-full transition-all duration-500 flex items-center justify-end pr-3"
                        style={{ width: `${percentage}%` }}
                      >
                        {percentage > 20 && (
                          <span className="text-white text-xs font-bold">
                            {formatCurrency(proj.value)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 bg-gradient-to-r from-amber-600 to-orange-600 text-white p-5 rounded-lg">
            <p className="text-sm opacity-90 mb-1">Projected Net Worth in 20 Years</p>
            <p className="text-4xl font-bold">{formatCurrency(maxProjection)}</p>
            <p className="text-sm opacity-90 mt-2">
              Saving {formatCurrency(monthlySavings)}/month at {investmentReturn}% annual return
            </p>
          </div>

          <div className="mt-4 bg-white p-4 rounded-lg text-sm text-gray-600">
            <p className="font-medium text-gray-900 mb-2">💡 Quick Insight:</p>
            <p>
              If you cut your subscriptions from {formatCurrency(initialSubscriptionTotal)} to{' '}
              {formatCurrency(subscriptionSpend)}, you could redirect{' '}
              <span className="font-bold text-amber-600">
                {formatCurrency(initialSubscriptionTotal - subscriptionSpend)}
              </span>{' '}
              per month to savings, growing your 20-year wealth by{' '}
              <span className="font-bold text-amber-600">
                {formatCurrency(calculateProjection(20) - 
                  ((subscriptionSpend / initialSubscriptionTotal) * calculateProjection(20)))}
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}