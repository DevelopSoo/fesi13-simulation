// src/app/page.test.tsx

import { render, screen } from "@testing-library/react";
import Home from "./page";
import { server } from "@/mocks/server";
import { http, HttpResponse } from "msw";

describe("MSW 모킹 테스트", () => {
  test("MSW 상세 데이터 모킹", async () => {
    render(<Home />);

    const postItem = await screen.findByText("1: 첫 번째 게시글");

    // MSW에서 설정한 결과값이 화면에 잘 나오는지 확인
    expect(postItem).toBeInTheDocument();
  });

  test("네트워크 에러 발생 시 모킹 테스트", async () => {
    server.use(
      http.get("http://localhost:4000/posts/1", () => {
        return HttpResponse.error();
      }),
    );

    render(<Home />);

    const errorMessage =
      await screen.findByText("데이터를 불러오는데 실패했습니다.");

    // 에러 메시지가 화면에 잘 나오는지 확인
    expect(errorMessage).toBeInTheDocument();
  });

  test("서버 에러 시 모킹 테스트", async () => {
    server.use(
      http.get("http://localhost:4000/posts/1", () => {
        // 백엔드에서 반환하는 값은 없고 (null)
        // 상태 코드가 500으로 반환 -> catch 블록으로 이동
        return HttpResponse.json(null, { status: 500 });
      }),
    );

    render(<Home />);

    const errorMessage =
      await screen.findByText("데이터를 불러오는데 실패했습니다.");

    // 에러 메시지가 화면에 잘 나오는지 확인
    expect(errorMessage).toBeInTheDocument();
  });
});
