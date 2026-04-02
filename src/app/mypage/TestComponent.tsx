'use client';

import { useEffect, useState } from 'react';

export default function MyPage() {
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      console.log('테스트 컴포넌트 호출');
      const res1 = await fetch('/api/users/me');
      const data = await res1.json();
      console.log('테스트 컴포넌트 결과', data);
      setUser(data);
    };

    fetchUser();
  }, []);

  return (
    <div>
      테스트 컴포넌트
      <h1>{user?.name}</h1>
    </div>
  );
}
