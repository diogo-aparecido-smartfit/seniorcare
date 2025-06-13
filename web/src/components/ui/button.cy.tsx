import { Button } from "./button";

describe("Button Component", () => {
  it("renders default variant correctly", () => {
    cy.mount(<Button>Default Button</Button>);
    cy.contains("Default Button")
      .should("have.class", "bg-primary")
      .should("have.class", "text-primary-foreground");
  });

  it("renders destructive variant correctly", () => {
    cy.mount(<Button variant="destructive">Destructive Button</Button>);
    cy.contains("Destructive Button")
      .should("have.class", "bg-destructive")
      .should("have.class", "text-white");
  });

  it("renders outline variant correctly", () => {
    cy.mount(<Button variant="outline">Outline Button</Button>);
    cy.contains("Outline Button")
      .should("have.class", "border")
      .should("have.class", "bg-background");
  });

  it("renders different sizes correctly", () => {
    cy.mount(<Button size="sm">Small Button</Button>);
    cy.contains("Small Button").should("have.class", "h-8");

    cy.mount(<Button size="default">Default Button</Button>);
    cy.contains("Default Button").should("have.class", "h-9");

    cy.mount(<Button size="lg">Large Button</Button>);
    cy.contains("Large Button").should("have.class", "h-10");
  });

  it("applies disabled state correctly", () => {
    cy.mount(<Button disabled>Disabled Button</Button>);
    cy.contains("Disabled Button")
      .should("have.class", "disabled:pointer-events-none")
      .should("have.attr", "disabled");
  });

  it("handles click events", () => {
    const onClickSpy = cy.spy().as("clickSpy");
    cy.mount(<Button onClick={onClickSpy}>Click Me</Button>);
    cy.contains("Click Me").click();
    cy.get("@clickSpy").should("have.been.calledOnce");
  });
});
