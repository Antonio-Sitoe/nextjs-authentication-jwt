import { render } from "@testing-library/react";
import { ActiveLink } from ".";

// Mocs - sao imitacoes - sempre que estivemos a usar
// algo externo de um componente nos criamos um mock para
// usar

// agora vamos criar um mock de
jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});

describe("TESTE SOBRE ACTIVE LINK COMPONENT", () => {
  it("active Link renderers correctly", () => {
    const { debug, getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        Home
      </ActiveLink>
    );

    // Todo o test ele consite em executar uma acao
    //  e nos dizermos ao jest o que nos experamos do retorno dessa acao

    // quando eu renderizar o componente eu espero ver o link href em tela

    // Procurar o texto Home dentro do documento
    expect(getByText("Home")).toBeInTheDocument();
  });

  it("active link is receiving active class", () => {
    const { debug, getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        Home
      </ActiveLink>
    );

    // O componente esta recebendo nome active dentro da className
    expect(getByText("Home")).toHaveClass("active");
  });
});
