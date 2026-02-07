import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { amount, goalName } = await req.json();

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `FINwin Savings: ${goalName}`,
              description: `One-time savings deposit toward your ${goalName} goal`,
            },
            unit_amount: amount * 100, // cents
          },
          quantity: 1,
        },
      ],
      success_url: `${req.nextUrl.origin}?saved=true&amount=${amount}`,
      cancel_url: `${req.nextUrl.origin}?saved=false`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
