import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const response = await fetch(
    'https://together-dallaem-api.vercel.app/soo/auth/signup',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: body.email,
        password: body.password,
        name: '병수수수수퍼노바',
        companyName: '코드잇',
      }),
    }
  );

  const data = await response.json();
  return NextResponse.json(data);
}
