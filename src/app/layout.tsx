// src/layout.tsx

import { ThemeProvider } from "next-themes";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          // attribute="class"로 설정하면 html 태그에 class 추가
          attribute="class"
          // 기본 테마는 system
          defaultTheme="system"
          // 시스템에 반응하도록 설정
          enableSystem
          // 테마 전환 시 CSS transition 애니메이션을 비활성화
          disableTransitionOnChange
          // html 태그에 color-scheme 속성을 추가하지 않도록 설정
          // true인 경우 의도치 않은 전체 배경 색상 변경도 적용됨
          enableColorScheme={true}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
