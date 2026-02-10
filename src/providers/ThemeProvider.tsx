// src/providers/ThemeProvider.tsx

"use client";

import { useState } from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <div data-theme={isDark ? "dark" : ""} className="max-w-md">
      {children}
      <button
        className="rounded-md border border-gray-300 p-2"
        onClick={toggleDarkMode}
      >
        다크모드 버튼
      </button>
    </div>
  );
}
