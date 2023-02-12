import { render, screen } from "@testing-library/react";
import Home from "../../pages";
import { getStaticProps } from "../../pages";
import { stripe } from "../../services/Stripe";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

jest.mock("../../services/Stripe");

describe("Home page", () => {
  it("renders correctly", () => {
    render(<Home product={{ priceId: "fake-price-id", amount: "150" }} />);
    expect(screen.getByText(`por apenas 150 MZN por mes`)).toBeInTheDocument();
  });
  it("Teste getStaticProps", async () => {
    render(<Home product={{ priceId: "fake-price-id", amount: "150" }} />);
    const stripeRetriveMocked = jest.mocked(stripe.prices.retrieve);
    stripeRetriveMocked.mockResolvedValueOnce({
      id: "fake-price-id",
      unit_amount: 1500,
    } as any);
    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: { priceId: "fake-price-id", amount: "15" },
        },
      })
    );
  });
});
