import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const mockUser = {
  isLoggedIn: true,
  permissions: ["profile", "overview", "schedules"],
};

const protectedRoutes = {
  "/dashboard/overview": "overview",
  "/dashboard/schedules": "schedules",
  "/dashboard/medical-history": "medical-history",
  "/dashboard/documents": "documents",
  "/dashboard/revenue": "revenue",
  "/dashboard/audit": "audit",
  "/dashboard/users": "users",
  "/dashboard/settings": "settings",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const matchedRoute = Object.keys(protectedRoutes).find((route) =>
    pathname.startsWith(route)
  );

  if (matchedRoute) {
    if (!mockUser.isLoggedIn) {
      return NextResponse.rewrite(new URL("/auth/unauthorized", request.url));
    }

    if (
      !mockUser.permissions.includes(
        protectedRoutes[matchedRoute as keyof typeof protectedRoutes]
      )
    ) {
      return NextResponse.rewrite(new URL("/auth/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
