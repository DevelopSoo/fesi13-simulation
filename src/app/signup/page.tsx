// 회원가입
// controlled + route handler

// controlled: 입력 시 실시간 변화 -> 입력 중에 error 메세지뜨는 것
// 장점: 실시간. 단점: 렌더링이 많이 일어난다.

'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignupPage() {
  const router = useRouter();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 회원가입 API 호출
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        name: '병수수수수퍼노바',
        companyName: '코드잇',
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert(`${data.name}님 반갑습니당`);
      router.push('/login');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>회원가입</h1>
      <input name="email" onChange={onChange} placeholder="이메일" />
      <input
        name="password"
        onChange={onChange}
        placeholder="비밀번호"
        type="password"
      />
      <button>회원가입</button>
    </form>
  );
}
