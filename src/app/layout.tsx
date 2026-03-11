import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sponsor Connect | レブナイズスポンサー企業マッチング",
  description:
    "レブナイズスポンサー企業同士をつなぐ会員制ビジネスマッチングプラットフォーム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
