// lib/email.ts

export async function sendEmail({
  to,
  toName,
  subject,
  htmlContent,
  attachments,
  senderName = process.env.BREVO_SENDER_NAME,
  senderEmail = process.env.BREVO_SENDER_EMAIL,
}: {
  to: string;
  toName: string;
  subject: string;
  htmlContent: string;
  attachments?: { name: string; content: string }[];
  senderName?: string;
  senderEmail?: string;
}) {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": process.env.BREVO_API_KEY!,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: to, name: toName }],
      subject,
      htmlContent,
      ...(attachments?.length && { attachment: attachments }),
    }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
