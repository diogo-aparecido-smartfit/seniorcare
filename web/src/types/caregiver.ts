import { OrganizationSummary } from "./organization";
import { UserSummary } from "./user";

export interface Caregiver {
  id: string;
  organization: OrganizationSummary;
  user: UserSummary;
  specialty?: string;
}

export interface CaregiverSummary {
  id: string;
  user: UserSummary;
  specialty?: string;
}

export interface CaregiverRequest {
  organizationId: string;
  userId: string;
  specialty?: string;
}
