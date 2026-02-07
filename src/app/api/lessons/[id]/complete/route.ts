import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { cookies } from 'next/headers';
import { calculateLevel } from '@/lib/calculations';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { xpEarned } = await request.json();
  const { id: lessonId } = await params;

  // Mark lesson complete
  await prisma.completedLesson.upsert({
    where: { userId_lessonId: { userId, lessonId } },
    create: { lessonId, xpEarned, userId },
    update: {},
  });

  // Update user XP
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      totalXP: { increment: xpEarned },
    },
  });

  const newLevel = calculateLevel(user.totalXP);
  if (newLevel !== user.currentLevel) {
    await prisma.user.update({
      where: { id: userId },
      data: { currentLevel: newLevel },
    });
  }

  return NextResponse.json({ success: true });
}
