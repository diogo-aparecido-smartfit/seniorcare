import DatePicker from "./date-picker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

describe("DatePicker Component", () => {
  beforeEach(() => {
    cy.mount(<DatePicker />);
  });

  it("renders with today's date by default", () => {
    cy.contains("Hoje").should("exist");
  });

  it("shows popover when clicked", () => {
    cy.get("button").click();
    cy.get('[role="dialog"]').should("be.visible");
    cy.get(".rdp").should("exist");
  });

  it("hides popover when clicking outside", () => {
    cy.get("button").click();
    cy.get('[role="dialog"]').should("be.visible");
    cy.get("body").click(0, 0);
    cy.get('[role="dialog"]').should("not.exist");
  });

  it("allows selecting a different date", () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    cy.get("button").click();

    cy.get(".rdp-day").not(".rdp-day_today").first().click();

    cy.get("button").should("not.contain", "Hoje");
    cy.get('[role="dialog"]').should("not.exist");
  });

  it("displays button with correct styling", () => {
    cy.get("button")
      .should("have.class", "w-fit")
      .should("have.class", "justify-start")
      .should("have.class", "text-left")
      .should("have.class", "font-semibold")
      .should("have.class", "text-xl");
  });

  it("shows chevron icon in button", () => {
    cy.get("button svg").should("exist");
  });

  it("calendar has correct initial focus", () => {
    cy.get("button").click();
    cy.get(".rdp-day_today").should("exist");
  });

  it("focuses on today's date when calendar opens", () => {
    cy.get("button").click();
    cy.get(".rdp-day_today").should("have.attr", "tabindex", "0");
  });

  it("shows correct month and year in calendar header", () => {
    const currentMonth = format(new Date(), "LLLL", { locale: ptBR });
    const currentYear = format(new Date(), "yyyy");

    cy.get("button").click();
    cy.get(".rdp-caption").should(
      "contain",
      currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)
    );
    cy.get(".rdp-caption").should("contain", currentYear);
  });

  it("allows navigation between months", () => {
    cy.get("button").click();

    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const nextMonthName = format(nextMonth, "LLLL", { locale: ptBR });

    cy.get("button.rdp-nav_button_next").click();
    cy.get(".rdp-caption").should(
      "contain",
      nextMonthName.charAt(0).toUpperCase() + nextMonthName.slice(1)
    );
  });

  it("closes popover when a date is selected", () => {
    cy.get("button").click();
    cy.get(".rdp-day").not(".rdp-day_today").first().click();
    cy.get('[role="dialog"]').should("not.exist");
  });
});
