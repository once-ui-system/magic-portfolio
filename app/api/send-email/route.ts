import { NextResponse } from "next/server";
import { sendEmail } from "@/utils/email";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { email, message } = await req.json();

    if (!email || !message) {
      return NextResponse.json(
        { ok: false, error: "Email and message are required" },
        { status: 400 }
      );
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <h3 style="color: #333;">New Message from the portfolio</h3>
        <p style="margin-bottom: 10px;"><strong>Email:</strong> <span style="color: #0070f3;">${email}</span></p>
        <p style="margin-bottom: 10px;"><strong>Message:</strong> ${message}</p>
      </div>
    `;

    await sendEmail({
      to: "awaissmr@gmail.com",
      toName: "Awais Dev",
      subject: `New Message from ${email || "Unknown"}`,
      htmlContent,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
