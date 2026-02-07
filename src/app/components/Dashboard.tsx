import {
  Target,
  Zap,
  TrendingUp,
  Plus,
  Award,
  BookOpen,
  Flame,
  Lock,
  CheckCircle,
  ChevronRight,
} from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { User, SavingsGoal, Level } from '../types';
import { levels as initialLevels } from '../data/mockData';

interface DashboardProps {
  user: User;
  goal: SavingsGoal;
  onDeposit: () => void;
  onLevelClick: (level: Level) => void;
  onStreaksClick: () => void;
  onRewardsClick: () => void;
}

export function Dashboard({
  user,
  goal,
  onDeposit,
  onLevelClick,
  onStreaksClick,
  onRewardsClick,
}: DashboardProps) {
  const goalProgress = (goal.currentAmount / goal.targetAmount) * 100;
  const currentLevelData = initialLevels.find((l) => l.id === user.currentLevel);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header - Balance Style */}
      <div className="px-6 pt-12 pb-8">
        <div className="max-w-md mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onStreaksClick}
              className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full"
            >
              <Flame className="w-4 h-4 text-[#00D632]" />
              <span className="font-bold">{user.streakDays}</span>
            </button>
            <button
              onClick={onRewardsClick}
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"
            >
              <Award className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Balance Display */}
          <div className="text-center space-y-2">
            <p className="text-white/60">Total Saved</p>
            <h1 className="text-6xl font-bold tracking-tight">
              ${user.totalSaved}
            </h1>
          </div>

          {/* Goal Progress */}
          <div className="bg-white/5 rounded-3xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{
                  goal.category === 'phone' ? '📱' :
                  goal.category === 'shoes' ? '👟' :
                  goal.category === 'college' ? '🎓' :
                  goal.category === 'emergency' ? '🛡️' : '🎯'
                }</div>
                <div>
                  <h3 className="font-bold text-lg">{goal.name}</h3>
                  <p className="text-white/60 text-sm">
                    ${goal.currentAmount} of ${goal.targetAmount}
                  </p>
                </div>
              </div>
              <span className="text-2xl font-bold text-[#00D632]">
                {goalProgress.toFixed(0)}%
              </span>
            </div>
            <div className="bg-white/10 rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#00D632] h-full rounded-full transition-all duration-500"
                style={{ width: `${goalProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Actions */}
      <div className="px-6 pb-6">
        <div className="max-w-md mx-auto space-y-3">
          <Button
            onClick={onDeposit}
            size="lg"
            className="w-full bg-[#00D632] text-black hover:bg-[#00D632]/90 font-bold text-lg h-14 rounded-full"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Money
          </Button>
        </div>
      </div>

      {/* Content Sections */}
      <div className="px-6 space-y-6 pb-12">
        <div className="max-w-md mx-auto space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/5 rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold text-[#00D632] mb-1">
                {user.currentLevel}
              </div>
              <div className="text-xs text-white/60">Level</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold text-[#00D632] mb-1">
                {user.totalXP}
              </div>
              <div className="text-xs text-white/60">XP Points</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold text-[#00D632] mb-1">
                {user.streakDays}
              </div>
              <div className="text-xs text-white/60">Day Streak</div>
            </div>
          </div>

          {/* Current Lesson */}
          {currentLevelData && (
            <div className="space-y-3">
              <h3 className="text-xl font-bold">Keep Learning</h3>
              <button
                onClick={() => onLevelClick(currentLevelData)}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl p-5 transition-all text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#00D632]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-[#00D632]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-lg mb-1">
                      {currentLevelData.title}
                    </h4>
                    <p className="text-white/60 text-sm mb-3">
                      Complete to earn 2x XP on deposits
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-white/10 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-[#00D632] h-full rounded-full"
                          style={{
                            width: `${Math.min(
                              (user.totalXP / currentLevelData.requiredXP) * 100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-xs text-white/60">
                        {user.totalXP}/{currentLevelData.requiredXP}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/40 flex-shrink-0 mt-3" />
                </div>
              </button>
            </div>
          )}

          {/* Level Progress */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold">Your Progress</h3>
            <div className="space-y-2">
              {initialLevels.slice(0, 3).map((level) => {
                const isUnlocked = level.id <= user.currentLevel;
                const isCompleted = level.completed;
                const isCurrent = level.id === user.currentLevel;

                return (
                  <button
                    key={level.id}
                    onClick={() => isUnlocked && onLevelClick(level)}
                    disabled={!isUnlocked}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                      isCurrent
                        ? 'bg-[#00D632]/10 border border-[#00D632]/30'
                        : isCompleted
                        ? 'bg-white/5 border border-white/10'
                        : isUnlocked
                        ? 'bg-white/5 border border-white/10'
                        : 'bg-white/[0.02] border border-white/5 opacity-40'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isCurrent
                          ? 'bg-[#00D632] text-black'
                          : isCompleted
                          ? 'bg-white/20'
                          : isUnlocked
                          ? 'bg-white/10'
                          : 'bg-white/5'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : isUnlocked ? (
                        <Zap className="w-5 h-5" />
                      ) : (
                        <Lock className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-bold">{level.title}</h4>
                      <p className="text-sm text-white/60">
                        {level.requiredXP} XP • ${level.requiredSavings}
                      </p>
                    </div>
                    {isCurrent && (
                      <div className="text-xs font-bold text-[#00D632] bg-[#00D632]/20 px-3 py-1 rounded-full">
                        Active
                      </div>
                    )}
                  </button>
                );
              })}
              <button className="w-full text-white/60 hover:text-white text-sm py-3 font-medium">
                View All Levels →
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onRewardsClick}
              className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 transition-all text-left"
            >
              <Award className="w-8 h-8 text-yellow-400 mb-3" />
              <h4 className="font-bold mb-1">Rewards</h4>
              <p className="text-xs text-white/60">View your badges</p>
            </button>
            <button
              onClick={onStreaksClick}
              className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 transition-all text-left"
            >
              <Flame className="w-8 h-8 text-orange-400 mb-3" />
              <h4 className="font-bold mb-1">Streaks</h4>
              <p className="text-xs text-white/60">{user.streakDays} days</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
