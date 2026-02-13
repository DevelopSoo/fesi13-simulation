// src/components/ScrollCard/index.tsx

"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function ScrollCard({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // [요소 기준 지점, 뷰포트 기준 지점]
    // "카드의 상단이 화면의 80% 지점에 왔을 때 시작"
    // "카드의 하단이 화면의 20% 지점에 왔을 때 종료"
    offset: ["start 0.8", "end 0.2"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1], // 0~0.2 구간에서 빠르게 0.3 -> 1로 변경
    [0.3, 1, 1, 0.3],
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [100, 0, 0, -100], // 이동 거리(y)도 이 구간에 맞춤
  );

  const scale = useTransform(
    scrollYProgress,
    // 스크롤 진행도가 0.2 -> 0.4 -> 0.6 -> 0.8일 때
    // scale이 0.8 -> 1 -> 1 -> 0.8이 되도록 설정
    [0.2, 0.4, 0.6, 0.8],
    [0.8, 1, 1, 0.8],
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale }}
      className="h-64 rounded-xl bg-gray-400 p-6"
    >
      {children}
    </motion.div>
  );
}
