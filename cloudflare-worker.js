// Cloudflare Worker for Stripe Webhook
export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const body = await request.json();
      
      // Stripe webhook verification (簡易版)
      if (body.type === 'checkout.session.completed') {
        const customerEmail = body.data.object.customer_email || 
                             body.data.object.customer_details?.email;
        
        if (customerEmail) {
          // GitHub Actions をトリガー
          await triggerGitHubAction(customerEmail, env);
          
          return new Response('Success', { status: 200 });
        }
      }
      
      return new Response('No action needed', { status: 200 });
      
    } catch (error) {
      console.error('Error:', error);
      return new Response('Internal error', { status: 500 });
    }
  }
};

async function triggerGitHubAction(email, env) {
  const response = await fetch(`https://api.github.com/repos/${env.GITHUB_REPO_OWNER}/${env.GITHUB_REPO_NAME}/dispatches`, {
    method: 'POST',
    headers: {
      'Authorization': `token ${env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event_type: 'stripe_payment_completed',
      client_payload: {
        email: email,
        timestamp: new Date().toISOString()
      }
    })
  });
  
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }
}