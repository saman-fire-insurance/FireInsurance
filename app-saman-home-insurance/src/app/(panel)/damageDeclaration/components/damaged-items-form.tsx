"use client";

import { useEffect, useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeftIcon } from "lucide-react";

// Form validation schema
const damagedItemsSchema = z
  .object({
    building: z.boolean(),
    buildingAmount: z.string().optional(),
    facilities: z.boolean(),
    facilitiesAmount: z.string().optional(),
    furniture: z.boolean(),
    furnitureAmount: z.string().optional(),
    glass: z.boolean(),
    glassAmount: z.string().optional(),
    vehicleOnSite: z.boolean(),
    vehicleOnSiteAmount: z.string().optional(),
    other: z.boolean(),
    otherAmount: z.string().optional(),
    description: z.string().optional(),
  })
  .refine(
    (data) => {
      // If "other" is checked, description must be filled
      if (data.other) {
        return data.description && data.description.trim().length > 0;
      }
      return true;
    },
    {
      message: "توضیحات الزامی است",
      path: ["description"],
    }
  );

type DamagedItemsFormData = z.infer<typeof damagedItemsSchema>;

interface InsurableObject {
  id: number;
  samanId: number;
  title: string;
  other: boolean;
}

interface DamageItem {
  id: string;
  label: string;
  amountField: string;
  apiId: number | null;
  samanId: number | null;
  isOther: boolean;
}

interface DamagedItemsFormProps {
  initialData?: DamagedItemsFormData;
  onChange: (data: DamagedItemsFormData) => void;
  onNext: () => void;
  onPrevious: () => void;
  insurableObjects: InsurableObject[];
  insurableObjectsLoading: boolean;
}

