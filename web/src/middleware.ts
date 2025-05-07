import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const mockUser = {
  isLoggedIn: false,
  permissions: ["dashboard", "profile"],
};

const protectedRoutes = {
  "/dashboard": "dashboard",
  "/profile": "profile",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname in protectedRoutes) {
    if (!mockUser.isLoggedIn) {
      return NextResponse.rewrite(new URL("/auth/unauthorized", request.url));
    }

    if (
      !mockUser.permissions.includes(
        protectedRoutes[pathname as keyof typeof protectedRoutes]
      )
    ) {
      return NextResponse.rewrite(new URL("/auth/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/profile", "/auth/signup"],
};
