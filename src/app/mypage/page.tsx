'use client';

import { useEffect, useState } from 'react';

export default function MyPage() {
  const [user, setUser] = useState(null);
  // 1. 내 정보 가져오기 -> 코드잇 백엔드 vs Next.js 백엔드

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('/api/users/me');
      const data = await response.json();

      setUser(data);
    };

    fetchUser();
  }, []);

  return (
    <div>
      마이페이지
      <h1>{user?.name}</h1>
    </div>
  );
}
