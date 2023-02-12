import Posts, { getStaticProps } from "../../pages/posts";
import { render, screen } from "@testing-library/react";
import { getPrismicClient } from "../../services/Prismic";

jest.mock("../../services/Prismic");

const posts = [
  {
    slug: "my-new-post",
    title: "My new post",
    excerpt: "Post excerpt",
    updatedAt: "10 de abril",
  },
];

describe("Posts page", () => {
  it("renders correctly", () => {
    render(<Posts posts={posts} />);
    expect(screen.getByText("My new post")).toBeInTheDocument();
  });
  it("Teste getStaticProps", async () => {
    render(<Posts posts={posts} />);
    const getPrismicMocked = jest.mocked(getPrismicClient);

    getPrismicMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: "my-new-post",
            data: {
              title: [{ type: "heading", text: "My new Post" }],
              content: [{ type: "paragraph", text: "Post except" }],
            },
            last_publication_date: "04-01-2021",
          },
        ],
      }),
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "my-new-post",
              title: "My new Post",
              excerpt: "Post except",
              updatedAt: "01 de abril de 2021",
            },
          ],
        },
      })
    );
  });
});
