export interface Organization {
  id: string;
  name: string;
  domain: string;
}

export interface OrganizationSummary {
  id: string;
  name: string;
  domain: string;
}

export interface OrganizationRequest {
  name: string;
  domain: string;
}
