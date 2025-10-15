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
import { ArrowLeftIcon, Upload } from "lucide-react";

// Form validation schema
const insurancePolicySchema = z
  .object({
    policyNumber: z.string().min(1, "شماره بیمه‌نامه الزامی است"),
    policyFile: z.any().optional(),
    hasOtherInsurance: z
      .enum(["yes", "no"], {
        message: "لطفاً یکی از گزینه‌ها را انتخاب کنید",
      })
      .optional()
      .refine((val) => val !== undefined, {
        message: "لطفاً یکی از گزینه‌ها را انتخاب کنید",
      }),
    otherInsuranceCompany: z.string().optional(),
    otherPolicyNumber: z.string().optional(),
    otherInsuranceCase: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.hasOtherInsurance === "yes") {
        return (
          !!data.otherInsuranceCompany &&
          !!data.otherPolicyNumber &&
          !!data.otherInsuranceCase
        );
      }
      return true;
    },
    {
      message: "لطفاً تمام فیلدهای مربوط به بیمه دیگر را پر کنید",
      path: ["otherInsuranceCompany"],
    }
  );

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<InsurancePolicyFormData>({
    resolver: zodResolver(insurancePolicySchema),
    defaultValues: initialData || {
      policyNumber: "",
      policyFile: undefined,
      hasOtherInsurance: undefined,
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

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (5MB max)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        form.setError("policyFile", {
          type: "manual",
          message: "حداکثر حجم فایل: 5 مگابایت",
        });
        return;
      }
      setSelectedFile(file);
      form.setValue("policyFile", file);
      form.clearErrors("policyFile");
    }
  };

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
          className="flex flex-col gap-y-5 w-full"
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
                    className={cn("text-center placeholder:text-right")}
                    maxLength={16}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Policy File Upload */}
          <FormField
            control={form.control}
            name="policyFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-right">
                  فایل بیمه‌نامه (اختیاری)
                </FormLabel>
                <FormControl>
                  <div className="flex flex-col items-center">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div
                      onClick={handleFileSelect}
                      className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                    >
                      <Upload className="w-12 h-12 text-gray-400 mb-3" />
                      <p className="text-sm text-gray-500 mb-1">
                        {selectedFile
                          ? selectedFile.name
                          : "حداکثر حجم فایل: 5 مگابایت"}
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        className="mt-3 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFileSelect();
                        }}
                      >
                        انتخاب فایل
                      </Button>
                    </div>
                  </div>
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
              <FormItem className="space-y-3">
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
            <div className="flex flex-col gap-y-5 p-5">
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
                    <Select dir="rtl" onValueChange={field.onChange} value={field.value}>
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
                          className={cn("text-center placeholder:text-right")}
                        />
                      </FormControl>
                      <FormMessage />
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
                          className={cn("text-center placeholder:text-right")}
                          maxLength={16}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-3 pt-4 w-full text-sm font-medium">
            <Button
              type="button"
              variant="outline"
              onClick={onPrevious}
              className="w-full md:w-auto cursor-pointer"
            >
              مرحله قبلی
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary w-full md:w-auto cursor-pointer"
            >
              تایید و ادامه
              <ArrowLeftIcon className="size-4 mr-2" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default InsurancePolicyForm;
