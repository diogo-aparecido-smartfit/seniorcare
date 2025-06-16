import { DataTable } from "./data-table";
import { ColumnDef } from "@tanstack/react-table";

type Person = {
  id: string;
  full_name: string;
  document: string;
  birth_date: string;
  status: string;
};

describe("DataTable Component", () => {
  const mockData: Person[] = [
    {
      id: "1",
      full_name: "João Silva",
      document: "123.456.789-00",
      birth_date: "1950-01-01",
      status: "Ativo",
    },
    {
      id: "2",
      full_name: "Maria Souza",
      document: "987.654.321-00",
      birth_date: "1945-05-15",
      status: "Inativo",
    },
    {
      id: "3",
      full_name: "Carlos Santos",
      document: "456.789.123-00",
      birth_date: "1955-08-20",
      status: "Ativo",
    },
  ];

  const columns: ColumnDef<Person>[] = [
    {
      accessorKey: "full_name",
      header: "Nome",
    },
    {
      accessorKey: "document",
      header: "Documento",
    },
    {
      accessorKey: "birth_date",
      header: "Data de Nascimento",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
  ];

  beforeEach(() => {
    cy.mount(<DataTable columns={columns} data={mockData} />);
  });

  it("renders the table with correct headers", () => {
    cy.get("thead th").should("have.length", 4);
    cy.get("thead th").eq(0).should("contain", "Nome");
    cy.get("thead th").eq(1).should("contain", "Documento");
    cy.get("thead th").eq(2).should("contain", "Data de Nascimento");
    cy.get("thead th").eq(3).should("contain", "Status");
  });

  it("displays all rows from the data", () => {
    cy.get("tbody tr").should("have.length", 3);
    cy.get("tbody tr").eq(0).should("contain", "João Silva");
    cy.get("tbody tr").eq(1).should("contain", "Maria Souza");
    cy.get("tbody tr").eq(2).should("contain", "Carlos Santos");
  });

  it("filters data when searching by name", () => {
    cy.get("input[placeholder*='Pesquise por nome']").type("Maria");
    cy.get("tbody tr").should("have.length", 1);
    cy.get("tbody tr").eq(0).should("contain", "Maria Souza");

    cy.get("input[placeholder*='Pesquise por nome']").clear().type("Silva");
    cy.get("tbody tr").should("have.length", 1);
    cy.get("tbody tr").eq(0).should("contain", "João Silva");

    cy.get("input[placeholder*='Pesquise por nome']").clear();
    cy.get("tbody tr").should("have.length", 3);
  });

  it("toggles column visibility", () => {
    cy.get("button").contains("Filtrar").click();
    cy.contains("Documento").click();
    cy.get("thead th").should("have.length", 3);
    cy.get("thead").should("not.contain", "Documento");

    cy.contains("Status").click();
    cy.get("thead th").should("have.length", 2);
    cy.get("thead").should("not.contain", "Status");

    cy.contains("Documento").click();
    cy.get("thead th").should("have.length", 3);
    cy.get("thead").should("contain", "Documento");
  });

  it("handles pagination correctly", () => {
    const largeData = Array(15)
      .fill(null)
      .map((_, i) => ({
        id: `${i + 1}`,
        full_name: `Pessoa ${i + 1}`,
        document: `${i + 1}00.${i + 1}00.${i + 1}00-00`,
        birth_date: `195${i % 10}-01-01`,
        status: i % 2 === 0 ? "Ativo" : "Inativo",
      }));

    cy.mount(<DataTable columns={columns} data={largeData} />);

    cy.get("tbody tr").should("have.length", 10);
    cy.contains("Pessoa 1").should("exist");
    cy.contains("Pessoa 11").should("not.exist");

    cy.contains("button", "Next").click();
    cy.get("tbody tr").should("have.length", 5);
    cy.contains("Pessoa 11").should("exist");
    cy.contains("Pessoa 1").should("not.exist");

    cy.contains("button", "Previous").click();
    cy.contains("Pessoa 1").should("exist");
    cy.contains("Pessoa 11").should("not.exist");
  });

  it("shows selection count correctly", () => {
    cy.get("tbody tr").eq(0).click();
    cy.get(".text-muted-foreground").should(
      "contain",
      "1 of 3 row(s) selected"
    );

    cy.get("tbody tr").eq(1).click();
    cy.get(".text-muted-foreground").should(
      "contain",
      "2 of 3 row(s) selected"
    );

    cy.get("tbody tr").eq(0).click();
    cy.get(".text-muted-foreground").should(
      "contain",
      "1 of 3 row(s) selected"
    );
  });

  it("disables pagination buttons appropriately", () => {
    cy.contains("button", "Previous").should("be.disabled");
    cy.contains("button", "Next").should("be.disabled");

    const largeData = Array(15)
      .fill(null)
      .map((_, i) => ({
        id: `${i + 1}`,
        full_name: `Pessoa ${i + 1}`,
        document: `${i + 1}00.${i + 1}00.${i + 1}00-00`,
        birth_date: `195${i % 10}-01-01`,
        status: i % 2 === 0 ? "Ativo" : "Inativo",
      }));

    cy.mount(<DataTable columns={columns} data={largeData} />);

    cy.contains("button", "Previous").should("be.disabled");
    cy.contains("button", "Next").should("not.be.disabled");

    cy.contains("button", "Next").click();
    cy.contains("button", "Previous").should("not.be.disabled");
    cy.contains("button", "Next").should("be.disabled");
  });

  it("displays no results message when filtering returns no data", () => {
    cy.get("input[placeholder*='Pesquise por nome']").type("Inexistente");
    cy.get("tbody tr").should("have.length", 1);
    cy.get("tbody").should("contain", "No results");
  });

  it("maintains filter when toggling column visibility", () => {
    cy.get("input[placeholder*='Pesquise por nome']").type("João");
    cy.get("tbody tr").should("have.length", 1);

    cy.get("button").contains("Filtrar").click();
    cy.contains("Documento").click();

    cy.get("tbody tr").should("have.length", 1);
    cy.get("tbody").should("contain", "João Silva");
  });
});
