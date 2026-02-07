import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const rewards = await prisma.unlockedReward.findMany({
    where: { userId },
  });

  return NextResponse.json(rewards);
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { rewardId, type, name, description } = await request.json();

  const reward = await prisma.unlockedReward.upsert({
    where: { userId_rewardId: { userId, rewardId } },
    create: { rewardId, type, name, description, userId },
    update: {},
  });

  return NextResponse.json(reward);
}
