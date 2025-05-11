// app/api/waitlist/route.ts

import { NextRequest, NextResponse } from 'next/server';

declare const WAITLIST_EMAILS: KVNamespace;

export async function POST(request: NextRequest) {
  try {
    // 1. リクエストボディからメールアドレスを取得し、型アサーションを追加
    const { email } = await request.json() as { email: string };

    // 2. 基本的な入力検証
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email address is required.' }, { status: 400 });
    }

    // Cloudflare Workers KV に保存
    // 環境変数やBindingの設定が必要です (後述)
    // KVNamespace WAITLIST_EMAILS は Cloudflare Pages の設定でBindingされます
    await WAITLIST_EMAILS.put(email, JSON.stringify({ registeredAt: new Date().toISOString() }));

    // 成功レスポンスを返す
    return NextResponse.json({ message: 'Successfully joined the waitlist!' }, { status: 200 });

  } catch (error: any) {
    console.error('Waitlist registration error:', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}