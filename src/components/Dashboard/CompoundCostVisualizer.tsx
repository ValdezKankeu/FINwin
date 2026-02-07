'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import { Subscription } from '@/data/budgetData';

interface Props {
  subscriptions: Subscription[];
}

export default function CompoundCostVisualizer({ subscriptions }: Props) {
  const [selectedSubs, setSelectedSubs] = useState<Set<string>>(new Set());

  const calculateCompoundGrowth = (monthlyAmount: number, years: number, rate: number = 7) => {
    const months = years * 12;
    const monthlyRate = rate / 12 / 100;
    const futureValue = monthlyAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    return futureValue;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const toggleSubscription = (subName: string) => {
    const newSelected = new Set(selectedSubs);
    if (newSelected.has(subName)) {
      newSelected.delete(subName);
    } else {
      newSelected.add(subName);
    }
    setSelectedSubs(newSelected);
  };

  const totalMonthlySavings = subscriptions
    .filter(sub => selectedSubs.has(sub.name))
    .reduce((sum, sub) => sum + sub.cost, 0);

  const projections = [
    { years: 5, value: calculateCompoundGrowth(totalMonthlySavings, 5) },
    { years: 10, value: calculateCompoundGrowth(totalMonthlySavings, 10) },
    { years: 20, value: calculateCompoundGrowth(totalMonthlySavings, 20) },
  ];

  const totalSubscriptionCost = subscriptions.reduce((sum, sub) => sum + sub.cost, 0);

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Cut Costs, Compound Wealth</h2>
      <p className="text-gray-600 mb-6">
        See how small subscription cuts grow into serious money over time (7% annual return)
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: Subscription List */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">
            Your Subscriptions ({formatCurrency(totalSubscriptionCost)}/mo)
          </h3>
          <div className="space-y-2">
            {subscriptions.map((sub) => {
              const isSelected = selectedSubs.has(sub.name);
              const growth10yr = calculateCompoundGrowth(sub.cost, 10);
              
              return (
                <div
                  key={sub.name}
                  onClick={() => toggleSubscription(sub.name)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-purple-100 border-2 border-purple-500'
                      : 'bg-white border-2 border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="w-4 h-4 accent-purple-600"
                        />
                        <span className="font-medium text-gray-900">{sub.name}</span>
                      </div>
                      <p className="text-xs text-gray-500 ml-6">{sub.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{formatCurrency(sub.cost)}/mo</p>
                      <p className="text-xs text-purple-600">
                        → {formatCurrency(growth10yr)} in 10yr
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Compound Visualization */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">
            {selectedSubs.size > 0 ? 'Your Savings Projection' : 'Select subscriptions to cut'}
          </h3>
          
          {selectedSubs.size > 0 ? (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-purple-300">
                <p className="text-sm text-gray-600">Monthly Savings</p>
                <p className="text-3xl font-bold text-purple-600">
                  {formatCurrency(totalMonthlySavings)}
                </p>
              </div>

              <div className="space-y-3">
                {projections.map((proj) => {
                  const maxValue = projections[projections.length - 1].value;
                  const percentage = (proj.value / maxValue) * 100;
                  
                  return (
                    <div key={proj.years} className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          {proj.years} years
                        </span>
                        <span className="text-lg font-bold text-purple-600">
                          {formatCurrency(proj.value)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-lg">
                <p className="text-sm opacity-90">The Power of Compound Interest</p>
                <p className="text-xl font-bold">
                  Cut {formatCurrency(totalMonthlySavings)}/mo → Gain {formatCurrency(projections[2].value)} in 20 years
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg text-center border-2 border-dashed border-gray-300">
              <p className="text-4xl mb-3">📊</p>
              <p className="text-gray-600">
                Click on subscriptions to see how cutting them compounds over time
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}