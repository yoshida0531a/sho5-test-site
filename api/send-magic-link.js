const { Resend } = require('resend');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if email exists in member list (GitHub or simple JSON file)
    const isMember = await checkMembership(email);
    
    if (!isMember) {
      return res.status(404).json({ message: 'Email not found in member list' });
    }

    // Generate magic link token
    const token = generateMagicToken(email);
    const magicLink = `${req.headers.origin}/gallery-access?token=${token}`;

    // Send magic link via Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@sho5.org',
      to: email,
      subject: 'Your Photo Gallery Access Link',
      html: `
        <h2>Photo Gallery Access</h2>
        <p>Click the link below to access the photo gallery:</p>
        <a href="${magicLink}" style="background: black; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Access Gallery</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `
    });

    res.status(200).json({ message: 'Magic link sent successfully' });
  } catch (error) {
    console.error('Magic link error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function checkMembership(email) {
  // TODO: Implement GitHub API call to check members.json
  // For now, return true for testing
  return true;
}

function generateMagicToken(email) {
  // Simple token generation - in production, use JWT or similar
  const timestamp = Date.now();
  const data = `${email}:${timestamp}`;
  return Buffer.from(data).toString('base64');
}