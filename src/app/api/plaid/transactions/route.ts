import { NextResponse } from 'next/server';
import { plaidClient, accessToken } from '@/lib/plaid';

export async function GET() {
  if (!accessToken) {
    return NextResponse.json({ error: 'No bank linked yet' }, { status: 400 });
  }

  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const response = await plaidClient.transactionsGet({
      access_token: accessToken,
      start_date: thirtyDaysAgo.toISOString().split('T')[0],
      end_date: now.toISOString().split('T')[0],
    });

    const transactions = response.data.transactions.map(t => ({
      name: t.name,
      amount: t.amount,
      category: t.personal_finance_category?.primary || t.category?.[0] || 'Other',
      date: t.date,
    }));

    const accounts = response.data.accounts.map(a => ({
      name: a.name,
      type: a.type,
      balance: a.balances.current,
    }));

    // Group spending by category
    const byCategory: Record<string, number> = {};
    for (const t of transactions) {
      if (t.amount > 0) { // Plaid: positive = money out
        byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
      }
    }

    return NextResponse.json({ transactions, accounts, byCategory });
  } catch (err: any) {
    // Sandbox may need a moment after linking
    if (err?.response?.data?.error_code === 'PRODUCT_NOT_READY') {
      return NextResponse.json({ error: 'Transactions are loading. Try again in a few seconds.' }, { status: 202 });
    }
    return NextResponse.json({ error: err?.response?.data || err.message }, { status: 500 });
  }
}
