import { DataCard } from "./data-card";

describe("DataCard Component", () => {
  it("renders with correct label", () => {
    cy.mount(<DataCard label="Idosos Ativos" quantity={42} percentage={12} />);
    cy.contains("Idosos Ativos").should("exist");
  });

  it("formats quantity correctly", () => {
    cy.mount(<DataCard label="Consultas" quantity={1234} percentage={5} />);
    cy.contains("1.2k").should("exist");
  });

  it("displays the percentage with % symbol", () => {
    cy.mount(<DataCard label="Crescimento" quantity={50} percentage={25} />);
    cy.contains("25%").should("exist");
  });

  it("renders graph icon", () => {
    cy.mount(<DataCard label="Estatísticas" quantity={100} percentage={10} />);
    cy.get("svg").should("exist");
  });

  it("applies correct styling", () => {
    cy.mount(<DataCard label="Visitas" quantity={75} percentage={8} />);

    cy.get("div").first().should("have.class", "border-[1px]");
    cy.get("div").first().should("have.class", "rounded-xl");

    cy.contains("Visitas").should("have.class", "text-xl");
    cy.contains("Visitas").should("have.class", "font-semibold");

    cy.contains("75").should("have.class", "text-4xl");
    cy.contains("8%").should("have.class", "text-base");
  });

  it("handles zero values correctly", () => {
    cy.mount(<DataCard label="Sem dados" quantity={0} percentage={0} />);
    cy.contains("0").should("exist");
    cy.contains("0%").should("exist");
  });

  it("handles large numbers correctly", () => {
    cy.mount(<DataCard label="Análises" quantity={1000000} percentage={42} />);
    cy.contains("1M").should("exist");
  });

  it("renders all expected elements", () => {
    cy.mount(<DataCard label="Eventos" quantity={87} percentage={15} />);

    cy.contains("Eventos").should("exist");
    cy.contains("87").should("exist");
    cy.contains("15%").should("exist");
    cy.get("svg").should("exist");
  });
});
