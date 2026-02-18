// src/components/Header/index.tsx

import Link from "next/link";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";

export default async function Header() {
  let user = null;

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (token) {
      // 토큰이 있으면 직접 백엔드로 요청
      const response = await fetch(`${BACKEND_URL}/api/user/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store", // 항상 최신 데이터 가져오기
      });

      if (response.ok) {
        user = await response.json();
        console.log({ user });
      }
    }
  } catch (error) {
    console.error("Header에서 사용자 정보 조회 실패:", error);
    // 에러가 발생해도 헤더는 렌더링되어야 함
  }

  return (
    <nav className="flex items-center justify-between p-4">
      <Link href="/">Home</Link>
      {user && user.name ? (
        <Link href="/mypage">{user.name}님</Link>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </nav>
  );
}
