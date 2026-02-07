import { NextRequest, NextResponse } from 'next/server';

// Smart fallback when OpenAI is unavailable — gives real advice based on profile
function fallbackReply(message: string, profile: any): string {
  const leftover = profile.income - profile.expenses;
  const savingsRate = Math.round((leftover / profile.income) * 100);
  const msg = message.toLowerCase();

  if (msg.includes('save') || msg.includes('saving')) {
    if (leftover > 0) {
      return `You have $${leftover}/mo left over (${savingsRate}% savings rate). Aim for 20%. Automate a $${Math.min(leftover, Math.round(profile.income * 0.2))}/mo transfer to a high-yield savings account on payday.`;
    }
    return `You're spending more than you earn. Start by cutting $${Math.abs(leftover) + 100}/mo in expenses — audit subscriptions first, then negotiate bills.`;
  }

  if (msg.includes('invest') || msg.includes('stock') || msg.includes('index')) {
    const investAmount = Math.round(leftover * 0.5);
    return `With $${leftover}/mo left over, put $${Math.max(investAmount, 50)}/mo into a low-cost index fund (VTI or VOO). At 7% annual return, that's ~$${Math.round(investAmount * 173.08)} in 10 years.`;
  }

  if (msg.includes('budget') || msg.includes('spend') || msg.includes('expense')) {
    return `Your expenses are ${Math.round((profile.expenses / profile.income) * 100)}% of income. The 50/30/20 rule: $${Math.round(profile.income * 0.5)} needs, $${Math.round(profile.income * 0.3)} wants, $${Math.round(profile.income * 0.2)} savings. You're ${leftover >= profile.income * 0.2 ? 'on track' : 'behind'}.`;
  }

  if (msg.includes('subscription') || msg.includes('netflix') || msg.includes('cut')) {
    return `Average American wastes $133/mo on unused subscriptions. Audit yours — if you use it less than 3x/week, cut it. Redirect savings to your goals.`;
  }

  if (msg.includes('emergency') || msg.includes('fund')) {
    const target = profile.expenses * 6;
    return `Build a 6-month emergency fund: $${target.toLocaleString()}. At $${Math.round(leftover * 0.3)}/mo, you'd hit it in ${Math.round(target / (leftover * 0.3))} months. Use a high-yield savings account (4.5%+ APY).`;
  }

  // Default
  return `With $${profile.income}/mo income and $${profile.expenses}/mo expenses, you have $${leftover}/mo to work with (${savingsRate}% savings rate). ${leftover > 0 ? 'Split it: 50% savings, 30% investments, 20% fun money.' : 'Priority 1: reduce expenses. Cut subscriptions and negotiate your bills.'}`;
}

export async function POST(req: NextRequest) {
  const { message, profile } = await req.json();

  const systemPrompt = `You are FINwin, a sharp financial advisor for young adults. You give short, actionable advice (2-3 sentences max). No fluff.
User profile:
- Age: ${profile.age}
- Monthly income: $${profile.income}
- Monthly expenses: $${profile.expenses}
- Life path: ${profile.lifePath}
- Career: ${profile.careerPath || 'established'}
- Leftover/month: $${profile.income - profile.expenses}

Give specific dollar amounts and percentages when possible. Be direct.`;

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message },
        ],
        max_tokens: 200,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json({ reply: data.choices[0].message.content });
    }
  } catch {
    // Fall through to fallback
  }

  // Fallback: rule-based advice using the user's actual numbers
  return NextResponse.json({ reply: fallbackReply(message, profile) });
}
