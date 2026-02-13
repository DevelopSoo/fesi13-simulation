// app/layout.tsx

import LazyMotionProvider from "@/providers/LazyMotionProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LazyMotionProvider>{children}</LazyMotionProvider>
      </body>
    </html>
  );
}
