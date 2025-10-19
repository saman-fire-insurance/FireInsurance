import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserAuthenticationOtpService } from "@/swagger/services/UserAuthenticationOtpService";
import { handleApiErrorWithCleanup } from "@/lib/api-error-handler";
import { OpenAPI } from "@/swagger/core/OpenAPI";
// Initialize OpenAPI configuration early
import "@/lib/openapi-config";
import { OtpDto } from "@/swagger/models/OtpDto";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "otp-login",
      name: "OTP Login",
      credentials: {
        phoneNumber: { label: "Phone Number", type: "text" },
        otp: { label: "Otp", type: "text" },
        // recaptchaToken: { label: "ReCAPTCHA Token", type: "text" },
      },
      async authorize(credentials) {
        console.log("🔐 [AUTHORIZE] Starting authorization with credentials:", {
          phoneNumber: credentials?.phoneNumber,
          hasOtp: !!credentials?.otp,
        });

        if (!credentials?.phoneNumber || !credentials?.otp) {
          console.error("🔐 [AUTHORIZE] Missing credentials");
          throw new Error("شماره تلفن و کد تایید الزامی است");
        }

        try {
          const requestBody = {
            phoneNumber: credentials.phoneNumber,
            otp: credentials.otp,
          } as OtpDto;

          // Add captcha token if provided
          // if (credentials.recaptchaToken) {
          //   requestBody.captchaToken = credentials.recaptchaToken;
          // }
          
          console.log("🔐 [AUTHORIZE] Calling verify OTP API...");
          const response =
            await UserAuthenticationOtpService.postApiV1UsersVerifyOtp({
              requestBody,
            });

          console.log("🔐 [AUTHORIZE] OTP login response:", {
            hasAccessToken: !!response?.accessToken,
            hasRefreshToken: !!response?.refreshToken,
          });

          if (response?.accessToken && response?.refreshToken) {
            const user = {
              id: credentials.phoneNumber,
              phoneNumber: credentials.phoneNumber,
              accessToken: response.accessToken,
              refreshToken: response.refreshToken,
            };
            console.log("🔐 [AUTHORIZE] Returning user object:", {
              id: user.id,
              phoneNumber: user.phoneNumber,
              hasAccessToken: !!user.accessToken,
              hasRefreshToken: !!user.refreshToken,
            });
            return user;
          }

          // if (response?.accessToken && response?.refreshToken) {
          //   // Extract user ID from JWT token's sub claim, or use phone number as fallback
          //   let userId: string;
          //   try {
          //     const tokenPayload = JSON.parse(atob(response.accessToken.split('.')[1]));
          //     userId = tokenPayload.sub || credentials.phoneNumber;
          //   } catch {
          //     userId = credentials.phoneNumber;
          //   }

          //   return {
          //     id: userId,
          //     phoneNumber: credentials.phoneNumber,
          //     accessToken: response.accessToken,
          //     refreshToken: response.refreshToken,
          //   } as const;
          // }
          throw new Error("پاسخ نامعتبر از سرور");
        } catch (error) {
          console.error("OTP login error:", error);
          const errorMessage = handleApiErrorWithCleanup(
            error,
            "کد تایید نامعتبر است. لطفا دوباره تلاش کنید."
          );
          throw new Error(errorMessage);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("🔐 [JWT CALLBACK] Called with:", {
        hasUser: !!user,
        hasToken: !!token,
        tokenSub: token?.sub,
      });

      // The user object passed here contains the data returned by the authorize function
      if (user) {
        console.log("🔐 [JWT CALLBACK] User data received:", {
          id: user.id,
          phoneNumber: user.phoneNumber,
          hasAccessToken: !!user.accessToken,
          hasRefreshToken: !!user.refreshToken,
        });
        
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.sub = user.id; // Store user ID in token
        token.id = user.id;
        token.phoneNumber = user.phoneNumber;
        
        console.log("🔐 [JWT CALLBACK] Token updated with user data");
      }
      
      return token;
    },
    async session({ session, token }) {
      console.log("🔐 [SESSION CALLBACK] Called with:", {
        hasSession: !!session,
        hasToken: !!token,
        hasSessionUser: !!session?.user,
        tokenSub: token?.sub,
        tokenPhoneNumber: token?.phoneNumber,
      });

      // The token object contains the data from the jwt callback
      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        
        // Ensure user data is populated in the session
        if (session.user) {
          session.user.id = token.sub as string;
          session.user.phoneNumber = token.phoneNumber as string;
          
          console.log("🔐 [SESSION CALLBACK] Session user populated:", {
            id: session.user.id,
            phoneNumber: session.user.phoneNumber,
          });
        }
      }
      
      console.log("🔐 [SESSION CALLBACK] Returning session with user:", {
        hasAccessToken: !!session.accessToken,
        userId: session.user?.id,
        userPhoneNumber: session.user?.phoneNumber,
      });
      
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      // This callback is called when sign in succeeds
      console.log("🔐 [AUTH CALLBACK] SignIn callback called with user:", user);
      return true; // Allow sign in
    },
  },
  events: {
    async signIn(message) {
      console.log("🔐 [AUTH EVENT] Sign in event:", message);
    },
    // async signOut(message) {
    //   console.log("🔐 [AUTH EVENT] Sign out event");

    //   try {
    //     // Try to get token from session first, then from token
    //     const accessToken = message.session?.accessToken || message.token?.accessToken;

    //     if (accessToken) {
    //       OpenAPI.TOKEN = accessToken;
    //       const response = await AuthService.petInsurancePlatformUsersEndpointsAuthLogoutEndpoint();
    //       console.log("🔐 [AUTH EVENT] Backend logout successful", response);
    //     } else {
    //       console.log("🔐 [AUTH EVENT] No access token found - skipping backend logout");
    //     }
    //   } catch (error: any) {
    //     console.error("🔐 [AUTH EVENT] Logout API error:", error);
    //     // Don't throw the error - logout should succeed even if API call fails
    //     if (error?.status === 401) {
    //       console.log("🔐 [AUTH EVENT] Token expired/invalid - continuing with logout");
    //     }
    //   } finally {
    //     // Always clear the token after logout attempt
    //     OpenAPI.TOKEN = undefined;
    //   }
    // },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
    updateAge: 24 * 60 * 60, // 24 hours
  },
  debug: true, // Enable debug mode to see detailed logs
  secret: process.env.NEXTAUTH_SECRET,
};
