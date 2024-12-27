import server from "@/mocks/server";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Products from ".";

type Category =
  | "all"
  | "men's clothing"
  | "jewelery"
  | "electronics"
  | "women's clothing";

const fetchProductsList = async () => await screen.findAllByTestId("list-item");

const changeSelectBox = async (element: HTMLSelectElement, value: Category) => {
  return act(() => userEvent.selectOptions(element, value));
};

describe("Products component", () => {
  beforeEach(() => render(<Products />));
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("should display list of products", async () => {
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    const productsList = await waitFor(() => fetchProductsList());
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    expect(productsList.length).toBe(5);
  });

  test("should filter for jewerly terms", async () => {
    const selectBox = screen.getByRole("combobox") as HTMLSelectElement;
    const options = screen.getAllByRole("option") as HTMLOptionElement[];

    const productList = await waitFor(() => fetchProductsList());

    await changeSelectBox(selectBox, "jewelery");

    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeTruthy();
    expect(options[3].selected).toBeFalsy();
    expect(options[4].selected).toBeFalsy();

    expect(screen.getAllByTestId("list-item")).toEqual([productList[4]]);
    expect(screen.queryByText(/Mens Cotton Jacket/i)).not.toBeInTheDocument();
    expect(screen.getByText(/John Hardy/i)).toBeInTheDocument();
  });
});
