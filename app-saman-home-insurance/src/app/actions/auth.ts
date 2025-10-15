"use server";

import { UserAuthenticationOtpService } from "@/swagger/services/UserAuthenticationOtpService";
import { setAuthTokens } from "@/utils/auth";
import { revalidatePath } from "next/cache";
import {
  handleApiErrorWithCleanup,
  handleApiErrorWithDetails,
} from "@/lib/api-error-handler";
import { OtpRequestDto } from "@/swagger/models/OtpRequestDto";

// Check if user is registered or not
export async function checkRegistration(
  phoneNumber: string
  // recaptchaToken?: string
) {
  try {
    // if (recaptchaToken) {
    //   requestBody.captchaToken = recaptchaToken;
    // }

    const result = await UserAuthenticationOtpService.postApiV1UsersRequestOtp({
      requestBody: {
        phoneNumber: phoneNumber,
      } as OtpRequestDto,
    });
    // API returns true if the user can register (i.e., phone number is available)
    // and false if the user already exists
    return {
      success: true,
      isRegistered: result === true,
    };
  } catch (error: any) {
    console.error("Registration check error:", error);
    const errorDetails = handleApiErrorWithDetails(
      error,
      "خطا در بررسی وضعیت کاربر. لطفا دوباره تلاش کنید."
    );
    return {
      success: false,
      error: errorDetails.message,
      status: errorDetails.status,
      details: errorDetails.body,
    };
  }
}

// Confirm phone number with OTP code
export async function confirmPhoneNumber(
  phoneNumber: string,
  code: number,
  recaptchaToken?: string
) {
  // Maximum retry attempts
  const maxRetries = 1;
  let retryCount = 0;
  let lastError: any = null;

  // Retry logic
  while (retryCount <= maxRetries) {
    try {
      console.log(
        `Attempting to confirm phone ${phoneNumber} with code (attempt ${
          retryCount + 1
        }/${maxRetries + 1})`
      );

      const requestBody: any = {
        phoneNumber,
        otp: code.toString(), // Convert number to string and use 'otp' instead of 'code'
      };

      // Add captcha token if provided
      if (recaptchaToken) {
        requestBody.captchaToken = recaptchaToken;
      }

      await UserAuthenticationOtpService.postApiV1UsersVerifyOtp({
        requestBody,
      });

      console.log(`Successfully confirmed phone ${phoneNumber}`);
      return { success: true };
    } catch (error: any) {
      lastError = error;
      console.error(
        `Phone confirmation error (attempt ${retryCount + 1}):`,
        error
      );

      // Check if it's a network error or server error (not invalid code)
      if (error?.status >= 500) {
        // Server error, try again after delay
        retryCount++;
        if (retryCount <= maxRetries) {
          console.log(`Retrying confirmation in ${retryCount * 1000}ms...`);
          // Wait longer between each retry
          await new Promise((resolve) =>
            setTimeout(resolve, retryCount * 1000)
          );
          continue;
        }
      } else {
        // Client error or other error, don't retry
        break;
      }
    }
  }

  // All retries failed or non-retryable error
  const errorDetails = handleApiErrorWithDetails(
    lastError,
    lastError?.status === 400
      ? "کد تایید نامعتبر است. لطفا دوباره تلاش کنید."
      : "خطا در تایید شماره موبایل. لطفا دوباره تلاش کنید."
  );
  return {
    success: false,
    error: errorDetails.message,
    status: errorDetails.status,
    details: errorDetails.body,
  };
}


// Login with OTP code
export async function loginWithCode(phoneNumber: string, code: number) {
  try {
    const response = await UserAuthenticationOtpService.postApiV1UsersVerifyOtp(
      {
        requestBody: {
          phoneNumber,
          otp: code.toString(), // Convert number to string and use 'otp' instead of 'code'
        },
      }
    );

    if (response.accessToken && response.refreshToken) {
      await setAuthTokens(response.accessToken, response.refreshToken);
      revalidatePath("/");
      return { success: true };
    }
    return {
      success: false,
      error: "خطا در ورود. لطفا دوباره تلاش کنید.",
      details: response,
    };
  } catch (error: any) {
    console.error("Login with code error:", error);
    const errorDetails = handleApiErrorWithDetails(
      error,
      "کد تایید نامعتبر است. لطفا دوباره تلاش کنید."
    );
    return {
      success: false,
      error: errorDetails.message,
      status: errorDetails.status,
      details: errorDetails.body,
    };
  }
}

export async function resendCode(phoneNumber: string) {
  const maxRetries = 2;
  let retryCount = 0;
  let lastError: any = null;

  while (retryCount <= maxRetries) {
    try {
      console.log(
        `Attempting to send OTP code to ${phoneNumber} (attempt ${
          retryCount + 1
        }/${maxRetries + 1})`
      );

      // API now requires captcha token as a required parameter
      await UserAuthenticationOtpService.postApiV1UsersRequestOtp({
        requestBody: {
          phoneNumber: phoneNumber,
        },
        // captchaToken: recaptchaToken,
      });

      console.log(`Successfully sent OTP code to ${phoneNumber}`);
      return { success: true };
    } catch (error: any) {
      lastError = error;
      console.error(`Resend code error (attempt ${retryCount + 1}):`, error);

      if (error?.status === 422) {
        const errorDetails = handleApiErrorWithDetails(
          error,
          "کد قبلا فرستاده شده"
        );
        return {
          success: false,
          error: errorDetails.message,
          status: errorDetails.status,
          details: {
            type: errorDetails.type,
            title: errorDetails.title,
            status: errorDetails.status,
            detail: errorDetails.detail,
            message: errorDetails.detail,
          },
        };
      }

      if (error?.status === 429 || error?.status >= 500) {
        retryCount++;
        if (retryCount <= maxRetries) {
          console.log(`Retrying in ${retryCount * 1000}ms...`);
          await new Promise((resolve) =>
            setTimeout(resolve, retryCount * 1000)
          );
          continue;
        }
      } else {
        break;
      }
    }
  }

  const errorDetails = handleApiErrorWithDetails(
    lastError,
    "خطا در ارسال کد تایید. لطفا دوباره تلاش کنید."
  );
  return {
    success: false,
    error: errorDetails.message,
    status: errorDetails.status,
    details: {
      type: errorDetails.type,
      title: errorDetails.title,
      status: errorDetails.status,
      detail: errorDetails.detail,
      message: errorDetails.detail,
    },
  };
}