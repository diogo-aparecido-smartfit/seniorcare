import { mount } from "cypress/react";
import "./commands";

// Mock do Next.js App Router
import * as nextNavigation from "next/navigation";

// Mock default das funções do router
const createRouterMock = () => {
  return {
    push: cy.stub().as("routerPush"),
    replace: cy.stub().as("routerReplace"),
    refresh: cy.stub().as("routerRefresh"),
    back: cy.stub().as("routerBack"),
    forward: cy.stub().as("routerForward"),
    prefetch: cy.spy().as("routerPrefetch"),
  };
};

// Mock do hook useRouter
const useRouterMock = () => createRouterMock();

// Mock das funções de navegação e pathnames
beforeEach(() => {
  cy.stub(nextNavigation, "useRouter").callsFake(useRouterMock);
  cy.stub(nextNavigation, "usePathname").returns("/dashboard/overview");
  cy.stub(nextNavigation, "useSearchParams").returns(new URLSearchParams());
  cy.stub(nextNavigation, "redirect").callsFake(cy.stub().as("routerRedirect"));
});

// Adiciona mount ao objeto global do Cypress
Cypress.Commands.add("mount", mount);
