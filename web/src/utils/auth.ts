import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  sub: string;
  role: string;
  userId: string;
  exp: number;
}

export const TOKEN_KEY = "seniorcare_token";
export const REFRESH_TOKEN_KEY = "seniorcare_refresh_token";
export const USER_KEY = "seniorcare_user";

export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;

  const token = getToken();
  if (!token) return false;

  try {
    const decodedToken = jwtDecode<DecodedToken>(token);
    return decodedToken.exp * 1000 > Date.now();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    clearTokens();
    return false;
  }
};

export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const getRefreshToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const setTokens = (token: string, refreshToken: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    localStorage.setItem(
      USER_KEY,
      JSON.stringify({
        id: decoded.userId,
        email: decoded.sub,
        role: decoded.role,
      })
    );
  } catch (error) {
    console.error("Failed to decode token", error);
  }
};

export const clearTokens = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const getCurrentUser = () => {
  const userData = localStorage.getItem(USER_KEY);
  if (!userData) return null;
  try {
    return JSON.parse(userData);
  } catch {
    return null;
  }
};

export const getUserRole = (): string | null => {
  const user = getCurrentUser();
  return user?.role || null;
};
