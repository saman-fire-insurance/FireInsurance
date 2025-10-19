import { getSession, signOut } from "next-auth/react";
import { OpenAPI } from "@/swagger/core/OpenAPI";
// Ensure OpenAPI is configured early
import "@/lib/openapi-config";

// Type for fetch options
type FetchOptions = RequestInit & {
  requireAuth?: boolean;
};

/**
 * Simple fetch function with authentication
 * 
 * @param url URL to fetch
 * @param options Fetch options with additional flags
 * @returns Promise with fetch response
 */
export async function fetchWithAuth(url: string, options: FetchOptions = {}) {
  const { requireAuth = true, ...fetchOptions } = options;
  
  // If auth is not required, just fetch normally
  if (!requireAuth) {
    return fetch(url, fetchOptions);
  }

  // Get the current session
  const session = await getSession();
  
  // If we need auth but don't have a session, redirect to login
  if (requireAuth && !session?.accessToken) {
    // Store the current URL for redirect after login
    const currentUrl = window.location.pathname + window.location.search;
    window.location.href = `/login?redirectUrl=${encodeURIComponent(currentUrl)}`;
    throw new Error("Authentication required");
  }

  // Prepare headers with auth token
  const headers = new Headers(fetchOptions.headers);
  if (session?.accessToken) {
    headers.set("Authorization", `Bearer ${session.accessToken}`);
  }

  // Perform the fetch request
  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  });

  // Check if response indicates token issues - sign out user
  if (response.status === 401) {
    await signOut({ callbackUrl: '/login' });
    throw new Error('Session expired');
  }

  return response;
} 