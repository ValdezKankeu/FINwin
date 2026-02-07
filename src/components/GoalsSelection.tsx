'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Plus } from 'lucide-react';
import { presetGoals } from '@/data/mockData';
import { SavingsGoal } from '@/types';

interface GoalsSelectionProps {
  name: string;
  onNext: (goal: SavingsGoal) => void;
}

export function GoalsSelection({ name, onNext }: GoalsSelectionProps) {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [showCustom, setShowCustom] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customAmount, setCustomAmount] = useState('');

  const handlePresetSelect = (goalId: string) => {
    const preset = presetGoals.find((g) => g.id === goalId);
    if (preset) {
      const goal: SavingsGoal = {
        id: preset.id,
        name: preset.name,
        targetAmount: preset.amount,
        currentAmount: 0,
        category: preset.category,
      };
      onNext(goal);
    }
  };

  const handleCustomSubmit = () => {
    if (customName.trim() && customAmount) {
      const goal: SavingsGoal = {
        id: 'custom-' + Date.now(),
        name: customName.trim(),
        targetAmount: parseFloat(customAmount),
        currentAmount: 0,
        category: 'custom',
      };
      onNext(goal);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-between p-6">
      <div className="max-w-md w-full flex-1 flex flex-col justify-center space-y-8">
        <div className="text-white space-y-6">
          <div className="space-y-3">
            <h2 className="text-4xl font-bold">What are you saving for?</h2>
            <p className="text-xl text-white/60">
              Pick a goal, {name}
            </p>
          </div>
        </div>

        {!showCustom ? (
          <div className="space-y-3">
            {presetGoals.map((goal) => (
              <button
                key={goal.id}
                onClick={() => handlePresetSelect(goal.id)}
                className="w-full bg-white/10 hover:bg-white/[0.15] border-0 rounded-2xl p-5 transition-all text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl flex-shrink-0">
                    {goal.icon}
                  </div>
                  <div className="flex-1 text-white">
                    <h3 className="font-bold text-lg mb-0.5">{goal.name}</h3>
                    <p className="text-white/60">${goal.amount.toLocaleString()}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/40" />
                </div>
              </button>
            ))}

            <button
              onClick={() => setShowCustom(true)}
              className="w-full bg-white/5 hover:bg-white/10 border-2 border-dashed border-white/20 rounded-2xl p-5 transition-all text-white"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Plus className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-lg">Custom Goal</h3>
                  <p className="text-white/60 text-sm">Set your own target</p>
                </div>
              </div>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="What are you saving for?"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="h-14 bg-white/10 border-0 text-white placeholder:text-white/40 rounded-2xl"
                  autoFocus
                />
              </div>

              <div>
                <Input
                  type="number"
                  placeholder="Target amount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="h-14 bg-white/10 border-0 text-white placeholder:text-white/40 rounded-2xl"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => setShowCustom(false)}
                variant="outline"
                className="flex-1 h-12 bg-white/10 border-0 text-white hover:bg-white/[0.15] rounded-full"
              >
                Back
              </Button>
              <Button
                onClick={handleCustomSubmit}
                disabled={!customName.trim() || !customAmount}
                className="flex-1 h-12 bg-[#00D632] text-black hover:bg-[#00D632]/90 font-bold rounded-full disabled:opacity-30 disabled:bg-white/10 disabled:text-white/30"
              >
                Continue
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="w-full max-w-md">
        <div className="flex justify-center gap-2">
          <div className="w-2 h-2 bg-white/20 rounded-full"></div>
          <div className="w-2 h-2 bg-white/20 rounded-full"></div>
          <div className="w-2 h-2 bg-[#00D632] rounded-full"></div>
          <div className="w-2 h-2 bg-white/20 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
