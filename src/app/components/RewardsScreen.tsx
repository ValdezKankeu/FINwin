import { ArrowLeft, Award, Lock, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Reward } from '../types';
import { badges as allBadges } from '../data/mockData';

interface RewardsScreenProps {
  unlockedRewards: Reward[];
  totalXP: number;
  currentLevel: number;
  onBack: () => void;
}

export function RewardsScreen({
  unlockedRewards,
  totalXP,
  currentLevel,
  onBack,
}: RewardsScreenProps) {
  const unlockedCount = unlockedRewards.filter((r) => r.unlocked).length + (totalXP > 0 ? 1 : 0) + (currentLevel >= 1 ? 1 : 0);
  const totalCount = 12;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="px-6 py-4 flex items-center gap-4 border-b border-white/10">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="font-bold text-lg flex-1">Rewards</h2>
      </div>

      {/* Hero Section */}
      <div className="px-6 pt-12 pb-8 text-center">
        <div className="max-w-md mx-auto space-y-6">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-yellow-500/20 rounded-full">
            <Award className="w-12 h-12 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-5xl font-bold mb-2">
              {unlockedCount} / {totalCount}
            </h1>
            <p className="text-xl text-white/60">Rewards Unlocked</p>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-6 pb-12">
        <div className="max-w-md mx-auto space-y-6">
          {/* Progress Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/5 rounded-2xl p-4 text-center">
              <Star className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
              <p className="text-2xl font-bold">{totalXP}</p>
              <p className="text-xs text-white/60">Total XP</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 text-center">
              <Award className="w-6 h-6 text-[#00D632] mx-auto mb-1" />
              <p className="text-2xl font-bold">{currentLevel}</p>
              <p className="text-xs text-white/60">Level</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 text-center">
              <span className="text-2xl">🏆</span>
              <p className="text-2xl font-bold">{unlockedCount}</p>
              <p className="text-xs text-white/60">Badges</p>
            </div>
          </div>

          {/* Achievement Badges */}
          <div className="space-y-3">
            <h3 className="font-bold text-xl">Achievement Badges</h3>
            <div className="grid grid-cols-2 gap-3">
              {/* First Save Badge */}
              <div
                className={`p-5 rounded-2xl ${
                  totalXP > 0
                    ? 'bg-yellow-500/10 border border-yellow-500/30'
                    : 'bg-white/5 border border-white/10'
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3 ${
                    totalXP > 0 ? 'bg-yellow-500/20' : 'bg-white/10'
                  }`}
                >
                  {totalXP > 0 ? '🎯' : '🔒'}
                </div>
                <h4 className="font-bold text-center mb-1">First Save</h4>
                <p className="text-xs text-white/60 text-center">
                  Made your first deposit
                </p>
              </div>

              {/* Week Warrior */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl mx-auto mb-3">
                  🔒
                </div>
                <h4 className="font-bold text-center mb-1 text-white/50">
                  Week Warrior
                </h4>
                <p className="text-xs text-white/60 text-center">
                  7-day saving streak
                </p>
              </div>

              {/* Quick Learner */}
              <div
                className={`p-5 rounded-2xl ${
                  currentLevel >= 1
                    ? 'bg-blue-500/10 border border-blue-500/30'
                    : 'bg-white/5 border border-white/10'
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3 ${
                    currentLevel >= 1 ? 'bg-blue-500/20' : 'bg-white/10'
                  }`}
                >
                  {currentLevel >= 1 ? '📚' : '🔒'}
                </div>
                <h4 className="font-bold text-center mb-1">Quick Learner</h4>
                <p className="text-xs text-white/60 text-center">
                  Completed first lesson
                </p>
              </div>

              {/* Monthly Master */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl mx-auto mb-3">
                  🔒
                </div>
                <h4 className="font-bold text-center mb-1 text-white/50">
                  Monthly Master
                </h4>
                <p className="text-xs text-white/60 text-center">
                  30-day saving streak
                </p>
              </div>

              {/* Level 3 Badge */}
              <div
                className={`p-5 rounded-2xl ${
                  currentLevel >= 3
                    ? 'bg-purple-500/10 border border-purple-500/30'
                    : 'bg-white/5 border border-white/10'
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3 ${
                    currentLevel >= 3 ? 'bg-purple-500/20' : 'bg-white/10'
                  }`}
                >
                  {currentLevel >= 3 ? '🎓' : '🔒'}
                </div>
                <h4 className="font-bold text-center mb-1">Smart Spender</h4>
                <p className="text-xs text-white/60 text-center">
                  Reached Level 3
                </p>
              </div>

              {/* Knowledge King */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl mx-auto mb-3">
                  🔒
                </div>
                <h4 className="font-bold text-center mb-1 text-white/50">
                  Knowledge King
                </h4>
                <p className="text-xs text-white/60 text-center">
                  Completed all lessons
                </p>
              </div>
            </div>
          </div>

          {/* Level Rewards */}
          <div className="space-y-3">
            <h3 className="font-bold text-xl">Level Rewards</h3>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5, 6].map((level) => {
                const unlocked = currentLevel >= level;
                const levelNames = [
                  'Starter Saver',
                  'Budget Master',
                  'Smart Spender',
                  'Always Prepared',
                  'Patient Pro',
                  'Future Investor',
                ];
                const levelEmojis = ['🌟', '💼', '🧠', '🛡️', '⏰', '📈'];

                return (
                  <div
                    key={level}
                    className={`flex items-center gap-4 p-4 rounded-2xl ${
                      unlocked
                        ? 'bg-[#00D632]/10 border border-[#00D632]/30'
                        : 'bg-white/5 border border-white/10'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
                        unlocked ? 'bg-[#00D632]/20' : 'bg-white/10'
                      }`}
                    >
                      {unlocked ? (
                        levelEmojis[level - 1]
                      ) : (
                        <Lock className="w-5 h-5 text-white/40" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-bold ${unlocked ? '' : 'text-white/50'}`}>
                        {levelNames[level - 1]}
                      </h4>
                      <p className="text-sm text-white/60">Level {level} Reward</p>
                    </div>
                    {unlocked && (
                      <div className="w-8 h-8 bg-[#00D632] rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-black"
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
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Motivation Card */}
          <div className="bg-[#00D632]/10 border border-[#00D632]/30 rounded-3xl p-6 text-center space-y-3">
            <span className="text-4xl">🚀</span>
            <h3 className="text-xl font-bold">Keep Going!</h3>
            <p className="text-white/70">
              Every deposit, lesson, and streak brings you closer to unlocking
              more rewards. Stay consistent!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
