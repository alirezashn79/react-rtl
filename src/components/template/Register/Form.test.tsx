import Register from "@/pages/register";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

interface formElementsType {
  Email: HTMLInputElement;
  Password: HTMLInputElement;
  ConfirmPassword: HTMLInputElement;
  Button: HTMLButtonElement;
}

const changeEvent = (element: HTMLInputElement, value: string) => {
  return act(() => userEvent.type(element, value));
};

describe("Register Form", () => {
  let formElements: formElementsType;

  beforeEach(() => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
  });

  beforeEach(() => {
    formElements = {
      Email: screen.getByRole("textbox", { name: "Email" }),
      Password: screen.getByLabelText("Password"),
      ConfirmPassword: screen.getByLabelText("Confirm Password"),
      Button: screen.getByRole("button", { name: "Submit" }),
    };
  });

  test("should inputs be initially empty", () => {
    expect(formElements.Email).toHaveValue("");
    expect(formElements.Password).toHaveValue("");
    expect(formElements.ConfirmPassword).toHaveValue("");
  });

  test("should be able to type into inputs", async () => {
    await changeEvent(formElements.Email, "alireza@test.com");
    await changeEvent(formElements.Password, "12345");
    await changeEvent(formElements.ConfirmPassword, "12345");
  });

  test("should button be disabled when inputs are empty", () => {
    expect(formElements.Button).toHaveAttribute("type", "submit");
    expect(formElements.Button).toBeDisabled();
  });

  test("should button be enabled when all inputs are filled", async () => {
    await changeEvent(formElements.Email, "alireza@test.com");
    await changeEvent(formElements.Password, "12345");
    await changeEvent(formElements.ConfirmPassword, "12345");

    expect(formElements.Button).toBeEnabled();
  });
});
