"use client";

import { Dispatch, SetStateAction, useCallback, useState } from "react";
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
import { FileUploader } from "@/components/ui/multi-file-upload";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { useFileUpload } from "@/hooks/useFileUpload";
import _ from "lodash";

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
  extinguish: z.string().optional(),
  fireReportDate: z.date().optional(),
  fireReportFile: z.array(z.any()).optional(),
  hasMeteorologicalReport: z.enum(["yes", "no"]).optional(),
  meteorologicalReportNumber: z.string().optional(),
  meteorologicalReportDate: z.date().optional(),
  meteorologicalPredictionLevel: z.string().optional(),
  meteorologicalReportFile: z.array(z.any()).optional(),
});

type AccidentFormData = z.infer<typeof accidentFormSchema>;

interface AccidentFormProps {
  initialData?: AccidentFormData;
  onSubmit: (data: AccidentFormData) => void;
  onPrevious: () => void;
  accidentType:
    | Array<{ id: string; title?: string; name?: string }>
    | undefined;
  setProvinceId: Dispatch<SetStateAction<string>>;
  provinces: Array<{ id: string; title?: string; name?: string }> | undefined;
  cities: Array<{ id: string; title?: string; name?: string }> | undefined;
  ownerships: Array<{ id: string; title?: string; name?: string }> | undefined;
  citiesIsLoading: boolean;
}

