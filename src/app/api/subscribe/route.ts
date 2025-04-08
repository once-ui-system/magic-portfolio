import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend("re_BQr8msqM_EgQxRGqhbQXnSLUsWbyk8fuw");

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    resend.contacts.create({
      email: email,
      unsubscribed: false,
      audienceId: "6d36e6bf-d015-4ded-91e3-96d4e7bce844",
    });

    resend.emails.send({
      from: "Yannick's Blog <support@toonifyai.live>",
      to: email,
      subject: "Welcome to Our Blog Newsletter!",
      html: `
       <h1>Welcome to Our Blog Newsletter!</h1>
        <p>Thank you for subscribing to our blog newsletter. We're excited to share our latest content with you!</p>
        <p>You'll receive updates about our newest blog posts and other exciting content.</p>
        <p>If you ever want to unsubscribe, you can do so by clicking the unsubscribe link in any of our emails.</p>
      
      `,
    });

    return NextResponse.json(
      { message: "Successfully subscribed to newsletter" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return NextResponse.json(
      { error: "Failed to subscribe to newsletter" },
      { status: 500 }
    );
  }
}
