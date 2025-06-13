"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { jwtDecode } from "jwt-decode";
import { setCookie, getCookie, deleteCookie } from "cookies-next";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  organizationId: string;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();

  const handleLogout = useCallback(() => {
    console.log("handleLogout");
    // Remove from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    // Delete cookies properly using cookies-next
    deleteCookie("accessToken");
    deleteCookie("refreshToken");

    setUser(null);
    setIsAuthenticated(false);
    router.push("/auth/signin");
  }, [router]);

  useEffect(() => {
    const loadUser = () => {
      // Check both localStorage and cookies
      const storedUser = localStorage.getItem("user");
      const tokenFromCookie = getCookie("accessToken");
      const tokenFromStorage = localStorage.getItem("accessToken");

      // Use token from cookie first, then fallback to localStorage
      const token = tokenFromCookie || tokenFromStorage;

      console.log("storedUser: ", storedUser);
      console.log("token: ", token);

      if (storedUser && token) {
        try {
          const decodedToken = jwtDecode(token as string);
          console.log("decodedToken: ", decodedToken);
          const currentTime = Date.now() / 1000;
          console.log("currentTime: ", currentTime);

          if (decodedToken.exp && decodedToken.exp > currentTime) {
            console.log("Valid token found");
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
          } else {
            handleLogout();
          }
        } catch (error) {
          console.log("Token decode error:", error);
          handleLogout();
        }
      }
    };

    loadUser();
  }, [handleLogout]);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.post("/api/auth/login", {
        email,
        password,
      });

      const { accessToken, refreshToken } = response.data;

      // Store in localStorage for API calls
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Set secure cookies with proper attributes
      setCookie("accessToken", accessToken, {
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      setCookie("refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      const decodedToken = jwtDecode(accessToken) as any;
      console.log("decodedToken: ", decodedToken);

      // Use userId field from token, not sub (email)
      const userId = decodedToken.userId;

      if (!userId) {
        console.error("No userId in token:", decodedToken);
        throw new Error("Token inválido: userId não encontrado");
      }

      try {
        const userResponse = await api.get(`/api/users/${userId}`);
        const userData = userResponse.data;

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        setIsAuthenticated(true);

        // Redirect to dashboard
        router.push("/dashboard/overview");
      } catch (userError) {
        console.error("Error fetching user data:", userError);
        throw userError;
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setError(
        error.response?.data?.message ||
          "Falha na autenticação. Verifique suas credenciais."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout: handleLogout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
