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

// Form validation schema
const insuranceInfoSchema = z.object({
  mobileNumber: z.string().min(11, "شماره موبایل باید 11 رقم باشد"),
  nationalId: z.string().min(10, "کد ملی باید 10 رقم باشد"),
  insuranceApprovalPhone: z.string().optional(),
  birthDate: z.object({
    day: z.number().nullable(),
    month: z.number().nullable(),
    year: z.number().nullable(),
  }),
});

type InsuranceInfoFormData = z.infer<typeof insuranceInfoSchema>;

// Type for the API response data
interface VerificationResult {
  fullName: string;
  province: string;
  city: string;
  address: string;
}

interface InsuranceInfoFormProps {
  initialData?: InsuranceInfoFormData;
  onChange: (data: InsuranceInfoFormData) => void;
  onNext: () => void;
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
      birthDate: {
        day: null,
        month: null,
        year: null,
      },
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
    setIsSubmitting(true);
    try {
      // TODO: Replace this with your actual API call
      // Example:
      // const response = await fetch('/api/verify-identity', {
      //   method: 'POST',
      //   body: JSON.stringify(data),
      // });
      // const result = await response.json();

      // Simulated API call for demonstration
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock successful response - replace with actual API response
      const mockResult: VerificationResult = {
        fullName: "محمد نیازی",
        province: "تهران",
        city: "تهران",
        address: "تهران، تهران، بلوارکشاورز خیابان قریب، پلاک 57",
      };

      setVerificationResult(mockResult);
      onChange(data);
    } catch (error) {
      console.error("Verification failed:", error);
      // Handle error - you can add error state and display error message
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinue = () => {
    onNext();
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
          className="flex flex-col gap-y-5 w-full"
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
                    className={cn("text-center placeholder:text-right")}
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
                    className={cn("text-center placeholder:text-right")}
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
                    className="text-center placeholder:text-right"
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
            render={({ field }) => (
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
