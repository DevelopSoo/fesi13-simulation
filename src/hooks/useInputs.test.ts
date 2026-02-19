import { act, renderHook } from "@testing-library/react";
import { useInputs } from "./useInputs";

describe("useInputs 테스트", () => {
  test("초기값이 올바르게 설정되는지 확인", () => {
    // 컴포넌트를 그릴 땐 render를 사용했습니다.
    // 하지만 커스텀 훅을 독립적으로 테스트할 땐 renderHook을 사용합니다.
    const { result } = renderHook(() => useInputs({ name: "", nickname: "" }));

    expect(result.current.values).toEqual({
      name: "",
      nickname: "",
    });
  });

  test("handleChange 함수가 값을 올바르게 업데이트하는지 확인", () => {
    const { result } = renderHook(() => useInputs({ name: "", nickname: "" }));

    const event = {
      target: { name: "name", value: "김철수" },
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleChange(event);
    });

    expect(result.current.values.name).toBe("김철수");
  });

  test("handleChange 함수로 여러 값을 업데이트할 때 올바르게 작동하는지 확인", () => {
    const { result } = renderHook(() => useInputs({ name: "", nickname: "" }));

    const nameEvent = {
      target: { name: "name", value: "김철수" },
    } as React.ChangeEvent<HTMLInputElement>;

    const nicknameEvent = {
      target: { name: "nickname", value: "철수" },
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleChange(nameEvent);
      result.current.handleChange(nicknameEvent);
    });

    expect(result.current.values.name).toBe("김철수");
    expect(result.current.values.nickname).toBe("철수");
  });

  test("handleDelete 함수가 특정 필드를 올바르게 삭제하는지 확인", () => {
    const { result } = renderHook(() =>
      useInputs({ name: "김철수", nickname: "철수" }),
    );

    act(() => {
      result.current.handleDelete("name");
    });

    expect(result.current.values.name).toBe("");
    expect(result.current.values.nickname).toBe("철수");
  });
});
