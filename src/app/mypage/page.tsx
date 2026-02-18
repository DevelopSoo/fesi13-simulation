// src/app/mypage/page.tsx

"use client";

import { useEffect, useState } from "react";

export default function MyPage() {
  const [user, setUser] = useState<{
    id: number;
    email: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // src/app/api/user/me/route.ts 로 요청
        const response = await fetch("/api/user/me");

        if (!response.ok) {
          if (response.status === 401) {
            // 인증되지 않은 경우 로그인 페이지로 리다이렉트
            window.location.href = "/login";
            return;
          }
          throw new Error("사용자 정보 조회 실패");
        }

        const data = await response.json();
        console.log({ data });
        setUser(data);
      } catch (error) {
        console.error("사용자 정보 조회 오류:", error);
        // 오류 발생 시 로그인 페이지로 리다이렉트
        window.location.href = "/login";
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        window.location.href = "/login";
      } else {
        alert(data.message || "로그아웃 실패");
      }
    } catch (error) {
      console.error("로그아웃 오류:", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
          마이페이지
        </h1>
        {user ? (
          <div className="space-y-4">
            <div className="border-b pb-2">
              <p className="text-sm text-gray-600">아이디</p>
              <p className="text-lg font-medium">{user.id}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-600">이메일</p>
              <p className="text-lg font-medium">{user.email}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-600">이름</p>
              <p className="text-lg font-medium">{user.name}</p>
            </div>
            <button
              onClick={handleLogout}
              className="mt-6 w-full rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition duration-150 ease-in-out hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-600">사용자 정보를 불러오는 중...</p>
          </div>
        )}
      </div>
    </div>
  );
}
