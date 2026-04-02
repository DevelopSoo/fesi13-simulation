import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  // 그냥 유저 정보 요청
  const response = await fetch(
    'https://together-dallaem-api.vercel.app/soo/users/me',
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  // 성공하면 프론트엔드로 유저 정보 보내준다.
  if (response.ok) {
    const data = await response.json();
    return NextResponse.json(data);
  }

  // 액세스토큰이 만료됐대!!! -> 에러 났어!!!
  if (response.status === 401) {
    // refresh token을 꺼내서 access token을 재발급하자
    const refreshToken = cookieStore.get('refreshToken')?.value;

    // refreshToken 있으면 access token을 재발급하자
    if (refreshToken) {
      console.log({ oldRefreshToken: refreshToken });
      const refreshResponse = await fetch(
        `https://together-dallaem-api.vercel.app/soo/auth/refresh`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (!refreshResponse.ok) {
        throw new Error('refresh token 재발급 실패');
      }
      const refreshData = await refreshResponse.json();
      console.log({ refreshData });

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        refreshData;

      const isRefreshTokenRotated = !!newRefreshToken;

      cookieStore.set('accessToken', newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 14,
      });

      if (isRefreshTokenRotated) {
        cookieStore.set('refreshToken', newRefreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 59,
        });
      }

      const retryResponse = await fetch(
        'https://together-dallaem-api.vercel.app/soo/users/me',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newAccessToken}`,
          },
        }
      );

      const retryData = await retryResponse.json();
      return NextResponse.json(retryData);
    }
  }
}
