# Sho5 Membership Site

A membership-based photo gallery site with Stripe integration and magic link authentication.

## Features

- Clean white/black design matching main site
- Stripe subscription payments (¥500/month)
- Magic link authentication for gallery access
- Email-only member management (privacy-focused)
- GitHub-based member list storage
- Vercel deployment for mobile/tablet testing

## Setup

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd sho5-test-site
   npm install
   ```

2. **Environment variables:**
   Copy `.env.example` to `.env.local` and fill in your API keys:
   - Stripe keys (test mode)
   - Resend API key for email sending
   - GitHub token for member list management

3. **Deploy to Vercel:**
   ```bash
   npx vercel
   ```

## Architecture

```
GitHub (members.json) ← Vercel (webhooks + API) ← Stripe (payments)
                     ↓
                  Resend (magic links)
```

## API Endpoints

- `POST /api/create-checkout-session` - Create Stripe checkout
- `POST /api/send-magic-link` - Send gallery access link
- `POST /api/webhook` - Handle Stripe webhooks

## Member Management

Members are stored in `members.json` with email-only data:
```json
{
  "members": [
    {
      "email": "user@example.com",
      "joined": "2025-01-01T00:00:00Z", 
      "status": "active"
    }
  ]
}
```

## Testing

- Use Stripe test cards for payment testing
- Test magic links with any email during development
- Mobile/tablet testing available via Vercel deployment

## Privacy

- Only email addresses are stored
- No personal information collected
- GDPR-compliant approach