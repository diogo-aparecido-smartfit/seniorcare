export interface User {
  id: string;
  organizationId: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface UserSummary {
  id: string;
  name: string;
  email: string;
}

export interface UserRequest {
  organizationId: string;
  name: string;
  email: string;
  password?: string;
  role: string;
}
