const Stripe = require('stripe');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).json({ message: 'Webhook signature verification failed' });
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        await handleSuccessfulPayment(session);
        break;
      
      case 'customer.subscription.deleted':
        const subscription = event.data.object;
        await handleCancelledSubscription(subscription);
        break;
      
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function handleSuccessfulPayment(session) {
  try {
    const customerEmail = session.customer_email || session.customer_details?.email;
    
    if (customerEmail) {
      // Add email to member list (GitHub API)
      await addToMemberList(customerEmail);
      
      // Send welcome email with magic link
      await sendWelcomeEmail(customerEmail);
    }
  } catch (error) {
    console.error('Error handling successful payment:', error);
  }
}

async function handleCancelledSubscription(subscription) {
  try {
    // TODO: Get customer email and remove from member list
    // const customer = await stripe.customers.retrieve(subscription.customer);
    // await removeFromMemberList(customer.email);
  } catch (error) {
    console.error('Error handling cancelled subscription:', error);
  }
}

async function addToMemberList(email) {
  // TODO: Implement GitHub API call to update members.json
  console.log(`Adding ${email} to member list`);
}

async function sendWelcomeEmail(email) {
  // TODO: Send welcome email with magic link
  console.log(`Sending welcome email to ${email}`);
}