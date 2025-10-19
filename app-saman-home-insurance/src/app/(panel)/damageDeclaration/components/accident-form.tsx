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
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowLeftIcon, ChevronDownIcon } from "lucide-react";
import { MultiFileUpload } from "@/components/ui/multi-file-upload";
import { Calendar } from "@/components/ui/calendar";

// Form validation schema
const accidentFormSchema = z.object({
  accidentType: z.string().min(1, "نوع حادثه الزامی است"),
  accidentDate: z
    .date()
    .optional()
    .refine((date) => date !== undefined, {
      message: "تاریخ وقوع حادثه الزامی است",
    }),
  accidentTime: z.string().min(1, "ساعت وقوع حادثه الزامی است"),
  accidentProvince: z.string().min(1, "استان وقوع حادثه الزامی است"),
  accidentCity: z.string().min(1, "شهر الزامی است"),
  accidentAddress: z.string().min(1, "آدرس وقوع حادثه الزامی است"),
  postalCode: z
    .string()
    .min(10, "کد پستی باید 10 رقم باشد")
    .max(10, "کد پستی باید 10 رقم باشد")
    .regex(/^\d+$/, "کد پستی باید فقط شامل اعداد باشد"),
  ownershipType: z.string().min(1, "نوع مالکیت الزامی است"),
  damageDescription: z
    .string()
    .min(10, "توضیحات علت حادثه باید حداقل 10 کاراکتر باشد"),
  accidentImages: z.array(z.any()).optional(),
  hasPoliceReport: z.enum(["yes", "no"]).optional(),
  policeReportNumber: z.string().optional(),
  policeReportDate: z.date().optional(),
  policeReportFile: z.array(z.any()).optional(),
  hasFireReport: z.enum(["yes", "no"]).optional(),
  fireReportNumber: z.string().optional(),
  fireReportDate: z.date().optional(),
  fireReportFile: z.array(z.any()).optional(),
  hasMeteorologicalReport: z.enum(["yes", "no"]).optional(),
  meteorologicalReportNumber: z.string().optional(),
  meteorologicalReportDate: z.date().optional(),
  meteorologicalReportFile: z.array(z.any()).optional(),
});

type AccidentFormData = z.infer<typeof accidentFormSchema>;

interface AccidentFormProps {
  initialData?: AccidentFormData;
  onChange: (data: AccidentFormData) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const AccidentForm = ({
  initialData,
  onChange,
  onNext,
  onPrevious,
}: AccidentFormProps) => {
  const isInitialMount = useRef(true);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isPoliceReportDateOpen, setIsPoliceReportDateOpen] = useState(false);
  const [isFireReportDateOpen, setIsFireReportDateOpen] = useState(false);
  const [isMeteoReportDateOpen, setIsMeteoReportDateOpen] = useState(false);

  const form = useForm<AccidentFormData>({
    resolver: zodResolver(accidentFormSchema),
    defaultValues: initialData || {
      accidentType: "",
      accidentDate: undefined,
      accidentTime: "",
      accidentProvince: "",
      accidentCity: "",
      accidentAddress: "",
      postalCode: "",
      ownershipType: "",
      damageDescription: "",
      accidentImages: [],
      hasPoliceReport: "no",
      policeReportNumber: "",
      policeReportDate: undefined,
      policeReportFile: [],
      hasFireReport: "no",
      fireReportNumber: "",
      fireReportDate: undefined,
      fireReportFile: [],
      hasMeteorologicalReport: "no",
      meteorologicalReportNumber: "",
      meteorologicalReportDate: undefined,
      meteorologicalReportFile: [],
    },
  });

