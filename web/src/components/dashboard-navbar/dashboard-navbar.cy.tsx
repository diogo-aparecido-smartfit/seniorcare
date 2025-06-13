import { SidebarProvider } from "../ui/sidebar";
import DashboardNavbar from "./dashboard-navbar";
import * as nextRouter from "next/navigation";

describe("DashboardNavbar Component", () => {
  beforeEach(() => {
    // Use a stub that returns a function to properly mock usePathname
    cy.stub(nextRouter, "usePathname").returns("/dashboard/overview");

    // Mount component with proper SidebarProvider
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
    cy.get("nav").find(".md\\:hidden").find("button").should("exist");
    cy.get("nav")
      .find("img[src='https://github.com/shadcn.png']")
      .should("exist");
  });

  it("should render the breadcrumb navigation on desktop", () => {
    cy.viewport(1280, 720);
    cy.get("nav").contains("Dashboard").should("exist");
    cy.get("nav").contains("Overview").should("exist");
  });

  it("should render the search input on desktop", () => {
    cy.viewport(1280, 720);
    cy.get("nav").find("input[placeholder*='Pesquisar']").should("exist");
  });

  it("should handle sidebar toggle correctly", () => {
    cy.viewport(1280, 720);
    cy.get("button[aria-label='Toggle Sidebar']").should("exist");
  });
});
