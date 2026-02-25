"use client";

import { useState } from "react";

export default function AnimateCompare() {
  const [animated, setAnimated] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <div className="container">
      {/* ❌ will-change 없음 — CPU 레이어로 처리 */}
      {/* Layers 패널에서 별도 레이어로 보이지 않음 */}
      <div>
        <p>will-change ❌</p>
        <div className={`box box-no-wc ${animated ? "animate" : ""}`} />
      </div>

      {/* ✅ will-change 있음 — GPU 레이어로 승격 */}
      {/* Layers 패널에서 별도 Compositing Layer로 표시됨 */}
      <div>
        <p>will-change ✅</p>
        <div
          className={`box box-wc ${animated ? "animate" : ""}`}
          style={{ willChange: isAnimating ? "transform" : "auto" }}
          onTransitionEnd={() => setIsAnimating(false)} // 3. 애니메이션 완료 → will-change 해제
        />
      </div>

      {/* onMouseEnter: 클릭 전 미리 GPU 레이어 준비 */}
      <button
        onMouseEnter={() => setIsAnimating(true)} // 1. hover 시 will-change 사전 적용
        onClick={() => setAnimated((prev) => !prev)} // 2. 클릭 시 애니메이션 시작
      >
        {animated ? "되돌리기" : "애니메이션 실행"}
      </button>
    </div>
  );
}
