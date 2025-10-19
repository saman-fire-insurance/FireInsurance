"use client";

import { resendCode, checkRegistration } from "@/app/actions/auth";
import Logo from "@/assets/icon/logo";
import { MotionEffect } from "@/components/animate-ui/motion-effect";
import { RippleButton } from "@/components/animate-ui/ripple-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, Phone, X } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import {
  handleApiErrorWithCleanup,
  cleanErrorMessage,
} from "@/lib/api-error-handler";

// Custom pattern for Persian/Arabic and English digits
const REGEXP_PERSIAN_ENGLISH_DIGITS = "[0-9۰-۹٠-٩]*";

// Enhanced Persian/Arabic to English number conversion specifically for OTP
const convertPersianToEnglishForOTP = (str: string): string => {
  if (!str) return str;

  // Persian digits: ۰۱۲۳۴۵۶۷۸۹ to 0123456789
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  // Arabic digits: ٠١٢٣٤٥٦٧٨٩ to 0123456789
  const arabicDigits = "٠١٢٣٤٥٦٧٨٩";

  let result = str;

  // Convert Persian digits
  for (let i = 0; i < persianDigits.length; i++) {
    result = result.replace(new RegExp(persianDigits[i], "g"), i.toString());
  }

  // Convert Arabic digits
  for (let i = 0; i < arabicDigits.length; i++) {
    result = result.replace(new RegExp(arabicDigits[i], "g"), i.toString());
  }

  // Only keep English digits
  result = result.replace(/[^0-9]/g, "");

  return result;
};

// Add TypeScript declarations for Web OTP API
declare global {
  interface OTPCredential extends Credential {
    code: string;
  }

  interface CredentialRequestOptions {
    otp?: {
      transport: string[];
    };
  }
}
// Add utility function to convert Persian numbers to English
const convertPersianToEnglish = (value: string): string => {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

  return value
    .split("")
    .map((char) => {
      // Check Persian numbers
      const persianIndex = persianNumbers.indexOf(char);
      if (persianIndex !== -1) return persianIndex.toString();

      // Check Arabic numbers
      const arabicIndex = arabicNumbers.indexOf(char);
      if (arabicIndex !== -1) return arabicIndex.toString();

      // Return as is if not found
      return char;
    })
    .join("");
};

// Add utility function to format phone number display
const formatPhoneNumber = (value: string): string => {
  // Remove all non-digits
  const cleanValue = value.replace(/\D/g, "");

  // Format as 0XXX XXX XXXX
  if (cleanValue.length <= 4) {
    return cleanValue;
  } else if (cleanValue.length <= 7) {
    return `${cleanValue.slice(0, 4)} ${cleanValue.slice(4)}`;
  } else if (cleanValue.length <= 11) {
    return `${cleanValue.slice(0, 4)} ${cleanValue.slice(
      4,
      7
    )} ${cleanValue.slice(7)}`;
  } else {
    return `${cleanValue.slice(0, 4)} ${cleanValue.slice(
      4,
      7
    )} ${cleanValue.slice(7, 11)}`;
  }
};

const phoneSchema = z.object({
  phoneNumber: z
    .string()
    .refine((val) => val.replace(/\D/g, "").trim().length === 11, {
      message: "شماره موبایل باید 11 رقم باشد",
    })
    .refine((val) => val.replace(/\D/g, "").trim().startsWith("09"), {
      message: "شماره موبایل باید با 09 شروع شود",
    })
    .refine((val) => val.replace(/\D/g, "").trim().length <= 11, {
      message: "شماره موبایل نمی‌تواند بیشتر از 11 رقم باشد",
    }),
});

const otpSchema = z.object({
  otp: z.string().length(6, "کد تایید باید ۶ رقم باشد"),
});

type PhoneFormValues = z.infer<typeof phoneSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;

interface LoginFormProps {
  callbackUrl?: string;
}

