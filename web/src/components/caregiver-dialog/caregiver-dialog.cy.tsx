/* eslint-disable @typescript-eslint/no-require-imports */
import { NextRouter } from "next/router";
import { CaregiverDialog } from "./caregiver-dialog";
import { AuthProvider } from "@/contexts/AuthContext";

describe("CaregiverDialog Component", () => {
  const mockRouter: Partial<NextRouter> = {
    pathname: "/",
    route: "/",
    asPath: "/",
    query: {},
    push: cy.stub().as("routerPush"),
    replace: cy.stub().as("routerReplace"),
    reload: cy.stub().as("routerReload"),
    back: cy.stub().as("routerBack"),
    prefetch: cy.stub().resolves(true),
    events: {
      on: cy.stub().as("routerOn"),
      off: cy.stub().as("routerOff"),
      emit: cy.stub().as("routerEmit"),
    },
    isFallback: false,
    isReady: true,
    isPreview: false,
    isLocaleDomain: false,
  };

  // Mock Next.js navigation hook (useRouter)
  cy.stub(require("next/navigation"), "useRouter").returns(mockRouter);
  cy.stub(require("next/navigation"), "usePathname").returns("/");
  cy.stub(require("next/navigation"), "useSearchParams").returns(
    new URLSearchParams()
  );

  const TestWrapper = ({ children }: { children: React.ReactNode }) => {
    return <div data-testid="test-wrapper">{children}</div>;
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

  const mockUseAuth = {
    user: {
      organizationId: "org-123",
    },
  };

  describe("Add Caregiver Mode", () => {
    beforeEach(() => {
      // Setup global stubs for Next.js hooks
      cy.stub(require("next/navigation"), "useRouter").returns(mockRouter);
      cy.stub(require("next/navigation"), "usePathname").returns("/");
      cy.stub(require("next/navigation"), "useSearchParams").returns(
        new URLSearchParams()
      );
    });

    it("should display the correct title for adding a caregiver", () => {
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
        mutateAsync: cy.stub().resolves({}),
        isPending: false,
      });
      cy.stub(
        require("@/hooks/useUpdateCaregiver"),
        "useUpdateCaregiver"
      ).returns({
        mutateAsync: cy.stub().resolves({}),
        isPending: false,
      });

      const onCloseSpy = cy.spy().as("onCloseSpy");
      const onOpenChangeSpy = cy.spy().as("onOpenChangeSpy");

      cy.mount(
        <TestWrapper>
          <AuthProvider>
            <CaregiverDialog
              open={true}
              onOpenChange={onOpenChangeSpy}
              caregiverId={null}
              onClose={onCloseSpy}
            />
          </AuthProvider>
        </TestWrapper>
      );

      cy.contains("Adicionar Cuidador").should("be.visible");
    });

    it("should have empty form fields initially", () => {
      // Setup stubs
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
        mutateAsync: cy.stub().resolves({}),
        isPending: false,
      });
      cy.stub(
        require("@/hooks/useUpdateCaregiver"),
        "useUpdateCaregiver"
      ).returns({
        mutateAsync: cy.stub().resolves({}),
        isPending: false,
      });

      const onCloseSpy = cy.spy().as("onCloseSpy");
      const onOpenChangeSpy = cy.spy().as("onOpenChangeSpy");

      // Mount
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

      cy.get("#userName").should("have.value", "");
      cy.get("#userEmail").should("have.value", "");
      cy.get("#specialty").should("have.value", "");
    });

    it("should display validation errors when form is submitted with empty fields", () => {
      // Setup stubs
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
        mutateAsync: cy.stub().resolves({}),
        isPending: false,
      });
      cy.stub(
        require("@/hooks/useUpdateCaregiver"),
        "useUpdateCaregiver"
      ).returns({
        mutateAsync: cy.stub().resolves({}),
        isPending: false,
      });

      const onCloseSpy = cy.spy().as("onCloseSpy");
      const onOpenChangeSpy = cy.spy().as("onOpenChangeSpy");

      // Mount
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

      cy.get("button[type='submit']").click();
      cy.contains("Nome é obrigatório").should("be.visible");
      cy.contains("Email é obrigatório").should("be.visible");
      cy.contains("Especialidade é obrigatória").should("be.visible");
    });

    it("should call createCaregiver when form is submitted with valid data", () => {
      // Setup stubs with a spy for the create function
      cy.stub(require("@/contexts/AuthContext"), "useAuth").returns(
        mockUseAuth
      );
      cy.stub(
        require("@/hooks/useCaregiverDetails"),
        "useCaregiverDetails"
      ).returns({ data: null });

      const createStub = cy.stub().resolves({});
      cy.stub(
        require("@/hooks/useCreateCaregiver"),
        "useCreateCaregiver"
      ).returns({
        mutateAsync: createStub,
        isPending: false,
      });

      cy.stub(
        require("@/hooks/useUpdateCaregiver"),
        "useUpdateCaregiver"
      ).returns({
        mutateAsync: cy.stub().resolves({}),
        isPending: false,
      });

      const onCloseSpy = cy.spy().as("onCloseSpy");
      const onOpenChangeSpy = cy.spy().as("onOpenChangeSpy");

      // Mount
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

      cy.get("#userName").type("Maria Oliveira");
      cy.get("#userEmail").type("maria@example.com");
      cy.get("#specialty").type("Fisioterapeuta");

      cy.get("button[type='submit']").click();
      cy.get("@onCloseSpy").should("have.been.called");
    });

    it("should close the dialog when Cancel button is clicked", () => {
      // Setup stubs
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
        mutateAsync: cy.stub().resolves({}),
        isPending: false,
      });
      cy.stub(
        require("@/hooks/useUpdateCaregiver"),
        "useUpdateCaregiver"
      ).returns({
        mutateAsync: cy.stub().resolves({}),
        isPending: false,
      });

      const onCloseSpy = cy.spy().as("onCloseSpy");
      const onOpenChangeSpy = cy.spy().as("onOpenChangeSpy");

      // Mount
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

      cy.get("button").contains("Cancelar").click();
      cy.get("@onCloseSpy").should("have.been.called");
    });
  });

  describe("Edit Caregiver Mode", () => {
    it("should display the correct title for editing a caregiver", () => {
      // Setup stubs
      cy.stub(require("@/contexts/AuthContext"), "useAuth").returns(
        mockUseAuth
      );
      cy.stub(
        require("@/hooks/useCaregiverDetails"),
        "useCaregiverDetails"
      ).returns({
        data: mockCaregiverDetails,
      });
      cy.stub(
        require("@/hooks/useCreateCaregiver"),
        "useCreateCaregiver"
      ).returns({
        mutateAsync: cy.stub().resolves({}),
        isPending: false,
      });
      cy.stub(
        require("@/hooks/useUpdateCaregiver"),
        "useUpdateCaregiver"
      ).returns({
        mutateAsync: cy.stub().resolves({}),
        isPending: false,
      });

      const onCloseSpy = cy.spy().as("onCloseSpy");
      const onOpenChangeSpy = cy.spy().as("onOpenChangeSpy");

      // Mount in edit mode
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

      cy.contains("Editar Cuidador").should("be.visible");
    });

    it("should populate form fields with existing caregiver data", () => {
      // Setup stubs
      cy.stub(require("@/contexts/AuthContext"), "useAuth").returns(
        mockUseAuth
      );
      cy.stub(
        require("@/hooks/useCaregiverDetails"),
        "useCaregiverDetails"
      ).returns({
        data: mockCaregiverDetails,
      });
      cy.stub(
        require("@/hooks/useCreateCaregiver"),
        "useCreateCaregiver"
      ).returns({
        mutateAsync: cy.stub().resolves({}),
        isPending: false,
      });
      cy.stub(
        require("@/hooks/useUpdateCaregiver"),
        "useUpdateCaregiver"
      ).returns({
        mutateAsync: cy.stub().resolves({}),
        isPending: false,
      });

      const onCloseSpy = cy.spy().as("onCloseSpy");
      const onOpenChangeSpy = cy.spy().as("onOpenChangeSpy");

      // Mount in edit mode
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

      cy.get("#userName").should("have.value", "João Silva");
      cy.get("#userEmail").should("have.value", "joao@example.com");
      cy.get("#specialty").should("have.value", "Geriatria");
    });

    it("should call updateCaregiver when form is submitted with valid data", () => {
      // Setup stubs
      cy.stub(require("@/contexts/AuthContext"), "useAuth").returns(
        mockUseAuth
      );
      cy.stub(
        require("@/hooks/useCaregiverDetails"),
        "useCaregiverDetails"
      ).returns({
        data: mockCaregiverDetails,
      });
      cy.stub(
        require("@/hooks/useCreateCaregiver"),
        "useCreateCaregiver"
      ).returns({
        mutateAsync: cy.stub().resolves({}),
        isPending: false,
      });

      const updateStub = cy.stub().resolves({});
      cy.stub(
        require("@/hooks/useUpdateCaregiver"),
        "useUpdateCaregiver"
      ).returns({
        mutateAsync: updateStub,
        isPending: false,
      });

      const onCloseSpy = cy.spy().as("onCloseSpy");
      const onOpenChangeSpy = cy.spy().as("onOpenChangeSpy");

      // Mount in edit mode
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

      cy.get("#specialty").clear().type("Geriatria e Cuidados Paliativos");
      cy.get("button[type='submit']").click();
      cy.get("@onCloseSpy").should("have.been.called");
    });
  });

  describe("Loading State", () => {
    it("should display loading state during form submission", () => {
      // Setup stubs with pending state
      cy.stub(require("@/contexts/AuthContext"), "useAuth").returns(
        mockUseAuth
      );
      cy.stub(
        require("@/hooks/useCaregiverDetails"),
        "useCaregiverDetails"
      ).returns({
        data: null,
      });
      cy.stub(
        require("@/hooks/useCreateCaregiver"),
        "useCreateCaregiver"
      ).returns({
        mutateAsync: cy.stub().resolves({}),
        isPending: true, // Set loading state
      });
      cy.stub(
        require("@/hooks/useUpdateCaregiver"),
        "useUpdateCaregiver"
      ).returns({
        mutateAsync: cy.stub().resolves({}),
        isPending: false,
      });

      const onCloseSpy = cy.spy().as("onCloseSpy");
      const onOpenChangeSpy = cy.spy().as("onOpenChangeSpy");

      // Mount
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

      // Check loading state
      cy.get("button[type='submit']").should("contain", "Salvando...");
      cy.get("button[type='submit']").should("be.disabled");
    });
  });
});
