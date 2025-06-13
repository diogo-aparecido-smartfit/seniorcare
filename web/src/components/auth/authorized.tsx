"use client";

import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface AuthorizedProps {
  allowedRoles: string[];
  children: ReactNode;
  fallback?: ReactNode;
}

export function Authorized({
  allowedRoles,
  children,
  fallback = null,
}: AuthorizedProps) {
  const { isAuthenticated, userRoles } = useAuth();

  if (!isAuthenticated) {
    return fallback;
  }

  const hasRequiredRole = userRoles.some((role) => allowedRoles.includes(role));

  if (!hasRequiredRole) {
    return fallback;
  }

  return <>{children}</>;
}
