import { NextRequest, NextResponse } from 'next/server';

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

    // 模拟支付模式：直接返回成功页 URL
    const mockSessionId = `mock_session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const successUrl = `${process.env.NEXT_PUBLIC_APP_URL}/report/success?session_id=${mockSessionId}`;

    console.log(`[MOCK PAYMENT] Simulated successful payment for user ${userId}, product ${productType}`);

    return NextResponse.json({
      success: true,
      checkoutUrl: successUrl,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
