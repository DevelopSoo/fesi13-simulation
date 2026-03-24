// src/app/mypage/page.tsx

'use client';

import { useEffect, useState, useTransition } from 'react';
import { logout } from '../actions/auth';
import { useRouter } from 'next/navigation';

// 1. 클라이언트 컴포넌트에서 Route handler 요청 중
export default function MyPage() {
  const router = useRouter();
  const [user, setUser] = useState<null | { name: string }>(null);
  const [isPending, startTransition] = useTransition();
  // 1. 내 정보 가져오기 -> 코드잇 백엔드 vs Next.js 백엔드

  useEffect(() => {
    const fetchUser = async () => {
      // Race Conditions 발생 테스트를 위해 access token 없애고 이중으로 호출
      const [res1, res2] = await Promise.all([
        fetch('/api/users/me'),
        fetch('/api/users/me'),
      ]);
      const data1 = await res1.json();
      const data2 = await res2.json();
      console.log({ data2 });

      setUser(data1);
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
