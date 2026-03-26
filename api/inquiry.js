import { Resend } from 'resend';

function formatField(label, value) {
  return `<p><strong>${label}:</strong> ${String(value || '').trim() || '-'}</p>`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.INQUIRY_TO_EMAIL || 'Kevin@westwoodnw.com';
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
    timeline = '',
    message = '',
    preference = '',
    checkSize = '',
    accredited = '',
    photos = '',
  } = req.body || {};

  const resend = new Resend(resendApiKey);
  const trimmedEmail = String(email || '').trim();
  const resolvedTiming = String(timing || timeline || '').trim();
  const fields = [
    ['Source', source],
    ['Name', name],
    ['Email', trimmedEmail],
    ['Phone', phone],
    ['Address', address],
    ['Goal', goal],
    ['Timing', resolvedTiming],
    ['Check size', checkSize],
    ['Accredited', accredited],
    ['Return preference', preference],
    ['Photo links', photos],
    ['Message', message],
  ];
  const textBody = fields
    .filter(([label, value]) => ['Source', 'Name', 'Email'].includes(label) || String(value || '').trim())
    .map(([label, value]) => `${label}: ${String(value || '').trim() || '-'}`)
    .join('\n');
  const htmlBody = fields
    .filter(([label, value]) => ['Source', 'Name', 'Email'].includes(label) || String(value || '').trim())
    .map(([label, value]) => formatField(label, value))
    .join('');

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `Westwood website inquiry: ${source}`,
      replyTo: trimmedEmail || undefined,
      text: textBody,
      html: `
        <h2>New inquiry from Westwood website</h2>
        ${htmlBody}
      `,
    });

    if (error) {
      return res.status(500).json({
        error: error.message || 'Email provider rejected this request.',
      });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    const message = error?.message || 'Failed to send inquiry email.';
    // Common setup issue with Resend: unverified sender domain or restricted recipient in test mode.
    if (message.toLowerCase().includes('verify') || message.toLowerCase().includes('test mode')) {
      return res.status(500).json({
        error: `${message} Check RESEND_API_KEY, INQUIRY_FROM_EMAIL (verified domain), and recipient permissions.`,
      });
    }
    return res.status(500).json({
      error: message,
    });
  }
}
