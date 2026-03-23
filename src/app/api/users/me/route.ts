// src/app/api/users/me/route.ts

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const response = await fetch(
    'https://together-dallaem-api.vercel.app/soo/users/me',
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
