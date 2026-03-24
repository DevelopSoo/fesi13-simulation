'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [user, setUser] = useState<null | { name: string }>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/users/me');
      const data = await res.json();

      setUser(data);
    };

    fetchUser();
  }, []);
  return <div>현재 메인페이지: {user?.name}</div>;
}
