/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";

export interface User {
  id: string;
  organizationId: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  password?: string;
}

export interface Organization {
  id: string;
  name: string;
  domain: string;
}

export interface Elderly {
  id: string;
  organizationId: string;
  name: string;
  birthDate: string;
  emergencyContact: string;
  address: string;
  caregivers: Caregiver[];
  familyMembers: FamilyMember[];
}

export interface Caregiver {
  id: string;
  organization?: Organization;
  user: {
    id: string;
    name: string;
    email: string;
  };
  specialty: string;
}

export interface FamilyMember {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  relationship: string;
}

// Auth Services
export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post("/api/auth/login", { email, password });
    return response.data;
  },

  register: async (userData: any) => {
    const response = await api.post("/api/auth/register", userData);
    return response.data;
  },

  refreshToken: async (refreshToken: string) => {
    const response = await api.post("/api/auth/refresh", { refreshToken });
    return response.data;
  },
};

// User Services
export const userService = {
  getAll: async () => {
    const response = await api.get("/api/users");
    return response.data as User[];
  },

  getById: async (id: string) => {
    const response = await api.get(`/api/users/${id}`);
    return response.data as User;
  },

  create: async (userData: Partial<User>) => {
    const response = await api.post("/api/users", userData);
    return response.data as User;
  },

  update: async (id: string, userData: Partial<User>) => {
    const response = await api.put(`/api/users/${id}`, userData);
    return response.data as User;
  },

  delete: async (id: string) => {
    await api.delete(`/api/users/${id}`);
  },
};

// Organization Services
export const organizationService = {
  getAll: async () => {
    const response = await api.get("/api/organizations");
    return response.data as Organization[];
  },

  getById: async (id: string) => {
    const response = await api.get(`/api/organizations/${id}`);
    return response.data as Organization;
  },

  create: async (orgData: Partial<Organization>) => {
    const response = await api.post("/api/organizations", orgData);
    return response.data as Organization;
  },

  update: async (id: string, orgData: Partial<Organization>) => {
    const response = await api.put(`/api/organizations/${id}`, orgData);
    return response.data as Organization;
  },

  delete: async (id: string) => {
    await api.delete(`/api/organizations/${id}`);
  },
};

// Elderly Services
export const elderlyService = {
  getAll: async () => {
    const response = await api.get("/api/elderly");
    return response.data as Elderly[];
  },

  getById: async (id: string) => {
    const response = await api.get(`/api/elderly/${id}`);
    return response.data as Elderly;
  },

  create: async (elderlyData: Partial<Elderly>) => {
    const response = await api.post("/api/elderly", elderlyData);
    return response.data as Elderly;
  },

  update: async (id: string, elderlyData: Partial<Elderly>) => {
    const response = await api.put(`/api/elderly/${id}`, elderlyData);
    return response.data as Elderly;
  },

  delete: async (id: string) => {
    await api.delete(`/api/elderly/${id}`);
  },

  linkCaregiver: async (elderlyId: string, caregiverId: string) => {
    const response = await api.post(
      `/api/elderly/${elderlyId}/caregivers/${caregiverId}`
    );
    return response.data as Elderly;
  },

  unlinkCaregiver: async (elderlyId: string, caregiverId: string) => {
    const response = await api.delete(
      `/api/elderly/${elderlyId}/caregivers/${caregiverId}`
    );
    return response.data as Elderly;
  },
};

// Caregiver Services
export const caregiverService = {
  getAll: async () => {
    const response = await api.get("/api/caregivers");
    return response.data as Caregiver[];
  },

  getById: async (id: string) => {
    const response = await api.get(`/api/caregivers/${id}`);
    return response.data as Caregiver;
  },

  create: async (caregiverData: Partial<Caregiver>) => {
    const response = await api.post("/api/caregivers", caregiverData);
    return response.data as Caregiver;
  },

  update: async (id: string, caregiverData: Partial<Caregiver>) => {
    const response = await api.put(`/api/caregivers/${id}`, caregiverData);
    return response.data as Caregiver;
  },

  delete: async (id: string) => {
    await api.delete(`/api/caregivers/${id}`);
  },

  getElderly: async (caregiverId: string) => {
    const response = await api.get(`/api/caregivers/${caregiverId}/elderly`);
    return response.data as Elderly[];
  },
  linkCaregiver: async (elderlyId: string, caregiverId: string) => {
    const response = await api.post(
      `/api/elderly/${elderlyId}/caregivers/${caregiverId}`
    );
    return response.data;
  },

  unlinkCaregiver: async (elderlyId: string, caregiverId: string) => {
    const response = await api.delete(
      `/api/elderly/${elderlyId}/caregivers/${caregiverId}`
    );
    return response.data;
  },
};

// Family Member Services
export const familyMemberService = {
  create: async (familyMemberData: any) => {
    const response = await api.post("/api/family-members", familyMemberData);
    return response.data;
  },

  updateRelationship: async (id: string, relationship: string) => {
    const response = await api.put(`/api/family-members/${id}/relationship`, {
      relationship,
    });
    return response.data;
  },
};
