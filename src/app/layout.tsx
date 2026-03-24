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
        <div className="flex gap-4">
          <Link className="text-blue-400 underline" href="/">
            메인페이지
          </Link>
          <Link className="text-blue-400 underline" href="/mypage">
            마이페이지
          </Link>
        </div>
        {children}
      </body>
    </html>
  );
}
