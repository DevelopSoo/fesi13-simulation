// src/app/page.tsx

"use client";

import { useEffect, useState } from "react";

export default function Home() {
  // 1. 테마 상태 관리
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    // 서버 환경이면 바로 light 반환
    if (typeof window === "undefined") {
      return "light";
    }

    // 로컬스토리지에 테마 값이 있다면 -> 해당 테마 반환
    if (localStorage.getItem("theme")) {
      return localStorage.getItem("theme") as "light" | "dark";
    }

    // 로컬스토리지에 테마 값이 없다면 -> 시스템 테마 따라감
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    // 기본값 light
    return "light";
  });

  const toggleTheme = (newTheme: "light" | "dark" | "system") => {
    // 시스템 테마를 선택한 경우 localStorage에 theme 삭제 & 시스템 테마 적용
    if (newTheme === "system") {
      localStorage.removeItem("theme");
      setTheme(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
      );
    } else {
      // 로컬스토리지에 테마 값 저장 & 해당 테마 적용
      localStorage.setItem("theme", newTheme);
      setTheme(newTheme);
    }
  };

  // theme 변경 시 루트 태그(html)에 dark 클래스 추가 -> 실제 다크모드 적용
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // 시스템 테마 변경 감지
  useEffect(() => {
    const themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    themeMediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      themeMediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  return (
    <div>
      <div className="dark:bg-black dark:text-white">안녕</div>
      <button
        className="border bg-yellow-500 px-4 py-2"
        onClick={() => toggleTheme("system")}
      >
        시스템
      </button>
      <button
        className="border bg-white px-4 py-2"
        onClick={() => toggleTheme("light")}
      >
        라이트
      </button>
      <button
        className="border bg-black px-4 py-2 text-white"
        onClick={() => toggleTheme("dark")}
      >
        다크
      </button>
    </div>
  );
}
