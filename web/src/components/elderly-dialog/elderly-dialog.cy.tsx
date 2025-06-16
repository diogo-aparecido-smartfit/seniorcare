import { ElderlyDialog } from "./elderly-dialog";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const mockElderly = {
  id: "1",
  name: "João Silva",
  birthDate: "1950-01-01",
  emergencyContact: "(11) 98765-4321",
  address: "Rua das Flores, 123",
  organizationId: "org1",
  caregivers: [{ id: "cg1", user: { name: "Cuidador 1" } }],
  familyMembers: [],
};

const mockCaregivers = [
  { id: "cg1", user: { name: "Cuidador 1" } },
  { id: "cg2", user: { name: "Cuidador 2" } },
  { id: "cg3", user: { name: "Cuidador 3" } },
];

describe("ElderlyDialog Component", () => {
  beforeEach(() => {
    cy.stub(React, "useContext").returns({
      user: { id: "user1", organizationId: "org1" },
    });

    cy.intercept("GET", "**/elderly/1", {
      statusCode: 200,
      body: mockElderly,
    }).as("getElderlyDetails");

    cy.intercept("GET", "**/caregivers*", {
      statusCode: 200,
      body: mockCaregivers,
    }).as("getCaregivers");

    cy.intercept("POST", "**/elderly", {
      statusCode: 201,
      body: { ...mockElderly, name: "Novo Idoso" },
    }).as("createElderly");

    cy.intercept("PUT", "**/elderly/1", {
      statusCode: 200,
      body: { ...mockElderly, name: "João Silva Atualizado" },
    }).as("updateElderly");

    cy.intercept("POST", "**/elderly/*/caregivers/*", {
      statusCode: 200,
      body: { message: "Linked successfully" },
    }).as("linkCaregiver");

    cy.intercept("DELETE", "**/elderly/*/caregivers/*", {
      statusCode: 200,
      body: { message: "Unlinked successfully" },
    }).as("unlinkCaregiver");
  });

  it("renders the dialog with correct title for new elderly", () => {
    cy.mount(
      <QueryClientProvider client={queryClient}>
        <ElderlyDialog
          open={true}
          onOpenChange={cy.stub().as("onOpenChange")}
          elderlyId={null}
          onClose={cy.stub().as("onClose")}
        />
      </QueryClientProvider>
    );

    cy.contains("Adicionar Idoso").should("be.visible");
    cy.get("form").should("be.visible");
  });

  it("renders the dialog with correct title for editing elderly", () => {
    cy.mount(
      <QueryClientProvider client={queryClient}>
        <ElderlyDialog
          open={true}
          onOpenChange={cy.stub().as("onOpenChange")}
          elderlyId="1"
          onClose={cy.stub().as("onClose")}
        />
      </QueryClientProvider>
    );

    cy.wait("@getElderlyDetails");
    cy.contains("Editar Idoso").should("be.visible");
  });

  it("populates form fields with elderly data when editing", () => {
    cy.mount(
      <QueryClientProvider client={queryClient}>
        <ElderlyDialog
          open={true}
          onOpenChange={cy.stub().as("onOpenChange")}
          elderlyId="1"
          onClose={cy.stub().as("onClose")}
        />
      </QueryClientProvider>
    );

    cy.wait("@getElderlyDetails");
    cy.get("#name").should("have.value", "João Silva");
    cy.get("#birthDate").should("have.value", "1950-01-01");
    cy.get("#emergencyContact").should("have.value", "(11) 98765-4321");
    cy.get("#address").should("have.value", "Rua das Flores, 123");
  });

  it("loads caregivers in the dropdown", () => {
    cy.mount(
      <QueryClientProvider client={queryClient}>
        <ElderlyDialog
          open={true}
          onOpenChange={cy.stub().as("onOpenChange")}
          elderlyId={null}
          onClose={cy.stub().as("onClose")}
        />
      </QueryClientProvider>
    );

    cy.wait("@getCaregivers");
    cy.contains("Selecione um cuidador").click();
    cy.contains("Cuidador 1").should("be.visible");
    cy.contains("Cuidador 2").should("be.visible");
    cy.contains("Cuidador 3").should("be.visible");
  });

  it("validates required fields", () => {
    cy.mount(
      <QueryClientProvider client={queryClient}>
        <ElderlyDialog
          open={true}
          onOpenChange={cy.stub().as("onOpenChange")}
          elderlyId={null}
          onClose={cy.stub().as("onClose")}
        />
      </QueryClientProvider>
    );

    cy.get("#name").clear();
    cy.get("#emergencyContact").clear();
    cy.get("#address").clear();

    cy.contains("Salvar").click();

    cy.contains("Nome é obrigatório").should("be.visible");
    cy.contains("Contato de emergência é obrigatório").should("be.visible");
    cy.contains("Endereço é obrigatório").should("be.visible");
  });

  it("submits form with correct data when creating new elderly", () => {
    cy.mount(
      <QueryClientProvider client={queryClient}>
        <ElderlyDialog
          open={true}
          onOpenChange={cy.stub().as("onOpenChange")}
          elderlyId={null}
          onClose={cy.stub().as("onClose")}
        />
      </QueryClientProvider>
    );

    cy.get("#name").clear().type("Novo Idoso");
    cy.get("#birthDate").clear().type("1945-05-10");
    cy.get("#emergencyContact").clear().type("(11) 99999-8888");
    cy.get("#address").clear().type("Av. Principal, 456");

    cy.contains("Selecione um cuidador").click();
    cy.contains("Cuidador 2").click();

    cy.contains("Salvar").click();

    cy.get("@onClose").should("have.been.called");
    cy.wait("@createElderly").its("request.body").should("include", {
      name: "Novo Idoso",
      birthDate: "1945-05-10",
      emergencyContact: "(11) 99999-8888",
      address: "Av. Principal, 456",
    });
  });

  it("submits form with correct data when updating elderly", () => {
    cy.mount(
      <QueryClientProvider client={queryClient}>
        <ElderlyDialog
          open={true}
          onOpenChange={cy.stub().as("onOpenChange")}
          elderlyId="1"
          onClose={cy.stub().as("onClose")}
        />
      </QueryClientProvider>
    );

    cy.wait("@getElderlyDetails");

    cy.get("#name").clear().type("João Silva Atualizado");
    cy.get("#emergencyContact").clear().type("(11) 99999-7777");

    cy.contains("Salvar").click();

    cy.get("@onClose").should("have.been.called");
    cy.wait("@updateElderly").its("request.body").should("include", {
      name: "João Silva Atualizado",
      emergencyContact: "(11) 99999-7777",
    });
  });

  it("changes caregiver and calls the correct APIs", () => {
    cy.mount(
      <QueryClientProvider client={queryClient}>
        <ElderlyDialog
          open={true}
          onOpenChange={cy.stub().as("onOpenChange")}
          elderlyId="1"
          onClose={cy.stub().as("onClose")}
        />
      </QueryClientProvider>
    );

    cy.wait("@getElderlyDetails");
    cy.wait("@getCaregivers");

    cy.contains("Cuidador 1").click();
    cy.contains("Cuidador 3").click();

    cy.contains("Salvar").click();

    cy.wait("@updateElderly");
    cy.wait("@unlinkCaregiver");
    cy.wait("@linkCaregiver");
    cy.get("@onClose").should("have.been.called");
  });

  it("closes dialog when cancel button is clicked", () => {
    cy.mount(
      <QueryClientProvider client={queryClient}>
        <ElderlyDialog
          open={true}
          onOpenChange={cy.stub().as("onOpenChange")}
          elderlyId={null}
          onClose={cy.stub().as("onClose")}
        />
      </QueryClientProvider>
    );

    cy.contains("Cancelar").click();
    cy.get("@onClose").should("have.been.called");
  });

  it("displays loading state during submission", () => {
    cy.intercept("POST", "**/elderly", {
      delay: 1000,
      statusCode: 201,
      body: { id: "2", name: "Novo Idoso" },
    }).as("slowCreateElderly");

    cy.mount(
      <QueryClientProvider client={queryClient}>
        <ElderlyDialog
          open={true}
          onOpenChange={cy.stub().as("onOpenChange")}
          elderlyId={null}
          onClose={cy.stub().as("onClose")}
        />
      </QueryClientProvider>
    );

    cy.get("#name").clear().type("Novo Idoso");
    cy.get("#emergencyContact").clear().type("(11) 99999-8888");
    cy.get("#address").clear().type("Av. Principal, 456");

    cy.contains("Salvar").click();

    cy.contains("Salvando...").should("be.visible");
    cy.get("button[type='submit']").should("be.disabled");
    cy.get("button").contains("Cancelar").should("be.disabled");
  });
});
