"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import DatePicker from "@/components/DatePicker";
import { ArrowLeftIcon, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import VerificationIdentityResponse from "./verificationIdentityResponse";
import { toast } from "sonner";
import {
  PersonInquiryRequest,
  UserProfileService,
  DamageClaimService,
} from "@/swagger";

// Form validation schema
const insuranceInfoSchema = z.object({
  mobileNumber: z.string().length(11, "شماره موبایل باید 11 رقم باشد"),
  nationalId: z.string().length(10, "کد ملی باید 10 رقم باشد"),
  insuranceApprovalPhone: z.string().optional(),
  birthDate: z
    .object({
      year: z.number(),
      month: z.number(),
      day: z.number(),
      gregorian: z
        .object({
          year: z.number(),
          month: z.number(),
          day: z.number(),
        })
        .optional(),
    })
    .optional()
    .refine(
      (val) => {
        // Check if birthdate is selected
        return val !== undefined && val !== null;
      },
      {
        message: "تاریخ تولد را انتخاب کنید",
        path: [],
      }
    )
    .refine(
      (val) => {
        if (!val?.gregorian) return true;
        const selected = new Date(
          val.gregorian.year,
          val.gregorian.month - 1,
          val.gregorian.day
        );
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selected <= today;
      },
      {
        message: "تاریخ تولد نمی‌تواند بعد از امروز باشد",
        path: [], // Attach error to the root of dateOfBirth
      }
    ),
});

type InsuranceInfoFormData = z.infer<typeof insuranceInfoSchema>;

// Type for the API response data
interface VerificationResult {
  fullName: string;
  province: string;
  city: string;
  address: string;
  mobieleNumber?: string;
}

interface InsuranceInfoFormProps {
  initialData?: InsuranceInfoFormData;
  onChange: (data: InsuranceInfoFormData) => void;
  onNext: (declarationId: string) => void;
}

export default function InsuranceInfoForm({
  initialData,
  onChange,
  onNext,
}: InsuranceInfoFormProps) {
  const isInitialMount = useRef(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationResult, setVerificationResult] =
    useState<VerificationResult | null>(null);

  const form = useForm<InsuranceInfoFormData>({
    resolver: zodResolver(insuranceInfoSchema),
    defaultValues: initialData || {
      mobileNumber: "",
      nationalId: "",
      insuranceApprovalPhone: "",
      birthDate: undefined as any,
    },
  });

  // Subscribe to form changes
  useEffect(() => {
    const subscription = form.watch((value) => {
      // Skip the initial mount to avoid triggering onChange with default values
      if (isInitialMount.current) {
        isInitialMount.current = false;
        return;
      }
      onChange(value as InsuranceInfoFormData);
    });

    return () => subscription.unsubscribe();
  }, [form, onChange]);

  const onSubmit = async (data: InsuranceInfoFormData) => {
    console.log(data, "datafirstStep");
    setIsSubmitting(true);
    const requestBody = {
      nationalCode: data.nationalId,
      dateOfBirth: data.birthDate
        ? data.birthDate.year +
          "/" +
          String(data.birthDate.month).padStart(2, "0") +
          "/" +
          String(data.birthDate.day).padStart(2, "0")
        : undefined,
    } as PersonInquiryRequest;
    try {
      const res = await UserProfileService.postApiV1UsersVerifyIdentity({
        requestBody,
      });
      // router.push(res);
      if (res) {
        setIsSubmitting(false);
        setVerificationResult({
          fullName: res.FirstName + " " + res.LastName,
          province: res.State?.Name,
          city: res.City?.Name,
          address: res.Address,
          mobieleNumber: data?.mobileNumber,
        });
      }
      console.log(res, "res from verify identity");
    } catch (error) {
      console.log(error);
      toast.error("خطایی رخ داده است");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinue = async (mobileNumber: string) => {
    setIsSubmitting(true);
    try {
      const res = await DamageClaimService.postApiV1DamageClaimCreate({
        requestBody: {
          phoneNumber: mobileNumber,
        },
      });
      // router.push(res);
      if (res) {
        setIsSubmitting(false);
        const declarationId = res; // Expected format: "fbafef72-7a80-4b38-a97a-cdd53d61b1ab"

        // Pass the ID to the parent component
        onNext(declarationId);
      }
    } catch (error) {
      console.error("Error creating damage declaration:", error);
      toast.error("خطا در ایجاد اعلام خسارت", {
        description: "لطفاً دوباره تلاش کنید",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToEdit = () => {
    setVerificationResult(null);
  };

  // Success UI after verification
  if (verificationResult) {
    return (
      <VerificationIdentityResponse
        verificationResult={verificationResult}
        handleBackToEdit={handleBackToEdit}
        handleContinue={handleContinue}
        isSubmitting={isSubmitting}
      />
    );
  }

  return (
    <div className="flex flex-col justify-center gap-y-10 items-center">
      <h2 className="text-xl font-normal text-secondary text-center">
        اطلاعات بیمه گذار
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-6 w-full"
        >
          {/* Mobile Number */}
          <FormField
            control={form.control}
            name="mobileNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-right">
                  شماره موبایل بیمه‌گذار
                  <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="09121234567"
                    className={cn("text-right placeholder:text-right")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* National ID */}
          <FormField
            control={form.control}
            name="nationalId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-right">
                  کد ملی
                  <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="کد ملی ده رقمی"
                    className={cn("text-right placeholder:text-right")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Insurance Approval Phone (Optional) */}
          <FormField
            control={form.control}
            name="insuranceApprovalPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-right">
                  تلفن ثابت بیمه‌نامه (اختیاری)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="تلفن ثابت با کد شهر"
                    className="text-right placeholder:text-right"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Birth Date */}
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-right">
                  تاریخ تولد
                  <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    format="yyyy-MM-dd"
                    isInvalid={!!fieldState.error}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Action Button */}
          <div className="flex items-center justify-center pt-4 w-full text-sm font-medium">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary w-full cursor-pointer"
            >
              {isSubmitting ? "در حال استعلام..." : "استعلام هویت"}
              <ArrowLeftIcon className="size-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