const AccidentForm = ({
  initialData,
  onSubmit,
  onPrevious,
  accidentType,
  setProvinceId,
  provinces,
  cities,
  ownerships,
  citiesIsLoading,
}: AccidentFormProps) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isPoliceReportDateOpen, setIsPoliceReportDateOpen] = useState(false);
  const [isFireReportDateOpen, setIsFireReportDateOpen] = useState(false);
  const [isMeteoReportDateOpen, setIsMeteoReportDateOpen] = useState(false);
  
  const { uploadFile, uploadMultipleFiles, uploading } = useFileUpload();

  console.log(accidentType, "accidentType");

  // Handle immediate multiple file upload
  const handleImmediateMultipleFileUpload = useCallback(
    async (
      files: File[]
    ): Promise<Array<{ id: string; url: string; name?: string }>> => {
      if (!files.length) return [];

      try {
        const uploadedFiles = await uploadMultipleFiles(files);
        return uploadedFiles.map((file) => ({
          id: file.id!,
          url: file.url!,
          name: file.name,
        }));
      } catch (error) {
        console.error("Immediate multiple file upload failed:", error);
        toast.error("خطا در آپلود فایل‌ها");
      }
      return [];
    },
    [uploadMultipleFiles]
  );

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
      meteorologicalPredictionLevel: "",
      meteorologicalReportFile: [],
      extinguish: "",
    },
  });

  const onSubmitForm = (data: AccidentFormData) => {
    onSubmit(data);
  };

  return (
    <div className="flex flex-col justify-center gap-y-10 items-center">
      <h2 className="text-xl font-normal text-gray-500 text-center">
        اطلاعات حادثه
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitForm)}
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
                    {_.map(accidentType, (a) => {
                      return <SelectItem value={a.id}>{a.title}</SelectItem>;
                    })}
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
                    <Select
                      dir="rtl"
                      onValueChange={(value) => {
                        field.onChange(value);
                        setProvinceId(value);
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="text-right">
                          <SelectValue placeholder="انتخاب کنید" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {_.map(provinces, (p) => {
                          return (
                            <SelectItem key={p.id} value={p.id}>
                              {p.name || p.title}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
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
                    <Select
                      dir="rtl"
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!cities}
                    >
                      <FormControl>
                        <SelectTrigger className="text-right">
                          <SelectValue placeholder="انتخاب کنید" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {_.map(cities, (c) => {
                          return (
                            <SelectItem key={c.id} value={c.id}>
                              {c.name || c.title}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
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
                    {_.map(ownerships, (o) => {
                      return <SelectItem value={o.id}>{o.title}</SelectItem>;
                    })}
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

          {/* extinguish */}
          <FormField
            control={form.control}
            name="extinguish"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-right">نحوه اطفاء</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="نحوه دفع حادثه"
                    className={cn("text-right placeholder:text-right")}
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
                  <FileUploader
                    maxFiles={20}
                    uploadText="فایل را انتخاب کنید"
                    uploadSubText="PDF, Word, SVG, PNG, JPG یا GIF (حداکثر10مگابایت)"
                    accept="image/*,.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    key={"ACCIDENT_IMAGES_UPLOAD"}
                    id={"AccidentImagesUpload"}
                    deferLocalPreview
                    value={
                      Array.isArray(field.value) && field.value.length > 0
                        ? field.value
                            .filter((doc: File | string | { url?: string | { url: string }; previewBlob?: string; id?: string; name?: string }) =>
                              typeof doc === "string"
                                ? doc.trim() !== ""
                                : doc instanceof File
                                ? true
                                : typeof doc === "object" &&
                                  doc !== null &&
                                  "url" in doc
                            )
                            .map((doc: File | string | { url?: string | { url: string }; previewBlob?: string; id?: string; name?: string }, index: number) => {
                              if (typeof doc === "string") {
                                return {
                                  id: `existing-doc-${index}`,
                                  preview: doc,
                                  progress: 100,
                                  uploaded: true,
                                  name: `Existing Document ${index + 1}`,
                                  type: "image/jpeg",
                                };
                              } else if (doc instanceof File) {
                                return {
                                  id: `new-file-${index}`,
                                  preview: URL.createObjectURL(doc),
                                  progress: 100,
                                  uploaded: false,
                                  name: doc.name,
                                  type: doc.type || "application/octet-stream",
                                };
                              } else {
                                const imageUrl = typeof doc.url === 'string' ? doc.url : 
                                        (doc.url?.url || '');
                                const previewUrl = doc.previewBlob || imageUrl;
                                
                                return {
                                  id: doc.id ?? `existing-doc-${index}`,
                                  preview: previewUrl || `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><rect fill='%23ddd' width='400' height='400'/><text x='50%' y='50%' text-anchor='middle' dy='.3em' fill='%23999'>${encodeURIComponent(doc.name || 'No Preview')}</text></svg>`,
                                  progress: 100,
                                  uploaded: true,
                                  name: doc.name ?? `Existing Document ${index + 1}`,
                                  type: "image/jpeg",
                                };
                              }
                            })
                        : []
                    }
                    onChange={async (files: Array<{ id?: string; name?: string; preview?: string; uploaded?: boolean; file?: File }>) => {
                      const existingFiles = Array.isArray(field.value)
                        ? field.value.filter(
                            (doc: File | string | { url?: string | { url: string } }) =>
                              typeof doc === "string" ||
                              (typeof doc === "object" &&
                                doc !== null &&
                                "url" in doc)
                          )
                        : [];

                      const newFilesToUpload = files
                        .map((f) => f.file)
                        .filter((file): file is File => file instanceof File);

                      if (newFilesToUpload.length > 0) {
                        const toastId = toast.loading("در حال آپلود فایل");
                        const filesWithBlobs = files.filter((f) => f.file instanceof File);
                        
                        const uploadedFiles = await handleImmediateMultipleFileUpload(newFilesToUpload);

                        if (uploadedFiles.length > 0) {
                          const mergedFiles = uploadedFiles.map((serverFile, index) => {
                            const blobFile = filesWithBlobs[index];
                            return {
                              id: serverFile.id,
                              url: serverFile.url,
                              name: serverFile.name,
                              previewBlob: blobFile?.preview || null,
                            };
                          });
                          
                          const newValue = [...existingFiles, ...mergedFiles];
                          field.onChange(newValue);
                          toast.success("فایل‌ها با موفقیت آپلود شدند", { id: toastId });
                        } else {
                          toast.error("خطا در آپلود فایل‌ها", { id: toastId });
                        }
                      } else {
                        const remainingFiles = files
                          .map((f) => {
                            if (f.uploaded && f.id) {
                              return existingFiles.find(
                                (doc: File | string | { id?: string }) =>
                                  (typeof doc === "object" &&
                                    "id" in doc &&
                                    doc.id === f.id) ||
                                  (typeof doc === "string" && doc === f.preview)
                              );
                            }
                            return null;
                          })
                          .filter(Boolean);

                        field.onChange(remainingFiles.length > 0 ? remainingFiles : []);
                      }
                    }}
                    isInvalid={!!form.formState.errors.accidentImages}
                    capture={"environment"}
                    prevGridColumns={4}
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
                              date > new Date() || date < new Date("2020-01-01")
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
                      <FileUploader
                        maxFiles={20}
                        uploadText="فایل را انتخاب کنید"
                        uploadSubText="PDF, Word, SVG, PNG, JPG یا GIF (حداکثر10مگابایت)"
                        accept="image/*,.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        key={"POLICE_REPORT_FILE_UPLOAD"}
                        id={"PoliceReportFileUpload"}
                        deferLocalPreview
                        value={
                          Array.isArray(field.value) && field.value.length > 0
                            ? field.value
                                .filter((doc: File | string | { url?: string | { url: string }; previewBlob?: string; id?: string; name?: string }) =>
                                  typeof doc === "string"
                                    ? doc.trim() !== ""
                                    : doc instanceof File
                                    ? true
                                    : typeof doc === "object" &&
                                      doc !== null &&
                                      "url" in doc
                                )
                                .map((doc: File | string | { url?: string | { url: string }; previewBlob?: string; id?: string; name?: string }, index: number) => {
                                  if (typeof doc === "string") {
                                    return {
                                      id: `existing-doc-${index}`,
                                      preview: doc,
                                      progress: 100,
                                      uploaded: true,
                                      name: `Existing Document ${index + 1}`,
                                      type: "image/jpeg",
                                    };
                                  } else if (doc instanceof File) {
                                    return {
                                      id: `new-file-${index}`,
                                      preview: URL.createObjectURL(doc),
                                      progress: 100,
                                      uploaded: false,
                                      name: doc.name,
                                      type: doc.type || "application/octet-stream",
                                    };
                                  } else {
                                    const imageUrl = typeof doc.url === 'string' ? doc.url : 
                                            (doc.url?.url || '');
                                    const previewUrl = doc.previewBlob || imageUrl;
                                    
                                    return {
                                      id: doc.id ?? `existing-doc-${index}`,
                                      preview: previewUrl || `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><rect fill='%23ddd' width='400' height='400'/><text x='50%' y='50%' text-anchor='middle' dy='.3em' fill='%23999'>${encodeURIComponent(doc.name || 'No Preview')}</text></svg>`,
                                      progress: 100,
                                      uploaded: true,
                                      name: doc.name ?? `Existing Document ${index + 1}`,
                                      type: "image/jpeg",
                                    };
                                  }
                                })
                            : []
                        }
                        onChange={async (files: Array<{ id?: string; name?: string; preview?: string; uploaded?: boolean; file?: File }>) => {
                          const existingFiles = Array.isArray(field.value)
                            ? field.value.filter(
                                (doc: File | string | { url?: string | { url: string } }) =>
                                  typeof doc === "string" ||
                                  (typeof doc === "object" &&
                                    doc !== null &&
                                    "url" in doc)
                              )
                            : [];

                          const newFilesToUpload = files
                            .map((f) => f.file)
                            .filter((file): file is File => file instanceof File);

                          if (newFilesToUpload.length > 0) {
                            const toastId = toast.loading("در حال آپلود فایل");
                            const filesWithBlobs = files.filter((f) => f.file instanceof File);
                            
                            const uploadedFiles = await handleImmediateMultipleFileUpload(newFilesToUpload);

                            if (uploadedFiles.length > 0) {
                              const mergedFiles = uploadedFiles.map((serverFile, index) => {
                                const blobFile = filesWithBlobs[index];
                                return {
                                  id: serverFile.id,
                                  url: serverFile.url,
                                  name: serverFile.name,
                                  previewBlob: blobFile?.preview || null,
                                };
                              });
                              
                              const newValue = [...existingFiles, ...mergedFiles];
                              field.onChange(newValue);
                              toast.success("فایل‌ها با موفقیت آپلود شدند", { id: toastId });
                            } else {
                              toast.error("خطا در آپلود فایل‌ها", { id: toastId });
                            }
                          } else {
                            const remainingFiles = files
                              .map((f) => {
                                if (f.uploaded && f.id) {
                                  return existingFiles.find(
                                    (doc: File | string | { id?: string }) =>
                                      (typeof doc === "object" &&
                                        "id" in doc &&
                                        doc.id === f.id) ||
                                      (typeof doc === "string" && doc === f.preview)
                                  );
                                }
                                return null;
                              })
                              .filter(Boolean);

                            field.onChange(remainingFiles.length > 0 ? remainingFiles : []);
                          }
                        }}
                        isInvalid={!!form.formState.errors.policeReportFile}
                        capture={"environment"}
                        prevGridColumns={4}
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
                      <FormLabel className="text-right">
                        نام ایستگاه آتش نشانی
                      </FormLabel>
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
                      <FileUploader
                        maxFiles={20}
                        uploadText="فایل را انتخاب کنید"
                        uploadSubText="PDF, Word, SVG, PNG, JPG یا GIF (حداکثر10مگابایت)"
                        accept="image/*,.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        key={"FIRE_REPORT_FILE_UPLOAD"}
                        id={"FireReportFileUpload"}
                        deferLocalPreview
                        value={
                          Array.isArray(field.value) && field.value.length > 0
                            ? field.value
                                .filter((doc: File | string | { url?: string | { url: string }; previewBlob?: string; id?: string; name?: string }) =>
                                  typeof doc === "string"
                                    ? doc.trim() !== ""
                                    : doc instanceof File
                                    ? true
                                    : typeof doc === "object" &&
                                      doc !== null &&
                                      "url" in doc
                                )
                                .map((doc: File | string | { url?: string | { url: string }; previewBlob?: string; id?: string; name?: string }, index: number) => {
                                  if (typeof doc === "string") {
                                    return {
                                      id: `existing-doc-${index}`,
                                      preview: doc,
                                      progress: 100,
                                      uploaded: true,
                                      name: `Existing Document ${index + 1}`,
                                      type: "image/jpeg",
                                    };
                                  } else if (doc instanceof File) {
                                    return {
                                      id: `new-file-${index}`,
                                      preview: URL.createObjectURL(doc),
                                      progress: 100,
                                      uploaded: false,
                                      name: doc.name,
                                      type: doc.type || "application/octet-stream",
                                    };
                                  } else {
                                    const imageUrl = typeof doc.url === 'string' ? doc.url : 
                                            (doc.url?.url || '');
                                    const previewUrl = doc.previewBlob || imageUrl;
                                    
                                    return {
                                      id: doc.id ?? `existing-doc-${index}`,
                                      preview: previewUrl || `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><rect fill='%23ddd' width='400' height='400'/><text x='50%' y='50%' text-anchor='middle' dy='.3em' fill='%23999'>${encodeURIComponent(doc.name || 'No Preview')}</text></svg>`,
                                      progress: 100,
                                      uploaded: true,
                                      name: doc.name ?? `Existing Document ${index + 1}`,
                                      type: "image/jpeg",
                                    };
                                  }
                                })
                            : []
                        }
                        onChange={async (files: Array<{ id?: string; name?: string; preview?: string; uploaded?: boolean; file?: File }>) => {
                          const existingFiles = Array.isArray(field.value)
                            ? field.value.filter(
                                (doc: File | string | { url?: string | { url: string } }) =>
                                  typeof doc === "string" ||
                                  (typeof doc === "object" &&
                                    doc !== null &&
                                    "url" in doc)
                              )
                            : [];

                          const newFilesToUpload = files
                            .map((f) => f.file)
                            .filter((file): file is File => file instanceof File);

                          if (newFilesToUpload.length > 0) {
                            const toastId = toast.loading("در حال آپلود فایل");
                            const filesWithBlobs = files.filter((f) => f.file instanceof File);
                            
                            const uploadedFiles = await handleImmediateMultipleFileUpload(newFilesToUpload);

                            if (uploadedFiles.length > 0) {
                              const mergedFiles = uploadedFiles.map((serverFile, index) => {
                                const blobFile = filesWithBlobs[index];
                                return {
                                  id: serverFile.id,
                                  url: serverFile.url,
                                  name: serverFile.name,
                                  previewBlob: blobFile?.preview || null,
                                };
                              });
                              
                              const newValue = [...existingFiles, ...mergedFiles];
                              field.onChange(newValue);
                              toast.success("فایل‌ها با موفقیت آپلود شدند", { id: toastId });
                            } else {
                              toast.error("خطا در آپلود فایل‌ها", { id: toastId });
                            }
                          } else {
                            const remainingFiles = files
                              .map((f) => {
                                if (f.uploaded && f.id) {
                                  return existingFiles.find(
                                    (doc: File | string | { id?: string }) =>
                                      (typeof doc === "object" &&
                                        "id" in doc &&
                                        doc.id === f.id) ||
                                      (typeof doc === "string" && doc === f.preview)
                                  );
                                }
                                return null;
                              })
                              .filter(Boolean);

                            field.onChange(remainingFiles.length > 0 ? remainingFiles : []);
                          }
                        }}
                        isInvalid={!!form.formState.errors.fireReportFile}
                        capture={"environment"}
                        prevGridColumns={4}
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
                        {/* <SelectItem value="0">هیچ کدام</SelectItem> */}
                        <SelectItem value="1">آفتابی</SelectItem>
                        <SelectItem value="2">طوفانی</SelectItem>
                        <SelectItem value="3">بارانی</SelectItem>
                        <SelectItem value="4">ابری</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-right !text-xs text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="meteorologicalPredictionLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-right">
                      میزان پیش‌بینی بروز حادثه
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
                        {/* <SelectItem value="0">هیچ کدام</SelectItem> */}
                        <SelectItem value="1">خیلی کم</SelectItem>
                        <SelectItem value="2">کم</SelectItem>
                        <SelectItem value="3">متوسط</SelectItem>
                        <SelectItem value="4">زیاد</SelectItem>
                        <SelectItem value="5">خیلی زیاد</SelectItem>
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
              className="bg-primary hover:bg-primary flex-2 cursor-pointer"
            >
              تایید و ادامه
              <ArrowLeftIcon className="size-4 mr-2" />
            </Button>
            <Button
              type="button"
              variant="transparent"
              onClick={onPrevious}
              className="flex-1 cursor-pointer"
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
