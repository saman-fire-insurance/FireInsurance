"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * Custom hook for protecting routes that require authentication
 * @param options Configuration options
 * @returns Object with authentication state
 */
export function useProtectedRoute(options: {
  redirectTo?: string; // Custom redirect URL (defaults to /login)
  redirectIfFound?: boolean; // Redirect away if session is found (for auth pages)
} = {}) {
  const { redirectTo = "/login", redirectIfFound = false } = options;
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Handle loading state
    if (status === "loading") {
      return;
    }

    // Get the redirect URL from query params
    const redirectUrl = searchParams?.get("redirectUrl") || "/";
    
    // Handle authenticated users
    if (session) {
      if (redirectIfFound) {
        // For auth pages (login, register), redirect away if authenticated
        router.replace(redirectUrl || "/");
      } else {
        // For protected pages, user is authenticated so we're good
        setIsLoading(false);
      }
      return;
    }
    
    // Handle unauthenticated users on protected pages
    if (!redirectIfFound && !session) {
      // Get current URL for redirecting back after login
      const currentUrl = window.location.pathname + window.location.search;
      router.replace(`${redirectTo}?redirectUrl=${encodeURIComponent(currentUrl)}`);
      return;
    }
    
    // User is not authenticated and on auth page, or is authenticated and on protected page
    setIsLoading(false);
  }, [session, status, router, redirectIfFound, redirectTo, searchParams]);

  return {
    isLoading,
    isAuthenticated: !!session,
    session,
  };
} 