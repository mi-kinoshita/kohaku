// app/api/waitlist/route.ts

import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// POST 関数が env オブジェクトを第2引数として受け取るように変更し、
// その場で型を定義します。
export async function POST(request: NextRequest, env: { WAITLIST_EMAILS: KVNamespace }) {
  try {
    const { email } = await request.json() as { email: string };

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email address is required.' }, { status: 400 });
    }

    // env オブジェクト経由で WAITLIST_EMAILS にアクセスします。
    await env.WAITLIST_EMAILS.put(email, JSON.stringify({ registeredAt: new Date().toISOString() }));

    return NextResponse.json({ message: 'Successfully joined the waitlist!' }, { status: 200 });

  } catch (_error) {
    console.error('Waitlist registration error:', _error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
