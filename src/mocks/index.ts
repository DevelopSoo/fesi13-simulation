// src/mocks/index.ts

import type { SetupWorker } from "msw/browser";
import { postsHandlers } from "./handlers/posts";

// 전역 객체에 워커 인스턴스 자체를 저장
declare global {
  interface Window {
    mswWorker?: SetupWorker;
  }
}

export async function initMocks() {
  // 개발 환경이 아니라면 실행 X
  if (process.env.NODE_ENV !== "development") return;
  if (typeof window === "undefined") {
    // 서버 사이드
    const { server } = await import("./server");
    server.listen();
  } else {
    // 클라이언트 사이드
    if (!window.mswWorker) {
      const { worker } = await import("./browser");
      // 워커 인스턴스를 전역에 저장
      window.mswWorker = worker;
      // 핸들러 주입
      worker.use(...postsHandlers);
      // 최초 실행: start()
      await worker.start({});
    } else {
      // 이미 존재하는 경우 worker 재사용
      const worker = window.mswWorker;
      // 새로운 핸들러 주입를 주입하여 hmr 시 바로 변경된 데이터가 적용된다.
      worker.use(...postsHandlers);
    }
  }
}
