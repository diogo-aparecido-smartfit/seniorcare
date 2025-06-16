import { AccordionList } from "./accordion-list";

describe("AccordionList Component", () => {
  const mockItems = [
    {
      id: "item-1",
      question: "First Question",
      answer: "First Answer",
    },
    {
      id: "item-2",
      question: "Second Question",
      answer: "Second Answer",
    },
    {
      id: "item-3",
      question: "Third Question",
      answer: "Third Answer",
    },
  ];

  it("renders correctly with multiple items", () => {
    cy.mount(<AccordionList items={mockItems} />);

    mockItems.forEach((item) => {
      cy.contains(item.question).should("be.visible");
    });

    mockItems.forEach(() => {
      cy.get(`[data-state="closed"]`).should("exist");
    });
  });

  it("expands and collapses accordion items when clicked", () => {
    cy.mount(<AccordionList items={mockItems} />);

    cy.contains(mockItems[0].question).click();

    cy.get(`[data-state="open"]`).should("exist");
    cy.get(`[data-state="open"]`).contains(mockItems[0].answer).should("exist");

    cy.contains(mockItems[1].question)
      .parent()
      .should("have.attr", "data-state", "closed");

    cy.contains(mockItems[0].question).click();
    cy.get(`[data-state="open"]`).should("not.exist");
  });

  it("applies correct styling when isLast=true", () => {
    cy.mount(<AccordionList items={mockItems} isLast={true} />);
    cy.get("ul").should("have.class", "border-t-0");
    cy.get("ul").should("have.class", "rounded-t-none");
  });

  it("applies correct styling when isLast=false", () => {
    cy.mount(<AccordionList items={mockItems} isLast={false} />);
    cy.get("ul").should("have.class", "rounded-b-none");
    cy.get("ul").should("not.have.class", "border-t-0");
  });

  it("applies correct border styling to list items", () => {
    cy.mount(<AccordionList items={mockItems} />);

    cy.get("li").eq(0).should("have.class", "border-b-[1px]");
    cy.get("li").eq(1).should("have.class", "border-b-[1px]");

    cy.get("li").eq(2).should("not.have.class", "border-b-[1px]");
    cy.get("li").eq(2).should("have.class", "border-b-0");
  });
});
