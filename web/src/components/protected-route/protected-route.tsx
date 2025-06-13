"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { jwtDecode } from "jwt-decode";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

export default function ProtectedRoute({
  children,
  requiredRoles = [],
}: ProtectedRouteProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [validSession, setValidSession] = useState(false);

  useEffect(() => {
    const verifyAuth = () => {
      try {
        // Check for token directly from localStorage
        const token = localStorage.getItem("accessToken");

        if (!token) {
          console.log("No token found in localStorage");
          if (isAuthenticated) {
            // State says authenticated but no token exists
            logout(); // Clear any stale auth state
          }
          setChecking(false);
          return;
        }

        // Verify token validity
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decodedToken = jwtDecode<any>(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp && decodedToken.exp > currentTime) {
          // Token is valid
          console.log("Valid token found");
          setValidSession(true);
        } else {
          // Token is expired
          console.log("Expired token");
          logout();
        }

        setChecking(false);
      } catch (error) {
        console.error("Error verifying authentication:", error);
        logout();
        setChecking(false);
      }
    };

    // Only run on client
    if (typeof window !== "undefined") {
      verifyAuth();
    }
  }, [isAuthenticated, logout]);

  useEffect(() => {
    // Handle redirects after authentication check is complete
    if (!checking) {
      if (!isAuthenticated || !validSession) {
        console.log("Redirecting to login - not authenticated");
        // Use window.location for a hard redirect in case of auth issues
        window.location.href = "/auth/signin";
        return;
      }

      // Role-based authorization
      if (
        requiredRoles.length > 0 &&
        user &&
        !requiredRoles.includes(user.role)
      ) {
        console.log("Unauthorized role, redirecting");
        router.push("/auth/unauthorized");
      }
    }
  }, [checking, isAuthenticated, validSession, router, requiredRoles, user]);

  // Still checking authentication
  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated || !validSession) {
    return null; // Will be redirected in the useEffect
  }

  // Role-based authorization
  if (requiredRoles.length > 0 && user && !requiredRoles.includes(user.role)) {
    return null; // Will be redirected in the useEffect
  }

  // User is authenticated and authorized
  return <>{children}</>;
}
