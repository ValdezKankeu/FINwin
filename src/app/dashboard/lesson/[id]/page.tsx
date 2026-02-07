'use client';

import { useRouter, useParams } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import { LessonScreen } from '@/components/LessonScreen';
import { lessons } from '@/data/mockData';
import { calculateLevel } from '@/lib/calculations';
import { toast } from 'sonner';

export default function LessonPage() {
  const router = useRouter();
  const params = useParams();
  const lessonId = params.id as string;
  const { user, setUser, completedLessons, setCompletedLessons } = useUser();

  const lesson = lessons[lessonId];

  if (!lesson) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <p>Lesson not found</p>
      </div>
    );
  }

  const handleLessonComplete = (xpEarned: number) => {
    setCompletedLessons([...completedLessons, lessonId]);

    if (user) {
      const newXP = user.totalXP + xpEarned;
      setUser({
        ...user,
        totalXP: newXP,
        currentLevel: calculateLevel(newXP),
      });
    }

    toast.success(`+${xpEarned} XP earned!`, {
      description: 'Lesson completed successfully',
    });

    router.push('/dashboard');
  };

  return (
    <LessonScreen
      lesson={lesson}
      onComplete={handleLessonComplete}
      onBack={() => router.push('/dashboard')}
    />
  );
}
