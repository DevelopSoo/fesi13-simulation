// src/app/layout.tsx

import './globals.css';
import { initMocks } from '@/mocks';
import { MSWProvider } from '@/providers/MSWProvider';
import { SpeedInsights } from '@vercel/speed-insights/next';

initMocks();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MSWProvider>{children}</MSWProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
