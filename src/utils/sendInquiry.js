export async function sendInquiry(payload) {
  const response = await fetch('/api/inquiry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.error || 'Unable to send inquiry right now.');
  }

  return data;
}
