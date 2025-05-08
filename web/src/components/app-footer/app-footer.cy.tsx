import { AppFooter } from "./app-footer";

describe("AppFooter Component", () => {
  beforeEach(() => {
    cy.mount(<AppFooter />);
  });

  it("should display the logo with the correct text", () => {
    cy.get("footer button").contains("Senior").should("exist");
    cy.get("footer button").contains("Care").should("exist");
  });

  it("should display the navigation links", () => {
    const links = ["Contato", "Copyright", "Privacidade", "Termos"];
    links.forEach((linkText) => {
      cy.get("footer ul")
        .first()
        .contains(linkText)
        .should("have.attr", "href")
        .and("not.be.empty");
    });
  });

  it("should display social media icons", () => {
    cy.get("footer ul")
      .eq(1)
      .within(() => {
        cy.get("li").should("have.length", 3);
        cy.get("li").eq(0).find("svg").should("exist"); // Facebook
        cy.get("li").eq(1).find("svg").should("exist"); // Instagram
        cy.get("li").eq(2).find("svg").should("exist"); // Threads
      });
  });

  it("should display the copyright text", () => {
    cy.get("footer").contains("© 2025 SeniorCare, Inc.").should("exist");
  });

  it("should have hover effects on links and icons", () => {
    cy.get("footer ul li").each(($el) => {
      cy.wrap($el)
        .trigger("mouseover")
        .should("have.class", "hover:text-gray-400");
    });
  });
});
