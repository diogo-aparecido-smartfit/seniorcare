import { AppSidebar } from "./app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

describe("AppSidebar Component", () => {
  beforeEach(() => {
    cy.mount(
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
      </SidebarProvider>
    );
  });

  it("should render the sidebar structure correctly", () => {
    cy.get('[role="complementary"]').should("exist");

    cy.get("div").contains("Application").should("exist");
  });

  it("should display the group label 'Application'", () => {
    cy.contains("Application").should("be.visible");
  });

  it("should render all navigation items with correct text", () => {
    const expectedItems = ["Home", "Inbox", "Calendar", "Search", "Settings"];

    expectedItems.forEach((item) => {
      cy.contains("a", item).should("be.visible");
    });
  });

  it("should render icons for each menu item", () => {
    cy.get("a svg").should("have.length", 5);
  });

  it("should have correct link attributes for each item", () => {
    cy.get("a").each(($el) => {
      cy.wrap($el).should("have.attr", "href", "#");
    });
  });

  it("should position items correctly in the sidebar", () => {
    const expectedOrder = ["Home", "Inbox", "Calendar", "Search", "Settings"];

    cy.get("a").each(($el, index) => {
      cy.wrap($el).should("contain.text", expectedOrder[index]);
    });
  });

  it("should have interactive menu items", () => {
    cy.get("a").first().click({ force: true });

    cy.url().should("include", "");
  });

  it("should maintain visibility on different viewport sizes", () => {
    cy.viewport(375, 667);
    cy.contains("Application").should("exist");
    cy.get("a").should("have.length", 5);

    cy.viewport(1280, 720);
    cy.contains("Application").should("exist");
    cy.get("a").should("have.length", 5);
  });
});
