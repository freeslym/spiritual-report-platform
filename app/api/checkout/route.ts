import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '../../../lib/prisma';

// Lazy initialize Stripe to avoid build-time errors
function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not defined');
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-02-24.acacia',
  });
}

const PRODUCTS = {
  bundle: {
    name: 'Complete Trinity Report',
    description: 'Astrology + Human Design + Gene Keys Full Report',
    price: 3999, // $39.99
  },
  astro: {
    name: 'Astrology Report Only',
    description: 'In-depth natal chart analysis',
    price: 1999, // $19.99
  },
  'human-design': {
    name: 'Human Design Report Only',
    description: 'Complete BodyGraph analysis',
    price: 1999,
  },
  'gene-keys': {
    name: 'Gene Keys Report Only',
    description: 'Gene Keys activation journey',
    price: 1999,
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, productType = 'bundle' } = body;

    const product = PRODUCTS[productType as keyof typeof PRODUCTS] || PRODUCTS.bundle;

    // 创建Stripe Checkout Session
    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/report/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/report/cancel`,
      metadata: {
        userId,
        productType,
      },
      customer_email: undefined, // Let Stripe handle email collection
    });

    // 创建订单记录
    await prisma.order.create({
      data: {
        userId,
        stripeSessionId: session.id,
        amount: product.price,
        currency: 'usd',
        status: 'pending',
        productType,
      },
    });

    return NextResponse.json({ success: true, url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
