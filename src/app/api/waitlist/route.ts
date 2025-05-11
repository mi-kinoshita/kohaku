// app/api/waitlist/route.ts

import { NextRequest, NextResponse } from 'next/server';

declare const WAITLIST_EMAILS: KVNamespace;

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json() as { email: string };

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email address is required.' }, { status: 400 });
    }

    await WAITLIST_EMAILS.put(email, JSON.stringify({ registeredAt: new Date().toISOString() }));

    return NextResponse.json({ message: 'Successfully joined the waitlist!' }, { status: 200 });

  } catch (_error) { // ': any' を削除しました。変数名も _error に変更。
    console.error('Waitlist registration error:', _error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}