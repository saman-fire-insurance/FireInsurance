"use client";

import { useCallback, useEffect, useRef } from "react";
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
import { ArrowLeftIcon } from "lucide-react";
import { FileUploader } from "@/components/ui/multi-file-upload";
import { toast } from "sonner";
import { useFileUpload } from "@/hooks/useFileUpload";
import { MultiSelect } from "@/components/ui/multi-select";

// Form validation schema
const insurancePolicySchema = z
  .object({
    policyNumber: z
      .string()
      .length(16, "شماره بیمه‌نامه باید 16 کاراکتر باشد"),
    policyFiles: z.array(z.any()).optional(),
    policyFileUrls: z.array(z.string()).optional(),
    hasOtherInsurance: z.enum(["yes", "no"]).optional(),
    otherInsuranceCompany: z.string().optional(),
    otherPolicyNumber: z.string().optional(),
    otherInsuranceCase: z.array(z.string()).optional(),
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
      if (!data.otherInsuranceCase || data.otherInsuranceCase.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "حداقل یک مورد بیمه الزامی است",
          path: ["otherInsuranceCase"],
        });
      }
    }
  });

type InsurancePolicyFormData = z.infer<typeof insurancePolicySchema>;

interface InsurancePolicyFormProps {
  initialData?: InsurancePolicyFormData;
  onChange: (data: InsurancePolicyFormData) => void;
  onSubmit?: (data: InsurancePolicyFormData) => void;
  onNext: () => void;
  onPrevious: () => void;
  insurableObjects?: Array<{ id: string; title: string }>;
  insurableObjectsLoading?: boolean;
}

