// src/app/api/logout/route.ts

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();

    // 토큰 쿠키 삭제
    cookieStore.delete("token");

    return NextResponse.json({ message: "로그아웃 되었습니다." });
  } catch (error) {
    return NextResponse.json(
      { message: "로그아웃 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
