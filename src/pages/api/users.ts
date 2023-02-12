import { NextApiRequest, NextApiResponse } from "next";

export default function Users(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const users = [
    {
      id: 1,
      nome: "Dani",
    },
    {
      id: 2,
      nome: "Rafa",
    },
    {
      id: 3,
      nome: "Dani",
    },
  ];

  return response.json(users);
}
