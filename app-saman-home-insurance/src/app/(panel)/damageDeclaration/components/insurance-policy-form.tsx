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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeftIcon } from "lucide-react";
import { MultiFileUpload } from "@/components/ui/multi-file-upload";

// Form validation schema
const insurancePolicySchema = z
  .object({
    policyNumber: z
      .string()
      .length(16, "شماره بیمه‌نامه باید 16 کاراکتر باشد"),
    policyFiles: z.array(z.any()).optional(),
    hasOtherInsurance: z.enum(["yes", "no"]).optional(),
    otherInsuranceCompany: z.string().optional(),
    otherPolicyNumber: z.string().optional(),
    otherInsuranceCase: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.hasOtherInsurance === "yes") {
      if (
        !data.otherInsuranceCompany ||
        data.otherInsuranceCompany.trim() === ""
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "نام شرکت بیمه‌گر الزامی است",
          path: ["otherInsuranceCompany"],
        });
      }
      if (!data.otherPolicyNumber || data.otherPolicyNumber.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "شماره بیمه‌نامه الزامی است",
          path: ["otherPolicyNumber"],
        });
      } else if (data.otherPolicyNumber.trim().length !== 16) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "شماره بیمه‌نامه باید دقیقا 16 کاراکتر باشد",
          path: ["otherPolicyNumber"],
        });
      }
      if (!data.otherInsuranceCase) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "مورد بیمه الزامی است",
          path: ["otherInsuranceCase"],
        });
      }
    }
  });

type InsurancePolicyFormData = z.infer<typeof insurancePolicySchema>;

interface InsurancePolicyFormProps {
  initialData?: InsurancePolicyFormData;
  onChange: (data: InsurancePolicyFormData) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const InsurancePolicyForm = ({
  initialData,
  onChange,
  onNext,
  onPrevious,
}: InsurancePolicyFormProps) => {
  const isInitialMount = useRef(true);

  const form = useForm<InsurancePolicyFormData>({
    resolver: zodResolver(insurancePolicySchema),
    defaultValues: initialData || {
      policyNumber: "",
      policyFiles: [],
      hasOtherInsurance: "no",
      otherInsuranceCompany: "",
      otherPolicyNumber: "",
      otherInsuranceCase: "",
    },
  });

  // Watch the hasOtherInsurance field to show/hide additional fields
  const hasOtherInsurance = form.watch("hasOtherInsurance");

  // Subscribe to form changes
  useEffect(() => {
    const subscription = form.watch((value) => {
      // Skip the initial mount to avoid triggering onChange with default values
      if (isInitialMount.current) {
        isInitialMount.current = false;
        return;
      }
      onChange(value as InsurancePolicyFormData);
    });

    return () => subscription.unsubscribe();
  }, [form, onChange]);

  const onSubmit = (data: InsurancePolicyFormData) => {
    onChange(data);
    onNext();
  };

  return (
    <div className="flex flex-col justify-center gap-y-10 items-center">
      <h2 className="text-xl font-normal text-secondary text-center">
        اطلاعات بیمه‌نامه
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-6 w-full"
        >
          {/* Policy Number */}
          <FormField
            control={form.control}
            name="policyNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-right">
                  شماره بیمه‌نامه
                  <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="شماره بیمه‌نامه ۱۶ رقمی"
                    className={cn("text-right placeholder:text-right")}
                    maxLength={16}
                  />
                </FormControl>
                <FormMessage className="text-right !text-xs text-destructive" />
              </FormItem>
            )}
          />

          {/* Policy File Upload */}
          <FormField
            control={form.control}
            name="policyFiles"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-right">
                  فایل بیمه‌نامه (اختیاری)
                </FormLabel>
                <FormControl>
                  <MultiFileUpload
                    value={field.value}
                    onChange={field.onChange}
                    onError={(error) => {
                      form.setError("policyFiles", {
                        type: "manual",
                        message: error,
                      });
                    }}
                    maxFiles={5}
                    maxSizeMB={5}
                    accept="image/*,.pdf"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Has Other Insurance Radio Group */}
          <FormField
            control={form.control}
            name="hasOtherInsurance"
            render={({ field }) => (
              <FormItem className="space-y-3 border border-border rounded-xl p-4">
                <FormLabel className="text-right">
                  آیا مورد بیمه در شرکت دیگری هم تحت پوشش است؟
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-row justify-end gap-8 pt-3"
                  >
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Label htmlFor="no" className="cursor-pointer">
                        خیر
                      </Label>
                      <RadioGroupItem
                        value="no"
                        id="no"
                        className="cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Label htmlFor="yes" className="cursor-pointer">
                        بله
                      </Label>
                      <RadioGroupItem
                        value="yes"
                        id="yes"
                        className="cursor-pointer"
                      />
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Conditional Fields - Show when "Yes" is selected */}
          {hasOtherInsurance === "yes" && (
            <div className="flex flex-col gap-y-5">
              {/* Insurance Case */}
              <FormField
                control={form.control}
                name="otherInsuranceCase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-right">
                      مورد بیمه
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <Select
                      dir="rtl"
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="text-left">
                          <SelectValue placeholder="انتخاب کنید" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="building">ساختمان</SelectItem>
                        <SelectItem value="contents">محتویات</SelectItem>
                        <SelectItem value="both">هر دو</SelectItem>
                        <SelectItem value="liability">مسئولیت</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-right !text-xs text-destructive" />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-start w-full gap-x-4">
                {/* Insurance Company Name */}
                <FormField
                  control={form.control}
                  name="otherInsuranceCompany"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-right">
                        نام شرکت بیمه‌گر
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="مثلا سامان"
                          className={cn("text-right placeholder:text-right")}
                        />
                      </FormControl>
                      <FormMessage className="text-right !text-xs text-destructive" />
                    </FormItem>
                  )}
                />

                {/* Other Policy Number */}
                <FormField
                  control={form.control}
                  name="otherPolicyNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-right">
                        شماره بیمه‌نامه
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="بیمه نامه ۱۶ رقمی"
                          className={cn("text-right placeholder:text-right")}
                          maxLength={16}
                        />
                      </FormControl>
                      <FormMessage className="text-right !text-xs text-destructive" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-row items-center justify-between gap-2 pt-4 w-full text-sm font-medium">
            <Button
              type="submit"
              className="bg-primary hover:bg-primary w-3/5 cursor-pointer"
            >
              تایید و ادامه
              <ArrowLeftIcon className="size-4 mr-2" />
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onPrevious}
              className="w-2/5 cursor-pointer"
            >
              مرحله قبلی
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default InsurancePolicyForm;
