import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Define route types
const PUBLIC_ROUTES = ["/", "/aboutHomeInsurance", "/aboutUs", "/contact"]; // Public routes accessible to all
const AUTH_ROUTES = [
  "/login",
  // "/register",
  // "/forgot-password",
  // "/reset-password",
]; // Routes for authentication
const PROTECTED_ROUTES = ["/damageDeclaration"]; // Routes requiring authentication
const API_ROUTES = ["/api"]; // API routes
const STATIC_ROUTES = ["/_next", "/favicon.ico", "/images", "/fonts", "/_next/image", "/public", "/img", "/manifest.json"]; // Static assets

// Session cookie name from next-auth
const SESSION_COOKIE_NAME = "next-auth.session-token";

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const originalUrl = pathname + search; // Store original URL with query parameters

  // Skip middleware for NextAuth API routes - MUST be first check
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Skip middleware for static routes, other API routes, and image files
  if (
    STATIC_ROUTES.some((route) => pathname.startsWith(route)) ||
    pathname.startsWith("/api") ||
    pathname.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)
  ) {
    return NextResponse.next();
  }

  // Get authentication status
  const token = await getToken({ req: request });
  const hasSessionCookie = request.cookies.has(SESSION_COOKIE_NAME);
  const isAuthenticated = !!token || hasSessionCookie;

  console.log(isAuthenticated,token,hasSessionCookie,"isAuthenticated")

  // Handle authentication routes (login, register, etc.)
  if (AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
    // If already authenticated, redirect to dashboard
    if (isAuthenticated) {
      console.log(
        `Middleware: Authenticated user accessing auth route ${pathname}, redirecting to dashboard`
      );
      return NextResponse.redirect(new URL("/damageDeclaration", request.url));
    }

    // Otherwise, let them access auth routes
    return NextResponse.next();
  }

  // Handle protected routes
  if (
    PROTECTED_ROUTES.some((route) => pathname.toLowerCase().startsWith(route.toLowerCase())) ||
    (!PUBLIC_ROUTES.some((route) => pathname === route) &&
      !pathname.startsWith("/api"))
  ) {
    // If not authenticated, redirect to login with the original URL as redirect parameter
    if (!isAuthenticated) {
      const encodedRedirectUrl = encodeURIComponent(originalUrl);
      console.log(
        `Middleware: Unauthenticated user accessing protected route ${pathname}, redirecting to login`
      );
      return NextResponse.redirect(
        new URL(`/login?redirectUrl=${encodedRedirectUrl}`, request.url)
      );
    }

    // For authenticated requests, add the token to the request headers if available
    if (token?.accessToken) {
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("Authorization", `Bearer ${token.accessToken}`);
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }
  }

  // For all other routes, just pass through
  return NextResponse.next();
}

// Configure which paths middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (static files)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:jpg|jpeg|png|gif|svg|webp|ico)).*)',
  ],
};
