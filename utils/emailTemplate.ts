// utils/emailTemplate.ts
export const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export const buildContactEmailHtml = (
  fromEmail: string,
  rawMessage: string
) => {
  const safeEmail = escapeHtml(fromEmail || "Unknown");
  const safeMessage = escapeHtml(rawMessage || "");

  return `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>New Message</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Preheader text (hidden in most clients, shows in inbox preview) -->
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      New message from ${safeEmail} — open to read and reply.
    </div>
    <style>
      /* Dark mode support (clients that understand it) */
      @media (prefers-color-scheme: dark) {
        .bg { background-color: #0f1216 !important; }
        .card { background-color: #161a20 !important; color: #e6e6e6 !important; }
        .muted { color: #a8b3cf !important; }
        .pill { background-color: #1f2630 !important; color: #dbe3ff !important; }
        .btn { background: linear-gradient(135deg,#4f8cff,#7b66ff) !important; color: #ffffff !important; }
        .divider { background-color: #263040 !important; }
      }

      /* Mobile fixes */
      @media only screen and (max-width: 600px) {
        .container { width: 100% !important; }
        .px { padding-left: 20px !important; padding-right: 20px !important; }
        .card { border-radius: 16px !important; }
      }
    </style>
  </head>
  <body class="bg" style="margin:0; padding:0; background-color:#f6f8fb;">
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#f6f8fb;">
      <tr>
        <td align="center" style="padding: 32px 16px;">
          <!-- Container -->
          <table class="container" role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="width:600px; max-width:600px;">
            <!-- Header -->
            <tr>
              <td align="center" style="padding: 0 0 16px 0;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-radius:18px; overflow:hidden; background:linear-gradient(135deg,#6aa7ff,#7b66ff);">
                  <tr>
                    <td align="left" class="px" style="padding: 22px 28px;">
                      <div style="font-family: Arial, Helvetica, sans-serif; color:#ffffff; font-size:14px; letter-spacing:.4px; opacity:.95;">New Message</div>
                      <div style="font-family: Arial, Helvetica, sans-serif; color:#ffffff; font-size:22px; font-weight:700; margin-top:4px;">
                        From your portfolio contact form
                      </div>
                    </td>
                    <td align="right" class="px" style="padding: 0 28px;">
                      <div aria-hidden="true" style="font-size:32px; line-height:32px; padding-top:22px; color:#ffffff;">📬</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Card -->
            <tr>
              <td>
                <table class="card" role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#ffffff; border-radius:18px; box-shadow:0 8px 30px rgba(16,24,40,.08);">
                  <tr>
                    <td class="px" style="padding: 28px 28px 8px 28px; font-family: Arial, Helvetica, sans-serif; color:#0f172a;">
                      <div class="muted" style="font-size:12px; color:#667085; text-transform:uppercase; letter-spacing:.6px; margin-bottom:10px;">Sender</div>
                      <span class="pill" style="display:inline-block; font-family: Arial, Helvetica, sans-serif; font-size:14px; padding:8px 12px; border-radius:999px; background:#eef2ff; color:#3538cd; border:1px solid #e0e7ff;">
                        ${safeEmail}
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td class="px" style="padding: 18px 28px 0 28px; font-family: Arial, Helvetica, sans-serif;">
                      <div class="muted" style="font-size:12px; color:#667085; text-transform:uppercase; letter-spacing:.6px; margin-bottom:10px;">Message</div>
                      <div style="white-space:pre-wrap; word-wrap:break-word; font-size:15px; line-height:1.6; color:#0f172a; background:#fafafb; border:1px solid #edf0f7; border-radius:12px; padding:16px;">
                        ${safeMessage}
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td class="px" style="padding: 22px 28px 8px 28px;">
                      <div class="divider" style="height:1px; background:#edf0f7;"></div>
                    </td>
                  </tr>

                  <tr>
                    <td class="px" style="padding: 18px 28px 28px 28px; font-family: Arial, Helvetica, sans-serif;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td>
                            <!-- CTA button: reply directly -->
                            <a class="btn" href="mailto:${safeEmail}?subject=Re:%20Your%20message" style="display:inline-block; text-decoration:none; font-weight:700; font-family: Arial, Helvetica, sans-serif; font-size:14px; line-height:1; padding:12px 18px; border-radius:999px; background:linear-gradient(135deg,#635bff,#22c1c3); color:#ffffff;">
                              Reply to ${safeEmail}
                            </a>
                          </td>
                          <td width="12" style="width:12px;"></td>
                          <td class="muted" style="font-size:12px; color:#667085;">
                            or forward this email to a teammate.
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding: 16px 10px 0 10px; font-family: Arial, Helvetica, sans-serif; color:#98a2b3; font-size:12px;">
                <div class="muted">You’re receiving this because someone submitted your portfolio contact form.</div>
                <div class="muted" style="margin-top:6px;">© ${new Date().getFullYear()} Awais Dev</div>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `;
};
