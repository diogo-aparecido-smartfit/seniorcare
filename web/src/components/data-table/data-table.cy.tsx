import { DataTable } from "./data-table";
import { ColumnDef } from "@tanstack/react-table";

type Person = {
  id: string;
  name: string;
  email: string;
  age: number;
};

describe("DataTable Component", () => {
  const mockData: Person[] = [
    { id: "1", name: "João Silva", email: "joao@example.com", age: 65 },
    { id: "2", name: "Maria Souza", email: "maria@example.com", age: 72 },
    { id: "3", name: "Carlos Pereira", email: "carlos@example.com", age: 68 },
  ];

  const columns: ColumnDef<Person>[] = [
    {
      accessorKey: "name",
      header: "Nome",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "age",
      header: "Idade",
    },
  ];

  beforeEach(() => {
    cy.mount(<DataTable columns={columns} data={mockData} />);
  });

  it("renders the table with correct headers", () => {
    cy.get("thead th").should("have.length", 3);
    cy.get("thead th").eq(0).should("contain", "Nome");
    cy.get("thead th").eq(1).should("contain", "Email");
    cy.get("thead th").eq(2).should("contain", "Idade");
  });

  it("renders the correct number of rows", () => {
    cy.get("tbody tr").should("have.length", 3);
  });

  it("displays the correct data in each cell", () => {
    cy.get("tbody tr").eq(0).find("td").eq(0).should("contain", "João Silva");
    cy.get("tbody tr")
      .eq(0)
      .find("td")
      .eq(1)
      .should("contain", "joao@example.com");
    cy.get("tbody tr").eq(0).find("td").eq(2).should("contain", "65");

    cy.get("tbody tr").eq(1).find("td").eq(0).should("contain", "Maria Souza");
    cy.get("tbody tr")
      .eq(2)
      .find("td")
      .eq(0)
      .should("contain", "Carlos Pereira");
  });

  it("filters data when searching by name", () => {
    cy.get("input[placeholder='Pesquise por nome...']").type("Maria");
    cy.get("tbody tr").should("have.length", 1);
    cy.get("tbody tr").eq(0).find("td").eq(0).should("contain", "Maria Souza");

    cy.get("input[placeholder='Pesquise por nome...']").clear().type("Silva");
    cy.get("tbody tr").should("have.length", 1);
    cy.get("tbody tr").eq(0).find("td").eq(0).should("contain", "João Silva");
  });

  it("shows 'nenhum resultado encontrado' when no results match", () => {
    cy.get("input[placeholder='Pesquise por nome...']").type("Inexistente");
    cy.get("tbody tr").should("have.length", 1);
    cy.get("tbody").should("contain", "Nenhum resultado encontrado.");
  });

  it("toggles column visibility through dropdown", () => {
    cy.get("button").contains("Filtrar").click();
    cy.contains("Email").click();
    cy.get("thead th").should("have.length", 2);
    cy.get("thead").should("not.contain", "Email");

    cy.get("button").contains("Filtrar").click();
    cy.contains("Email").click();
    cy.get("thead th").should("have.length", 3);
  });

  it("paginates data correctly", () => {
    const largeData = Array(15)
      .fill(null)
      .map((_, i) => ({
        id: `${i + 1}`,
        name: `Pessoa ${i + 1}`,
        email: `pessoa${i + 1}@example.com`,
        age: 60 + i,
      }));

    cy.mount(<DataTable columns={columns} data={largeData} />);
    cy.get("tbody tr").should("have.length", 10);
    cy.contains("Pessoa 1").should("exist");
    cy.contains("Pessoa 11").should("not.exist");

    cy.contains("button", "Próximo").click();
    cy.get("tbody tr").should("have.length", 5);
    cy.contains("Pessoa 11").should("exist");
    cy.contains("Pessoa 1").should("not.exist");

    cy.contains("button", "Anterior").click();
    cy.contains("Pessoa 1").should("exist");
  });

  it("displays the correct selection count", () => {
    cy.get("tbody tr").eq(0).click();
    cy.get(".text-muted-foreground").should(
      "contain",
      "1 de 3 linha(s) selecionada(s)"
    );

    cy.get("tbody tr").eq(1).click();
    cy.get(".text-muted-foreground").should(
      "contain",
      "2 de 3 linha(s) selecionada(s)"
    );
  });

  it("disables pagination buttons appropriately", () => {
    cy.contains("button", "Anterior").should("be.disabled");
    cy.contains("button", "Próximo").should("be.disabled");

    const largeData = Array(15)
      .fill(null)
      .map((_, i) => ({
        id: `${i + 1}`,
        name: `Pessoa ${i + 1}`,
        email: `pessoa${i + 1}@example.com`,
        age: 60 + i,
      }));

    cy.mount(<DataTable columns={columns} data={largeData} />);
    cy.contains("button", "Anterior").should("be.disabled");
    cy.contains("button", "Próximo").should("not.be.disabled");

    cy.contains("button", "Próximo").click();
    cy.contains("button", "Anterior").should("not.be.disabled");
    cy.contains("button", "Próximo").should("be.disabled");
  });
});
