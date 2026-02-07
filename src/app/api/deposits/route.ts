import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { cookies } from 'next/headers';
import { calculateLevel } from '@/lib/calculations';

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { amount, xpEarned } = await request.json();

  const deposit = await prisma.deposit.create({
    data: {
      amount,
      xpEarned,
      userId,
    },
  });

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      totalSaved: { increment: amount },
      totalXP: { increment: xpEarned },
      streakDays: { increment: 1 },
      lastSaveDate: new Date(),
    },
  });

  // Update level
  const newLevel = calculateLevel(user.totalXP);
  if (newLevel !== user.currentLevel) {
    await prisma.user.update({
      where: { id: userId },
      data: { currentLevel: newLevel },
    });
  }

  // Update goal
  await prisma.savingsGoal.updateMany({
    where: { userId },
    data: { currentAmount: { increment: amount } },
  });

  return NextResponse.json({ deposit, user });
}
