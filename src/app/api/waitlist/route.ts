// app/api/waitlist/route.ts

import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// POST 関数が env オブジェクトを第2引数として受け取るように定義します。
// Next.js のビルドシステムとの互換性のため、型は any とします。
// ランタイムでは、この env オブジェクトに Binding されたリソースが含まれることを期待します。
export async function POST(request: NextRequest, env: any) {
  try {
    const { email } = await request.json() as { email: string };

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email address is required.' }, { status: 400 });
    }

    // env オブジェクト経由で WAITLIST_EMAILS にアクセスします。
    // ここで env.WAITLIST_EMAILS がランタイムで定義されていることを期待します。
    await env.WAITLIST_EMAILS.put(email, JSON.stringify({ registeredAt: new Date().toISOString() }));

    return NextResponse.json({ message: 'Successfully joined the waitlist!' }, { status: 200 });

  } catch (_error) {
    // エラーログに env オブジェクトの内容を含めて、デバッグ情報を増やします
    console.error('Waitlist registration error:', _error);
    console.error('Environment object:', env); // env オブジェクトの内容を出力
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
