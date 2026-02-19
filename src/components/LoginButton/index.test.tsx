// src/components/LoginButton/index.test.tsx

import { fireEvent, screen, render } from "@testing-library/react";
import { AuthContext } from "@/contexts/AuthContext";
import { LoginButton } from "./index";
import { renderWithProviders } from "@/testHelpers/renderWithProviders";

describe("LoginButton 테스트", () => {
  test("인증되지 않은 경우 로그인 버튼이 렌더링되는지 확인", () => {
    renderWithProviders(<LoginButton />);
    const loginButton = screen.getByRole("button", {
      name: "로그인",
    });

    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveClass("bg-blue-500");
  });

  test("인증된 경우 로그아웃 버튼이 렌더링되는지 확인", () => {
    const authContextValue = {
      isAuthenticated: true,
      login: jest.fn(),
      logout: jest.fn(),
    };

    render(
      <AuthContext.Provider value={authContextValue}>
        <LoginButton />
      </AuthContext.Provider>,
    );

    const logoutButton = screen.getByRole("button", {
      name: "로그아웃",
    });

    expect(logoutButton).toBeInTheDocument();
    expect(logoutButton).toHaveClass("bg-red-500");
  });

  test("로그인 버튼 클릭 시 로그인 함수가 호출되는지 확인", () => {
    const authValue = {
      isAuthenticated: false,
      login: jest.fn(),
      logout: jest.fn(),
    };

    render(
      <AuthContext.Provider value={authValue}>
        <LoginButton />
      </AuthContext.Provider>,
    );

    const loginButton = screen.getByRole("button", { name: "로그인" });
    fireEvent.click(loginButton);
    expect(authValue.login).toHaveBeenCalled();
  });

  test("로그인 버튼 클릭 시 로그아웃 버튼으로 변경되는지 확인 (실제 상태 변화)", () => {
    renderWithProviders(<LoginButton />);

    // 초기 상태: 로그인 버튼
    const loginButton = screen.getByRole("button", { name: "로그인" });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveClass("bg-blue-500");

    // 로그인 버튼 클릭
    fireEvent.click(loginButton);

    // 상태 변경 후: 로그아웃 버튼으로 변경되었는지 확인
    const logoutButton = screen.getByRole("button", { name: "로그아웃" });
    expect(logoutButton).toBeInTheDocument();
    expect(logoutButton).toHaveClass("bg-red-500");
  });
});
