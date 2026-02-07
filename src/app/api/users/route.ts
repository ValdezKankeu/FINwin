import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, age, goal } = body;

  const user = await prisma.user.create({
    data: {
      name,
      age,
      goal: goal
        ? {
            create: {
              name: goal.name,
              targetAmount: goal.targetAmount,
              currentAmount: 0,
              category: goal.category,
            },
          }
        : undefined,
    },
    include: { goal: true },
  });

  const cookieStore = await cookies();
  cookieStore.set('userId', user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
  });

  return NextResponse.json(user);
}

export async function GET() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;
  if (!userId) return NextResponse.json(null, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      goal: true,
      completedLessons: true,
      rewards: true,
    },
  });

  if (!user) return NextResponse.json(null, { status: 404 });

  return NextResponse.json(user);
}
