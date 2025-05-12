import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "kohaku - made for whisky lovers",
  description:
    "Join the waitlist for kohaku, an app to easily record and organize your whisky tasting notes.",
  openGraph: {
    title: "kohaku - made for whisky lovers",
    description:
      "Join the waitlist for kohaku, an app to easily record and organize your whisky tasting notes.",
    url: "https://kohaku-ey1.pages.dev/",
    siteName: "kohaku",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "kohaku - made for whisky lovers",
    description:
      "Join the waitlist for kohaku, an app to easily record and organize your whisky tasting notes.",
    creator: "@mia_jpeg",
    images: ["https://kohaku-ey1.pages.dev/main.jpeg"],
  },
  keywords: [
    "whisky",
    "tasting notes",
    "app",
    "waitlist",
    "ウイスキー",
    "テイスティングノート",
    "アプリ",
    "ウェイティングリスト",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
