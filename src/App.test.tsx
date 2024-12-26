import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppRouter from "./routes";

const renderPage = (path: string) => {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRouter />
    </MemoryRouter>
  );
};

describe("Router", () => {
  test("should load Register page in router", () => {
    renderPage("/");

    expect(screen.getByText(/register/i)).toBeInTheDocument();
    expect(screen.getByRole("form"));
  });
  test("should load Product page in router", () => {
    renderPage("/products");

    expect(screen.getByText(/products/i)).toBeInTheDocument();
  });
});
