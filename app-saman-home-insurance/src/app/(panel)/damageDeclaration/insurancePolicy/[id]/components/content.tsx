"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { X, Save, User, BookCheck, Home, List, FileText, CircleCheck } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import InsurancePolicyForm from "../../../components/insurance-policy-form";
import WizardSteps from "../../../components/wizardSteps";
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

interface ContentProps {
  declarationId: string;
}

export default function Content({ declarationId }: ContentProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([0]); // Step 1 (index 0) is completed
  const currentStep = 1; // This is step 2 (index 1)

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(`${STORAGE_KEY}-${declarationId}`);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
      } catch (error) {
        console.error("Error loading saved data:", error);
      }
    }
  }, [declarationId]);

  const handleFormChange = (data: any) => {
    setFormData((prev: any) => ({
      ...prev,
      policy: data,
    }));
  };

  const handleTemporarySave = async () => {
    setIsSaving(true);

    try {
      // Save to localStorage
      localStorage.setItem(
        `${STORAGE_KEY}-${declarationId}`,
        JSON.stringify(formData)
      );

      // TODO: Replace with actual API call when backend is ready
      // await fetch(`/api/damage-declaration/${declarationId}/save`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      await new Promise((resolve) => setTimeout(resolve, 500));

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

  const handleNext = () => {
    // Save current data
    localStorage.setItem(
      `${STORAGE_KEY}-${declarationId}`,
      JSON.stringify(formData)
    );

    // TODO: Navigate to next step when implemented
    router.push(`/damageDeclaration/accident/${declarationId}`);
    // toast.info("مرحله بعدی هنوز پیاده‌سازی نشده است");
  };

  const handlePrevious = () => {
    router.push("/damageDeclaration");
  };

  const handleStepClick = (index: number) => {
    // Navigate to the appropriate step
    const stepRoutes = [
      "/damageDeclaration",
      `/damageDeclaration/insurancePolicy/${declarationId}`,
      `/damageDeclaration/accident/${declarationId}`,
      `/damageDeclaration/cases/${declarationId}`,
      `/damageDeclaration/documents/${declarationId}`,
      `/damageDeclaration/review/${declarationId}`,
    ];
    
    if (stepRoutes[index]) {
      router.push(stepRoutes[index]);
    }
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
            <InsurancePolicyForm
              initialData={formData.policy}
              onChange={handleFormChange}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          </div>
        </div>

        {/* Toast Notifications */}
        <Toaster position="top-center" dir="rtl" richColors />
      </div>
    </div>
  );
}
