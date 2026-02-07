import { ArrowLeft, Flame, Calendar, Trophy, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';

interface StreaksScreenProps {
  currentStreak: number;
  longestStreak: number;
  onBack: () => void;
}

export function StreaksScreen({
  currentStreak,
  longestStreak,
  onBack,
}: StreaksScreenProps) {
  // Mock weekly activity data
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const weekActivity = [true, true, true, false, true, false, false];

  // Streak milestones
  const milestones = [
    { days: 7, name: 'Week Warrior', emoji: '🔥', achieved: currentStreak >= 7 },
    {
      days: 14,
      name: 'Two Week Champion',
      emoji: '⚡',
      achieved: currentStreak >= 14,
    },
    {
      days: 30,
      name: 'Monthly Master',
      emoji: '🏆',
      achieved: currentStreak >= 30,
    },
    {
      days: 60,
      name: 'Unstoppable',
      emoji: '💎',
      achieved: currentStreak >= 60,
    },
    {
      days: 100,
      name: 'Legend',
      emoji: '👑',
      achieved: currentStreak >= 100,
    },
  ];

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
        <h2 className="font-bold text-lg flex-1">Streaks</h2>
      </div>

      {/* Hero Section */}
      <div className="px-6 pt-12 pb-8 text-center">
        <div className="max-w-md mx-auto space-y-6">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-orange-500/20 rounded-full">
            <Flame className="w-12 h-12 text-orange-400" />
          </div>
          <div>
            <p className="text-white/60 mb-2">Current Streak</p>
            <h1 className="text-7xl font-bold">{currentStreak}</h1>
            <p className="text-2xl text-white/60 mt-2">days</p>
          </div>
          {currentStreak > 0 && (
            <p className="text-white/60">
              Keep it up! Save today to maintain your streak.
            </p>
          )}
        </div>
      </div>

      <div className="px-6 space-y-6 pb-12">
        <div className="max-w-md mx-auto space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-2xl p-5 text-center">
              <Flame className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <p className="text-3xl font-bold">{currentStreak}</p>
              <p className="text-sm text-white/60">Current</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-5 text-center">
              <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-3xl font-bold">{longestStreak}</p>
              <p className="text-sm text-white/60">Best</p>
            </div>
          </div>

          {/* This Week */}
          <div className="bg-white/5 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-lg">This Week</h3>
            <div className="grid grid-cols-7 gap-2">
              {weekDays.map((day, index) => (
                <div key={day} className="text-center">
                  <p className="text-xs text-white/60 mb-2">{day}</p>
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      weekActivity[index]
                        ? 'bg-orange-500'
                        : 'bg-white/10'
                    }`}
                  >
                    {weekActivity[index] ? (
                      <Flame className="w-5 h-5 text-black" />
                    ) : (
                      <div className="w-2 h-2 bg-white/20 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-lg">How Streaks Work</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-black text-xs">
                  1
                </div>
                <span>Save money or complete a lesson each day</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-black text-xs">
                  2
                </div>
                <span>Your streak increases by 1 every active day</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-black text-xs">
                  3
                </div>
                <span>Miss a day and your streak resets to 0</span>
              </li>
            </ul>
          </div>

          {/* Milestones */}
          <div className="space-y-3">
            <h3 className="font-bold text-xl">Milestones</h3>
            <div className="space-y-2">
              {milestones.map((milestone) => (
                <div
                  key={milestone.days}
                  className={`flex items-center gap-4 p-4 rounded-2xl ${
                    milestone.achieved
                      ? 'bg-[#00D632]/10 border border-[#00D632]/30'
                      : 'bg-white/5 border border-white/10'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                      milestone.achieved ? 'bg-[#00D632]/20' : 'bg-white/10'
                    }`}
                  >
                    {milestone.achieved ? milestone.emoji : '🔒'}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold">{milestone.name}</h4>
                    <p className="text-sm text-white/60">
                      {milestone.days} day streak
                    </p>
                  </div>
                  {milestone.achieved && (
                    <div className="w-6 h-6 bg-[#00D632] rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-black"
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}