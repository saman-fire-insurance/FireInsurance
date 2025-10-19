// import { AuthService } from '@/swagger/services/AuthService';
import { cookies } from 'next/headers';

export const setAuthTokens = async (accessToken: string, refreshToken: string) => {
  const cookieStore = await cookies();
  cookieStore.set('authToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });
  cookieStore.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });
};

export const getAuthToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get('authToken')?.value;
};

export const getRefreshToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get('refreshToken')?.value;
};

export const clearAuthTokens = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('authToken');
  cookieStore.delete('refreshToken');
};

// export const refreshAuthToken = async () => {
//   const refreshToken = await getRefreshToken();
//   if (!refreshToken) {
//     throw new Error('No refresh token available');
//   }

//   try {
//     const response = await AuthService.petInsurancePlatformUsersInfrastructureAuthenticationUserTokenService({
//       requestBody: {
//         refreshToken,
//       },
//     });

//     if (response.accessToken && response.refreshToken) {
//       await setAuthTokens(response.accessToken, response.refreshToken);
//       return response.accessToken;
//     }
//     throw new Error('Invalid token response');
//   } catch (error) {
//     await clearAuthTokens();
//     throw error;
//   }
// };

export const isAuthenticated = async () => {
  return !!(await getAuthToken());
}; 