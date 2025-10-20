"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { X, Save, User, BookCheck, Home, List, FileText, CircleCheck } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import InsuranceInfoForm from "./components/insurance-info-form";
import WizardSteps from "./components/wizardSteps";
import Image from "next/image";

const STORAGE_KEY = "damage-declaration-form-data";

const steps = [
  { id: "insured", label: "بیمه‌گذار", icon: User },
  { id: "policy", label: "بیمه نامه", icon: BookCheck },
  { id: "accident", label: "حادثه", icon: Home },
  { id: "cases", label: "موارد آسیب دیده", icon: List },
  { id: "documents", label: "ذینفعان", icon: FileText },
  { id: "review", label: "بررسی", icon: CircleCheck },
];

export default function DamageDeclarationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]); // No steps completed yet
  const currentStep = 0; // This is step 1 (index 0)

  const handleFormChange = (data: any) => {
    setFormData((prev: any) => ({
      ...prev,
      insured: data,
    }));
  };

  const handleTemporarySave = async () => {
    setIsSaving(true);

    try {
      // Generate a temporary ID for saving (will be replaced by backend ID later)
      const tempId = `temp-${Date.now()}`;
      localStorage.setItem(`${STORAGE_KEY}-${tempId}`, JSON.stringify(formData));

      toast.success("تغییرات با موفقیت ذخیره شد", {
        description: "اطلاعات شما به صورت موقت ذخیره شد",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("خطا در ذخیره‌سازی", {
        description: "لطفاً دوباره تلاش کنید",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleExit = () => {
    router.push("/");
  };

  const handleNext = async (declarationId: string) => {
    try {
      // Save form data with the ID received from API
      localStorage.setItem(
        `${STORAGE_KEY}-${declarationId}`,
        JSON.stringify(formData)
      );

      // Navigate to next step with the ID
      router.push(`/damageDeclaration/insurancePolicy/${declarationId}`);
    } catch (error) {
      console.error("Error creating damage declaration:", error);
      toast.error("خطا در ایجاد اعلام خسارت");
    }
  };

  const handleStepClick = (index: number) => {
    // For step 1, we can't navigate with ID yet since it hasn't been created
    // Only allow clicking on step 1 (current step)
    if (index === 0) {
      // Already on this page, do nothing or scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Other steps are not accessible until form is submitted and ID is created
  };

  return (
    <div className="">
      <div className="max-w-4xl w-full h-full bg-white mx-auto p-6 flex flex-col gap-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            className="border-gray-200 text-secondary cursor-pointer bg-transparent"
            onClick={handleExit}
          >
            <X className="size-4" />
            خروج
          </Button>
          <Button
            variant="destructive"
            className="border border-destructive text-destructive cursor-pointer hover:!text-destructive bg-transparent"
            onClick={handleTemporarySave}
            disabled={isSaving}
          >
            <Save className="size-4" />
            {isSaving ? "در حال ذخیره..." : "ذخیره موقت"}
          </Button>
        </div>

        {/* Main Content */}
        <div className="mx-auto w-full flex flex-col gap-y-6">
          {/* Title and Icon */}
          <div className="flex flex-col items-center gap-y-4">
            <div className="">
              <Image
                src={"/img/damageDeclarationLogo.png"}
                alt="damage declaration logo"
                width={64}
                height={64}
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              فرم اعلام خسارت
            </h1>
          </div>

          {/* Wizard Steps */}
          <WizardSteps
            steps={steps}
            currentStep={currentStep}
            completedSteps={completedSteps}
            handleStepClick={handleStepClick}
          />

          {/* Form Content */}
          <div className="flex flex-col w-full md:w-1/2 mx-auto">
            <InsuranceInfoForm
              initialData={formData.insured}
              onChange={handleFormChange}
              onNext={handleNext}
            />
          </div>
        </div>

        {/* Toast Notifications */}
        <Toaster position="top-center" dir="rtl" richColors />
      </div>
    </div>
  );
}
