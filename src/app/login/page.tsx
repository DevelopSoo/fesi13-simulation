'use client';

import { useRef } from 'react';
import { login } from '../actions/auth';

export default function LoginPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <form action={login}>
      <h1>로그인</h1>
      <input name="email" ref={emailRef} placeholder="이메일" />
      <input
        name="password"
        ref={passwordRef}
        placeholder="비밀번호"
        type="password"
      />
      <button>로그인</button>
    </form>
  );
}
