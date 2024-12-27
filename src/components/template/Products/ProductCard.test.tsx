import { render, screen } from "@testing-library/react";
import ProductCard from "./ProductCard";
import userEvent from "@testing-library/user-event";

const cardProps = {
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 109.95,
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: { rate: 3.9, count: 120 },
};

const clickEvent = async (element: HTMLButtonElement) => {
  return userEvent.click(element);
};

describe("Product Card Component", () => {
  test("should show all card items properly", () => {
    const view = render(<ProductCard {...cardProps} />);

    const image = screen.getByRole("img") as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toEqual(cardProps.image);
    expect(image.alt).toEqual(cardProps.title);

    const title = screen.getByText(cardProps.title);
    expect(title).toBeInTheDocument();

    const description = screen.getByText(cardProps.description);
    expect(description).toBeInTheDocument();

    const price = screen.getByText(cardProps.price, { exact: false });
    expect(price).toBeInTheDocument();

    const rate = screen.getByText(cardProps.rating.rate, { exact: false });
    expect(rate).toBeInTheDocument();

    expect(
      view.container.getElementsByClassName("price")[0]
    ).toBeInTheDocument();
  });

  test("should change the button text after selecting card", async () => {
    render(<ProductCard {...cardProps} />);

    const button = screen.getByRole("button") as HTMLButtonElement;
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/add to cart/i);

    await clickEvent(button);

    expect(button).toHaveClass("selected");
    expect(button).not.toHaveTextContent(/add to cart/i);
    expect(button).toHaveTextContent(/added/i);

    await clickEvent(button);

    expect(button).not.toHaveClass("selected");
    expect(button).toHaveTextContent(/add to cart/i);
    expect(button).not.toHaveTextContent(/added/i);
  });
});
