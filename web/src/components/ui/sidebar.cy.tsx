import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./sidebar";
import { Home, Settings } from "lucide-react";

describe("Sidebar Component", () => {
  it("renders with default props", () => {
    cy.mount(
      <Sidebar>
        <SidebarHeader>Test Header</SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Home className="mr-2" />
                Home
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    );

    cy.contains("Test Header").should("be.visible");
    cy.contains("Home").should("be.visible");
  });

  it("handles variant and side props correctly", () => {
    cy.mount(
      <Sidebar variant="floating" side="right">
        <SidebarContent>Content</SidebarContent>
      </Sidebar>
    );

    cy.get('[data-variant="floating"]').should("exist");
    cy.get('[data-side="right"]').should("exist");
  });

  it("handles collapsible prop and state changes", () => {
    cy.mount(
      <Sidebar collapsible="icon">
        <SidebarHeader>Header</SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Home />
                Home
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    );

    cy.get('[data-collapsible="icon"]').should("exist");
  });

  it("renders active menu item correctly", () => {
    cy.mount(
      <Sidebar>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={true}>
                <Home />
                Active Item
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={false}>
                <Settings />
                Inactive Item
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    );

    cy.contains("Active Item").should("have.attr", "data-active", "true");
    cy.contains("Inactive Item").should("not.have.attr", "data-active", "true");
  });
});
