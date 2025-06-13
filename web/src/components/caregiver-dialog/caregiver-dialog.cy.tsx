/* eslint-disable @typescript-eslint/no-require-imports */
import { CaregiverDialog } from "./caregiver-dialog";
import { AuthProvider } from "@/contexts/AuthContext";

// Mock the necessary hooks
const mockUseAuth = {
  user: {
    organizationId: "org-123",
  },
};

const mockCaregiverDetails = {
  id: "caregiver-123",
  specialty: "Geriatria",
  user: {
    id: "user-123",
    name: "João Silva",
    email: "joao@example.com",
  },
  organization: {
    id: "org-123",
    name: "Hospital ABC",
    domain: "hospital-abc.com",
  },
};

const mockCreateCaregiver = {
  mutateAsync: cy.stub().resolves({}),
  isPending: false,
};

const mockUpdateCaregiver = {
  mutateAsync: cy.stub().resolves({}),
  isPending: false,
};

describe("CaregiverDialog Component", () => {
  describe("Add Caregiver Mode", () => {
    beforeEach(() => {
      // Mock the necessary hooks
      cy.stub(require("@/contexts/AuthContext"), "useAuth").returns(
        mockUseAuth
      );
      cy.stub(
        require("@/hooks/useCaregiverDetails"),
        "useCaregiverDetails"
      ).returns({ data: null });
      cy.stub(
        require("@/hooks/useCreateCaregiver"),
        "useCreateCaregiver"
      ).returns(mockCreateCaregiver);
      cy.stub(
        require("@/hooks/useUpdateCaregiver"),
        "useUpdateCaregiver"
      ).returns(mockUpdateCaregiver);

      const onCloseSpy = cy.spy().as("onCloseSpy");
      const onOpenChangeSpy = cy.spy().as("onOpenChangeSpy");

      // Mount the component in add mode
      cy.mount(
        <AuthProvider>
          <CaregiverDialog
            open={true}
            onOpenChange={onOpenChangeSpy}
            caregiverId={null}
            onClose={onCloseSpy}
          />
        </AuthProvider>
      );
    });

    it("should display the correct title for adding a caregiver", () => {
      cy.contains("Adicionar Cuidador").should("be.visible");
    });

    it("should have empty form fields initially", () => {
      cy.get("#userName").should("have.value", "");
      cy.get("#userEmail").should("have.value", "");
      cy.get("#specialty").should("have.value", "");
    });

    it("should display validation errors when form is submitted with empty fields", () => {
      cy.get("button[type='submit']").click();
      cy.contains("Nome é obrigatório").should("be.visible");
      cy.contains("Email é obrigatório").should("be.visible");
      cy.contains("Especialidade é obrigatória").should("be.visible");
    });

    it("should call createCaregiver when form is submitted with valid data", () => {
      cy.get("#userName").type("Maria Oliveira");
      cy.get("#userEmail").type("maria@example.com");
      cy.get("#specialty").type("Fisioterapeuta");

      cy.get("button[type='submit']").click();
      cy.get("@onCloseSpy").should("have.been.called");
    });

    it("should close the dialog when Cancel button is clicked", () => {
      cy.get("button").contains("Cancelar").click();
      cy.get("@onCloseSpy").should("have.been.called");
    });
  });

  describe("Edit Caregiver Mode", () => {
    beforeEach(() => {
      // Mock the necessary hooks
      cy.stub(require("@/contexts/AuthContext"), "useAuth").returns(
        mockUseAuth
      );
      cy.stub(
        require("@/hooks/useCaregiverDetails"),
        "useCaregiverDetails"
      ).returns({ data: mockCaregiverDetails });
      cy.stub(
        require("@/hooks/useCreateCaregiver"),
        "useCreateCaregiver"
      ).returns(mockCreateCaregiver);
      cy.stub(
        require("@/hooks/useUpdateCaregiver"),
        "useUpdateCaregiver"
      ).returns(mockUpdateCaregiver);

      const onCloseSpy = cy.spy().as("onCloseSpy");
      const onOpenChangeSpy = cy.spy().as("onOpenChangeSpy");

      // Mount the component in edit mode
      cy.mount(
        <AuthProvider>
          <CaregiverDialog
            open={true}
            onOpenChange={onOpenChangeSpy}
            caregiverId="caregiver-123"
            onClose={onCloseSpy}
          />
        </AuthProvider>
      );
    });

    it("should display the correct title for editing a caregiver", () => {
      cy.contains("Editar Cuidador").should("be.visible");
    });

    it("should populate form fields with existing caregiver data", () => {
      cy.get("#userName").should("have.value", "João Silva");
      cy.get("#userEmail").should("have.value", "joao@example.com");
      cy.get("#specialty").should("have.value", "Geriatria");
    });

    it("should call updateCaregiver when form is submitted with valid data", () => {
      cy.get("#specialty").clear().type("Geriatria e Cuidados Paliativos");

      cy.get("button[type='submit']").click();
      cy.get("@onCloseSpy").should("have.been.called");
    });
  });

  describe("Loading State", () => {
    it("should display loading state during form submission", () => {
      // Mock the necessary hooks with pending state
      cy.stub(require("@/contexts/AuthContext"), "useAuth").returns(
        mockUseAuth
      );
      cy.stub(
        require("@/hooks/useCaregiverDetails"),
        "useCaregiverDetails"
      ).returns({ data: null });
      cy.stub(
        require("@/hooks/useCreateCaregiver"),
        "useCreateCaregiver"
      ).returns({
        ...mockCreateCaregiver,
        isPending: true,
      });
      cy.stub(
        require("@/hooks/useUpdateCaregiver"),
        "useUpdateCaregiver"
      ).returns(mockUpdateCaregiver);

      const onCloseSpy = cy.spy();
      const onOpenChangeSpy = cy.spy();

      // Mount the component
      cy.mount(
        <AuthProvider>
          <CaregiverDialog
            open={true}
            onOpenChange={onOpenChangeSpy}
            caregiverId={null}
            onClose={onCloseSpy}
          />
        </AuthProvider>
      );

      // Check if the button shows loading state
      cy.get("button[type='submit']").should("contain", "Salvando...");
      cy.get("button[type='submit']").should("be.disabled");
    });
  });
});
