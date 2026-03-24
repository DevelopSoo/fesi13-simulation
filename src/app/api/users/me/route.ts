// src/app/api/users/me/route.ts

import { getRefreshPromise, setRefreshPromise } from '@/lib/auth-state';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const BASE_URL = 'https://together-dallaem-api.vercel.app/soo';

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    }

    // 401 에러
    if (!response.ok && response.status === 401) {
      const refreshToken = cookieStore.get('refreshToken')?.value;
      if (refreshToken) {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          await getNewAccessTokens(refreshToken);

        // 5. 쿠키에 새로운 토큰들 저장
        cookieStore.set('accessToken', newAccessToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 14,
        });

        cookieStore.set('refreshToken', newRefreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 59,
        });
        // 3. ⭐ 재호출(Retry): 새로운 토큰으로 한 번 더 API 호출
        const retryResponse = await fetch(`${BASE_URL}/users/me`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newAccessToken}`,
          },
        });
        if (retryResponse.ok) {
          const retryData = await retryResponse.json();
          // 성공한 데이터 반환
          return NextResponse.json(retryData, { status: 200 });
        }
      }

      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } else {
      throw new Error('Failed to fetch user data');
    }
  } catch (error) {
    console.log(error);
    throw new Error(`에러: ${error}`);
  }
}

async function getNewAccessTokens(refreshToken: string) {
  // 중복 호출 방지 (Race Conditions)
  const existingPromise = getRefreshPromise(refreshToken);
  if (existingPromise) {
    console.log('이미 재발급 중입니다. 기존 요청을 기다립니다');
    return existingPromise;
  }

  const newPromise = (async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh tokens');
      }

      const data = await response.json();
      return data; // { accessToken, refreshToken }
    } finally {
      setRefreshPromise(refreshToken, null);
    }
  })();

  // 4. Map에 등록 후 반환
  setRefreshPromise(refreshToken, newPromise);
  return newPromise;
}
