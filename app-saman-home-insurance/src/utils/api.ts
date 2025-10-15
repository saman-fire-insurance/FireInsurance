import { signOut } from 'next-auth/react';
import { OpenAPI } from '@/swagger/core/OpenAPI';
// Ensure OpenAPI is configured early
import '@/lib/openapi-config';

/**
 * Simple API request handler without refresh token complexity
 */
export async function handleApiRequest<T>(
  request: () => Promise<T>,
  session?: any
): Promise<T> {
  try {
    // Set token if available
    if (session?.accessToken) {
      OpenAPI.TOKEN = session.accessToken;
    }

    return await request();
  } catch (error: any) {
    // If unauthorized, sign out user immediately
    if (error.status === 401 || error.message?.includes('401')) {
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