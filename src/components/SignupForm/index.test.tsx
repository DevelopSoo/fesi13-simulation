// src/components/SignupForm/index.test.tsx

import { render, screen } from "@testing-library/react";
import SignupForm from "./index";

// 1. 이메일, 비밀번호, 비밀번호 확인 입력 필드가 제대로 렌더링되는지 확인하기
test("이메일, 비밀번호, 비밀번호 확인 입력 필드가 렌더링되어야 한다", () => {
  render(<SignupForm />);

  // getByLabelText를 사용하여 각 입력 필드를 찾을 수 있는지 확인
  const emailInput = screen.getByLabelText("이메일");
  const passwordInput = screen.getByLabelText("비밀번호");
  const passwordConfirmInput = screen.getByLabelText("비밀번호 확인");

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(passwordConfirmInput).toBeInTheDocument();
});

// 2. 비밀번호 입력 필드의 type이 "password"인지 확인
test('비밀번호 입력 필드의 type이 "password"여야 한다', () => {
  render(<SignupForm />);

  const passwordInput = screen.getByPlaceholderText("비밀번호");
  const passwordConfirmInput = screen.getByPlaceholderText("비밀번호 확인");

  // toHaveAttribute 매처를 사용하여 type 속성 확인
  expect(passwordInput).toHaveAttribute("type", "password");
  expect(passwordConfirmInput).toHaveAttribute("type", "password");
});

// 3. 회원가입 버튼이 렌더링되는지 확인
test("회원가입 버튼이 렌더링되어야 한다", () => {
  render(<SignupForm />);

  const submitButton = screen.getByRole("button", { name: "회원가입" });

  expect(submitButton).toBeInTheDocument();
});
