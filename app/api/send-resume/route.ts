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
      from: "Brad Hankee <onboarding@resend.dev>",
      reply_to: "brad.hankee@gmail.com",
      to: [email],
      subject: "Brad Hankee's Resume",
      html: `
  <div style="
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: #f7f7f9;
    padding: 32px 0;
    text-align: center;
  ">

    <div style="
      max-width: 560px;
      margin: auto;
      background: white;
      padding: 32px 28px;
      border-radius: 12px;
      border: 1px solid #e5e7eb;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      text-align: left;
    ">
      
      <!-- Header -->
      <h2 style="margin: 0 0 12px; color: #1e3a8a; font-size: 24px;">
        Copy of Brad's Resume
      </h2>

      <p style="margin: 0 0 20px; color: #4b5563; font-size: 15px; line-height: 1.6;">
        Thanks for taking the time to explore my work.  
        I've included an easy download link to my latest resume below:
      </p>

      <!-- CTA Button -->
      <div style="margin: 28px 0;">
        <a href="${RESUME_URL}"
           style="
             display: inline-block;
             background: linear-gradient(90deg, #facc15, #fb923c);
             color: #1f2937;
             padding: 14px 22px;
             font-size: 16px;
             font-weight: bold;
             border-radius: 8px;
             text-decoration: none;
           ">
          Download Brad's Resume
        </a>
      </div>

      <!-- Divider -->
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />

      <!-- Footer Note -->
      <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin-bottom: 0;">
        If you have any questions, want to discuss a role, or would like more examples of my work,  
        just reply directly to this email — it goes straight to me.
      </p>

      <p style="color: #1e3a8a; font-size: 14px; font-weight: bold; margin-top: 16px;">
        — Brad Hankee
      </p>
    </div>

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
