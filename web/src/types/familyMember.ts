import { OrganizationSummary } from "./organization";
import { UserSummary } from "./user";
import { Elderly } from "./elderly";

export interface FamilyMember {
  id: string;
  organization: OrganizationSummary;
  user: UserSummary;
  elderly: Elderly;
  relationship: Relationship;
}

export interface FamilyMemberSummary {
  id: string;
  user: UserSummary;
  relationship: Relationship;
}

export enum Relationship {
  SON = "SON",
  DAUGHTER = "DAUGHTER",
  GRANDSON = "GRANDSON",
  GRANDDAUGHTER = "GRANDDAUGHTER",
  NEPHEW = "NEPHEW",
  NIECE = "NIECE",
  OTHER = "OTHER",
}

export interface FamilyMemberRequest {
  organizationId: string;
  userId: string;
  elderlyId: string;
  relationship: Relationship;
}
