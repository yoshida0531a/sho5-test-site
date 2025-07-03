const Stripe = require('stripe');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { plan } = req.body;

    let priceData;
    if (plan === 'monthly') {
      priceData = {
        currency: 'jpy',
        product_data: {
          name: 'Photo Gallery Monthly Membership',
          description: 'Access to exclusive photo gallery content',
        },
        unit_amount: 500, // ¥500
        recurring: {
          interval: 'month',
        },
      };
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: priceData,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/gallery.html`,
      customer_email: req.body.email || undefined,
      metadata: {
        plan: plan
      }
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}