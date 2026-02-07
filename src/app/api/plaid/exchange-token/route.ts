import { NextRequest, NextResponse } from 'next/server';
import { plaidClient, setAccessToken } from '@/lib/plaid';

export async function POST(req: NextRequest) {
  try {
    const { public_token } = await req.json();
    const response = await plaidClient.itemPublicTokenExchange({ public_token });
    setAccessToken(response.data.access_token);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.response?.data || err.message }, { status: 500 });
  }
}
