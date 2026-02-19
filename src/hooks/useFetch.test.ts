// src/hooks/useFetch.test.ts

import { renderHook, waitFor } from "@testing-library/react";
import { useFetch } from "./useFetch";

describe("useFetch 테스트", () => {
  test("데이터를 성공적으로 가져오는지 테스트", async () => {
    // 모킹
    const mockData = { name: "Test Data" };
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    // useFetch 실행
    const { result } = renderHook(() =>
      useFetch<typeof mockData>("https://api.example.com/data"),
    );

    // 초기 로딩, 데이터, 에러 상태 확인
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    // 데이터 요청 동안 기다리기
    // 로딩이 false면 API 요청이 완료된 것임
    await waitFor(() => expect(result.current.loading).toBe(false));

    // 데이터가 올바르게 설정되었는지 확인
    expect(result.current.data).toEqual(mockData);
    // 에러가 null인지 확인
    expect(result.current.error).toBeNull();
    // API가 올바른 URL로 호출되었는지 확인
    expect(global.fetch).toHaveBeenCalledWith("https://api.example.com/data");
  });

  test("에러 처리가 정상적으로 작동하는지 테스트", async () => {
    // fetch는 성공했으나 response.ok가 false인 경우를 모킹
    // 예를 들어, 상태코드가 200번 대가 아닌 경우
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });

    const { result } = renderHook(() =>
      useFetch("https://api.example.com/data"),
    );

    // 로딩 상태가 변경 완료됐는지 확인
    await waitFor(() => expect(result.current.loading).toBe(false));

    // fetch가 실패했으므로 data는 null이어야 하고, error는 에러 메시지를 포함해야 한다.
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe("네트워크 응답이 정상적이지 않습니다");
  });

  test("네트워크 에러 시 error 상태가 업데이트 되는지 확인", async () => {
    // fetch가 실패하는 경우를 모킹
    // 예를 들어, 네트워크 에러가 발생한 경우
    global.fetch = jest.fn().mockRejectedValue(new Error("네트워크 에러"));

    const { result } = renderHook(() =>
      useFetch("https://api.example.com/data"),
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("네트워크 에러");
  });
});