  // Subscribe to form changes
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
        return;
      }
      onChange(value as AccidentFormData);
    });

    return () => subscription.unsubscribe();
  }, [form, onChange]);

  const onSubmit = (data: AccidentFormData) => {
    onChange(data);
    onNext();
  };

  return (
    <div className="flex flex-col justify-center gap-y-10 items-center">
      <h2 className="text-xl font-normal text-secondary text-center">
        اطلاعات حادثه
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-6 w-full"
        >
          {/* Accident Type */}
          <FormField
            control={form.control}
            name="accidentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-right">
                  نوع حادثه
                  <span className="text-destructive">*</span>
                </FormLabel>
                <Select
                  dir="rtl"
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="text-right">
                      <SelectValue placeholder="انتخاب کنید" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="fire">آتش‌سوزی</SelectItem>
                    <SelectItem value="flood">سیل</SelectItem>
                    <SelectItem value="earthquake">زلزله</SelectItem>
                    <SelectItem value="theft">سرقت</SelectItem>
                    <SelectItem value="explosion">انفجار</SelectItem>
                    <SelectItem value="storm">طوفان</SelectItem>
                    <SelectItem value="other">سایر</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-right !text-xs text-destructive" />
              </FormItem>
            )}
          />

          {/* Accident Date and Time */}
          <div className="flex items-start justify-start w-full gap-x-4">
            <FormField
              control={form.control}
              name="accidentDate"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-right">
                    تاریخ وقوع حادثه
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <Popover
                    open={isDatePickerOpen}
                    onOpenChange={setIsDatePickerOpen}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className="w-full justify-between text-right font-normal py-5 !bg-input"
                        >
                          {field.value
                            ? field.value.toLocaleDateString("fa-IR")
                            : "انتخاب تاریخ"}
                          <ChevronDownIcon className="mr-2 h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 " align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          setIsDatePickerOpen(false);
                        }}
                        captionLayout="dropdown"
                        startMonth={new Date(2020, 0)}
                        endMonth={new Date()}
                        disabled={(date) =>
                          date > new Date() || date < new Date("2020-01-01")
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-right !text-xs text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accidentTime"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-right">
                    ساعت وقوع حادثه
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="time"
                      className={cn("text-right")}
                    />
                  </FormControl>
                  <FormMessage className="text-right !text-xs text-destructive" />
                </FormItem>
              )}
            />
          </div>

          {/* Province and City */}
          <div className="flex items-start justify-start w-full gap-x-4">
            <FormField
              control={form.control}
              name="accidentProvince"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-right">
                    استان وقوع حادثه
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="مثلا تهران"
                      className={cn("text-right placeholder:text-right")}
                    />
                  </FormControl>
                  <FormMessage className="text-right !text-xs text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accidentCity"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-right">
                    شهر
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="مثلا تهران"
                      className={cn("text-right placeholder:text-right")}
                    />
                  </FormControl>
                  <FormMessage className="text-right !text-xs text-destructive" />
                </FormItem>
              )}
            />
          </div>

          {/* Accident Address */}
          <FormField
            control={form.control}
            name="accidentAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-right">
                  آدرس وقوع حادثه
                  <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="نشانی"
                    className={cn("text-right placeholder:text-right")}
                  />
                </FormControl>
                <FormMessage className="text-right !text-xs text-destructive" />
              </FormItem>
            )}
          />

          {/* Postal Code */}
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-right">
                  کد پستی
                  <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="مثلا 1813134445"
                    className={cn("text-right placeholder:text-right")}
                    maxLength={10}
                  />
                </FormControl>
                <FormMessage className="text-right !text-xs text-destructive" />
              </FormItem>
            )}
          />

          {/* Ownership Type */}
          <FormField
            control={form.control}
            name="ownershipType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-right">
                  نوع مالکیت
                  <span className="text-destructive">*</span>
                </FormLabel>
                <Select
                  dir="rtl"
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="text-right">
                      <SelectValue placeholder="انتخاب کنید" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="owner">مالک</SelectItem>
                    <SelectItem value="tenant">مستاجر</SelectItem>
                    <SelectItem value="other">سایر</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-right !text-xs text-destructive" />
              </FormItem>
            )}
          />

          {/* Damage Description */}
          <FormField
            control={form.control}
            name="damageDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-right">
                  توضیحات علت حادثه
                  <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="علت بروز حادثه و نحوه اتفاق آن را اینجا بنویسید..."
                    className={cn(
                      "text-right placeholder:text-right min-h-[150px] resize-none"
                    )}
                  />
                </FormControl>
                <FormMessage className="text-right !text-xs text-destructive" />
              </FormItem>
            )}
          />

          {/* Accident Images Upload */}
          <FormField
            control={form.control}
            name="accidentImages"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-right">
                  تصاویر محل حادثه (اختیاری)
                </FormLabel>
                <FormControl>
                  <MultiFileUpload
                    value={field.value}
                    onChange={field.onChange}
                    onError={(error) => {
                      form.setError("accidentImages", {
                        type: "manual",
                        message: error,
                      });
                    }}
                    maxFiles={5}
                    maxSizeMB={5}
                    accept="image/*"
                  />
                </FormControl>
                <FormMessage className="text-right !text-xs text-destructive" />
              </FormItem>
            )}
          />

          {/* Police Report */}
          <FormField
            control={form.control}
            name="hasPoliceReport"
            render={({ field }) => (
              <FormItem className="space-y-3 border border-border rounded-xl p-4">
                <FormLabel className="text-right">
                  آیا پلیس از حادثه گزارش تهیه کرده است؟
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-row justify-end gap-8 pt-3"
                  >
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Label htmlFor="police-no" className="cursor-pointer">
                        خیر
                      </Label>
                      <RadioGroupItem
                        value="no"
                        id="police-no"
                        className="cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Label htmlFor="police-yes" className="cursor-pointer">
                        بله
                      </Label>
                      <RadioGroupItem
                        value="yes"
                        id="police-yes"
                        className="cursor-pointer"
                      />
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Police Report Details - Conditional */}
          {form.watch("hasPoliceReport") === "yes" && (
            <div className="flex flex-col gap-y-6">
              <div className="flex items-start justify-start w-full gap-x-4">
                <FormField
                  control={form.control}
                  name="policeReportNumber"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-right">شماره گزارش</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="نام"
                          className={cn("text-right placeholder:text-right")}
                        />
                      </FormControl>
                      <FormMessage className="text-right !text-xs text-destructive" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="policeReportDate"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-right">تاریخ گزارش</FormLabel>
                      <Popover
                        open={isPoliceReportDateOpen}
                        onOpenChange={setIsPoliceReportDateOpen}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className="w-full justify-between text-right font-normal py-5 !bg-input"
                            >
                              {field.value
                                ? field.value.toLocaleDateString("fa-IR")
                                : "انتخاب کنید"}
                              <ChevronDownIcon className="mr-2 h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                              setIsPoliceReportDateOpen(false);
                            }}
                            captionLayout="dropdown"
                            startMonth={new Date(2020, 0)}
                            endMonth={new Date()}
                            disabled={(date) =>
                              date > new Date() ||
                              date < new Date("2020-01-01")
                            }
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage className="text-right !text-xs text-destructive" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="policeReportFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-right">
                      بارگزاری گزارش (اختیاری)
                    </FormLabel>
                    <FormControl>
                      <MultiFileUpload
                        value={field.value}
                        onChange={field.onChange}
                        onError={(error) => {
                          form.setError("policeReportFile", {
                            type: "manual",
                            message: error,
                          });
                        }}
                        maxFiles={5}
                        maxSizeMB={5}
                        accept="image/*,.pdf"
                      />
                    </FormControl>
                    <FormMessage className="text-right !text-xs text-destructive" />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Fire Report */}
          <FormField
            control={form.control}
            name="hasFireReport"
            render={({ field }) => (
              <FormItem className="space-y-3 border border-border rounded-xl p-4">
                <FormLabel className="text-right">
                  آیا آتش نشانی از حادثه گزارش تهیه کرده است؟
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-row justify-end gap-8 pt-3"
                  >
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Label htmlFor="fire-no" className="cursor-pointer">
                        خیر
                      </Label>
                      <RadioGroupItem
                        value="no"
                        id="fire-no"
                        className="cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Label htmlFor="fire-yes" className="cursor-pointer">
                        بله
                      </Label>
                      <RadioGroupItem
                        value="yes"
                        id="fire-yes"
                        className="cursor-pointer"
                      />
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Fire Report Details - Conditional */}
          {form.watch("hasFireReport") === "yes" && (
            <div className="flex flex-col gap-y-6">
              <div className="flex items-start justify-start w-full gap-x-4">
                <FormField
                  control={form.control}
                  name="fireReportNumber"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-right">نام ایستگاه آتش نشانی</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="مثلا حسین حیدری"
                          className={cn("text-right placeholder:text-right")}
                        />
                      </FormControl>
                      <FormMessage className="text-right !text-xs text-destructive" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="fireReportFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-right">
                      بارگزاری گزارش (اختیاری)
                    </FormLabel>
                    <FormControl>
                      <MultiFileUpload
                        value={field.value}
                        onChange={field.onChange}
                        onError={(error) => {
                          form.setError("fireReportFile", {
                            type: "manual",
                            message: error,
                          });
                        }}
                        maxFiles={5}
                        maxSizeMB={5}
                        accept="image/*,.pdf"
                      />
                    </FormControl>
                    <FormMessage className="text-right !text-xs text-destructive" />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Meteorological Report */}
          <FormField
            control={form.control}
            name="hasMeteorologicalReport"
            render={({ field }) => (
              <FormItem className="space-y-3 border border-border rounded-xl p-4">
                <FormLabel className="text-right">
                  آیا هواشناسی از حادثه گزارشی تهیه کرده است؟
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-row justify-end gap-8 pt-3"
                  >
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Label htmlFor="meteo-no" className="cursor-pointer">
                        خیر
                      </Label>
                      <RadioGroupItem
                        value="no"
                        id="meteo-no"
                        className="cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Label htmlFor="meteo-yes" className="cursor-pointer">
                        بله
                      </Label>
                      <RadioGroupItem
                        value="yes"
                        id="meteo-yes"
                        className="cursor-pointer"
                      />
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Meteorological Report Details - Conditional */}
          {form.watch("hasMeteorologicalReport") === "yes" && (
            <div className="flex flex-col gap-y-6">
              <FormField
                control={form.control}
                name="meteorologicalReportNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-right">
                      شرایط آب و هوایی در زمان حادثه
                    </FormLabel>
                    <Select
                      dir="rtl"
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="text-right">
                          <SelectValue placeholder="انتخاب کنید" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="sunny">آفتابی</SelectItem>
                        <SelectItem value="cloudy">ابری</SelectItem>
                        <SelectItem value="rainy">بارانی</SelectItem>
                        <SelectItem value="stormy">طوفانی</SelectItem>
                        <SelectItem value="snowy">برفی</SelectItem>
                        <SelectItem value="foggy">مه آلود</SelectItem>
                        <SelectItem value="other">سایر</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-right !text-xs text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="meteorologicalReportDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-right">
                      میزان پیش‌بینی بروز حادثه
                    </FormLabel>
                    <Select
                      dir="rtl"
                      onValueChange={(value) => {
                        // Store as string in date field for this special case
                        field.onChange(value);
                      }}
                      value={field.value as any}
                    >
                      <FormControl>
                        <SelectTrigger className="text-right">
                          <SelectValue placeholder="انتخاب کنید" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="high">زیاد</SelectItem>
                        <SelectItem value="medium">متوسط</SelectItem>
                        <SelectItem value="low">کم</SelectItem>
                        <SelectItem value="none">هیچ</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-right !text-xs text-destructive" />
                  </FormItem>
                )}
              />
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

export default AccidentForm;
