// app/api/waitlist/route.ts

import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// Cloudflare Pages FunctionsのBindingは、通常 env オブジェクト経由でアクセスします。
// TypeScriptのために、env オブジェクトの型を定義しておきます。
interface Env {
  WAITLIST_EMAILS: KVNamespace; // KV Bindingで設定したVariable nameと型を一致させます
}

// POST 関数が env オブジェクトを第2引数として受け取るように変更
export async function POST(request: NextRequest, env: Env) {
  try {
    const { email } = await request.json() as { email: string };

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email address is required.' }, { status: 400 });
    }

    // env オブジェクト経由で WAITLIST_EMAILS にアクセスするように変更
    await env.WAITLIST_EMAILS.put(email, JSON.stringify({ registeredAt: new Date().toISOString() }));

    return NextResponse.json({ message: 'Successfully joined the waitlist!' }, { status: 200 });

  } catch (_error) {
    console.error('Waitlist registration error:', _error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
