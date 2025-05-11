// app/api/waitlist/route.ts

import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

declare const WAITLIST_EMAILS: KVNamespace; // This tells TypeScript the variable exists

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json() as { email: string };

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email address is required.' }, { status: 400 });
    }

    // This line requires the WAITLIST_EMAILS variable to be provided by the runtime via Binding
    await WAITLIST_EMAILS.put(email, JSON.stringify({ registeredAt: new Date().toISOString() }));

    return NextResponse.json({ message: 'Successfully joined the waitlist!' }, { status: 200 });

  } catch (_error) {
    console.error('Waitlist registration error:', _error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}