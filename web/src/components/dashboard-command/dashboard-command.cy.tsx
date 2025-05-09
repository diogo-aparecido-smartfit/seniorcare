import DashboardCommand from "./dashboard-command";

describe("DashboardCommand Component", () => {
  beforeEach(() => {
    cy.mount(<DashboardCommand />);
  });

  it("should not be visible initially", () => {
    cy.get("[role='dialog']").should("not.exist");
  });

  it("should open the command dialog when triggered", () => {
    cy.get("body").type("{ctrl}k");
    cy.get("[role='dialog']").should("exist");
  });

  it("should display the correct placeholder in the input", () => {
    cy.get("body").type("{ctrl}k");
    cy.get("input[placeholder='Digite um comando ou pesquise...']").should(
      "exist"
    );
  });

  it("should display the correct groups and items", () => {
    cy.get("body").type("{ctrl}k");

    cy.contains("Sugestões").should("exist");
    cy.contains("Calendário").should("exist");
    cy.contains("Pesquisar Emoji").should("exist");
    cy.contains("Calculadora").should("exist");

    cy.contains("Configurações").should("exist");
    cy.contains("Perfil").should("exist");
    cy.contains("Faturamento").should("exist");
    cy.contains("Configurações").should("exist");
  });

  it("should close the dialog when the escape key is pressed", () => {
    cy.get("body").type("{ctrl}k");
    cy.get("[role='dialog']").should("exist");
    cy.get("body").type("{esc}");
    cy.get("[role='dialog']").should("not.exist");
  });

  it("should trigger the correct command when an item is clicked", () => {
    cy.get("body").type("{ctrl}k");
    cy.contains("Calendário").click();
  });
});
