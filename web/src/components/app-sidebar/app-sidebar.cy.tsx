import { AppSidebar } from "./app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

describe("AppSidebar Component", () => {
  beforeEach(() => {
    cy.mount(
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>
    );
  });

  it("should render the sidebar correctly", () => {
    cy.get("[data-sidebar='sidebar']").should("exist");
  });

  it("should display the group label", () => {
    cy.get("[data-sidebar='group-label']")
      .contains("Application")
      .should("exist");
  });

  it("should render all navigation items", () => {
    const expectedItems = ["Home", "Inbox", "Calendar", "Search", "Settings"];
    expectedItems.forEach((item) => {
      cy.get("[data-sidebar='menu-button']").contains(item).should("exist");
    });
  });

  it("should render icons for each menu item", () => {
    // Count the number of menu items and ensure each has an SVG icon
    cy.get("[data-sidebar='menu-item']").should("have.length", 5);
    cy.get("[data-sidebar='menu-item'] svg").should("have.length", 5);
  });

  it("should have correct link attributes for each item", () => {
    cy.get("[data-sidebar='menu-button']").each(($el) => {
      cy.wrap($el).find("a").should("have.attr", "href", "#");
    });
  });

  it("should handle hover effects on menu items", () => {
    cy.get("[data-sidebar='menu-button']").first().trigger("mouseover");
    cy.get("[data-sidebar='menu-button']")
      .first()
      .should("have.class", "hover:bg-sidebar-accent");
  });

  it("should maintain structure on different viewport sizes", () => {
    // Test on mobile viewport
    cy.viewport(375, 667);
    cy.get("[data-sidebar='sidebar']").should("exist");
    cy.get("[data-sidebar='menu-item']").should("have.length", 5);

    // Test on desktop viewport
    cy.viewport(1280, 720);
    cy.get("[data-sidebar='sidebar']").should("exist");
    cy.get("[data-sidebar='menu-item']").should("have.length", 5);
  });
});
