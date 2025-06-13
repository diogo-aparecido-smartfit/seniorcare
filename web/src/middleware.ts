import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  sub: string; // Email of the user
  role: string; // Single role (not an array)
  userId: string; // UUID of the user
  iat: number; // Issued at timestamp
  exp: number; // Expiration timestamp
}

const protectedRoutes = {
  "/dashboard/overview": ["ADMIN", "CAREGIVER", "FAMILY"],
  "/dashboard/elderly": ["ADMIN", "CAREGIVER"],
  "/dashboard/schedules": ["ADMIN", "CAREGIVER"],
  "/dashboard/medical-history": ["ADMIN", "CAREGIVER"],
  "/dashboard/documents": ["ADMIN"],
  "/dashboard/revenue": ["ADMIN"],
  "/dashboard/audit": ["ADMIN"],
  "/dashboard/users": ["ADMIN"],
  "/dashboard/settings": ["ADMIN"],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(`Middleware processing: ${pathname}`);

  const matchedRoute = Object.keys(protectedRoutes).find((route) =>
    pathname.startsWith(route)
  );

  if (matchedRoute) {
    // Get the token from cookies using Next.js's cookies API
    const token = request.cookies.get("accessToken")?.value;
    console.log(`Token from cookies: ${token ? "Found" : "Not found"}`);

    if (!token) {
      console.log("No token found, redirecting to login");
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      console.log(`Decoded token: ${JSON.stringify(decoded)}`);

      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        console.log("Token expired, redirecting to login");
        return NextResponse.redirect(new URL("/auth/signin", request.url));
      }

      const requiredRoles =
        protectedRoutes[matchedRoute as keyof typeof protectedRoutes];

      // Check if the user's role is in the required roles array
      const hasPermission = requiredRoles.includes(decoded.role);
      console.log(
        `Role check: user has ${decoded.role}, required ${requiredRoles.join(
          ", "
        )}, hasPermission: ${hasPermission}`
      );

      if (!hasPermission) {
        console.log("Insufficient permissions, redirecting to unauthorized");
        return NextResponse.redirect(
          new URL("/auth/unauthorized", request.url)
        );
      }
    } catch (error) {
      console.error("Error processing token:", error);
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
