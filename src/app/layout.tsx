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
        <MSWProvider>{children}</MSWProvider>
      </body>
    </html>
  );
}
