import { useState } from 'react';
import { Welcome } from './components/Welcome';
import { NameInput } from './components/NameInput';
import { AgeInput } from './components/AgeInput';
import { GoalsSelection } from './components/GoalsSelection';
import { ParentLink } from './components/ParentLink';
import { Dashboard } from './components/Dashboard';
import { LessonScreen } from './components/LessonScreen';
import { DepositFlow } from './components/DepositFlow';
import { StreaksScreen } from './components/StreaksScreen';
import { RewardsScreen } from './components/RewardsScreen';
import { User, SavingsGoal, Level, Reward, Screen } from './types';
import { lessons } from './data/mockData';
import { toast, Toaster } from 'sonner';

export default function App() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [user, setUser] = useState<User>({
    name: '',
    age: 0,
    totalSaved: 0,
    totalXP: 0,
    currentLevel: 1,
    streakDays: 0,
  });
  const [goal, setGoal] = useState<SavingsGoal | null>(null);
  const [currentLesson, setCurrentLesson] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [unlockedRewards, setUnlockedRewards] = useState<Reward[]>([]);

  // Check if current level's lesson is completed
  const hasCompletedCurrentLesson = completedLessons.includes(
    'needs-vs-wants' // First lesson
  );

  const handleNameSubmit = (name: string) => {
    setUser((prev) => ({ ...prev, name }));
    setScreen('age-input');
  };

  const handleAgeSubmit = (age: number) => {
    setUser((prev) => ({ ...prev, age }));
    setScreen('goals-selection');
  };

  const handleGoalSelect = (selectedGoal: SavingsGoal) => {
    setGoal(selectedGoal);
    setScreen('parent-link');
  };

  const handleParentLink = (parentEmail?: string) => {
    if (parentEmail) {
      toast.success('Parent invite sent!');
    }
    setScreen('dashboard');
  };

  const handleLevelClick = (level: Level) => {
    setCurrentLesson(level.lessonId);
    setScreen('lesson');
  };

  const handleLessonComplete = (xpEarned: number) => {
    if (currentLesson) {
      setCompletedLessons((prev) => [...prev, currentLesson]);
    }

    setUser((prev) => {
      const newXP = prev.totalXP + xpEarned;
      const newLevel = calculateLevel(newXP);

      return {
        ...prev,
        totalXP: newXP,
        currentLevel: newLevel,
      };
    });

    toast.success(`+${xpEarned} XP earned!`, {
      description: 'Lesson completed successfully',
    });

    setCurrentLesson(null);
    setScreen('dashboard');
  };

  const handleDeposit = (amount: number) => {
    if (!goal) return;

    const xpMultiplier = hasCompletedCurrentLesson ? 2 : 1;
    const xpEarned = amount * xpMultiplier;

    setGoal((prev) =>
      prev
        ? {
            ...prev,
            currentAmount: prev.currentAmount + amount,
          }
        : null
    );

    setUser((prev) => {
      const newXP = prev.totalXP + xpEarned;
      const newLevel = calculateLevel(newXP);
      const newTotalSaved = prev.totalSaved + amount;
      const newStreak = prev.streakDays + 1;

      return {
        ...prev,
        totalSaved: newTotalSaved,
        totalXP: newXP,
        currentLevel: newLevel,
        streakDays: newStreak,
        lastSaveDate: new Date().toISOString(),
      };
    });

    // Check for milestone achievements
    if (amount >= 10 && user.totalSaved === 0) {
      toast.success('Badge Unlocked: First Save! 🎯');
      setUnlockedRewards((prev) => [
        ...prev,
        {
          id: 'first-save',
          type: 'badge',
          name: 'First Save',
          description: 'Made your first deposit!',
          unlocked: true,
          dateUnlocked: new Date().toISOString(),
        },
      ]);
    }

    toast.success(`$${amount} deposited!`, {
      description: `+${xpEarned} XP earned${
        xpMultiplier > 1 ? ' (2x bonus!)' : ''
      }`,
    });

    setScreen('dashboard');
  };

  const calculateLevel = (xp: number): number => {
    if (xp >= 1000) return 6;
    if (xp >= 600) return 5;
    if (xp >= 400) return 4;
    if (xp >= 250) return 3;
    if (xp >= 120) return 2;
    return 1;
  };

  return (
    <div className="font-sans">
      <Toaster position="top-center" richColors />

      {screen === 'welcome' && (
        <Welcome onGetStarted={() => setScreen('name-input')} />
      )}

      {screen === 'name-input' && <NameInput onNext={handleNameSubmit} />}

      {screen === 'age-input' && (
        <AgeInput name={user.name} onNext={handleAgeSubmit} />
      )}

      {screen === 'goals-selection' && (
        <GoalsSelection name={user.name} onNext={handleGoalSelect} />
      )}

      {screen === 'parent-link' && <ParentLink onNext={handleParentLink} />}

      {screen === 'dashboard' && goal && (
        <Dashboard
          user={user}
          goal={goal}
          onDeposit={() => setScreen('deposit')}
          onLevelClick={handleLevelClick}
          onStreaksClick={() => setScreen('streaks')}
          onRewardsClick={() => setScreen('rewards')}
        />
      )}

      {screen === 'lesson' && currentLesson && (
        <LessonScreen
          lesson={lessons[currentLesson]}
          onComplete={handleLessonComplete}
          onBack={() => setScreen('dashboard')}
        />
      )}

      {screen === 'deposit' && goal && (
        <DepositFlow
          goal={goal}
          hasCompletedLesson={hasCompletedCurrentLesson}
          onDeposit={handleDeposit}
          onBack={() => setScreen('dashboard')}
        />
      )}

      {screen === 'streaks' && (
        <StreaksScreen
          currentStreak={user.streakDays}
          longestStreak={user.streakDays}
          onBack={() => setScreen('dashboard')}
        />
      )}

      {screen === 'rewards' && (
        <RewardsScreen
          unlockedRewards={unlockedRewards}
          totalXP={user.totalXP}
          currentLevel={user.currentLevel}
          onBack={() => setScreen('dashboard')}
        />
      )}
    </div>
  );
}