const InsurancePolicyForm = ({
  initialData,
  onChange,
  onSubmit: onSubmitProp,
  onNext,
  onPrevious,
  insurableObjects,
  insurableObjectsLoading = false,
}: InsurancePolicyFormProps) => {
  const isInitialMount = useRef(true);
  const { uploadFile, uploadMultipleFiles, uploading } = useFileUpload();

  // Transform API data to the format needed for MultiSelect
  const insuranceCaseOptions = insurableObjects?.map((obj) => ({
    id: obj.id,
    value: obj.title,
  })) || [];

  const form = useForm<InsurancePolicyFormData>({
    resolver: zodResolver(insurancePolicySchema),
    defaultValues: initialData || {
      policyNumber: "",
      policyFiles: [],
      policyFileUrls: [],
      hasOtherInsurance: "no",
      otherInsuranceCompany: "",
      otherPolicyNumber: "",
      otherInsuranceCase: [],
    },
  });

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

  const onSubmit = async (data: InsurancePolicyFormData) => {
    onChange(data);
    
    // Call the submit handler if provided (for API call)
    if (onSubmitProp) {
      await onSubmitProp(data);
    }
    
    // onNext();
  };

  return (
    <div className="flex flex-col justify-center gap-y-10 items-center">
      <h2 className="text-xl font-normal text-gray-500 text-center">
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
                  <FileUploader
                   maxFiles={20}
                    uploadText="فایل را انتخاب کنید"
                    uploadSubText="PDF, Word, SVG, PNG, JPG یا GIF (حداکثر10مگابایت)"
                    accept="image/*,.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    key={"POLICY_DOCUMENT_UPLOAD"}
                    id={"PolicyDocumentUpload"}
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
                          type:
                            doc.type || "application/octet-stream",
                          };
                        } else {
                          // Server response object
                          const imageUrl = typeof doc.url === 'string' ? doc.url : 
                                  (doc.url?.url || '');
                          
                          // Use blob URL if available, otherwise try server URL
                          const previewUrl = doc.previewBlob || imageUrl;
                          
                          // console.log("Mapping server doc to UploadFile:", {
                          // hasPreviewBlob: !!doc.previewBlob,
                          // imageUrl,
                          // usingPreview: previewUrl,
                          // docId: doc.id
                          // });
                          
                          return {
                          id: doc.id ?? `existing-doc-${index}`,
                          preview: previewUrl || `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><rect fill='%23ddd' width='400' height='400'/><text x='50%' y='50%' text-anchor='middle' dy='.3em' fill='%23999'>${encodeURIComponent(doc.name || 'No Preview')}</text></svg>`,
                          progress: 100,
                          uploaded: true,
                          name:
                            doc.name ??
                            `Existing Document ${index + 1}`,
                          type: "image/jpeg",
                          };
                        }
                        })
                      : []
                    }
                    onChange={async (files: Array<{ id?: string; name?: string; preview?: string; uploaded?: boolean; file?: File }>) => {
                    // console.log("FileUploader onChange received files:", files.map((f: any) => ({
                    //   id: f.id,
                    //   name: f.name,
                    //   preview: f.preview?.substring(0, 30),
                    //   uploaded: f.uploaded,
                    //   hasFile: !!f.file
                    // })));
                    
                    // Clean up previous blob URLs
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

                    console.log("Files to upload:", newFilesToUpload.length, "Existing files:", existingFiles.length);

                    if (newFilesToUpload.length > 0) {
                      const toastId = toast.loading("در حال آپلود فایل");
                      
                      // Find the corresponding UploadFile objects with blob URLs
                      const filesWithBlobs = files.filter((f) => f.file instanceof File);
                      
                      const uploadedFiles =
                      await handleImmediateMultipleFileUpload(
                        newFilesToUpload
                      );

                      if (uploadedFiles.length > 0) {
                      console.log("📤 Upload SUCCESS! Server returned:", uploadedFiles);
                      
                      // Merge server response with blob URLs for preview
                      const mergedFiles = uploadedFiles.map((serverFile, index) => {
                        const blobFile = filesWithBlobs[index];
                        return {
                        id: serverFile.id,
                        url: serverFile.url,
                        name: serverFile.name,
                        // Keep the blob URL for preview if server URL is empty
                        previewBlob: blobFile?.preview || null,
                        };
                      });
                      
                      const newValue = [
                        ...existingFiles,
                        ...mergedFiles,
                      ];
                      console.log("📝 Setting form field.value to:", newValue);
                      field.onChange(newValue);
                      toast.success("فایل‌ها با موفقیت آپلود شدند", {
                        id: toastId,
                      });
                      } else {
                      toast.error("خطا در آپلود فایل‌ها", {
                        id: toastId,
                      });
                      }
                    } else {
                      // Handle deletion or no new files
                      const remainingFiles = files
                      .map((f) => {
                        if (f.uploaded && f.id) {
                        return existingFiles.find(
                          (doc: File | string | { id?: string }) =>
                          (typeof doc === "object" &&
                            "id" in doc &&
                            doc.id === f.id) ||
                          (typeof doc === "string" &&
                            doc === f.preview)
                        );
                        }
                        return null;
                      })
                      .filter(Boolean);

                      field.onChange(
                      remainingFiles.length > 0 ? remainingFiles : []
                      ); // Set to empty array if no files remain
                    }
                    form.trigger("policyFiles"); // Trigger validation
                    }}
                    isInvalid={!!form.formState.errors.policyFiles}
                    capture={"environment"}
                    prevGridColumns={4}
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
              {/* Insurance Case - Multi Select */}
              <FormField
                control={form.control}
                name="otherInsuranceCase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-right">
                      مورد بیمه
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={insuranceCaseOptions}
                        selected={field.value || []}
                        onChange={field.onChange}
                        isInvalid={!!form.formState.errors.otherInsuranceCase}
                        disabled={insurableObjectsLoading}
                        placeholder={
                          insurableObjectsLoading
                            ? "در حال بارگذاری..."
                            : "انتخاب کنید"
                        }
                      />
                    </FormControl>
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

export default InsurancePolicyForm;
