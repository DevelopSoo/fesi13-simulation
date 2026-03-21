// 아예 처음부터 막고 싶어

import { cookies } from 'next/headers';

import { NextResponse } from 'next/server';

// mypage에 들어가면 proxy 함수를 호출하세요.
export default async function proxy() {
  // 1. 쿠키에 토큰을 확인하자.
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  // 2. 토큰이 없으면 로그인 페이지로 강제 이동하자
  if (!accessToken) {
    return NextResponse.redirect('http://localhost:3000/login');
  }
  // 3. 토큰이 있으면 그대로 가자
  return NextResponse.next();
}

export const config = {
  matcher: '/mypage',
};
