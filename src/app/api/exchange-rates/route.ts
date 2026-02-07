import { NextResponse } from 'next/server';

export async function GET() {
  const key = process.env.EXCHANGE_RATE_API_KEY;
  const res = await fetch(`https://v6.exchangerate-api.com/v6/${key}/latest/USD`);

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch rates' }, { status: 500 });
  }

  const data = await res.json();
  // Return only currencies relevant to our life paths
  const relevant = ['EUR', 'GBP', 'JPY', 'MXN', 'INR', 'BRL', 'CAD', 'AUD', 'KRW', 'PHP'];
  const rates: Record<string, number> = {};
  for (const code of relevant) {
    if (data.conversion_rates[code]) {
      rates[code] = data.conversion_rates[code];
    }
  }

  return NextResponse.json({ base: 'USD', rates });
}
