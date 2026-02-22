// src/app/layout.tsx

import "./globals.css";
import { initMocks } from "@/mocks";
import { MSWProvider } from "@/providers/MSWProvider";

initMocks();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MSWProvider>
          <h1>서버 컴포넌트</h1>
          {children}
        </MSWProvider>
      </body>
    </html>
  );
}
