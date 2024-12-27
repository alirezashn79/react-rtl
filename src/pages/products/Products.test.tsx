import server from "@/mocks/server";
import { render, screen, waitFor } from "@testing-library/react";
import Products from ".";

const fetchProductsList = async () => await screen.findAllByTestId("list-item");

describe("Products component", () => {
  beforeEach(() => render(<Products />));
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("should display list of products", async () => {
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    const productsList = await waitFor(() => fetchProductsList());
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(productsList.length).toBe(5);
  });
});
