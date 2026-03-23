// src/app/mypage/page.tsx

'use client';

import { useEffect, useState, useTransition } from 'react';
import { logout } from '../actions/auth';
import { useRouter } from 'next/navigation';

export default function MyPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isPending, startTransition] = useTransition();
  // 1. 내 정보 가져오기 -> 코드잇 백엔드 vs Next.js 백엔드

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('/api/users/me');
      const data = await response.json();

      setUser(data);
    };

    fetchUser();
  }, [router]);

  const handleLogout = () => {
    // startTransition으로 서버 액션을 감싸줍니다.
    startTransition(async () => {
      await logout();
    });
  };

  return (
    <div>
      마이페이지
      <h1>{user?.name}</h1>
      <button
        className="border border-black"
        onClick={async () => {
          const response = await fetch('/api/users/me');
          const data = await response.json();
          setUser(data);
        }}
      >
        API 호출 {`->`} refreshToken으로 토큰 갱신 테스트
      </button>
      <div>
        <button
          onClick={handleLogout}
          disabled={isPending} // 로그아웃 진행 중에는 버튼 비활성화
        >
          {isPending ? '로그아웃 중...' : '로그아웃'}
        </button>
      </div>
    </div>
  );
}
