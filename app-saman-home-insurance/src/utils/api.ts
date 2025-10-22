import { signOut } from 'next-auth/react';
import { OpenAPI } from '@/swagger/core/OpenAPI';
// Ensure OpenAPI is configured early
import '@/lib/openapi-config';

/**
 * Simple API request handler without refresh token complexity
 */
export async function handleApiRequest<T>(
  request: () => Promise<T>,
  session?: { accessToken?: string }
): Promise<T> {
  try {
    // Set token if available
    if (session?.accessToken) {
      OpenAPI.TOKEN = session.accessToken;
    }

    return await request();
  } catch (error: unknown) {
    // If unauthorized, sign out user immediately
    const errorStatus = (error as { status?: number })?.status;
    const errorMessage = (error as { message?: string })?.message;
    if (errorStatus === 401 || errorMessage?.includes('401')) {
      console.log('🚪 [AUTH] Unauthorized - signing out user');
      await signOut({ callbackUrl: '/login' });
      throw new Error('Session expired');
    }

    throw error;
  }
}

/**
 * Legacy compatibility export
 */
export { handleApiRequest as default }; 