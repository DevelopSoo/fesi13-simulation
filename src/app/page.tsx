"use client";

import { useEffect, useRef } from "react";

export default function Home() {
  // 숫자값 저장할 ref
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 숫자값 초기화
    let count = 0;
    // 애니메이션 실행 아이디
    let animationId: number;

    const animate = () => {
      // 숫자값 저장할 ref가 있으면
      if (countRef.current) {
        // 숫자값 표시
        countRef.current.textContent = count.toString();
        // 숫자값 증가
        count = Math.min(count + 1, 1201);

        // 숫자값이 1200보다 작거나 같으면
        if (count <= 1200) {
          // 애니메이션 실행
          animationId = requestAnimationFrame(animate);
        }
      }
    };

    // 애니메이션 실행
    animationId = requestAnimationFrame(animate);
    // 애니메이션 종료
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <main className="h-screen p-8">
      <div ref={countRef} className="text-4xl">
        0
      </div>
    </main>
  );
}
