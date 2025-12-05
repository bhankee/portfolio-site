import { NextResponse } from "next/server";

const RESEND_EMAIL_API_KEY = process.env.RESEND_EMAIL_API_KEY;
const RESUME_URL = process.env.RESUME_URL;

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json(
      { error: "Missing email address" },
      { status: 400 }
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_EMAIL_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Brad Hankee <onboarding@resend.dev>", // must be a verified sender
      reply_to: "brad.hankee@gmail.com", // <-- THIS makes replies go to you
      to: [email],
      subject: "Brad Hankee's Resume",
      html: `
        <div style="font-family: sans-serif; line-height: 1.5;">
          <h2>Here’s your copy of my resume. Please reach out if you have any questions.</h2>
          <p>Thanks for checking out my portfolio! You can download my resume below:</p>
          <p>
            <a href="${RESUME_URL}" 
               style="background:#2563eb; color:white; padding:10px 16px; border-radius:6px; text-decoration:none;">
                Download Brad's Resume
            </a>
          </p>
          <p>If you have any questions or want to chat, feel free to reply directly to this email!</p>
        </div>
      `,
    }),
  });

  if (res.ok) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { error: "Failed to send resume email" },
    { status: 500 }
  );
}
