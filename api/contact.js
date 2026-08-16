import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, email, message, help } = request.body;

  if (!email || !email.includes('@')) {
    return response.status(400).json({ error: 'A valid email is required.' });
  }

  const helpOptions = Array.isArray(help)
    ? help.join(', ')
    : help || 'None selected';

  try {
    await resend.emails.send({
      from: 'Campaign Site <onboarding@resend.dev>',
      to: 'garrybcii@gmail.com',
      replyTo: email,
      subject: `New campaign message from ${firstName || ''} ${lastName || ''}`.trim(),
      html: `
        <h2>New Campaign Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName || ''} ${lastName || ''}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message || 'No message provided.'}</p>
        <p><strong>Wants to help:</strong> ${helpOptions}</p>
      `,
    });

    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return response.status(500).json({ error: 'Failed to send message.' });
  }
}
