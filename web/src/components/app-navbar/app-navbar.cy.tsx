import AppNavbar from "./app-navbar";

describe("AppNavbar Component", () => {
  beforeEach(() => {
    cy.mount(
      <>
        <div style={{ height: "2000px" }}>
          <AppNavbar />
        </div>
      </>
    );
  });

  it("should display the logo with the correct text", () => {
    cy.get("nav button").contains("Senior").should("exist");
    cy.get("nav button").contains("Care").should("exist");
  });

  it("should display the desktop navigation links", () => {
    const links = [
      "Início",
      "Diferenciais",
      "Estatísticas",
      "FAQ",
      "Contato",
      "Entrar",
    ];
    links.forEach((linkText) => {
      cy.get("nav ul").first().contains(linkText).should("exist");
    });
  });

  it("should display the 'Comece agora' button", () => {
    cy.get("nav").contains("Comece agora").should("exist");
  });

  it("should toggle the mobile sidebar when the SidebarTrigger is clicked", () => {
    cy.get("nav").find("button").contains("Senior").should("exist");
    cy.get("nav .lg\\:hidden").click();
    cy.get("nav").contains("Início").should("exist");
  });

  it("should add shadow and border when scrolled", () => {
    cy.scrollTo(0, 100);
    cy.wait(500);

    cy.get("nav div.fixed").should("have.class", "shadow-md");
    cy.get("nav div.fixed").should("have.class", "border-b-[1px]");
  });
});
