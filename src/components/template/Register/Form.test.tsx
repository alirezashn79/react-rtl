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

const clickEvent = (element: HTMLButtonElement) => {
  return userEvent.click(element);
};

const mockUseNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockUseNavigate,
  };
});

const validData = {
  email: "alireza@test.com",
  password: "1234",
  confirmPassword: "1234",
};

const invalidData = {
  email: "invalid-email",
  password: "123",
  confirmPassword: {
    matchWithIncorrectPassword: "123",
    notMatch: "7896",
  },
};

const errorMessages = {
  email: "Invalid email",
  password: "String must contain at least 4 character(s)",
  confirmPassword: "The passwords did not match",
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

  describe("Handle Errors", () => {
    beforeEach(() => {
      expect(screen.queryByText(errorMessages.email)).not.toBeInTheDocument();
      expect(
        screen.queryByText(errorMessages.password)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(errorMessages.confirmPassword)
      ).not.toBeInTheDocument();
    });

    test("should show email error message on invalid email", async () => {
      await changeEvent(formElements.Email, invalidData.email);
      await changeEvent(formElements.Password, validData.password);
      await changeEvent(
        formElements.ConfirmPassword,
        validData.confirmPassword
      );

      await clickEvent(formElements.Button);

      expect(screen.getByText(errorMessages.email)).toBeInTheDocument();
      expect(
        screen.queryByText(errorMessages.password)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(errorMessages.confirmPassword)
      ).not.toBeInTheDocument();
    });

    test("should show password error message on invalid password", async () => {
      await changeEvent(formElements.Email, validData.email);
      await changeEvent(formElements.Password, invalidData.password);
      await changeEvent(
        formElements.ConfirmPassword,
        invalidData.confirmPassword.matchWithIncorrectPassword
      );

      await clickEvent(formElements.Button);

      expect(screen.queryByText(errorMessages.email)).not.toBeInTheDocument();
      expect(
        screen.getAllByText(errorMessages.password)[0]
      ).toBeInTheDocument();
      expect(
        screen.queryByText(errorMessages.confirmPassword)
      ).not.toBeInTheDocument();
    });

    test("should show confirm password error message on invalid confirm password", async () => {
      await changeEvent(formElements.Email, validData.email);
      await changeEvent(formElements.Password, validData.password);
      await changeEvent(
        formElements.ConfirmPassword,
        invalidData.confirmPassword.matchWithIncorrectPassword
      );

      await clickEvent(formElements.Button);

      expect(screen.queryByText(errorMessages.email)).not.toBeInTheDocument();
      expect(
        screen.getAllByText(errorMessages.password)[0]
      ).toBeInTheDocument();
      expect(
        screen.queryByText(errorMessages.confirmPassword)
      ).not.toBeInTheDocument();
    });

    test("should show confirm password error message on password not match", async () => {
      await changeEvent(formElements.Email, validData.email);
      await changeEvent(formElements.Password, validData.password);
      await changeEvent(
        formElements.ConfirmPassword,
        invalidData.confirmPassword.notMatch
      );

      await clickEvent(formElements.Button);

      expect(screen.queryByText(errorMessages.email)).not.toBeInTheDocument();
      expect(
        screen.queryByText(errorMessages.password)
      ).not.toBeInTheDocument();
      expect(
        screen.getByText(errorMessages.confirmPassword)
      ).toBeInTheDocument();
    });
  });

  describe("Handle Navigation", () => {
    test("should call the navigation after clicking on submit button", async () => {
      await changeEvent(formElements.Email, validData.email);
      await changeEvent(formElements.Password, validData.password);
      await changeEvent(
        formElements.ConfirmPassword,
        validData.confirmPassword
      );

      await clickEvent(formElements.Button);

      expect(screen.queryByText(errorMessages.email)).not.toBeInTheDocument();
      expect(
        screen.queryByText(errorMessages.password)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(errorMessages.confirmPassword)
      ).not.toBeInTheDocument();

      expect(mockUseNavigate).toHaveBeenCalledWith("/products", {
        state: validData,
      });
    });
  });
});
