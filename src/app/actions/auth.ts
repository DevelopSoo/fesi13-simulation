// src/app/actions/auth.ts

// 서버 액션 => 서버에서 실행되는 함수
// 클라이언트에서 호출 -> 사실은 내부적으로 fetch("Next.js 서버 주소", { method: "POST"})
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Next.js 서버
export async function login(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  // 코드잇

  const response = await fetch(
    'https://together-dallaem-api.vercel.app/soo/auth/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }
  );

  const data = await response.json();

  /**
   * data => {
        "user": {
          "id": 1377,
          "teamId": "soo",
          "email": "soosoo@naver.com",
          "name": "병수수수수퍼노바",
          "companyName": "코드잇",
          "image": null,
          "createdAt": "2026-03-19T09:33:19.498Z",
          "updatedAt": "2026-03-19T09:33:19.498Z"
        },
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEzNzcsInRlYW1JZCI6InNvbyIsImVtYWlsIjoic29vc29vQG5hdmVyLmNvbSIsImlhdCI6MTc3MzkxMzI2NSwiZXhwIjoxNzczOTE0MTY1fQ.yDkP9xlxFE4ddGUKG0G8gKcHoEzkQc66zbgoh1bxu7g",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEzNzcsInRlYW1JZCI6InNvbyIsImVtYWlsIjoic29vc29vQG5hdmVyLmNvbSIsImlhdCI6MTc3MzkxMzI2NSwiZXhwIjoxNzc0NTE4MDY1fQ.Vhe7vFv98wlTnUUXU8Zsbo00o8iOj0K8712qtvmPWyQ"
      }
   */

  const { accessToken, refreshToken } = data;

  // 쿠키에 저장
  const cookieStore = await cookies();
  cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 14, // 15분 - 1분
  });

  cookieStore.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 59, // 1시간 - 1분
  });

  redirect('/mypage');
}

export async function logout() {
  const cookieStore = await cookies();

  // 쿠키에서 토큰 삭제
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');

  // 로그아웃 후 로그인 페이지로 강제 이동
  redirect('/login');
}
