// src/app/layout.tsx

import Link from 'next/link';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex gap-2">
          <Link href="/">홈</Link>
          <Link href="/mypage">마이</Link>
        </div>
        {children}
      </body>
    </html>
  );
}
