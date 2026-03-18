import { Resend } from 'resend';

function formatField(label, value) {
  return `<p><strong>${label}:</strong> ${String(value || '').trim() || '-'}</p>`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.INQUIRY_TO_EMAIL || 'kevin@westwoodnw.com';
  const fromEmail = process.env.INQUIRY_FROM_EMAIL || 'Westwood Inquiries <onboarding@resend.dev>';

  if (!resendApiKey) {
    return res.status(500).json({
      error: 'Server email service is not configured yet.',
    });
  }

  const {
    source = 'General Inquiry',
    name = '',
    email = '',
    phone = '',
    address = '',
    goal = '',
    timing = '',
    message = '',
    preference = '',
    checkSize = '',
    accredited = '',
    photos = '',
  } = req.body || {};

  const resend = new Resend(resendApiKey);

  try {
    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `Westwood website inquiry: ${source}`,
      html: `
        <h2>New inquiry from Westwood website</h2>
        ${formatField('Source', source)}
        ${formatField('Name', name)}
        ${formatField('Email', email)}
        ${formatField('Phone', phone)}
        ${formatField('Address', address)}
        ${formatField('Goal', goal)}
        ${formatField('Timing', timing)}
        ${formatField('Check size', checkSize)}
        ${formatField('Accredited', accredited)}
        ${formatField('Return preference', preference)}
        ${formatField('Photo links', photos)}
        ${formatField('Message', message)}
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({
      error: error?.message || 'Failed to send inquiry email.',
    });
  }
}
