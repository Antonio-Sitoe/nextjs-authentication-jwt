import Post, { getServerSideProps } from "../../pages/posts/[slug]";
import { render, screen } from "@testing-library/react";
import { getPrismicClient } from "../../services/Prismic";
import { getSession, useSession } from "next-auth/client";

jest.mock("../../services/Prismic");
jest.mock("next-auth/client");

const post = {
  slug: "my-new-post",
  title: "My new post",
  content: "<p>Post excerpt</p>",
  updatedAt: "10 de abril",
};

describe("Posts page", () => {
  it("renders correctly", () => {
    render(<Post post={post} />);
    expect(screen.getByText("My new post")).toBeInTheDocument();
    expect(screen.getByText("Post excerpt")).toBeInTheDocument();
  });

  it("Redirect user if not found", async () => {
    render(<Post post={post} />);
    const getSessionMocked = jest.mocked(useSession);

    getSessionMocked.mockReturnValueOnce({
      activeSubscription: null,
    } as any);

    const response = await getServerSideProps({
      params: {
        slug: "my-new-post",
      },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: {
          destination: "/posts/preview/my-new-post",
          permanent: false,
        },
      })
    );
  });
  it("Loads data", async () => {
    render(<Post post={post} />);
    const getSessionMocked = jest.mocked(getSession);
    const getPrismicMocked = jest.mocked(getPrismicClient);

    getSessionMocked.mockReturnValueOnce({
      activeSubscription: "facke-active-subscription",
    } as any);
    getPrismicMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: "heading", text: "My New Post" }],
          content: [{ type: "paragraph", text: "Post excerpt" }],
        },
        last_publication_date: "04-01-2021",
      }),
    } as any);

    const response = await getServerSideProps({
      params: { slug: "my-new-post" },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "my-new-post",
            title: "My New Post",
            content: "<p>Post excerpt</p>",
            updatedAt: "01 de abril de 2021",
          },
        },
      })
    );
  });
});
