import { render, screen } from "@testing-library/react";
import { SignInButton } from ".";
import { useSession } from "next-auth/client";

jest.mock("next-auth/client");

describe("SignInButton component", () => {
  it("active Link renderers correctly when user is not authenticated", () => {
    const useSessionMocked = jest.mocked(useSession);
    useSessionMocked.mockReturnValueOnce([null, false]);
    render(<SignInButton />);

    expect(screen.getByText("Sign In with GitHub")).toBeInTheDocument();
  });
  it("active Link renderers correctly when user is authenticated", () => {
    const useSessionMocked = jest.mocked(useSession);
    useSessionMocked.mockReturnValueOnce([
      {
        user: {
          name: "John Doe",
        },
      },
      false,
    ]);
    render(<SignInButton />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});
