// src/app/page.test.tsx

import { render, screen } from "@testing-library/react";
import Home from "./page";

test("메인 페이지 렌더링", () => {
  render(<Home />);

  expect(screen.getByText("Home")).toBeInTheDocument();
});
