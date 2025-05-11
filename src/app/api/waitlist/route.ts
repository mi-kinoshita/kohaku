// app/api/waitlist/route.ts

import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// POST 関数が env オブジェクトを第2引数として受け取るように定義し、
// TypeScript のエラー回避のため、型を any に指定します。
// ランタイムでは、この env オブジェクトに Binding されたリソースが含まれることを期待します。
export async function POST(request: NextRequest, env: any) { // <- env に : any を追加
  try {
    const { email } = await request.json() as { email: string };

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email address is required.' }, { status: 400 });
    }

    // env オブジェクトが { WAITLIST_EMAILS: KVNamespace } の構造を持つと
    // TypeScript にアサーションしてアクセスします。
    // env が any 型なので、TypeScriptはここでのアクセスを許可します。
    // ランタイムで WAITLIST_EMAILS が存在するかは Cloudflare の Binding 設定に依存します。
    await (env as { WAITLIST_EMAILS: KVNamespace }).WAITLIST_EMAILS.put(email, JSON.stringify({ registeredAt: new Date().toISOString() }));

    return NextResponse.json({ message: 'Successfully joined the waitlist!' }, { status: 500 });

  } catch (_error) {
    // エラーログに env オブジェクトの内容を含めて、デバッグ情報を増やします
    console.error('Waitlist registration error:', _error);
    console.error('Environment object:', env); // env オブジェクトの内容を出力
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
