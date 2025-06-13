import { CaregiverSummary } from "./caregiver";
import { FamilyMemberSummary } from "./familyMember";

export interface Elderly {
  id: string;
  organizationId: string;
  name: string;
  birthDate: string;
  emergencyContact?: string;
  address?: string;
  caregivers: CaregiverSummary[];
  familyMembers: FamilyMemberSummary[];
}

export interface ElderlyRequest {
  organizationId: string;
  name: string;
  birthDate: string;
  emergencyContact?: string;
  address?: string;
}
