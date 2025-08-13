import { NextResponse } from "next/server";
import { sendEmail } from "@/utils/email";
import { buildContactEmailHtml } from "@/utils/emailTemplate";

export async function POST(req: Request) {
  try {
    const { email, message } = await req.json();

    if (!email || !message) {
      return NextResponse.json(
        { ok: false, error: "Email and message are required" },
        { status: 400 }
      );
    }

    await sendEmail({
      to: "awaissmr@gmail.com",
      toName: "Awais Dev",
      subject: `New Message from ${email || "Unknown"}`,
      htmlContent: buildContactEmailHtml(email, message),
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
