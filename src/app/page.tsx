"use client";

import { motion, useScroll } from "motion/react";

export default function Home() {
  const { scrollYProgress } = useScroll();

  return (
    <div>
      <motion.div
        className="fixed top-0 right-0 left-0 h-2 origin-left bg-blue-500"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="p-4">
        <h1 className="mb-4 text-2xl font-bold">스크롤 프로그레스 바 테스트</h1>
        {[...Array(50)].map((_, i) => (
          <p key={i} className="mb-4">
            테스트 문단 {i + 1}. 스크롤을 내려서 프로그레스 바를 확인해보세요.
          </p>
        ))}
      </div>
    </div>
  );
}
