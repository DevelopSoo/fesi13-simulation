// src/proxy.ts

import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = 'https://together-dallaem-api.vercel.app/soo';

// mypage에 들어가면 proxy 함수를 호출하세요.
export default async function proxy(request: NextRequest) {
  // 1. 쿠키에 토큰을 확인하자.
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  // 2. 토큰이 있으면 그대로 가자
  if (accessToken) {
    return NextResponse.next();
  }

  // 3. accessToken 은 없지만 refreshToken 이 있으면 재호출하자
  if (refreshToken) {
    const refreshResponse = await fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (refreshResponse.ok) {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        await refreshResponse.json();

      // 4. 요청 중인 Route Handler 에서 읽을 수 있도록 request 에도 쿠키를 세팅
      request.cookies.set('accessToken', newAccessToken);
      request.cookies.set('refreshToken', newRefreshToken);

      const response = NextResponse.next({
        request: {
          headers: request.headers,
        },
      });

      // 5. 쿠키에 새로운 토큰들 저장
      response.cookies.set('accessToken', newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 14,
      });

      response.cookies.set('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60,
      });
      console.log('세팅 끝');
      return response;
    }
  }
  // 3. 둘 다 없거나 refresh도 실패하면 로그인으로
  return NextResponse.redirect('http://localhost:3000/login');
}

export const config = {
  matcher: ['/api/:path*', '/mypage'],
};
