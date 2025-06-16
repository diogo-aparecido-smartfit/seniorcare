import { CareGiversChart } from "./caregivers-chart";

describe("CareGiversChart Component", () => {
  it("should render the chart with title", () => {
    const mockData = {
      total: 10,
      onDuty: 4,
    };

    cy.mount(<CareGiversChart data={mockData} />);

    cy.contains("Cuidadores").should("be.visible");
  });

  it("should calculate and display correct on duty and off duty values", () => {
    const mockData = {
      total: 20,
      onDuty: 8,
    };

    cy.mount(<CareGiversChart data={mockData} />);

    cy.contains("Em serviço").should("be.visible");
    cy.contains("Fora de serviço").should("be.visible");

    cy.get("text").contains("8").should("exist");
    cy.get("text").contains("12").should("exist");
  });

  it("should handle zero values", () => {
    const mockData = {
      total: 0,
      onDuty: 0,
    };

    cy.mount(<CareGiversChart data={mockData} />);

    cy.contains("Em serviço").should("be.visible");
    cy.contains("Fora de serviço").should("be.visible");
  });

  it("should handle edge case where onDuty is greater than total", () => {
    const mockData = {
      total: 5,
      onDuty: 10,
    };

    cy.mount(<CareGiversChart data={mockData} />);

    cy.get("text").contains("10").should("exist");

    cy.get("text").contains("0").should("exist");
  });

  it("should display correct colors for chart segments", () => {
    const mockData = {
      total: 10,
      onDuty: 5,
    };

    cy.mount(<CareGiversChart data={mockData} />);

    cy.get('[fill="#3b82f6"]').should("exist");
    cy.get('[fill="#9ca3af"]').should("exist");
  });

  it("should render chart with responsive container", () => {
    const mockData = {
      total: 10,
      onDuty: 5,
    };

    cy.mount(<CareGiversChart data={mockData} />);

    cy.get(".recharts-responsive-container").should("exist");

    cy.get(".h-\\[250px\\]").should("exist");
  });
});
