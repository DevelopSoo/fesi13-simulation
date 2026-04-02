'use client';

import { useEffect, useState } from 'react';
import TestComponent from './TestComponent';

export default function MyPage() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  // 1. 내 정보 가져오기 -> 코드잇 백엔드 vs Next.js 백엔드

  useEffect(() => {
    const fetchUser = async () => {
      console.log('마이페이지 호출');
      const [res1, res2] = await Promise.all([
        fetch('/api/users/me'),
        fetch('/api/users/me'),
      ]);
      const data = await res1.json();
      console.log({ res2 });

      console.log('마이페이지 결과', data);
      setUser(data);
    };

    fetchUser();
  }, []);

  return (
    <div>
      마이페이지
      <h1>{user?.name}</h1>
      <TestComponent />
    </div>
  );
}
