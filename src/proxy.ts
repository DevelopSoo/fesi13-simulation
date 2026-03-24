// src/proxy.ts

import { NextRequest, NextResponse } from 'next/server';

export default async function proxy(request: NextRequest) {
  // 1. 쿠키에 토큰을 확인하자.
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  // 2. 토큰이 없으면 로그인으로
  if (!accessToken && !refreshToken) {
    return NextResponse.redirect('http://localhost:3000/login');
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/mypage'],
};
