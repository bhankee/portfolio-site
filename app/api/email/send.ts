import { NextResponse } from 'next/server';


const RESEND_EMAIL_API_KEY = process.env.RESEND_EMAIL_API_KEY;


export async function POST() {
    const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${RESEND_EMAIL_API_KEY}`,
        },
        body: JSON.stringify({
            from: 'Acme <onboarding@resend.dev>',
            to: ['delivered@resend.dev'],
            subject: 'hello world',
            html: '<strong>it works!</strong>',
        }),
    });

    if (res.ok) {
        const data = await res.json();
        return Response.json(data);
    }
}