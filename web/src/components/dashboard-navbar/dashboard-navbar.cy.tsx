import { SidebarProvider } from "../ui/sidebar";
import DashboardNavbar from "./dashboard-navbar";
import * as nextRouter from "next/navigation";

describe("DashboardNavbar Component", () => {
  beforeEach(() => {
    cy.stub(nextRouter, "usePathname").returns("/dashboard/overview");

    cy.mount(
      <SidebarProvider>
        <DashboardNavbar />
      </SidebarProvider>
    );
  });

  it("should render the SidebarTrigger for mobile", () => {
    cy.viewport(375, 667);
    cy.get("nav").find(".md\\:hidden").should("exist");
  });

  it("should render the notification button and avatar on mobile", () => {
    cy.viewport(375, 667);
    cy.get("nav")
      .find(".md\\:hidden")
      .first()
      .within(() => {
        cy.get("button").should("exist");
        cy.get("img").should(
          "have.attr",
          "src",
          "https://github.com/shadcn.png"
        );
      });
  });

  it("should render the breadcrumb navigation on desktop", () => {
    cy.viewport(1280, 720);
    cy.get("nav")
      .find(".md\\:flex")
      .first()
      .within(() => {
        cy.contains("Dashboard").should("exist");
      });
  });

  it("should render the search input on desktop", () => {
    cy.viewport(1280, 720);
    cy.get("nav").find("input[placeholder='Pesquisar ⌘/']").should("exist");
  });

  it("should render the breadcrumb items correctly", () => {
    cy.viewport(1280, 720);
    const routeArray = ["dashboard", "overview"];
    routeArray.forEach((route) => {
      cy.get("nav")
        .contains(route.charAt(0).toUpperCase() + route.slice(1))
        .should("exist");
    });
  });
});
