import { NextResponse } from 'next/server';
import { plaidClient } from '@/lib/plaid';
import { CountryCode, Products } from 'plaid';

export async function POST() {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id: 'finwin-demo-user' },
      client_name: 'FINwin',
      products: [Products.Transactions],
      country_codes: [CountryCode.Us],
      language: 'en',
    });
    return NextResponse.json({ link_token: response.data.link_token });
  } catch (err: any) {
    return NextResponse.json({ error: err?.response?.data || err.message }, { status: 500 });
  }
}
