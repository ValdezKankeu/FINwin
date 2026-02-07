import { useState } from 'react';
import { Button } from './ui/button';
import { X, Sparkles } from 'lucide-react';
import { SavingsGoal } from '../types';

interface DepositFlowProps {
  goal: SavingsGoal;
  hasCompletedLesson: boolean;
  onDeposit: (amount: number) => void;
  onBack: () => void;
}

export function DepositFlow({
  goal,
  hasCompletedLesson,
  onDeposit,
  onBack,
}: DepositFlowProps) {
  const [amount, setAmount] = useState('');
  const [stage, setStage] = useState<'input' | 'confirm' | 'success'>('input');

  const quickAmounts = [5, 10, 20, 50];
  const depositAmount = parseFloat(amount) || 0;
  const xpMultiplier = hasCompletedLesson ? 2 : 1;
  const xpEarned = depositAmount * xpMultiplier;

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
  };

  const handleConfirm = () => {
    if (depositAmount > 0) {
      setStage('confirm');
    }
  };

  const handleFinalDeposit = () => {
    setStage('success');
    setTimeout(() => {
      onDeposit(depositAmount);
    }, 2000);
  };

  const handleNumberInput = (num: string) => {
    if (num === 'backspace') {
      setAmount((prev) => prev.slice(0, -1));
    } else if (num === '.') {
      if (!amount.includes('.')) {
        setAmount((prev) => prev + '.');
      }
    } else {
      setAmount((prev) => prev + num);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-white/10">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="font-bold text-lg">Add Money</h2>
        <div className="w-10"></div>
      </div>

      {/* Input Stage */}
      {stage === 'input' && (
        <div className="flex-1 flex flex-col">
          <div className="flex-1 px-6 pt-12">
            <div className="max-w-md mx-auto space-y-8">
              {/* Amount Display */}
              <div className="text-center space-y-2">
                <div className="text-6xl font-bold tracking-tight min-h-[80px] flex items-center justify-center">
                  ${amount || '0'}
                </div>
                {depositAmount > 0 && (
                  <p className="text-[#00D632] font-medium">
                    +{xpEarned} XP {hasCompletedLesson && '(2x Bonus!)'}
                  </p>
                )}
              </div>

              {/* Quick Amounts */}
              <div className="grid grid-cols-4 gap-2">
                {quickAmounts.map((value) => (
                  <button
                    key={value}
                    onClick={() => handleQuickAmount(value)}
                    className="h-12 bg-white/10 hover:bg-white/[0.15] rounded-2xl font-bold transition-all"
                  >
                    ${value}
                  </button>
                ))}
              </div>

              {/* Goal Info */}
              <div className="bg-white/5 rounded-3xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/60">Saving for</span>
                  <span className="font-bold">{goal.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Progress</span>
                  <span className="font-bold">
                    ${goal.currentAmount} / ${goal.targetAmount}
                  </span>
                </div>
              </div>

              {!hasCompletedLesson && (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-300">
                    Complete your lesson first to earn 2x XP on this deposit!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Number Pad */}
          <div className="px-6 pb-6">
            <div className="max-w-md mx-auto">
              <div className="grid grid-cols-3 gap-3 mb-4">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'].map(
                  (key) => (
                    <button
                      key={key}
                      onClick={() =>
                        handleNumberInput(key === '⌫' ? 'backspace' : key)
                      }
                      className="h-16 bg-white/10 hover:bg-white/[0.15] rounded-2xl font-bold text-2xl transition-all"
                    >
                      {key}
                    </button>
                  )
                )}
              </div>

              <Button
                onClick={handleConfirm}
                disabled={depositAmount <= 0}
                size="lg"
                className="w-full bg-[#00D632] text-black hover:bg-[#00D632]/90 font-bold text-lg h-14 rounded-full disabled:opacity-30 disabled:bg-white/10 disabled:text-white/30"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Stage */}
      {stage === 'confirm' && (
        <div className="flex-1 flex flex-col justify-between px-6 py-8">
          <div className="max-w-md mx-auto w-full space-y-6">
            <div className="text-center space-y-2 py-8">
              <p className="text-white/60">You're adding</p>
              <h1 className="text-6xl font-bold">${depositAmount}</h1>
              <p className="text-[#00D632] text-lg font-medium">
                +{xpEarned} XP
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-white/60">To</span>
                <span className="font-bold">{goal.name}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-white/60">New balance</span>
                <span className="font-bold">
                  ${(goal.currentAmount + depositAmount).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-white/60">XP earned</span>
                <span className="font-bold text-[#00D632]">+{xpEarned}</span>
              </div>
            </div>
          </div>

          <div className="max-w-md mx-auto w-full space-y-3">
            <Button
              onClick={handleFinalDeposit}
              size="lg"
              className="w-full bg-[#00D632] text-black hover:bg-[#00D632]/90 font-bold text-lg h-14 rounded-full"
            >
              Confirm
            </Button>
            <Button
              onClick={() => setStage('input')}
              variant="ghost"
              className="w-full text-white/60 hover:text-white hover:bg-white/5 h-12 rounded-full"
            >
              Go Back
            </Button>
          </div>
        </div>
      )}

      {/* Success Stage */}
      {stage === 'success' && (
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-[#00D632]/20 rounded-full mb-4">
              <div className="w-16 h-16 bg-[#00D632] rounded-full flex items-center justify-center animate-bounce">
                <svg
                  className="w-10 h-10 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-2">${depositAmount}</h2>
              <p className="text-xl text-white/60">Added successfully!</p>
            </div>
            <div className="bg-white/5 rounded-3xl p-6">
              <p className="text-white/60 mb-2">XP Earned</p>
              <p className="text-5xl font-bold text-[#00D632]">+{xpEarned}</p>
              {hasCompletedLesson && (
                <p className="text-[#00D632]/80 mt-2">Lesson bonus applied!</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
