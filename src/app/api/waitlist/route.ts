// app/api/waitlist/route.ts

import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// Next.js API Routeの第二引数として渡される context オブジェクトの型を定義します。
// context.env の中に Binding されたリソースが含まれることを想定しています。
interface Context {
  env: {
    WAITLIST_EMAILS: KVNamespace; // KV Bindingで設定したVariable nameと型を一致させます
  };
}

// POST 関数が context オブジェクトを第2引数として受け取るように変更
// context.env 経由で Binding にアクセスします。
export async function POST(request: NextRequest, context: Context) {
  try {
    const { email } = await request.json() as { email: string };

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email address is required.' }, { status: 400 });
    }

    // context.env オブジェクト経由で WAITLIST_EMAILS にアクセスするように変更
    await context.env.WAITLIST_EMAILS.put(email, JSON.stringify({ registeredAt: new Date().toISOString() }));

    return NextResponse.json({ message: 'Successfully joined the waitlist!' }, { status: 200 });

  } catch (_error) {
    console.error('Waitlist registration error:', _error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
