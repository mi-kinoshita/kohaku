// // app/api/waitlist/route.ts

// import { NextRequest, NextResponse } from 'next/server';

// // Cloudflare Workers KV の型定義 (開発環境用、デプロイ時は不要)
// // declare const WAITLIST_EMAILS: KVNamespace;

// export async function POST(request: NextRequest) {
//   try {
//     const { email } = await request.json();

//     if (!email) {
//       return NextResponse.json({ error: 'メールアドレスが必要です。' }, { status: 400 });
//     }

//     // メールアドレスの基本的な検証 (より厳密に行うのが望ましい)
//     if (!email.includes('@')) {
//          return NextResponse.json({ error: '無効なメールアドレス形式です。' }, { status: 400 });
//     }


//     // Cloudflare Workers KV に保存
//     // 環境変数やBindingの設定が必要です (後述)
//     // KVNamespace WAITLIST_EMAILS は Cloudflare Pages の設定でBindingされます
//     await WAITLIST_EMAILS.put(email, JSON.stringify({ registeredAt: new Date().toISOString() }));

//     return NextResponse.json({ message: '登録に成功しました！' }, { status: 200 });

//   } catch (error) {
//     console.error('Waitlist registration error:', error);
//     return NextResponse.json({ error: 'サーバーエラーが発生しました。' }, { status: 500 });
//   }
// }