"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { ArrowLeftIcon } from "lucide-react";

// Form validation schema
const beneficiariesSchema = z.object({
  insurancePolicyNumber: z
    .string()
    .min(1, "شماره حساب بیمه گذار الزامی است")
    .regex(/^(\d{8}|\d{12})$/, "شماره حساب باید 8 یا 12 رقم باشد"),
  insuranceShabaNumber: z
    .string()
    .min(1, "شماره شبا بیمه گذار الزامی است")
    .regex(/^\d{16}$/, "شماره شبا باید 16 رقم باشد"),
  hasOtherBeneficiary: z.enum(["yes", "no"]),
  beneficiaryName: z.string().optional(),
  beneficiaryPhone: z.string().optional(),
  accidentCausedByDispute: z.enum(["yes", "no"]),
  disputeName: z.string().optional(),
  disputePhone: z.string().optional(),
});

type BeneficiariesFormData = z.infer<typeof beneficiariesSchema>;

interface BeneficiariesFormProps {
  initialData?: BeneficiariesFormData;
  onChange: (data: BeneficiariesFormData) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function BeneficiariesForm({
  initialData,
  onChange,
  onNext,
  onPrevious,
}: BeneficiariesFormProps) {
  const form = useForm<BeneficiariesFormData>({
    resolver: zodResolver(beneficiariesSchema),
    defaultValues: initialData || {
      insurancePolicyNumber: "",
      insuranceShabaNumber: "",
      hasOtherBeneficiary: "no",
      beneficiaryName: "",
      beneficiaryPhone: "",
      accidentCausedByDispute: "no",
      disputeName: "",
      disputePhone: "",
    },
  });

  // Watch all form values
  const watchedValues = form.watch();
  const hasOtherBeneficiary = form.watch("hasOtherBeneficiary");
  const accidentCausedByDispute = form.watch("accidentCausedByDispute");

  // Update parent component whenever form data changes
  useEffect(() => {
    const subscription = form.watch((value) => {
      onChange(value as BeneficiariesFormData);
    });
    return () => subscription.unsubscribe();
  }, [form, onChange]);

  const onSubmit = (data: BeneficiariesFormData) => {
    console.log("Form submitted:", data);
    onNext();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center gap-y-10 items-center">
        <div className="flex flex-col gap-y-6 w-full">
          <h2 className="text-lg font-normal text-gray-500 text-center">
            اطلاعات ذینفعان
          </h2>

          {/* Insurance Policy Number */}
          <FormField
            control={form.control}
            name="insurancePolicyNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  شماره حساب بیمه گذار{" "}
                  <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="شماره حساب 8 یا 12 رقمی"
                    className="text-right"
                    dir="ltr"
                    maxLength={12}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Insurance Shaba Number */}
          <FormField
            control={form.control}
            name="insuranceShabaNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  شماره شبا بیمه گذار{" "}
                  <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="شماره شبا 16 رقمی"
                    className="text-right"
                    dir="ltr"
                    maxLength={16}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Has Other Beneficiary */}
          <FormField
            control={form.control}
            name="hasOtherBeneficiary"
            render={({ field }) => (
              <FormItem className="space-y-3 border border-border rounded-xl p-4">
                <FormLabel>
                  آیا غیر از بیمه‌گذار شخص دیگری در دریافت خسارت ذینفع است؟
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-row justify-end gap-8 pt-3"
                  >
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="no" id="beneficiary-no" className="cursor-pointer" />
                      <Label
                        htmlFor="beneficiary-no"
                        className="cursor-pointer"
                      >
                        خیر
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="yes" id="beneficiary-yes" className="cursor-pointer" />
                      <Label
                        htmlFor="beneficiary-yes"
                        className="cursor-pointer"
                      >
                        بله
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Beneficiary Details - Show when 'yes' is selected */}
          {hasOtherBeneficiary === "yes" && (
            <>
              <FormField
                control={form.control}
                name="beneficiaryName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام و نام خانوادگی ذینفع</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="مثلاً حسین محمدی"
                        className="text-right"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="beneficiaryPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>شماره تماس ذینفع</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="مثلاً 09123456789"
                        className="text-right"
                        dir="ltr"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {/* Accident Caused By Dispute */}
          <FormField
            control={form.control}
            name="accidentCausedByDispute"
            render={({ field }) => (
              <FormItem className="space-y-3 border border-border rounded-xl p-4">
                <FormLabel>
                  آیا حادثه باعث آسیب به مشاعات (همسایه‌ها) شده است؟
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-row justify-end gap-8 pt-3"
                  >
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="no" id="dispute-no" className="cursor-pointer" />
                      <Label htmlFor="dispute-no" className="cursor-pointer">
                        خیر
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="yes" id="dispute-yes" className="cursor-pointer" />
                      <Label htmlFor="dispute-yes" className="cursor-pointer">
                        بله
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Dispute Details - Show when 'yes' is selected */}
          {accidentCausedByDispute === "yes" && (
            <>
              <FormField
                control={form.control}
                name="disputeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام و نام خانوادگی همسایه</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="مثلاً حسین محمدی"
                        className="text-right"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="disputePhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>شماره تماس همسایه</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="مثلاً 09123456789"
                        className="text-right"
                        dir="ltr"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-row items-center justify-between gap-2 pt-4 w-full text-sm font-medium">
          <Button
            type="submit"
            className="cursor-pointer bg-primary hover:bg-primary/90 flex-2"
          >
            تایید و ادامه
            <ArrowLeftIcon className="mr-2 size-4" />
          </Button>
          <Button
            type="button"
            onClick={onPrevious}
            variant="transparent"
            className="cursor-pointer flex-1"
          >
            مرحله قبلی
          </Button>
        </div>
      </form>
    </Form>
  );
}
