// src/components/ThemeSwitch/index.tsx

"use client";

import { useTheme } from "next-themes";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <button onClick={() => setTheme("system")}>시스템</button>
      <button onClick={() => setTheme("light")}>라이트</button>
      <button onClick={() => setTheme("dark")}>다크</button>
      <p>현재 테마: {theme}</p>
    </>
  );
}
