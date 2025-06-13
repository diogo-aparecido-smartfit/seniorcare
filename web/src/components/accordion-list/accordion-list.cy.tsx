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

    // Check all questions are rendered
    mockItems.forEach((item) => {
      cy.contains(item.question).should("be.visible");
    });

    // Answers should not be visible initially
    mockItems.forEach((item) => {
      cy.contains(item.answer).should("not.be.visible");
    });
  });

  it("expands and collapses accordion items when clicked", () => {
    cy.mount(<AccordionList items={mockItems} />);

    // Click first item and verify it expands
    cy.contains(mockItems[0].question).click();
    cy.contains(mockItems[0].answer).should("be.visible");

    // Other answers should remain hidden
    cy.contains(mockItems[1].answer).should("not.be.visible");

    // Click first item again and verify it collapses
    cy.contains(mockItems[0].question).click();
    cy.contains(mockItems[0].answer).should("not.be.visible");
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

    // First items should have border bottom
    cy.get("li").eq(0).should("have.class", "border-b-[1px]");
    cy.get("li").eq(1).should("have.class", "border-b-[1px]");

    // Last item should not have border bottom
    cy.get("li").eq(2).should("not.have.class", "border-b-[1px]");
    cy.get("li").eq(2).should("have.class", "border-b-0");
  });
});