export default function DamagedItemsForm({
  initialData,
  onChange,
  onNext,
  onPrevious,
  insurableObjects,
  insurableObjectsLoading,
}: DamagedItemsFormProps) {
  const [totalDamages, setTotalDamages] = useState(0);
  // console.log(insurableObjects,"insurableObjects")

  const form = useForm<DamagedItemsFormData>({
    resolver: zodResolver(damagedItemsSchema),
    defaultValues: initialData || {
      building: false,
      buildingAmount: "",
      facilities: false,
      facilitiesAmount: "",
      furniture: false,
      furnitureAmount: "",
      glass: false,
      glassAmount: "",
      vehicleOnSite: false,
      vehicleOnSiteAmount: "",
      other: false,
      otherAmount: "",
      description: "",
    },
  });

  // Watch all form values
  const watchedValues = form.watch();

  // Calculate total damages whenever amounts change
  useEffect(() => {
    const amounts = [
      watchedValues.buildingAmount,
      watchedValues.facilitiesAmount,
      watchedValues.furnitureAmount,
      watchedValues.glassAmount,
      watchedValues.vehicleOnSiteAmount,
      watchedValues.otherAmount,
    ];

    const total = amounts.reduce((sum, amount) => {
      const numericAmount = parseFloat(
        amount?.replace(/,/g, "").replace(/[^\d]/g, "") || "0"
      );
      return sum + numericAmount;
    }, 0);

    setTotalDamages(total);
  }, [
    watchedValues.buildingAmount,
    watchedValues.facilitiesAmount,
    watchedValues.furnitureAmount,
    watchedValues.glassAmount,
    watchedValues.vehicleOnSiteAmount,
    watchedValues.otherAmount,
  ]);

  // Update parent component whenever form data changes
  // useEffect(() => {
  //   const subscription = form.watch((value) => {
  //     onChange(value as DamagedItemsFormData);
  //   });
  //   return () => subscription.unsubscribe();
  // }, [form, onChange]);

  const formatCurrency = (value: string) => {
    // Remove all non-digit characters
    const numbers = value.replace(/\D/g, "");
    // Format with thousand separators
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleAmountChange = (
    field: { onChange: (value: string) => void },
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const formatted = formatCurrency(e.target.value);
    field.onChange(formatted);
  };

  const onSubmit = (data: DamagedItemsFormData) => {
    console.log("Form submitted:", data);
    
    // Generate damagedObjects array for API
    const damagedObjects = allDamageItems
      .filter((item: DamageItem) => {
        // Check if this item is selected
        const isSelected = data[item.id as keyof DamagedItemsFormData];
        return isSelected === true;
      })
      .map((item: DamageItem) => {
        // Get the amount for this item
        const amountField = item.amountField as keyof DamagedItemsFormData;
        const amountValue = data[amountField] as string || "";
        
        // Parse the amount (remove commas and convert to number)
        const estimatedLoss = parseFloat(amountValue.replace(/,/g, "") || "0");
        
        // For "other" items, use the description field, otherwise empty string
        const description = item.id === "other" 
          ? (data.description || "") 
          : "";
        
        return {
          insurableObjectId: item.apiId || null, // Use null for "other" option
          estimatedLoss: estimatedLoss,
          description: description,
        };
      });
    
    console.log("Damaged Objects for API:", damagedObjects);
    
    // Pass both form data and damagedObjects to parent
    onChange({ ...data, damagedObjects } as DamagedItemsFormData & { damagedObjects: unknown[] });
    // onNext();
  };

  // Map API field names to form field names
  const fieldNameMap: Record<number, { id: string; amountField: string }> = {
    1: { id: "building", amountField: "buildingAmount" },
    2: { id: "facilities", amountField: "facilitiesAmount" },
    3: { id: "furniture", amountField: "furnitureAmount" },
    4: { id: "glass", amountField: "glassAmount" },
    5: { id: "vehicleOnSite", amountField: "vehicleOnSiteAmount" },
  };

  // Generate damage items from API data
  const damageItems = insurableObjects?.map((item: InsurableObject) => ({
    id: fieldNameMap[item.samanId]?.id || `custom_${item.id}`,
    label: item.title,
    amountField: fieldNameMap[item.samanId]?.amountField || `custom_${item.id}_amount`,
    apiId: item.id,
    samanId: item.samanId,
    isOther: item.other,
  })) || [];

  // Add "سایر موارد" (Other) option at the end
  const allDamageItems = [
    ...damageItems,
    // {
    //   id: "other",
    //   label: "سایر موارد",
    //   amountField: "otherAmount",
    //   apiId: null,
    //   samanId: null,
    //   isOther: true,
    // },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-normal text-gray-500 text-center">
            موارد آسیب دیده
          </h2>
          <p className="text-sm text-gray-600 text-right">
            موارد آسیب دیده را انتخاب کنید:
          </p>

          {/* Damage Items List */}
          <div className="space-y-4">
            {insurableObjectsLoading ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  {/* Checkbox and label skeleton */}
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              ))
            ) : (
              allDamageItems.map((item: DamageItem, index: number) => (
              <div key={item.id} className="space-y-2">
                {/* Checkbox */}
                <FormField
                  control={form.control}
                  name={item.id as keyof DamagedItemsFormData}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={!!field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal cursor-pointer">
                        {index + 1}. {item.label}
                      </FormLabel>
                    </FormItem>
                  )}
                />

                {/* Amount Input - Only show if checkbox is checked and it's not "other" */}
                {form.watch(item.id as keyof DamagedItemsFormData) && item.id !== "other" && (
                  <FormField
                    control={form.control}
                    name={item.amountField as keyof DamagedItemsFormData}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              value={field.value as string || ""}
                              onChange={(e) => handleAmountChange(field, e)}
                              placeholder="0"
                              className="text-center pr-16"
                              dir="ltr"
                            />
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                              ریال
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            ))
            )}
          </div>

          {/* Description - Only show when "other" is checked */}
          {/* {form.watch("other") && (
            <>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">
                      توضیحات <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="نام سایر موارد آسیب دیده را اینجا بنویسید..."
                        className="min-h-32 resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="otherAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>مبلغ تقریبی خسارت (ریال)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          onChange={(e) => handleAmountChange(field, e)}
                          placeholder="0"
                          className="text-center pr-16"
                          dir="ltr"
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                          ریال
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )} */}
          {/* ///////////////////////// */}


          {/* Total Summary */}
          <div className="bg-success/10 p-4 rounded-lg flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">
              جمع کل خسارت:
            </span>
            <span className="text-lg font-bold text-primary">
              {formatCurrency(totalDamages.toString())} ریال
            </span>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4 items-center gap-x-2">
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
