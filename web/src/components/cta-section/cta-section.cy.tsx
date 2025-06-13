import { CTASection } from "./cta-section";

describe("CTASection Component", () => {
  const mockProps = {
    title: "Test Title",
    description: "Test Description",
    primaryAction: "Get Started",
    secondaryAction: "Learn More",
  };

  beforeEach(() => {
    cy.mount(<CTASection {...mockProps} />);
  });

  it("renders the title correctly", () => {
    cy.contains(mockProps.title).should("be.visible");
  });

  it("renders the description correctly", () => {
    cy.contains(mockProps.description).should("be.visible");
    cy.contains(mockProps.description).should("have.class", "text-gray-500");
  });

  it("renders both action buttons", () => {
    cy.contains(mockProps.primaryAction).should("be.visible");
    cy.contains(mockProps.secondaryAction).should("be.visible");
  });

  it("applies correct styling to primary action", () => {
    cy.contains(mockProps.primaryAction).should("have.class", "bg-blue-600");
  });

  it("applies correct styling to secondary action", () => {
    cy.contains(mockProps.secondaryAction).should(
      "have.attr",
      "variant",
      "outline"
    );
  });

  it("wraps primary action in a link to signup page", () => {
    cy.contains(mockProps.primaryAction)
      .parent()
      .should("have.attr", "href", "/auth/signup");
  });
});
