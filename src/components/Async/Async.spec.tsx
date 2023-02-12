import Async from ".";
import {
  screen,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";

test("async", async () => {
  render(<Async />);
  expect(screen.getByText("Hello"));

  //  com findByText
  expect(await screen.findByText("button")).toBeInTheDocument();

  // com waitFor
  await waitFor(() => {
    return expect(screen.getByText("Paragraph")).toBeInTheDocument();
  });
  // esperar que ee nao esteja na tela
  await waitFor(() => {
    return expect(screen.queryByText("existe")).not.toBeInTheDocument();
  });

  // esperar para ser removido
  // await waitForElementToBeRemoved(screen.queryByText("existe"));

  //  com isso eu posso entrar na url e ir buscar as partes que eu quiser
  screen.logTestingPlaygroundURL();
});
