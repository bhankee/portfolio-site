import { NextResponse } from 'next/server';


const RESEND_EMAIL_API_KEY = process.env.RESEND_EMAIL_API_KEY;


export async function POST(request: Request) {

    const body = await request.json();

    const { message, email } = body;

    // Check if the required fields are present
    if (!message || !email) {
        return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 }
        );
    }

    const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${RESEND_EMAIL_API_KEY}`,
        },
        body: JSON.stringify({
            from: 'Brads Portfolio <onboarding@resend.dev>',
            to: ['brad.hankee@gmail.com'],
            subject: 'Email sent from portfolio',
            html: `<strong>${message}</strong>`,
        }),
    });

    if (res.ok) {
        const data = await res.json();
        return Response.json(data);
    } else {
        return NextResponse.json(
            { message: "Email sending failed", error: res.statusText },
            { status: 400 }
        );
    }
}