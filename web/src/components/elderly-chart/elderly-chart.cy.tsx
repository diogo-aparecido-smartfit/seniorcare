import { ElderlyChart } from "./elderly-chart";
import React from "react";

describe("ElderlyChart Component", () => {
  const mockData = {
    total: 100,
    byHealthStatus: {
      stable: 40,
      critical: 10,
      improving: 30,
      declining: 20,
    },
  };

  beforeEach(() => {
    cy.mount(<ElderlyChart data={mockData} />);
  });

  it("renders the card with correct title", () => {
    cy.contains("Estado dos Idosos").should("exist");
  });

  it("renders pie chart with correct data", () => {
    cy.get("svg").should("exist");
    cy.get(".recharts-pie-sector").should("have.length", 4);
  });

  it("displays all health status categories in legend", () => {
    cy.contains("Estável").should("exist");
    cy.contains("Crítico").should("exist");
    cy.contains("Melhorando").should("exist");
    cy.contains("Piorando").should("exist");
  });

  it("renders with correct colors for each category", () => {
    cy.get(".recharts-pie-sector").eq(0).should("have.attr", "fill", "#10b981");
    cy.get(".recharts-pie-sector").eq(1).should("have.attr", "fill", "#ef4444");
    cy.get(".recharts-pie-sector").eq(2).should("have.attr", "fill", "#3b82f6");
    cy.get(".recharts-pie-sector").eq(3).should("have.attr", "fill", "#eab308");
  });

  it("handles empty data gracefully", () => {
    const emptyData = {
      total: 0,
      byHealthStatus: {
        stable: 0,
        critical: 0,
        improving: 0,
        declining: 0,
      },
    };

    cy.mount(<ElderlyChart data={emptyData} />);
    cy.get("svg").should("exist");
  });

  it("handles partial data correctly", () => {
    const partialData = {
      total: 50,
      byHealthStatus: {
        stable: 30,
        critical: 20,
        improving: 0,
        declining: 0,
      },
    };

    cy.mount(<ElderlyChart data={partialData} />);
    cy.get(".recharts-pie-sector").should("have.length", 4);
  });

  it("renders with correct dimensions", () => {
    cy.get(".h-\\[250px\\]").should("exist");
    cy.get(".recharts-responsive-container").should(
      "have.attr",
      "width",
      "100%"
    );
    cy.get(".recharts-responsive-container").should(
      "have.attr",
      "height",
      "100%"
    );
  });

  it("renders pie chart with correct attributes", () => {
    cy.get(".recharts-pie").should("exist");
    cy.get(".recharts-pie").should("have.attr", "cx", "50%");
    cy.get(".recharts-pie").should("have.attr", "cy", "50%");
    cy.get(".recharts-pie").should("have.attr", "innerRadius", "60");
    cy.get(".recharts-pie").should("have.attr", "outerRadius", "80");
    cy.get(".recharts-pie").should("have.attr", "paddingAngle", "1");
  });

  it("displays pie sectors proportionally to data values", () => {
    const data = {
      total: 100,
      byHealthStatus: {
        stable: 50,
        critical: 10,
        improving: 30,
        declining: 10,
      },
    };

    cy.mount(<ElderlyChart data={data} />);

    cy.get(".recharts-pie-sector").then(($sectors) => {
      const firstSectorPath = $sectors[0].getAttribute("d");
      const thirdSectorPath = $sectors[2].getAttribute("d");

      expect(firstSectorPath?.length).to.be.greaterThan(
        thirdSectorPath?.length as number
      );
    });
  });
});