export function LoginForm({ callbackUrl = "/" }: LoginFormProps) {
  const router = useRouter();
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(true);
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(180);
  const [canResend, setCanResend] = useState(false);
  const [savedPhoneNumber, setSavedPhoneNumber] = useState("");
  const [isInputReady, setIsInputReady] = useState(false);
  const firstOtpInputRef = useRef<HTMLInputElement>(null);
  const [hasAutoSubmitted, setHasAutoSubmitted] = useState(false);
  const [previousStep, setPreviousStep] = useState<string | null>(null);

  // Toast management with consistent IDs
  const TOAST_IDS = {
    PHONE_SUBMIT: "phone-submit",
    OTP_SEND: "otp-send",
    OTP_VERIFY: "otp-verify",
    PASSWORD_LOGIN: "password-login",
    FORGOT_PASSWORD: "forgot-password",
    RESET_PASSWORD: "reset-password",
    GENERAL: "general",
  };

  // Track last shown toast to avoid duplicates and race conditions
  const activeToastsRef = useRef<
    Record<string, { type: "loading" | "success" | "error"; message: string }>
  >({});

  // Build a readable error message compatible with FastEndpoints/Ardalis/ProblemDetails
  const buildErrorMessageFromDetails = (
    details: any,
    fallback: string,
    errLike?: unknown
  ): string => {
    // Try to use our comprehensive API error handler first
    try {
      if (details) {
        const msg = handleApiErrorWithCleanup(details, fallback);
        if (msg && msg.trim()) return msg;
      }
      if (errLike) {
        // If a string came from NextAuth (query param), clean it up
        if (typeof errLike === "string") {
          const msg = cleanErrorMessage(errLike);
          if (msg && msg.trim()) return msg;
        }
        // If it's an object, let the handler try
        if (typeof errLike === "object") {
          const msg2 = handleApiErrorWithCleanup(errLike, fallback);
          if (msg2 && msg2.trim()) return msg2;
        }
      }
    } catch {}
    return fallback;
  };

  // Centralized toast management function
  const showToast = (
    type: "loading" | "success" | "error",
    message: string,
    id: string = TOAST_IDS.GENERAL
  ) => {
    console.log("📱 [TOAST] showToast called with:", { type, message, id });

    // Always dismiss any existing toast with the same ID first
    // toast.dismiss(id);
    console.log("📱 [TOAST] Dismissed existing toast with id:", id);

    // Small delay to ensure dismiss is processed
    setTimeout(() => {
      // Idempotent toast path (prevents duplicates and flicker)
      {
        const last = activeToastsRef.current[id];
        if (last && last.type === type && last.message === message) {
          return;
        }
        if (type === "loading") {
          toast.loading(message, { id, duration: Infinity });
        } else if (type === "success") {
          toast.success(message, { id, duration: 6500 });
        } else {
          toast.error(message, { id, duration: 6500 });
        }
        activeToastsRef.current[id] = { type, message };
        return;
      }
      // Show the new toast with the specified ID
      if (type === "loading") {
        console.log("📱 [TOAST] Showing loading toast");
        toast.loading(message, { id });
      } else if (type === "success") {
        console.log("📱 [TOAST] Showing success toast");
        toast.success(message, { id, duration: 5000 });
      } else if (type === "error") {
        console.log("📱 [TOAST] Showing error toast");
        toast.error(message, { id, duration: 5000 });
      }

      console.log("📱 [TOAST] Toast should now be visible");
    }, 50);
  };

  // Add effect to track reCAPTCHA loading state
  useEffect(() => {
    if (executeRecaptcha) {
      setIsRecaptchaLoaded(true);
    }
  }, [executeRecaptcha]);

  // Fast readiness: mark loaded as soon as grecaptcha badge or ready() is available
  useEffect(() => {
    if (isRecaptchaLoaded) return;
    if (typeof window === "undefined") return;

    const markLoadedOnce = () =>
      setIsRecaptchaLoaded((prev) => (prev ? prev : true));

    const w: any = window as any;

    // If already ready by any signal, mark loaded now
    if (
      executeRecaptcha ||
      w?.grecaptcha?.ready ||
      document.querySelector(".grecaptcha-badge")
    ) {
      try {
        if (w?.grecaptcha?.ready) {
          w.grecaptcha.ready(() => markLoadedOnce());
        }
      } catch {}
      markLoadedOnce();
      return;
    }

    // Observe DOM for badge injection (most reliable visual signal)
    const observer = new MutationObserver(() => {
      if (document.querySelector(".grecaptcha-badge")) {
        markLoadedOnce();
        observer.disconnect();
      }
    });
    try {
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
      });
    } catch {}

    // Short polling for grecaptcha.ready appearance
    let tries = 0;
    const interval = setInterval(() => {
      if (document.querySelector(".grecaptcha-badge")) {
        markLoadedOnce();
        clearInterval(interval);
        try {
          observer.disconnect();
        } catch {}
        return;
      }
      if (w?.grecaptcha?.ready) {
        try {
          w.grecaptcha.ready(() => markLoadedOnce());
        } catch {}
        markLoadedOnce();
        clearInterval(interval);
        try {
          observer.disconnect();
        } catch {}
        return;
      }
      if (++tries > 100) {
        // Give up after ~5s
        clearInterval(interval);
        try {
          observer.disconnect();
        } catch {}
      }
    }, 50);

    return () => {
      clearInterval(interval);
      try {
        observer.disconnect();
      } catch {}
    };
  }, [executeRecaptcha, isRecaptchaLoaded]);

  // reCAPTCHA function for OTP
  // const executeReCaptchaForOtp = useCallback(async (): Promise<
  //   string | null
  // > => {
  //   console.log("🔐 [reCAPTCHA] Starting execution for OTP action...");

  //   if (!executeRecaptcha) {
  //     console.warn(
  //       "⚠️ [reCAPTCHA] Execute recaptcha not yet available for otp"
  //     );
  //     return null;
  //   }

  //   try {
  //     console.log('🔐 [reCAPTCHA] Executing reCAPTCHA with action: "otp"');
  //     const token = await executeRecaptcha("otp");
  //     console.log(
  //       "✅ [reCAPTCHA] Token generated successfully for otp:",
  //       token
  //     );
  //     console.log("🔐 [reCAPTCHA] Token length:", token?.length || 0);
  //     return token;
  //   } catch (error) {
  //     console.error("❌ [reCAPTCHA] Error executing reCAPTCHA for otp:", error);
  //     return null;
  //   }
  // }, [executeRecaptcha]);

  const phoneForm = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Handle countdown timer for OTP resend
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (step === "otp" && countdown > 0) {
      console.log("Starting countdown timer from", countdown);

      timer = setInterval(() => {
        setCountdown((prev) => {
          const newValue = prev <= 1 ? 0 : prev - 1;
          if (newValue === 0 && !canResend) {
            console.log("Countdown reached zero, enabling resend");
            setCanResend(true);
          }
          return newValue;
        });
      }, 1000);
    }

    return () => {
      if (timer) {
        console.log("Clearing countdown timer");
        clearInterval(timer);
      }
    };
  }, [step, countdown, canResend]);

  // Reset countdown when step changes to OTP
  useEffect(() => {
    if (step === "otp") {
      console.log("Resetting countdown for OTP step");
      // Don't reset countdown if we already have a valid countdown running
      // This prevents reset on component re-renders
      if (countdown === 0 || canResend) {
        setCountdown(180);
        setCanResend(false);
      }
    }
  }, [step]);

  // On step change, dismiss only lingering loading toasts; keep success/error visible
  useEffect(() => {
    const entries = Object.entries(activeToastsRef.current || {});
    entries.forEach(([id, info]) => {
      if (info.type === "loading") {
        toast.dismiss(id);
        delete activeToastsRef.current[id];
      }
    });
  }, [step]);

  // Clean up toasts when step changes to prevent confusion
  useEffect(() => {
    console.log("📱 [TOAST CLEANUP] Step changed to:", step);
    // Dismiss all existing toasts when step changes
    Object.values(TOAST_IDS).forEach((id) => {
      console.log("📱 [TOAST CLEANUP] Dismissing toast with id:", id);
      toast.dismiss(id);
    });
  }, [step]);

  // New focus handling approach
  useEffect(() => {
    if (step === "phone") {
      // Set input as ready after a short delay
      const readyTimer = setTimeout(() => {
        setIsInputReady(true);
      }, 100);

      return () => {
        clearTimeout(readyTimer);
        setIsInputReady(false);
      };
    }
  }, [step]);
  // Simplified focus handling
  useLayoutEffect(() => {
    if (step === "phone" && phoneInputRef.current) {
      const input = phoneInputRef.current;
      input.focus();
    }
  }, [step]);

  const handleFocusClick = () => {
    if (phoneInputRef.current) {
      phoneInputRef.current.focus();
    }
  };

  const handlePhoneSubmit = async (data: PhoneFormValues) => {
    if (isSubmitting) {
      console.log("Preventing duplicate phone submit");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Remove any non-digit characters from phone number
      const cleanPhoneNumber = data.phoneNumber.replace(/\D/g, "").trim();
      console.log("Processing phone number:", cleanPhoneNumber);
      setSavedPhoneNumber(cleanPhoneNumber);

      console.log(
        "📱 [PHONE SUBMIT] Executing reCAPTCHA for signup action on first step"
      );
      // Execute reCAPTCHA for signup action immediately
      // const recaptchaToken = await executeReCaptchaForSignup();
      // if (!recaptchaToken) {
      //   console.error("❌ [PHONE SUBMIT] reCAPTCHA execution failed, aborting");
      //   showToast(
      //     "error",
      //     "خطا در تایید امنیتی. لطفا دوباره تلاش کنید.",
      //     TOAST_IDS.PHONE_SUBMIT
      //   );
      //   return;
      // }

      console.log(
        "📱 [PHONE SUBMIT] Calling registration API with reCAPTCHA token..."
      );
      // Check registration with reCAPTCHA token
      const result = await checkRegistration(cleanPhoneNumber);
      // const result = await checkRegistration(cleanPhoneNumber, recaptchaToken);
      console.log("Registration check result:", result);

      if (result.success) {
        // If isRegistered is true, it means the user can register (phone number is available)
        const userCanRegister = result.isRegistered === true;
        console.log("User can register:", userCanRegister);

        // Update state
        // setIsRegistered(userCanRegister);

        if (!userCanRegister) {
          // User exists - show login options
          console.log("✅ [PHONE SUBMIT] User exists, showing password login");
          setStep("otp");
        } else {
          // // رو کامنت کردم و بجاش میره توی ساخت پسوردotp به دلیل اختلالات فعلا
          // console.log("✅ [PHONE SUBMIT] User exists, showing password login");
          // //otp هارد کد زدم به دلیل اختلالات
          // const otpCode=123456
          // const result = await confirmPhoneNumber(cleanPhoneNumber, otpCode);
          // console.log(`OTP confirmation result for :`, result);
          // setStep("register");
          // New user - OTP already sent by the API call above
          console.log(
            "✅ [PHONE SUBMIT] New user registered, OTP sent to user"
          );
          setPreviousStep(null); // Clear previous step since this is from phone step
          setStep("otp");
          showToast(
            "success",
            "کد تایید به شماره شما ارسال شد",
            TOAST_IDS.PHONE_SUBMIT
          );
          setCountdown(180);
          setCanResend(false);
        }
      } else {
        const msg = buildErrorMessageFromDetails(
          (result as any)?.details,
          "خطا در بررسی وضعیت کاربر. لطفا دوباره تلاش کنید.",
          result.error
        );
        console.error("❌ [PHONE SUBMIT] Registration API failed:", msg);
        showToast("error", msg, TOAST_IDS.PHONE_SUBMIT);
      }
    } catch (err) {
      console.error("❌ [PHONE SUBMIT] Phone verification error:", err);
      showToast(
        "error",
        "خطا در ارسال کد تایید. لطفا دوباره تلاش کنید.",
        TOAST_IDS.PHONE_SUBMIT
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // A separate function to handle OTP sending safely
  const sendOtpCodeSafely = async (phoneNumber: string) => {
    // Prevent duplicate calls
    if (isSendingOtp) {
      console.log("Preventing duplicate OTP send request");
      return;
    }

    setIsSendingOtp(true);
    setError(""); // Clear any previous errors

    console.log(`Starting OTP request for ${phoneNumber}`);

    try {
      // Show loading toast
      showToast("loading", "در حال ارسال کد تایید...", TOAST_IDS.OTP_SEND);

      // Get captcha token for otp action
      // const recaptchaToken = await executeReCaptchaForOtp();
      // if (!recaptchaToken) {
      //   console.warn("⚠️ [OTP SEND] Failed to get reCAPTCHA token");
      //   showToast(
      //     "error",
      //     "خطا در تایید امنیتی. لطفا دوباره تلاش کنید.",
      //     TOAST_IDS.OTP_SEND
      //   );
      //   return;
      // }

      const codeResult = await resendCode(phoneNumber);
      // const codeResult = await resendCode(phoneNumber, recaptchaToken);
      console.log(`OTP request completed:`, codeResult);

      if (codeResult.success) {
        // Don't show success toast for resend to avoid confusion
        setCountdown(180);
        setCanResend(false);
        // Dismiss the loading toast
        toast.dismiss(TOAST_IDS.OTP_SEND);
      } else {
        showToast(
          "error",
          cleanErrorMessage(codeResult.error ?? "") ||
            "خطا در ارسال کد تایید. لطفا دوباره تلاش کنید.",
          TOAST_IDS.OTP_SEND
        );
      }
    } catch (err) {
      console.error(`OTP request failed:`, err);
      showToast(
        "error",
        "خطا در ارسال کد تایید. لطفا دوباره تلاش کنید.",
        TOAST_IDS.OTP_SEND
      );
    } finally {
      console.log(`Finished OTP request`);
      setIsSendingOtp(false);
    }
  };

  const handleOtpSubmit = async (data: OtpFormValues) => {
    if (isSubmitting) {
      console.log("Preventing duplicate OTP submit");
      return;
    }

    setIsSubmitting(true);
    setError("");

    console.log("Starting OTP verification");

    try {
      const otpCode = parseInt(data.otp);

      // Show login in progress
      showToast("loading", "در حال ورود...", TOAST_IDS.OTP_VERIFY);

      console.log("Attempting OTP login");

      // Get captcha token for otp action
      // const recaptchaToken = await executeReCaptchaForOtp();
      // if (!recaptchaToken) {
      //   console.warn("⚠️ [OTP VERIFY] Failed to get reCAPTCHA token");
      //   showToast(
      //     "error",
      //     "خطا در تایید امنیتی. لطفا دوباره تلاش کنید.",
      //     TOAST_IDS.OTP_VERIFY
      //   );
      //   return;
      // }

      const result = await signIn("otp-login", {
        phoneNumber: savedPhoneNumber,
        otp: data.otp,
        // recaptchaToken,
        redirect: false,
        callbackUrl,
      });
      //      const result = await signIn("otp-login", {
      //   phoneNumber: savedPhoneNumber,
      //   code: data.otp,
      //   recaptchaToken,
      //   redirect: false,
      //   callbackUrl,
      // });
      console.log(result, "resultSignIN")

      if (result?.error) {
        console.error("OTP login error:", result.error);

        // Use the specific error message from the backend
        const errorMessage =
          cleanErrorMessage(result.error ?? "") ||
          "کد تایید نامعتبر است. لطفا دوباره تلاش کنید.";

        showToast("error", errorMessage, TOAST_IDS.OTP_VERIFY);

        otpForm.reset();
      } else if (result?.ok) {
        // Success - redirect manually
        showToast(
          "success",
          "ورود موفق. در حال انتقال...",
          TOAST_IDS.OTP_VERIFY
        );
        window.location.href = callbackUrl;
      }
    } catch (err) {
      console.error("OTP login exception:", err);

      const errorMessage =
        "خطا در ورود با کد یکبار مصرف. لطفا دوباره تلاش کنید.";

      showToast("error", errorMessage, TOAST_IDS.OTP_VERIFY);

      otpForm.reset();
    } finally {
      console.log("Finished OTP verification");
      setIsSubmitting(false);
    }
  };

  const handleResendCode = () => {
    if (!canResend || isSendingOtp) {
      console.log(
        "Preventing resend: canResend =",
        canResend,
        "isSendingOtp =",
        isSendingOtp
      );
      return;
    }

    console.log("Resending code for phone:", savedPhoneNumber);

    // Send OTP code again
    sendOtpCodeSafely(savedPhoneNumber);
  };

  const handleBack = () => {
    // Clear any error messages
    setError("");

    if (step === "otp") {
      setStep("phone");
      // Reset OTP form
      otpForm.reset();
    }
  };

  const onClickExit = () => {
    router.push("/");
  };

  // SMS autofill functionality for Android
  useEffect(() => {
    if (step !== "otp") {
      return;
    }

    const isAndroid = /Android/i.test(navigator.userAgent);

    // For Android - Use WebOTP API
    if (isAndroid && "OTPCredential" in window) {
      const abortController = new AbortController();

      const retrieveOtp = async () => {
        try {
          const otpCredential = await (navigator.credentials as any).get({
            otp: { transport: ["sms"] },
            signal: abortController.signal,
          });

          if (otpCredential?.code) {
            // Convert Persian/Arabic digits to English
            const convertedCode = convertPersianToEnglishForOTP(
              otpCredential.code
            );

            // Extract 6-digit code using multiple patterns
            let extractedCode = "";

            // Pattern 1: CODE: followed by digits
            const codePattern = convertedCode.match(/CODE:?\s*(\d{6})/i);
            if (codePattern) {
              extractedCode = codePattern[1];
            }

            // Pattern 2: # followed by digits
            if (!extractedCode) {
              const hashPattern = convertedCode.match(/#(\d{6})/);
              if (hashPattern) {
                extractedCode = hashPattern[1];
              }
            }

            // Pattern 3: Any 6-digit sequence
            if (!extractedCode) {
              const digitPattern = convertedCode.match(/\d{6}/);
              if (digitPattern) {
                extractedCode = digitPattern[0];
              }
            }

            if (extractedCode && /^\d{6}$/.test(extractedCode)) {
              otpForm.setValue("otp", extractedCode);
              showToast(
                "success",
                "کد تایید از پیامک خوانده شد.",
                TOAST_IDS.GENERAL
              );
            }
          }
        } catch (err: any) {
          // Silently handle errors
          console.log("WebOTP API error:", err);
        }
      };

      retrieveOtp();

      return () => {
        abortController.abort();
      };
    }
  }, [step, otpForm]);

  // Auto-focus and setup OTP input attributes for mobile with Persian keyboard support
  useEffect(() => {
    if (step === "otp") {
      const timer = setTimeout(() => {
        // Try multiple selectors to find the actual input
        const otpInput =
          (document.querySelector("[data-input-otp]") as HTMLInputElement) ||
          (document.querySelector(
            'input[inputmode="numeric"]'
          ) as HTMLInputElement) ||
          (document.querySelector('input[type="text"]') as HTMLInputElement);

        if (otpInput) {
          // Essential attributes for mobile keyboard with Persian support
          otpInput.setAttribute("autocomplete", "one-time-code");
          otpInput.setAttribute("inputmode", "text"); // Changed from "numeric" to support Persian keyboard
          otpInput.setAttribute("pattern", "[0-9۰-۹٠-٩]{6}"); // Support Persian and Arabic digits
          otpInput.setAttribute("type", "text"); // Changed from "tel" to "text" for better Persian support

          // Force focus and keyboard open
          otpInput.focus();
          otpInput.click(); // Additional trigger for mobile

          // Ensure cursor is at the end
          if (otpInput.value) {
            otpInput.setSelectionRange(
              otpInput.value.length,
              otpInput.value.length
            );
          }
        }

        // Also try to find and configure all individual slots
        const otpSlots = document.querySelectorAll(
          "[data-input-otp] input, input[data-otp-index]"
        );
        otpSlots.forEach((slot: Element) => {
          const inputSlot = slot as HTMLInputElement;
          inputSlot.setAttribute("inputmode", "text"); // Changed from "numeric" to support Persian keyboard
          inputSlot.setAttribute("pattern", "[0-9۰-۹٠-٩]"); // Support Persian and Arabic digits
          inputSlot.setAttribute("type", "text"); // Changed from "tel" to "text"
          inputSlot.setAttribute("autocomplete", "one-time-code");
        });
      }, 150); // Increased delay to ensure DOM is ready

      return () => clearTimeout(timer);
    }
  }, [step]);

  // OTP paste transformer to handle various OTP formats including Persian digits
  const handleOtpPaste = (pastedText: string) => {
    // First convert Persian/Arabic digits to English
    const convertedText = convertPersianToEnglishForOTP(pastedText);

    // Clean up pasted text: remove spaces, dashes, and other separators
    const cleanText = convertedText.replace(/[\s\-\.\,\:]/g, "");

    // Extract only English digits
    const digits = cleanText.match(/\d/g);
    if (digits) {
      const result = digits.join("").slice(0, 6); // Take only first 6 digits
      return result;
    }
    const result = cleanText.slice(0, 6);
    return result;
  };

  // Auto-submit when OTP is complete
  useEffect(() => {
    if (
      otpForm.watch("otp")?.length === 6 &&
      step === "otp" &&
      !isSubmitting &&
      !hasAutoSubmitted
    ) {
      setHasAutoSubmitted(true);

      setTimeout(() => {
        otpForm.handleSubmit(handleOtpSubmit)();
      }, 300);
    } else if (otpForm.watch("otp")?.length < 6) {
      setHasAutoSubmitted(false);
    }
  }, [otpForm.watch("otp"), step, isSubmitting, hasAutoSubmitted, otpForm]);

  // Convert Persian/Arabic digits to English in real-time
  useEffect(() => {
    const currentOtp = otpForm.watch("otp");
    if (currentOtp) {
      const convertedCode = convertPersianToEnglishForOTP(currentOtp);
      if (convertedCode !== currentOtp) {
        otpForm.setValue("otp", convertedCode);
      }
    }
  }, [otpForm.watch("otp"), otpForm]);

  return (
    <div className="bg-white rounded-2xl">
      {/* Right Side - Login Form */}
      <div className="bg-white rounded-2xl shadow-Card px-6 py-10 transition-all duration-300 overflow-hidden relative">
        {/* Back Button */}
        {(step == "phone" || step == "otp") && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute top-11 right-4 text-textBlack hover:text-textBlack/80 px-2"
            onClick={onClickExit}
            disabled={isSubmitting || isSendingOtp}
          >
            <X className="size-5" strokeWidth={2} />
          </Button>
        )}

        <div className="flex justify-center mb-6">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        {step === "phone" && (
          <MotionEffect slide={{ direction: "down" }} fade inView>
            <>
              <p className="text-right mt-16 mb-6 w-full font-bold text-2xl">
                ورود / ثبت نام
              </p>
              <form onSubmit={phoneForm.handleSubmit(handlePhoneSubmit)}>
                <div className="mb-4">
                  <label className="block text-sm font-normal mb-2 text-right">
                    سلام، برای ورود یا ثبت نام شماره موبایل خود را وارد کنید.
                  </label>
                  <div className="relative">
                    <Input
                      ref={phoneInputRef}
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      className="pr-10 text-gray-500 text-left placeholder:text-right placeholder:dir-rtl text-base placeholder:font-medium"
                      dir="ltr"
                      placeholder="شماره موبایل"
                      value={phoneForm.watch("phoneNumber")}
                      onChange={(event) => {
                        const convertedValue = convertPersianToEnglish(
                          event.target.value
                        );
                        const cleanedValue = convertedValue
                          .replace(/\D/g, "")
                          .trim();
                        // Only take first 11 digits after cleaning
                        const finalValue = cleanedValue.substring(0, 11);
                        phoneForm.setValue("phoneNumber", finalValue);
                      }}
                      onPaste={(event) => {
                        event.preventDefault();
                        const pastedText = event.clipboardData.getData("text");
                        const convertedValue =
                          convertPersianToEnglish(pastedText);
                        const cleanedValue = convertedValue
                          .replace(/\D/g, "")
                          .trim();
                        // Only take first 11 digits after cleaning
                        const finalValue = cleanedValue.substring(0, 11);
                        phoneForm.setValue("phoneNumber", finalValue);
                      }}
                      maxLength={15} // Increased to allow for spaces before cleaning
                      disabled={isSubmitting}
                      autoComplete="username"
                      name="username"
                    />
                    <Phone className="size-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-600" />
                  </div>
                  {phoneForm.formState.errors.phoneNumber && (
                    <p className="text-red-500 text-sm select-none mt-2">
                      {phoneForm.formState.errors.phoneNumber.message}
                    </p>
                  )}
                </div>
                <div className="w-full justify-center flex mt-10">
                  <RippleButton
                    type="submit"
                    className="w-3/5 md:w-1/2 bg-primary hover:bg-primary text-white py-2 rounded-lg flex justify-center items-center"
                    disabled={isSubmitting || !isRecaptchaLoaded}
                    name="submitPhonenumber"
                  >
                    <p className="text-sm sm:text-base font-normal">
                      {isSubmitting
                        ? "در حال پردازش..."
                        : !isRecaptchaLoaded
                        ? "در حال بارگذاری..."
                        : "ارسال کد تایید"}
                    </p>
                    <ArrowLeftIcon className="size-4 sm:size-5 mr-2" />
                  </RippleButton>
                </div>
              </form>
            </>
          </MotionEffect>
        )}

        {step === "otp" && (
          <MotionEffect slide={{ direction: "down" }} fade inView>
            <>
              <p className="text-center mb-6">
                کد ارسال شده به شماره همراه {savedPhoneNumber} را وارد کنید.
              </p>
              <form
                onSubmit={otpForm.handleSubmit(handleOtpSubmit)}
                name="otp-form"
              >
                <div className="mb-2">
                  <div id="otp-input" dir="ltr" className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      pattern={REGEXP_PERSIAN_ENGLISH_DIGITS}
                      containerClassName="group flex items-center has-[:disabled]:opacity-30 justify-center"
                      value={otpForm.watch("otp") || ""}
                      onChange={(value) => {
                        // Convert Persian/Arabic numbers to English with enhanced function
                        const convertedValue =
                          convertPersianToEnglishForOTP(value);

                        // Update form value with converted digits only
                        otpForm.setValue("otp", convertedValue);
                      }}
                      onPaste={(e) => {
                        e.preventDefault();
                        let paste =
                          e.clipboardData?.getData("text")?.slice(0, 6) || "";

                        // Use enhanced conversion for paste
                        paste = convertPersianToEnglishForOTP(paste);

                        if (paste && /^\d{1,6}$/.test(paste)) {
                          otpForm.setValue("otp", paste);
                        }
                      }}
                      disabled={isSubmitting}
                      autoFocus
                      data-testid="otp-input"
                      inputMode="text"
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={1} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={4} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <p className="text-xs text-center text-gray-500 mt-2">
                    کد پیامکی به صورت خودکار تشخیص داده می‌شود
                  </p>
                  {otpForm.formState.errors.otp && (
                    <p className="text-destructive text-sm text-center mt-1">
                      {otpForm.formState.errors.otp.message}
                    </p>
                  )}
                </div>
                <div className="text-center my-4">
                  <Button
                    type="button"
                    variant="link"
                    className={`text-destructive text-sm font-normal ${
                      !canResend || isSendingOtp ? "cursor-not-allowed" : ""
                    }`}
                    onClick={handleResendCode}
                    disabled={!canResend || isSendingOtp || isSubmitting}
                  >
                    {isSendingOtp
                      ? "در حال ارسال کد..."
                      : canResend
                      ? "ارسال مجدد کد"
                      : `ارسال مجدد کد (${countdown} ثانیه)`}
                  </Button>
                </div>
                <div className="flex flex-row items-center justify-center gap-x-2 w-full">
                  <RippleButton
                    type="submit"
                    className="w-1/2 bg-primary hover:bg-primary text-white rounded-lg flex justify-center items-center"
                    disabled={
                      isSubmitting ||
                      isSendingOtp ||
                      otpForm.watch("otp")?.length !== 6
                    }
                  >
                    {isSubmitting ? "در حال پردازش..." : "ورود"}
                    <ArrowLeftIcon className="size-4 sm:size-5 mr-2" />
                  </RippleButton>
                  <Button
                    type="button"
                    variant="transparent"
                    className="text-secondary text-sm font-medium w-1/2"
                    onClick={() => setStep("phone")}
                    disabled={isSendingOtp || isSubmitting}
                  >
                    ویرایش شماره موبایل
                  </Button>
                </div>
              </form>
            </>
          </MotionEffect>
        )}
      </div>
    </div>
  );
}
